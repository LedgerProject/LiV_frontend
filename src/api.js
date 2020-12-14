import Axios from "axios";

export const api = Axios.create({
  baseURL: 'http://18.192.22.193:8060/api'
})
