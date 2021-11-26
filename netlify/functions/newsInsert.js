"use strict"

const clientPromise = require('./mongoDB');
const headers = require('./headersCORS');

exports.handler = async (event, context) => {

  if (event.httpMethod == "OPTIONS") {
    return { statusCode: 200, headers, body: "OK" };
  }
  if (event.httpMethod === "POST") {
    try {
      console.log(event.body);
      const client = await clientPromise;
      const data = JSON.parse(event.body);

      await client.db("tvnews").collection("news").insertOne(data);

      return { statusCode: 200, headers, body: 'OK'};
    } catch (error) {
      console.log(error);
      return { statusCode: 422, headers, body: JSON.stringify(error) };
    }
  }else{
    return { statusCode: 405, headers, body: JSON.stringify("'message': 'Method Not Allowed'")};
  }
};
