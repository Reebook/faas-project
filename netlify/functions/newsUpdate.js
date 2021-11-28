"use strict"

const clientPromise = require('./mongoDB');
const headers = require('./headersCORS');
const MongoDB = require('mongodb');

exports.handler = async (event, context) => {

  try {
    const client = await clientPromise;
    const id = event.path.split("/").reverse()[0];
    const data = JSON.parse(event.body);
    var ObjectID = MongoDB.ObjectId;
    await client.db("tvnews").collection("news").updateOne({_id:new ObjectID(id)},{$set:data});

    return { statusCode: 200, headers, body: 'OK'};
  } catch (error) {
    console.log(error);
    return { statusCode: 422, headers, body: JSON.stringify(error) };
  }
};
