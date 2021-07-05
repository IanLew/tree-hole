import { AxiosRequestConfig } from 'axios'
import $axios from './axios'

export const apiRegister = (args: any, config?: AxiosRequestConfig) => $axios.post('/cuser/register', args, config)
export const apiLogin = (args: any, config?: AxiosRequestConfig) => $axios.post('/cuser/login', args, config)
export const apiUpdatePwd = (args: any, config?: AxiosRequestConfig) => $axios.post('/cuser/pwd', args, config)
export const apiUpdateProfile = (args: any, config?: AxiosRequestConfig) => $axios.post('/token/cuser/update', args, config)
export const apiGetProfile = (account: string, config?: AxiosRequestConfig) => $axios.get(`/token/cuser/profile/${account}`, config)

export const apiLetterList = (args: any, config?: AxiosRequestConfig) => $axios.post('/letter/list', args, config)
export const apiLetterMylist = (args: any, config?: AxiosRequestConfig) => $axios.post('/token/letter/mylist', args, config)
export const apiCreateLetter = (args: any, config?: AxiosRequestConfig) => $axios.post('/token/letter/create', args, config)
