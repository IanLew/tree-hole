import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import qs from 'qs'
import { Notify, Dialog } from 'vant'
import store from '../store'
import router from '../router'

const $axios = axios.create({
  baseURL: '/api',
	timeout: 10000
})

const cancelToken = new Map()

function setCancelToken(config: AxiosRequestConfig) {
	const url = [ config.method, config.url, qs.stringify(config.params), qs.stringify(config.data) ].join('&')
  config.cancelToken = config.cancelToken || new axios.CancelToken(cancel => {
		if (!cancelToken.has(url)) {
			cancelToken.set(url, cancel)
		}
	})
}

function deleteCancelToken(config: AxiosRequestConfig) {
	const url = [ config.method, config.url, qs.stringify(config.params), qs.stringify(config.data) ].join('&')
  if (cancelToken.has(url)) {
    cancelToken.get(url).cancel()
		cancelToken.delete(url)
  }
}

export function clearCancelToken() {
  for(const cancel of cancelToken.values()) {
		cancel()
	}
	cancelToken.clear()
}

function createError(status?: number) {
	switch (status) {
		case 0:
			return '网络异常，请检查网络'
		case 400:
			return '客服端请求错误'
		case 401:
			return '未授权，请先登录'
		case 403:
			return '服务器拒绝请求'
		case 404:
			return '请求资源错误'
		case 408:
			return '网络请求超时，请检查网络'
		case 500:
			return '服务器错误'
		case 501:
			return '服务未实现'
		case 502:
			return '网络请求未响应'
		case 503:
			return '服务不可用'
		case 504:
			return '服务器请求超时，请检查网络'
		case 505:
			return 'HTTP版本不受支持'
		default:
			return '网络繁忙，请稍后重试'
	}
}

function errorHandle(error: any) {
	if (error.status === 401 || error.code === 401) {
		Notify.clear()
		if (store.getters.token) {
			store.commit('user', null)
			Dialog.confirm({
				message: '登录失效，请重新登录',
				cancelButtonText: '暂不登录',
				confirmButtonText: '立即登录'
			}).then(() => {
				router.push({
					name: 'login'
				})
			}).catch(() => {})
		}
	} else {
		Notify({
			type: 'danger',
			message: error.message
		})
	}
}

function misdataHandle(response: AxiosResponse) {
	const err = {
		status: response.status,
		statusText: response.statusText,
		code: response.data && response.data.code,
		message: response.data ? response.data.message : createError(response.status),
		data: response.data && response.data.data
	}

	errorHandle(err)

	return err
}

function exceptionHandle(error: AxiosError) {
	let err: any = {}

	if (error.response) {
		err = misdataHandle(error.response)
	} else if (error.request) {
		err = misdataHandle(error.request)
	} else {
		err.message = error.message || createError()
	}

	if (!axios.isCancel(error)) {
		deleteCancelToken(error.config)
		errorHandle(err)
	}

	return Promise.reject(err)
}

$axios.interceptors.request.use(function (config: AxiosRequestConfig) {
	deleteCancelToken(config)
	setCancelToken(config)

	if (store.getters.token) {
		config.headers.common['Authorization'] = `Bearer ${store.getters.token}`
	}

	return config
}, exceptionHandle)

$axios.interceptors.response.use(function (response: AxiosResponse) {
	deleteCancelToken(response.config)

	if (response.data && response.data.code === 200) {
		return Promise.resolve(response.data.data)
	} else if (/ms-excel/.test(response.headers['content-type'])) {
		return Promise.resolve(response.data)
	} else {
		return Promise.reject(misdataHandle(response))
	}
}, exceptionHandle)

export default $axios
