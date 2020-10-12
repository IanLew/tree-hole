import axios from 'axios';
import { Toast, Dialog } from 'vant';
import { debounce } from 'lodash/function';
import store from '@/store';
import router from '@/router';

let source = axios.CancelToken.source();
let count = 0;

function loadToast(code, callback) {
  if (code) {
    if (code === 1) {
      source.cancel();
      source = axios.CancelToken.source();
    }

    if (--count === 0) {
      debounce(() => {
        if (count === 0) {
          Toast.clear();
          if (typeof callback === 'function') {
            callback();
          } else if (typeof callback === 'string') {
            Toast(callback);
          }
        }
      }, 1000)();
    }
  } else {
    if (++count === 1) {
      Toast.loading({
        duration: 0,
        forbidClick: true,
        loadingType: 'spinner',
        message: '加载中...'
      });
    }
  }
}

const $axios = axios.create({
  baseURL: process.env.VUE_APP_HOST,
  timeout: 10000
});

$axios.interceptors.request.use(config => {
  loadToast();
  
  config.cancelToken = source.token;

  if (store.getters.token) {
    config.headers.Authorization = `Bearer ${store.getters.token}`;
  }

  return config;
}, error => {
  loadToast(1, () => {
    router.push({
      name: 'Error',
      code: error.code || 500,
      message: '请求服务器超时'
    });
  });
});

$axios.interceptors.response.use(response => {
  const data = response.data;
  
  if(data.code === 200) {
    loadToast(2);

    return Promise.resolve(data.data);
  } else {
    if (data.code === 401) {
      loadToast(1, () => {
        Dialog.confirm({
          message: '未登录或登录失效，请重新登录',
          cancelButtonText: '暂不登录',
          confirmButtonText: '立即登录'
        }).then(() => {
          router.push({
            name: 'Login'
          });
        }).catch(() => {});
      });
    } else {
      loadToast(2, data.message);
    }

    return Promise.reject(data.message);
  }
}, error => {
  loadToast(1, () => {
    router.push({
      name: 'Error',
      code: error.code || 500,
      message: '服务器响应超时'
    });
  });
});

export function request(url, method, data, config={}) {
  if (/put|post|patch/ig.test(method)) {
    config = Object.assign(config, {
      url,
      method,
      data
    });
  } else {
    config = Object.assign(config, {
      url,
      method,
      params: data
    });
  }

  return $axios.request(config);
}

export default $axios;