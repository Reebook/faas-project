"use strict"

const headers = require('./headersCORS');

const rabbitPromise = require('./rabbitMQ');

exports.handler = async (event, context) => {

  try {
    const id = event.path.split("/").reverse()[0];

    const channel = await rabbitPromise();
    const request = `{'method':'INSERT','id':${id},'body':${event.body}}`;
    await channel.sendToQueue("newsStore", Buffer.from(request));

    return { statusCode: 200, headers, body: 'OK'};
  } catch (error) {
    console.log(error);
    return { statusCode: 422, headers, body: JSON.stringify(error) };
  }
};
