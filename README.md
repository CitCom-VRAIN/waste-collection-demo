# Waste management route optimization
A for waste management optimization using the Openroute service.

## 📦 Project setup
Tested with Python `3.10.12` and Ubuntu 22.04.  

1. Create and activate a Python virtual environment
```bash
 python3 -m venv ./venv && source ./venv/bin/activate
```

2. Install requirements
```bash
pip install -r requirements.txt
```

3. Create an `.env` file using `.env.example` as a guide. Fill it with your own settings.

4. Start server and open [http://127.0.0.1:5000](http://127.0.0.1:5000) in your browser 
```bash
flask --app server run
```