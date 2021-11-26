"use strict"

const clientPromise = require('./mongoDB');
const headers = require('./headersCORS');

exports.handler = async (event, context) => {

  try {
    const client = await clientPromise;
    const id = event.path.split("/").reverse()[0];
    console.log(id)
    await client.db("tvnews").collection("news").deleteOne({_id:id});

    return { statusCode: 200, headers, body: 'OK'};
  } catch (error) {
    console.log(error);
    return { statusCode: 422, headers, body: JSON.stringify(error) };
  }
};
