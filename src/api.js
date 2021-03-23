import Axios from 'axios'

export const api = Axios.create({
  baseURL: 'https://platform.livpoc.com:8081'
})
