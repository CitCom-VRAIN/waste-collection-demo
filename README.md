# Waste Collection Demo
Waste collection optimization using Openroute service. For a detailed guide, check out our [documentation](https://citcom-vrain.github.io/services/waste_collection/)

## 📦 Project setup
Below are the basic instructions to run the minimum viable service. 

Tested with Python `3.10.12` and Ubuntu 22.04. 

1. Clone the repository and navigate to its root folder:
```bash
git clone https://github.com/CitCom-VRAIN/waste-collection-demo.git && cd waste-collection-demo
```

2. Create and activate a Python virtual environment:
```bash
python3 -m venv ./venv && source ./venv/bin/activate
```

3. Install all requirements:
```bash
pip install -r requirements.txt
```

4. Create an `.env` file using `.env.example` as a guide: 
```bash
cp .env.example .env
```

5. Then edit the `.env` file and replace the `OPENROUTESERVICE_API_KEY` value with your own Openroute service API key.
```bash
OPENROUTESERVICE_API_KEY="Replace this string with your Openroute API key"
KEYCLOAK_URL="http://keycloak-consumer.63.33.94.64.nip.io"
CREDENTIAL_CONFIGURATION_I="operator-credential"
```

6. After editing the file and saving it, read the .env file:
```bash
source .env
```  

7. Finally, start the server and open [http://127.0.0.1:5000](http://127.0.0.1:5000) in your browser:
```bash
flask --app server run
```

## Docker build
```bash
docker build -t joancipria/waste-collection-demo:latest .

docker push joancipria/waste-collection-demo:latest
```
## DS deployment
```bash
# Create wallet identity secret
kubectl create secret generic wallet-identity-secret \
    --from-file=did.json=wallet-identity/did.json \
    --from-file=private-key.pem=wallet-identity/private-key.pem \
    -n consumer

# Create ORS API key secret
kubectl create secret generic ors-api-key --from-literal=OPENROUTESERVICE_API_KEY=5b3ce3597851110001cf62487c1cebfad2324c61823ac5e4fe9be9b1 -n consumer

# Create keycloak login secret
kubectl create secret generic keycloak-credentials \
    --from-literal=KEYCLOAK_USER='test-user' \
    --from-literal=KEYCLOAK_PASSWORD='test' \
    --from-literal=KEYCLOAK_CLIENT_ID='admin-cli' \
    -n consumer

# Check
kubectl get secrets -n <TU_NAMESPACE>
kubectl describe secret wallet-identity-secret -n <TU_NAMESPACE>

# Deploy
kubectl apply -f flask-app.yaml

# Restart if needed
kubectl rollout restart deployment waste-collection-demo -n consumer
```