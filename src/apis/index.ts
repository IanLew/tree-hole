import { AxiosRequestConfig } from 'axios'
import $axios from './axios'

export const apiUploadImage = (args: any, config?: AxiosRequestConfig) => $axios.post('/token/upload/image', args, config)  // 上传图片

export const apiLogin = (args: any, config?: AxiosRequestConfig) => $axios.post('/buser/login', args, config)  // 登录

export const apiGetBresource = (config?: AxiosRequestConfig) => $axios.get('/token/bresource', config)  // 获取资源数据
export const apiCreateBresource = (args: any, config?: AxiosRequestConfig) => $axios.post('/token/bresource/create', args, config)  // 新增资源数据
export const apiUpdateBresource = (args: any, config?: AxiosRequestConfig) => $axios.post('/token/bresource/update', args, config)  // 修改资源数据
export const apiGetBusers = (args: any, config?: AxiosRequestConfig) => $axios.post('/token/busers', args, config)  // 获取后台用户列表

export const apiGetCusers = (args: any, config?: AxiosRequestConfig) => $axios.post('/token/cusers', args, config)  // 获取官网用户列表
export const apiGetLetterDetail = (id: any, config?: AxiosRequestConfig) => $axios.get(`/letter/detail/${id}`, config)  // 获取信笺详情
export const apiGetLetterList = (args: any, config?: AxiosRequestConfig) => $axios.post('/letter/list', args, config)  // 获取信笺列表
export const apiCreateLetters = (args: any, config?: AxiosRequestConfig) => $axios.post('/token/letter/create', args, config)  // 创建回复
export const apiGetLetterlogs = (args: any, config?: AxiosRequestConfig) => $axios.post('/token/letterlogs', args, config)  // 获取信笺数据列表
