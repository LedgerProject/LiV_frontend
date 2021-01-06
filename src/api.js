import Axios from "axios";

export const api = Axios.create({
  baseURL: 'http://ec2-18-192-22-193.eu-central-1.compute.amazonaws.com:8081'
})
