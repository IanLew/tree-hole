import { AxiosRequestConfig } from 'axios'
import $axios from './axios'

export const apiUploadImage = (args: any, config?: AxiosRequestConfig) => $axios.post('/token/upload/image', args, config)  // 上传图片

export const apiLogin = (args: any, config?: AxiosRequestConfig) => $axios.post('/buser/login', args, config)  // 登录
// export const apiUpdateProfile = (args: any, config?: AxiosRequestConfig) => $axios.post('/token/cuser/update', args, config)  // 修改个人信息
// export const apiGetProfile = (account: string, config?: AxiosRequestConfig) => $axios.get(`/token/cuser/profile/${account}`, config)  // 获取个人信息
