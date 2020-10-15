import { request } from './axios';

export const updateUserInfo = (data, config) => request('/token/updateUserInfo', 'post', data, config);
export const getUserInfo = (data, config) => request('/token/getUserInfo', 'get', data, config);
export const register = (data, config) => request('/register', 'post', data, config);
export const login = (data, config) => request('/login', 'post', data, config);
export const uploadFile = (data, config) => request('/common/uploadFile', 'post', data, config);
export const saveMessage = (data, config) => request('/token/saveMessage', 'post', data, config);
export const readMessage = (data, config) => request('/token/readMessage', 'post', data, config);
export const getInstantMessage = (data, config) => request('/token/getInstantMessage', 'post', data, config);
export const getMessageData = (data, config) => request('/token/getMessageData', 'get', data, config);
