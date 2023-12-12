import os
from dotenv import load_dotenv
from services.Auth import Auth
from services.BrokerLD import BrokerLD
from services.Optimization import Optimization
import requests
import json

# Load env variables
load_dotenv()

# Init flask server
from flask import Flask, request, render_template
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


# Serve frontend
@app.route("/")
def home():
    return app.send_static_file("index.html")


# API REST
@app.route("/wastecontainers")
def waste_containers():
    # polygon = request.args.get("polygon")
    # containers = get_WasteContainers_within_area(polygon)
    containers = get_all_WasteContainers()
    return containers


@app.route("/trucks")
def trucks():
    trucks = get_trucks()
    return trucks


@app.route("/districts")
def disctricts():
    districts = get_districts()
    return districts


@app.route("/optimization")
def optimization():
    coords = json.loads(request.args.get("coords"))
    vehicles = json.loads(request.args.get("vehicles"))
    optimizer = Optimization()
    optimization = optimizer.optimize(coords, vehicles)
    return optimization


# Data functions
def get_all_WasteContainers():
    # Define service & subservice
    service = "tef_vlci"
    subservice = "/residuos_contenedores_vlc"

    # Authenticate
    auth = Auth()
    token = auth.get_auth_token_subservice(service, subservice)

    # New Broker NGSI-LD connection
    broker = BrokerLD()

    # Fetch all WasteContainer entities
    limit = 400  # Entites per page (TODO: Implement pagination with response.headers["fiware-total-count"] & offset)
    data = broker.get_all_entities_by_type(
        "WasteContainer", service, subservice, token, limit
    ).json()

    return data


def get_trucks():
    # Fake data
    vehicles = [
        {
            "id": "urn:ngsi-ld:VehicleModel:vehiclemodel:econic",
            "location": {
                "observedAt": "2023-11-16T23:01:12.111Z",
                "type": "GeoProperty",
                "value": {
                    "coordinates": [-0.5045224463629362, 39.467567014494584],
                    "type": "Point",
                },
            },
            "type": "VehicleModel",
            "brandName": "Mercedes Benz",
            "cargoVolume": 1000,
            "fuelType": "diesel",
            "manufacturerName": "Daimler",
            "modelName": "Econic",
            "name": "MBenz-Econic2014",
            "vehicleType": "lorry",
            "@context": [
                "https://uri.etsi.org/ngsi-ld/v1/ngsi-ld-core-context.jsonld",
                "https://raw.githubusercontent.com/smart-data-models/dataModel.Transportation/master/context.jsonld",
            ],
        },
        {
            "id": "urn:ngsi-ld:VehicleModel:vehiclemodel:econic",
            "location": {
                "observedAt": "2023-11-16T23:01:12.111Z",
                "type": "GeoProperty",
                "value": {
                    "coordinates": [-0.5052030675609576, 39.46955099682593],
                    "type": "Point",
                },
            },
            "type": "VehicleModel",
            "brandName": "Mercedes Benz",
            "cargoVolume": 1000,
            "fuelType": "diesel",
            "manufacturerName": "Daimler",
            "modelName": "Econic",
            "name": "MBenz-Econic2014",
            "vehicleType": "lorry",
            "@context": [
                "https://uri.etsi.org/ngsi-ld/v1/ngsi-ld-core-context.jsonld",
                "https://raw.githubusercontent.com/smart-data-models/dataModel.Transportation/master/context.jsonld",
            ],
        },
    ]

    return vehicles


def get_WasteContainers_within_area(polygon):
    # Define service & subservice
    service = "tef_vlci"
    subservice = "/residuos_contenedores_vlc"

    # Authenticate
    auth = Auth()
    token = auth.get_auth_token_subservice(service, subservice)

    # New Broker NGSI-LD connection
    broker = BrokerLD()

    # Fetch all WasteContainer entities

    limit = 400  # Entites per page (TODO: Implement pagination with response.headers["fiware-total-count"] & offset)
    data = broker.get_all_entities_by_type_and_georel(
        "WasteContainer",
        service,
        subservice,
        token,
        "coveredBy",
        "polygon",
        polygon,
        limit,
    ).json()

    return data


def get_districts():
    districtsURL = os.environ.get("DISTRICTS_API")
    response = requests.get(districtsURL)
    districts = response.json()["results"]
    return districts
