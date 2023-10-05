import os
import requests
import json


class Broker:
    def __init__(self) -> None:
        pass

    def get_all_entities_by_type(
        self, type, service, subservice, token, limit=20, offset=0
    ):
        protocol = os.environ.get("PROTOCOL")
        endpoint_cb = os.environ.get("ENDPOINT_CB")

        url = "{PROTOCOL}://{ENDPOINT_CB}/v2/entities?type={TYPE}&attrs=dateModified,dateCreated,*&limit={LIMIT}&offset={OFFSET}&options=count".format(
            PROTOCOL=protocol,
            ENDPOINT_CB=endpoint_cb,
            TYPE=type,
            LIMIT=limit,
            OFFSET=offset,
        )

        payload = {}
        headers = {
            "Fiware-Service": service,
            "Fiware-ServicePath": subservice,
            "X-Auth-Token": token,
        }

        response = requests.request(
            "GET", url, headers=headers, data=payload, verify=False
        )
        return response
