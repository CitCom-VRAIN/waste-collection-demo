from dotenv import load_dotenv
from services.Auth import Auth
from services.Broker import Broker
from services.BrokerLD import BrokerLD
import os


# Load env variables
load_dotenv()

# Define service & subservice
service = "tef_vlci"
subservice = "/residuos_contenedores_vlc"

# Authenticate
auth = Auth()
token = auth.get_auth_token_subservice(service, subservice)

# --------------
# --- NGSIv2 ---
# --------------

# Get total count of WasteContainer entities
broker = Broker()
entities_total_count = int(
    broker.get_all_entities_by_type(
        "WasteContainer", service, subservice, token
    ).headers["fiware-total-count"]
)

# Get all entites
limit = 400  # Entites per page (TODO: Implement pagination with entities_total_count & limit)
all_containers = broker.get_all_entities_by_type(
    "WasteContainer", service, subservice, token, limit
).text

# Store
file_name="./data/WasteContainers.json"
os.makedirs(os.path.dirname(file_name), exist_ok=True)
with open(file_name, "w") as outfile:
    outfile.write(all_containers)


# ---------------
# --- NGSI-LD ---
# ---------------

# brokerld = BrokerLD()
# response = brokerld.get_all_entities_by_type(
#     "WasteContainer", service, subservice, token
# )
# print(response.text)
