import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_HOST
axios.defaults.timeout = 10000
axios.defaults['Content-type'] = 'application/json;charset=UTF-8'

axios.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.reject(error)
})

export function request(url, method = 'get', params = {}) {
  params = /(get)|(delete)|(head)/ig.test(method) ? { params } : params
  return axios[method](url, params)
}

export default axios