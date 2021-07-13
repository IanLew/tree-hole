import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import qs from 'qs'
import { message, Modal } from 'ant-design-vue'
import store from '../store'
import router from '../router'

message.config({
	maxCount: 1
})

const $axios = axios.create({
  baseURL: '/api',
	timeout: 10000
})

// cancel token存储
const cancelToken = new Map()

/**
 * 存储cancel token
 * @param config axios请求配置
 */
function setCancelToken(config: AxiosRequestConfig) {
	const url = [ config.method, config.url, qs.stringify(config.params), qs.stringify(config.data) ].join('&')
  config.cancelToken = config.cancelToken || new axios.CancelToken(cancel => {
		if (!cancelToken.has(url)) {
			cancelToken.set(url, cancel)
		}
	})
}

/**
 * 移除cancel token
 * @param config axios请求配置
 */
function deleteCancelToken(config: AxiosRequestConfig) {
	const url = [ config.method, config.url, qs.stringify(config.params), qs.stringify(config.data) ].join('&')
  if (cancelToken.has(url)) {
    cancelToken.get(url)()
		cancelToken.delete(url)
  }
}

/**
 * 清除所有cancel token
 */
export function clearCancelToken() {
  for(const cancel of cancelToken.values()) {
		cancel()
	}
	cancelToken.clear()
}

/**
 * http请求状态错误信息
 * @param status http状态码
 * @returns 错误提示信息
 */
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

/**
 * 错误处理，401提示登录，其余提示错误信息
 * @param error 错误数据
 */
function errorHandle(error: any) {
	if (error.status === 401 || error.code === 401) {
		message.destroy()
		if (store.getters.token) {
			store.commit('user', null)
			Modal.confirm({
				content: '登录失效，请重新登录',
				cancelText: '暂不登录',
				okText: '立即登录',
				centered: true,
        onOk() {
          router.push({
            name: 'login',
						query: {
							back: 1
						}
          })
        },
        onCancel() {}
			})
		}
	} else {
    message.error(error.message)
	}
}

/**
 * 处理正常响应数据处理错误
 * @param response axios响应数据
 * @returns 错误信息
 */
function misdataHandle(response: AxiosResponse) {
	const err = {
		status: response.status,
		statusText: response.statusText,
		code: response.data && response.data.code,
		message: response.data ? response.data.message : createError(response.status),
		data: response.data && response.data.data
	}

	// 错误处理
	errorHandle(err)

	return err
}

/**
 * 响应异常错误处理
 * @param error axios异常错误数据
 * @returns 错误信息
 */
function exceptionHandle(error: AxiosError) {
	let err: any = {}

	if (error.response) {
		err = misdataHandle(error.response)
	} else if (error.request) {
		err = misdataHandle(error.request)
	} else {
		err.message = error.message || createError()
	}

	// 非cancel token产生的错误处理
	if (!axios.isCancel(error)) {
		deleteCancelToken(error.config)
		errorHandle(err)
	}

	return Promise.reject(err)
}

// 请求拦截
$axios.interceptors.request.use(function (config: AxiosRequestConfig) {
	// 取消重复请求，设置新请求
	deleteCancelToken(config)
	setCancelToken(config)

	// token
	if (store.getters.token) {
		config.headers.common['Authorization'] = `Bearer ${store.getters.token}`
	}

	return config
}, exceptionHandle)

// 响应拦截
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
