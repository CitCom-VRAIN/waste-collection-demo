import os
from lib.ngsildclient.Client import Client
from services.Optimization import Optimization
import json

# Ngsi-ld broker client
client = Client()

# Init flask server
from flask import Flask, request
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


@app.route("/optimization")
def optimization():
    coords = json.loads(request.args.get("coords"))
    vehicles = json.loads(request.args.get("vehicles"))
    end_location = json.loads(request.args.get("end"))
    optimizer = Optimization()
    optimization = optimizer.optimize(coords, vehicles, end_location)
    return optimization


# Data functions
def get_all_WasteContainers():
    # Fetch all WasteContainer entities
    context = os.environ.get("WASTECONTAINERS_CONTEXT")
    containers = client.get_all_entities_by_type("WasteContainer", context).json()
    return containers


def get_trucks():
    # Fetch all WasteContainer entities
    context = os.environ.get("VEHICLEMODEL_CONTEXT")
    trucks = client.get_all_entities_by_type("VehicleModel", context).json()
    return trucks
