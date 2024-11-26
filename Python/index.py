import json
import logging

logger = logging.getLogger()
logger.setLevel(logging.INFO)

Api_Key = "test_api"

def lambda_handler(event, context):
    # TODO implement
    headers = event.get("headers")
    api_key = headers.get("apo-key")

    if Api_Key !=api_key :
       return {
        'statusCode': 401,
        'body': json.dumps('Unthoarotizated')
    } 

    http = event.get("requestContext").get("http")
    method = http.get("method")
    path = http.get("path")

    if method not in ["GET","POST"]:
        return {  'statusCode': 405,  'body': json.dumps('Unthoarotizated')}

    if method == "GET":
        response_body= manage_get_request(path)
        return {  'statusCode': 200,  'body': json.dumps(response_body)}
    if method == "POST":
        request_body = json.loads(event.get("body"))
        res= manage_post_request(path,request_body)
        return {  'statusCode': 200,  'body': json.dumps(res)}
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }

clients = [{"client1" : 1},{"client2" : 2},{"client3" : 3},{"client4" : 4},{"client5" : 5}]

def get_client():
    return clients

def get_users():
     return [{"user1" : 1},{"user2" : 2},{"user3" : 3},{"user4" : 4},{"user5" : 5}]

def  manage_get_request(path):
    if path == "/clients":
        return get_client()
    if path == "/users":
        return get_users()
    else:
        return None

def  manage_post_request(path,body): 
    if path == "/clients":
        return post_client(body)
        
    if path == "/users":
        return get_users()
    else:
        return None  
    

def post_client(body):
    user = body.get("user")
    number = body.get("number")
    logger.info(f"crear usuario {user}, {number}")
    clients.append({ user: number })
    logger.info(clients)
    return clients