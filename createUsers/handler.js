const aws = require('aws-sdk');
const { randomUUID } = require('crypto')

let dynamoDBClientParams = {}

if(process.env.IS_OFFLINE){
    dynamoDBClientParams = {        
        region: 'localhost',
        endpoint: 'http://localhost:8000',
        accessKeyId: 'AKIAXGH43JHE3W4X7ZOO',  // needed if you don't have aws credentials at all in env
        secretAccessKey: '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' 
   }   
}

const dynamodb = new aws.DynamoDB.DocumentClient(dynamoDBClientParams);

const createUsers = async (event, context) => {
    
    const id = randomUUID()

    let userBody = JSON.parse(event.body)
    
    userBody.pk = id

    var params = {
        TableName: 'usersTable',
        Item: userBody
    };

    console.log(params.Item)

    const res = await dynamodb.put(params).promise()

    return {
        "statusCode": 200,
        "body": JSON.stringify({ 'user': params.Item })
    }

}

module.exports = {
    createUsers
}
