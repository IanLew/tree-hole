import axios from 'axios';
import { Toast } from 'vant';
import { debounce } from 'lodash/function'
import store from '@/store';

let source = axios.CancelToken.source();

const $axios = axios.create({
  baseURL: process.env.VUE_APP_HOST,
  timeout: 10000
});

$axios.interceptors.request.use(config => {
  config.cancelToken = source.token;

  if (store.getters.token) {
    config.headers.Authorization = store.getters.token;
  }

  return config;
}, error => Promise.reject(error));

$axios.interceptors.response.use(response => {
  return Promise.resolve(response.data);
}, error => Promise.reject(error));

function request(method, url, data={}, config={}) {
  Toast.loading({
    duration: 0,
    forbidClick: true,
    loadingType: 'spinner',
    message: '加载中...'
  });
  
  let doAction;

  if(/get/i.test(method)) {
    config.params = data;
    doAction = $axios.get(url, config);
  } else if (/post/i.test(method)) {
    doAction = $axios.post(url, data, config);
  }

  return doAction.then(res => {
    if(res.code === 200) {
      debounce(() => {
        Toast.clear();
      }, 200)();
      
      return Promise.resolve(res.data);
    } else {
      debounce(() => {
        Toast({
          message: res.message,
          forbidClick: true
        });
      }, 200)();

      return Promise.reject(res.message);
    }
  }).catch(error => {
    console.log(error)
    debounce(() => {
      Toast.clear();
      Toast({
        message: error.message || '请求超时',
        forbidClick: true
      });
    }, 200)();

    source.cancel();
    source = axios.CancelToken.source();

    return Promise.reject(error.message);
  });
}

export function get(url, params, config) {
  return request('get', url, params, config);
}

export function post(url, data, config) {
  return request('post', url, data, config);
}

export default $axios;