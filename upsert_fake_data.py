import os
from dotenv import load_dotenv

load_dotenv()  # take environment variables from .env.

from lib.ngsildclient.Client import Client

fake_containers = [
    {
        "fillingLevel": {
            "observedAt": "2024-02-05T11:01:53.655Z",
            "type": "Property",
            "value": 0.48,
        },
        "id": "urn:ngsi-ld:WasteContainer:wastecontainer:620cdf0c89ed175e1cb6be5a",
        "location": {
            "observedAt": "2024-02-05T11:01:53.655Z",
            "type": "GeoProperty",
            "value": {"coordinates": [4.47356577103177, 51.02635663218616], "type": "Point"},
        },
        "type": "WasteContainer",
    },
    {
        "fillingLevel": {
            "observedAt": "2024-02-05T11:02:24.786Z",
            "type": "Property",
            "value": 0.82,
        },
        "id": "urn:ngsi-ld:WasteContainer:wastecontainer:62050e0389ed175e1cb6be46",
        "location": {
            "observedAt": "2024-02-05T11:02:24.786Z",
            "type": "GeoProperty",
            "value": {"coordinates": [4.482456198123897, 51.029270881136696], "type": "Point"},
        },
        "type": "WasteContainer",
    },
    {
        "fillingLevel": {
            "observedAt": "2024-02-05T12:01:51.946Z",
            "type": "Property",
            "value": 0,
        },
        "id": "urn:ngsi-ld:WasteContainer:wastecontainer:5ddbfc546c54998b7f89fab0",
        "location": {
            "observedAt": "2024-02-05T12:01:51.946Z",
            "type": "GeoProperty",
            "value": {"coordinates": [4.4759502000370786, 51.03607752313821], "type": "Point"},
        },
        "type": "WasteContainer",
    },
    {
        "fillingLevel": {
            "observedAt": "2024-01-14T09:18:12.958Z",
            "type": "Property",
            "value": 0.9,
        },
        "id": "urn:ngsi-ld:WasteContainer:wastecontainer:5ddbff486c54998b7f89fb28",
        "location": {
            "observedAt": "2024-01-14T09:18:12.958Z",
            "type": "GeoProperty",
            "value": {"coordinates": [4.480675497054998, 51.04737975736167], "type": "Point"},
        },
        "type": "WasteContainer",
    },
    {
        "fillingLevel": {
            "observedAt": "2024-02-05T13:45:34.237Z",
            "type": "Property",
            "value": 0.72,
        },
        "id": "urn:ngsi-ld:WasteContainer:aceiteContenedoresDipu2023NB861518040397357",
        "location": {
            "observedAt": "2024-02-05T13:45:34.237Z",
            "type": "GeoProperty",
            "value": {"coordinates": [4.452696273907791, 51.05759561937011], "type": "Point"},
        },
        "type": "WasteContainer",
    },
    {
        "fillingLevel": {
            "observedAt": "2024-02-05T12:01:09.553Z",
            "type": "Property",
            "value": 0.76,
        },
        "id": "urn:ngsi-ld:WasteContainer:wastecontainer:5ddbfc576c54998b7f89fab3",
        "location": {
            "observedAt": "2024-02-05T12:01:09.553Z",
            "type": "GeoProperty",
            "value": {"coordinates": [4.436509724025578, 51.03632203963316], "type": "Point"},
        },
        "type": "WasteContainer",
    },
    {
        "fillingLevel": {
            "observedAt": "2024-01-14T09:18:12.933Z",
            "type": "Property",
            "value": 0.7,
        },
        "id": "urn:ngsi-ld:WasteContainer:wastecontainer:5defabfc7332c1b710ebd522",
        "location": {
            "observedAt": "2024-01-14T09:18:12.933Z",
            "type": "GeoProperty",
            "value": {"coordinates": [4.392698668162233, 51.031820019249736], "type": "Point"},
        },
        "type": "WasteContainer",
    },
    {
        "fillingLevel": {
            "observedAt": "2024-01-14T09:18:08.673Z",
            "type": "Property",
            "value": 0.18,
        },
        "id": "urn:ngsi-ld:WasteContainer:wastecontainer:5ddbfead6c54998b7f89facc",
        "location": {
            "observedAt": "2024-01-14T09:18:08.673Z",
            "type": "GeoProperty",
            "value": {"coordinates": [4.37772789628272, 51.012467142902416], "type": "Point"},
        },
        "type": "WasteContainer",
    },
    {
        "fillingLevel": {
            "observedAt": "2024-02-05T11:02:27.904Z",
            "type": "Property",
            "value": 0.49,
        },
        "id": "urn:ngsi-ld:WasteContainer:wastecontainer:6213b9af720d9dfe994b715f",
        "location": {
            "observedAt": "2024-02-05T11:02:27.904Z",
            "type": "GeoProperty",
            "value": {"coordinates": [4.483362285903971, 50.99992744479022], "type": "Point"},
        },
        "type": "WasteContainer",
    },
    {
        "fillingLevel": {
            "observedAt": "2024-02-05T12:02:19.915Z",
            "type": "Property",
            "value": 0.2,
        },
        "id": "urn:ngsi-ld:WasteContainer:wastecontainer:5ddbff436c54998b7f89fb09",
        "location": {
            "observedAt": "2024-02-05T12:02:19.915Z",
            "type": "GeoProperty",
            "value": {"coordinates": [4.532508033975845, 50.99882120234127], "type": "Point"},
        },
        "type": "WasteContainer",
    },
]

fake_vehicles = vehicles = [
    {
        "id": "urn:ngsi-ld:VehicleModel:vehiclemodelA:econic",
        "location": {
            "observedAt": "2023-11-16T23:01:12.111Z",
            "type": "GeoProperty",
            "value": {
                "coordinates": [4.478871556957386, 51.00371825111759],
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
    },
]
# New Broker NGSI-LD connection
broker = Client()

# Upsert
print(broker.upsert_entities(fake_containers, os.environ.get("WASTECONTAINERS_CONTEXT")))
print(broker.upsert_entities(fake_vehicles, os.environ.get("VEHICLEMODEL_CONTEXT")))
