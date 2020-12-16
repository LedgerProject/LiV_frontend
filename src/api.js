import Axios from "axios";

export const api = Axios.create({
  baseURL: 'http://18.192.22.193:8082/users',
  headers: {
    "Content-Type": "application/vnd.api+json;",
    "Accept": "application/vnd.api+json;",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS, POST",
    "Access-Control-Allow-Credentials": "true",
    "Allow-Content-Type": ""
  }
})
