import { AxiosRequestConfig } from 'axios'
import $axios from './axios'

export const apiUploadImage = (args: any, config?: AxiosRequestConfig) => $axios.post('/token/upload/image', args, config)  // 上传图片

export const apiRegister = (args: any, config?: AxiosRequestConfig) => $axios.post('/cuser/register', args, config)  // 注册
export const apiLogin = (args: any, config?: AxiosRequestConfig) => $axios.post('/cuser/login', args, config)  // 登录
export const apiUpdatePwd = (args: any, config?: AxiosRequestConfig) => $axios.post('/cuser/pwd', args, config)  // 修改密码
export const apiUpdateProfile = (args: any, config?: AxiosRequestConfig) => $axios.post('/token/cuser/update', args, config)  // 修改个人信息
export const apiGetProfile = (account: string, config?: AxiosRequestConfig) => $axios.get(`/token/cuser/profile/${account}`, config)  // 获取个人信息
