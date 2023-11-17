import axios, { AxiosRequestConfig } from 'axios';
import { apiEndpoint } from './endpoint';

const requestApi = ({ method = 'GET', ...config }: AxiosRequestConfig) => {
  const token = JSON.parse(localStorage.getItem('auth.token') ?? '{}');
  return axios({
    method,
    baseURL: apiEndpoint,
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${token?.accessToken}`,
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
};

export default requestApi;
