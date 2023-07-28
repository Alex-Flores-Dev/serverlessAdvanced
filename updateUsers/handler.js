const aws = require('aws-sdk');

let dynamoDBClientParams = {}

if(process.env.IS_OFFLINE){
    dynamoDBClientParams = {        
        region: 'localhost',
        endpoint: 'http://localhost:8000',
        accessKeyId: 'accessKeyId',  // needed if you don't have aws credentials at all in env
        secretAccessKey: 'secretAccessKey'
   }   
}

const dynamodb = new aws.DynamoDB.DocumentClient(dynamoDBClientParams);

const updateUsers = async (event, context) => {
    
    let userId = event.pathParameters.id

    const body = JSON.parse(event.body)

    var params = {
        TableName: 'usersTable',
        Key: { pk:userId },
        UpdateExpression: 'set #name = :name, #phone = :phone, #address = :address',
        ExpressionAttributeNames: {'#name' : 'name', '#phone' : 'phone', '#address' : 'address'},
        ExpressionAttributeValues: 
            { ':name' : body.name,
              ':phone' : body.phone,
              ':address' : body.address
        },
        ReturnValues: 'ALL_NEW'
      };

    const res = await dynamodb.update(params).promise()
    console.log('res>>',res)
    return {
        "statusCode": 200,
        "body": JSON.stringify({ 'user': res.Attributes })
    }

}

module.exports = {
    updateUsers
}
