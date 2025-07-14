import requests
import json
import base64
import os
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.backends import default_backend
import jwt

WALLET_IDENTITY_PATH = os.path.join(os.path.dirname(__file__), '../wallet-identity')

def load_did_and_key():
    with open(os.path.join(WALLET_IDENTITY_PATH, 'did.json'), 'r') as f:
        did_data = json.load(f)
    holder_did = did_data['id']
    with open(os.path.join(WALLET_IDENTITY_PATH, 'private-key.pem'), 'rb') as f:
        private_key = serialization.load_pem_private_key(f.read(), password=None, backend=default_backend())
    return holder_did, private_key

# --- OID4VC/VP FLOW ---
def get_access_token_oid4vp(keycloak_url, credential_configuration_id):
    """
    keycloak_url: base URL (e.g. http://localhost:8080)
    credential_configuration_id: string (for example, 'operator-credential')
    Returns the final access token for the data API.
    """
    # 1. Obtain standard OIDC access_token
    token_url = f"{keycloak_url}/realms/test-realm/protocol/openid-connect/token"
    data = {
        'grant_type': 'password',
        'client_id': os.environ.get('KEYCLOAK_CLIENT_ID', 'admin-cli'),
        'username': os.environ.get('KEYCLOAK_USER'),
        'password': os.environ.get('KEYCLOAK_PASSWORD')
    }
    r = requests.post(token_url, data=data)
    r.raise_for_status()
    access_token = r.json()['access_token']

    # 2. Obtain offer_uri
    offer_url = f"{keycloak_url}/realms/test-realm/protocol/oid4vc/credential-offer-uri?credential_configuration_id={credential_configuration_id}"
    r = requests.get(offer_url, headers={'Authorization': f'Bearer {access_token}'})
    r.raise_for_status()
    offer_uri = r.json()['issuer'] + r.json()['nonce']

    # 3. Obtain pre_authorized_code
    r = requests.get(offer_uri, headers={'Authorization': f'Bearer {access_token}'})
    r.raise_for_status()
    pre_authorized_code = r.json()['grants']['urn:ietf:params:oauth:grant-type:pre-authorized_code']['pre-authorized_code']

    # 4. Obtain credential_access_token
    data = {
        'grant_type': 'urn:ietf:params:oauth:grant-type:pre-authorized_code',
        'pre-authorized_code': pre_authorized_code
    }
    r = requests.post(token_url, data=data)
    r.raise_for_status()
    credential_access_token = r.json()['access_token']

    # 5. Obtain credential (jwt_vc)
    cred_url = f"{keycloak_url}/realms/test-realm/protocol/oid4vc/credential"
    cred_data = {
        "credential_identifier": credential_configuration_id,
        "format": "jwt_vc"
    }
    r = requests.post(cred_url, headers={
        'Authorization': f'Bearer {credential_access_token}',
        'Content-Type': 'application/json',
        'Accept': '*/*'
    }, data=json.dumps(cred_data))
    r.raise_for_status()
    credential_jwt = r.json()['credential']

    # 6. Obtain token_endpoint
    well_known_url = "http://mp-data-service.54.155.89.222.nip.io/.well-known/openid-configuration"
    r = requests.get(well_known_url)
    r.raise_for_status()
    token_endpoint = r.json()['token_endpoint']

    # 7. Read holder_did and private key
    holder_did, private_key = load_did_and_key()

    # 8. Build Verifiable Presentation (VP)
    vp = {
        "@context": ["https://www.w3.org/2018/credentials/v1"],
        "type": ["VerifiablePresentation"],
        "verifiableCredential": [credential_jwt],
        "holder": holder_did
    }

    # 9. Build JWT VP
    header = {
        "alg": "ES256",
        "typ": "JWT",
        "kid": holder_did
    }
    payload = {
        "iss": holder_did,
        "sub": holder_did,
        "vp": vp
    }
    # Validate private key type
    from cryptography.hazmat.primitives.asymmetric.ec import EllipticCurvePrivateKey
    if not isinstance(private_key, EllipticCurvePrivateKey):
        raise TypeError("The private key must be of type EC to sign with ES256.")
    vp_jwt = jwt.encode(payload, private_key, algorithm="ES256", headers=header)

    # 10. Encode vp_jwt in base64url (without padding)
    vp_token = base64.urlsafe_b64encode(vp_jwt.encode('utf-8')).rstrip(b'=').decode('utf-8')

    # 11. Obtain vp_token access_token
    data = {
        'grant_type': 'vp_token',
        'client_id': 'data-service',
        'vp_token': vp_token,
        'scope': 'operator'  # You can parametrize the scope if needed
    }
    r = requests.post(token_endpoint, data=data, headers={
        'Accept': '*/*',
        'Content-Type': 'application/x-www-form-urlencoded'
    })
    if not r.ok:
        print("OID4VP error:", r.text)
    r.raise_for_status()
    final_access_token = r.json()['access_token']
    return final_access_token 