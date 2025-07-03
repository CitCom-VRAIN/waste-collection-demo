import os
from services.Optimization import Optimization
from services.auth_oidc import get_access_token_oid4vp
import json
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS

# Init flask server
app = Flask(__name__)
CORS(app)


# Serve frontend
@app.route("/")
def home():
    return app.send_static_file("index.html")


# API REST
@app.route("/wastecontainers")
def waste_containers():
    containers = get_all_WasteContainers()
    return containers


@app.route("/trucks")
def trucks():
    trucks = get_trucks()
    return trucks


@app.route("/optimization")
def optimization():
    coords_raw = request.args.get("coords")
    vehicles_raw = request.args.get("vehicles")
    end_location_raw = request.args.get("end")
    if coords_raw is None or vehicles_raw is None or end_location_raw is None:
        return jsonify({
            "error": "Missing required parameters: coords, vehicles, end"
        }), 400
    coords = json.loads(coords_raw)
    vehicles = json.loads(vehicles_raw)
    end_location = json.loads(end_location_raw)
    optimizer = Optimization()
    optimization = optimizer.optimize(coords, vehicles, end_location)
    return optimization


# Data functions
def get_all_WasteContainers():
    # Get OID4VC/VP access token
    keycloak_url = os.environ.get("KEYCLOAK_URL", "http://keycloak-consumer.63.33.94.64.nip.io")
    credential_configuration_id = os.environ.get("CREDENTIAL_CONFIGURATION_ID", "operator-credential")
    mp_data_service_url = os.environ.get("MP_DATA_SERVICE_URL", "http://mp-data-service.54.155.89.222.nip.io")
    
    access_token = get_access_token_oid4vp(keycloak_url, credential_configuration_id)

    # Data endpoint
    url = f"{mp_data_service_url}/ngsi-ld/v1/entities?type=WasteContainer"
    headers = {
        'Accept': 'application/ld+json',
        'Authorization': f'Bearer {access_token}',
        'Fiware-Service': 'tef_vlci',
        'Fiware-ServicePath': '/residuos_contenedores_vlc'
    }
    response = requests.get(url, headers=headers)
    response.raise_for_status()
    return response.json()


def get_trucks():
    # Simulated trucks
    return [
        {
            "id": "urn:ngsi-ld:VehicleModel:vehiclemodelA:econic",
            "location": {
                "observedAt": "2023-11-16T23:01:12.111Z",
                "type": "GeoProperty",
                "value": {
                    "coordinates": [
                        -0.5236388090981838,
                        39.48451738852713 
                    ],
                    "type": "Point"
                }
            },
            "type": "VehicleModel",
            "brandName": "Mercedes Benz",
            "cargoVolume": 1000,
            "fuelType": "diesel",
            "manufacturerName": "Daimler",
            "modelName": "Econic",
            "name": "MBenz-Econic2014",
            "vehicleType": "lorry"
        }
    ]
