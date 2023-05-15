import axios, { AxiosRequestConfig } from 'axios';

const baseURL = process.env.REACT_APP_API_URL;
const token = process.env.REACT_APP_TOKEN;

const baseInstance = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

baseInstance.interceptors.response.use(({ data }) => data);

const apiRequest = {
  get: <T>(url: string, request?: AxiosRequestConfig) => baseInstance.get<T>(url, request),
  delete: <T>(url: string, request?: AxiosRequestConfig) => baseInstance.delete<T>(url, request),
  post: <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
    baseInstance.post<T>(url, data, config),
};

export default apiRequest;
