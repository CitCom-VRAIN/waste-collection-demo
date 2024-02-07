# Waste Collection Demo
Waste collection optimization using Openroute service.

## 📦 Project setup
Below are the basic instructions to deploy the minimum viable service. For a detailed deployment guide, check out our [documentation](https://citcom-vrain.github.io/services/waste_collection/). 

Tested with Python `3.10.12` and Ubuntu 22.04. 

1. Clone the repository and navigate to its root folder:
```bash
git clone https://github.com/CitCom-VRAIN/waste-collection-demo.git && cd waste-collection-demo
```

2. Init git submodules with the following command. This will clone and install a dead simple [ngsi-ld client library](https://github.com/CitCom-VRAIN/ngsild-client) in `lib` folder.
```bash
git submodule init && git submodule update
```

3. Next, create and run the Orion-LD Docker image. It is necessary to have [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose) installed. This will set-up an Orion-LD broker with a MongoDB database. Check out the [`docker-compose.yaml`](https://github.com/CitCom-VRAIN/waste-collection-demo/blob/mvs-orionld/docker-compose.yaml) file for more details.
```bash
docker compose up
```

4. Create and activate a Python virtual environment:
```bash
python3 -m venv ./venv && source ./venv/bin/activate
```

5. Install all requirements:
```bash
pip install -r requirements.txt
```

6. Create an `.env` file using `.env.example` as a guide: 
```bash
cp .env.example .env
```

7. Then edit the `.env` file and replace the `OPENROUTESERVICE_API_KEY` value with your own Openroute service API key.
```bash
PROTOCOL="http"
ENDPOINT_CB="127.0.0.1:1026"
OPENROUTESERVICE_API_KEY="Replace this string with your Openroute API key"
WASTECONTAINERS_CONTEXT="https://raw.githubusercontent.com/smart-data-models/dataModel.WasteManagement/master/context.jsonld"
VEHICLEMODEL_CONTEXT="https://raw.githubusercontent.com/smart-data-models/dataModel.Transportation/master/context.jsonld"
```

8. After editing the file and saving it, read the .env file:
```bash
source .env
```  

9. Populate the context broker with some fake data by running the following command. This will create some `WasteContainer` and `VehicleModel` entities in the broker:
```bash
python3 upsert_fake_data.py
```

10. Finally, start the server and open [http://127.0.0.1:5000](http://127.0.0.1:5000) in your browser:
```bash
flask --app server run
```
