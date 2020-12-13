import Axios from "axios";

class Api {
  constructor() {
    this.API_URL = 'http://www.server.livproj.com/api'
  }

  get (url) {
    return Axios.get(this.API_URL.concat(url))
  }

  post (url, data, options = {}) {
    return Axios.post(this.API_URL.concat(url), data, options)
  }
}

export const api = new Api()
