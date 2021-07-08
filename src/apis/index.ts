import { AxiosRequestConfig } from 'axios'
import $axios from './axios'

export const apiUploadImage = (args: any, config?: AxiosRequestConfig) => $axios.post('/token/upload/image', args, config)  // 上传图片

export const apiRegister = (args: any, config?: AxiosRequestConfig) => $axios.post('/cuser/register', args, config)  // 注册
export const apiLogin = (args: any, config?: AxiosRequestConfig) => $axios.post('/cuser/login', args, config)  // 登录
export const apiUpdatePwd = (args: any, config?: AxiosRequestConfig) => $axios.post('/cuser/pwd', args, config)  // 修改密码
export const apiUpdateProfile = (args: any, config?: AxiosRequestConfig) => $axios.post('/token/cuser/update', args, config)  // 修改个人信息
export const apiGetProfile = (account: string, config?: AxiosRequestConfig) => $axios.get(`/token/cuser/profile/${account}`, config)  // 获取个人信息

export const apiCreateLetterlog = (args: any, config?: AxiosRequestConfig) => $axios.post('/letterlog/create', args, config)  // 创建信笺行为记录
export const apiLetterlogList = (args: any, config?: AxiosRequestConfig) => $axios.post('/letterlog/list', args, config)  // 获取信笺行为列表

export const apiLetterList = (args: any, config?: AxiosRequestConfig) => $axios.post('/letter/list', args, config)  // 获取信笺/回复列表
export const apiLetterMylist = (args: any, config?: AxiosRequestConfig) => $axios.post('/token/letter/mylist', args, config)  // 获取个人信笺/回复列表
export const apiCreateLetter = (args: any, config?: AxiosRequestConfig) => $axios.post('/token/letter/create', args, config)  // 创建信笺/回复
export const apiLetterDetail = (id: number, config?: AxiosRequestConfig) => $axios.get(`/letter/detail/${id}`, config)  // 获取信笺详情
