import Axios from 'axios'

export const api = Axios.create({
  baseURL: 'http://ec2-18-192-22-193.eu-central-1.compute.amazonaws.com:8081',
})

api.generateKeyPair = (secret) => {

}

api.getWithSignature = (url, config) => {
  api.get(url, config)
}

api.postWithSignature = (url, data, config) => {
  api.post(url, data, config)
}

api.patchWithSignature = (url, data, config) => {
  api.patch(url, data, config)
}
