'use strict';
const axios = require('axios')

// レスポンスのクラスを生成
class Response {
  constructor() {
    this.statusCode = 200;
    this.headers = {};
    this.multiValueHeaders = {};
    this.body = '';
  }
}
module.exports.hello = async (event) => {
  // レスポンスのインスタンスを生成
  const response = new Response();
  const params = event.queryStringParameters;
  const userName = params.user_name

  const res = await axios.get(`https://connpass.com/api/v1/event/?nickname=${userName}`)
  .catch((e) => {
    response.statusCode = e.response.status
    response.body = e.response.data
  })

  response.body = JSON.stringify(res.data)

  return response;

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
