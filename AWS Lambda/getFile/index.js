'use strict'
const AWS = require('aws-sdk');

AWS.config.update({region:"us-east-2"})

exports.handler = async function (event, context, callback) {
    const ddb= new AWS.DynamoDB({apiVersion:"2012-10-08"});
    const documentClient = new AWS.DynamoDB.DocumentClient({region:"us-east-2"});
    
    let resonseBody="";
    let statusCode=0;
    
const params = {
  TableName: 'FileTable',
  Key: {
    id:"12345"
  }
};

try{
  const data = await documentClient.get(params).promise();
  resonseBody=JSON.stringify(data.Item);
  statusCode=200;
}
catch(err){
  resonseBody="Failed";
  statusCode=403;
}

const response= {
  statusCode: statusCode,
  header:{
    'myheader':"test"
  },
  body:resonseBody
}
return response;
}