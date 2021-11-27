"use strict"

const clientPromise = require('./mongoDB');
const headers = require('./headersCORS');

exports.handler = async (event, context) => {

  try {
    const client = await clientPromise;
    const id = event.path.split("/").reverse()[0];
    
    var ObjectID = clientPromise.ObjectId;
    await client.db("tvnews").collection("news").deleteOne({_id: new ObjectID(id)});

    return { statusCode: 200, headers, body: 'OK'};
  } catch (error) {
    console.log(error);
    return { statusCode: 422, headers, body: JSON.stringify(error) };
  }
};
