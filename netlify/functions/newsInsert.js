"use strict"

const headers = require('./headersCORS');

const rabbitPromise = require('./rabbitMQ');

exports.handler = async (event, context) => {

  try {
    const channel = await rabbitPromise();
    const request = `{"method":"INSERT","body":${event.body}}`;
    await channel.sendToQueue("newsStore", Buffer.from(request));

    return { statusCode: 200, headers, body: 'OK'};
  } catch (error) {
    console.log(error);
    return { statusCode: 422, headers, body: JSON.stringify(error) };
  }
};
