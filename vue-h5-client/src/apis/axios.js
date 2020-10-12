import axios from 'axios';
import { Toast } from 'vant';
import { debounce } from 'lodash/function';
import store from '@/store';
import router from '@/router';

const loading = {
  source: axios.CancelToken.source(),
  count: 0,
  startTime: null,
  open (silent) {
    if (!silent) {
      this.count += 1;
      this.startTime = new Date();

      if (this.count === 1) {
        Toast.loading({
          duration: 0,
          forbidClick: true,
          loadingType: 'spinner',
          message: '加载中...'
        });
      }
    }
  },
  close (callback, cancel) {
    if (cancel) {
      this.count = 0;
      this.source.cancel();
      this.source = axios.CancelToken.source();
    } else {
      if (this.count > 0) {
        this.count -= 1;
      }
    }

    let dt = (new Date()) - this.startTime;
    dt = dt >= 800 ? 0 : 800 - dt;

    debounce(() => {
      if (this.count === 0) {
        Toast.clear();
        callback && callback();
      }
    }, dt)();
  }
};

const $axios = axios.create({
  baseURL: process.env.VUE_APP_HOST,
  timeout: 10000
});

$axios.interceptors.request.use(config => {
  config.cancelToken = loading.source.token;

  if (store.getters.user) {
    config.headers.Authorization = `Bearer ${store.getters.user.token}`;
  }

  return config;
}, error => {
  return Promise.reject(error);
});

$axios.interceptors.response.use(response => {
  return Promise.resolve(response.data);
}, error => {
  return Promise.reject(error)
});

export function request(url, method, data, config={}) {
  return new Promise((resolve, reject) => {
    loading.open(config.silent);
  
    if (/put|post|patch/ig.test(method)) {
      config = Object.assign(config, { url, method, data });
    } else {
      config = Object.assign(config, { url, method, params: data });
    }
    
    $axios.request(config).then(res => {
      loading.close(() => {
        if (res.code === 200) {
          resolve(res.data);
        } else {
          if (res.code !== 401) {
            Toast({
              icon: 'warning-o',
              forbidClick: true,
              message: res.message,
              duration: 2000
            });
          }
          reject();
        }
      });
    }).catch(error => {
      loading.close(() => {
        router.push({
          name: 'Error',
          query: {
            code: error.code,
            message: '请求数据超时'
          }
        });
      }, true);
    });
  });
}

export default $axios;