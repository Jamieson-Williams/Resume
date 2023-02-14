import logging
from azure.cosmos import CosmosClient
import os
import json
import azure.functions as func

def main(req: func.HttpRequest, inputdoc:func.DocumentList, outputdoc:func.Out[func.Document]) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    endpoint = os.environ['COSMOS_ENDPOINT']
    key = os.environ['COSMOS_DB_KEY']

    client = CosmosClient(endpoint, credential=key)
    database_name = "serverless-db"
    database = client.get_database_client(database_name)
    container_name = "visitors"
    container = database.get_container_client(container_name)

    if container is None:
        return func.HttpResponse(
            "The specified container could not be found.",
            status_code=404
        )
    else:
        item = container.read_item("counter",partition_key="counter")
        item['value'] = item['value'] + 1
        response = container.upsert_item(body=item)
        return func.HttpResponse(
            body = json.dumps(item['value']),
            status_code=200,
        )
