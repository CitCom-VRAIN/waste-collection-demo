# Waste Collection Demo
Waste collection optimization using Openroute service.

## 📦 Project setup
Below are the basic instructions to deploy the minimum viable service. For a detailed deployment guide, check out our [documentation](https://citcom-vrain.github.io/services/waste_collection/). 

Tested with Python `3.10.12` and Ubuntu 22.04. 

1. Clone the repo 
```bash
git clone https://github.com/CitCom-VRAIN/waste-collection-demo.git && cd waste-collection-demo
```

2. Install submodules
```bash
git submodule init && git submodule update
```

3. Create and activate a Python virtual environment
```bash
 python3 -m venv ./venv && source ./venv/bin/activate
```

4. Install requirements
```bash
pip install -r requirements.txt
```

5. Create an `.env` file using `.env.example` as a guide. Fill it with your own settings.

6. Setup Orion-LD
```bash
docker compose up
```

7. Upsert fake data
```bash
python3 upsert_fake_data.py
```
   
8. Start the server and open [http://127.0.0.1:5000](http://127.0.0.1:5000) in your browser 
```bash
flask --app server run
```
