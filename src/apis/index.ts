import { AxiosRequestConfig } from 'axios'
import $axios from './axios'

export const apiUploadImage = (args: any, config?: AxiosRequestConfig) => $axios.post('/token/upload/image', args, config)  // 上传图片

export const apiLogin = (args: any, config?: AxiosRequestConfig) => $axios.post('/buser/login', args, config)  // 登录

export const apiGetBresource = (config?: AxiosRequestConfig) => $axios.get('/token/bresource', config)  // 获取资源数据
export const apiGetBusers = (args: any, config?: AxiosRequestConfig) => $axios.post('/token/busers', args, config)  // 获取用户列表
