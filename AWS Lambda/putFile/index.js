const AWS = require('aws-sdk');

const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
  const params = {
    TableName: 'FileTable',
    Item: {
      id: 123,
      input_text: "abcd",
      input_file:"efgh"
    }
  };

  try {
    await dynamoDB.put(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify('Record inserted successfully.')
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify('Error inserting record.')
    };
  }
};
