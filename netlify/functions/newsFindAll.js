"use strict"

const clientPromise = require('./mongoDB');
const headers = require('./headersCORS');

exports.handler = async (event, context) => {
  
  try {
    const client = await clientPromise;
    const authors = await client.db("tvnews").collection("news").find({}).toArray();

    return { statusCode: 200, headers, body: JSON.stringify(authors)};
   
  } catch (error) {
    console.log(error);
    return { statusCode: 400, headers, body: JSON.stringify(error) };
  }
};
