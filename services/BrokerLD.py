import os
import requests
import json


class BrokerLD:
    def __init__(self) -> None:
        pass

    def get_all_entities_by_type(
        self, type, service, subservice, token, limit=20, offset=0
    ):
        protocol = os.environ.get("PROTOCOL")
        endpoint_cb = os.environ.get("ENDPOINT_CB")

        url = "http://localhost:3000/ngsi-ld/v1/entities?type={TYPE}&scopeQ={SUBSERVICE}".format(
            TYPE=type,
            SUBSERVICE=subservice,
        )

        payload = {}
        headers = {
            "NGSILD-Tenant": service,  # equals to "Fiware-Service": service,
            "X-Auth-Token": token,
            "Link": '<https://raw.githubusercontent.com/smart-data-models/dataModel.WasteManagement/master/context.jsonld>; rel="http://www.w3.org/ns/json-ld#context"; type="application/ld+json"',
            "Accept": "application/ld+json",
        }

        response = requests.request(
            "GET", url, headers=headers, data=payload, verify=False
        )
        return response
