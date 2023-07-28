import boto3, json, os

client = boto3.resource('dynamodb')

IS_OFFLINE = os.getenv('IS_OFFLINE', False)

if IS_OFFLINE:
    boto3.Session(
        aws_access_key_id = 'AKIAXGH43JHE3W4X7ZOO',
        aws_secret_access_key = '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'
    )
    client = boto3.resource('dynamodb',endpoint_url = 'http://localhost:8000')

table = client.Table('usersTable')

def deleteUsers(event,context):
    user_id = event['pathParameters']['id']
    result = table.delete_item(Key = {'pk':user_id})

    body = json.dumps({'message' : f"user {user_id} deleted"})

    response = {
        'statusCode': result['ResponseMetadata']['HTTPStatusCode'],
        "body": body
    }

    return response