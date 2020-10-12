import axios from 'axios';
import { Toast } from 'vant';
import { debounce } from 'lodash/function';
import store from '@/store';
import router from '@/router';

const loading = {
  source: axios.CancelToken.source(),
  count: 0,
  open (silent) {
    if (!silent) {
      this.count += 1;
      Toast.loading({
        duration: 0,
        forbidClick: true,
        loadingType: 'spinner',
        message: '加载中...'
      });
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
    debounce(() => {
      if (this.count === 0) {
        if (callback) {
          callback();
        } else {
          Toast.clear();
        }
      }
    }, 1000)();
  }
};

const $axios = axios.create({
  baseURL: process.env.VUE_APP_HOST,
  timeout: 10000
});

$axios.interceptors.request.use(config => {
  loading.open(config.silent);
  
  config.cancelToken = loading.source.token;

  if (store.getters.user) {
    config.headers.Authorization = `Bearer ${store.getters.user.token}`;
  }

  return config;
}, error => {
  loading.close(() => {
    router.push({
      name: 'Error',
      query: {
        code: error.code,
        message: '请求服务器超时'
      }
    });
  }, true);

  return Promise.reject(error);
});

$axios.interceptors.response.use(response => {
  const data = response.data;
  
  if(data.code === 200) {
    loading.close();
    return Promise.resolve(data.data);
  } else {
    loading.close(() => {
      Toast({
        icon: 'warning-o',
        forbidClick: true,
        message: data.code === 401 ? '' : data.message
      });
    });

    return Promise.reject(data);
  }
}, error => {
  loading.close(() => {
    router.push({
      name: 'Error',
      query: {
        code: error.code,
        message: '服务器响应超时'
      }
    });
  }, true);

  return Promise.reject(error);
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