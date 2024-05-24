import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
  isAxiosError,
} from 'axios';
import Cookies from 'js-cookie';

import { COOKIE_KEY } from '@/constants/cookie';

class HttpClient {
  private client: AxiosInstance;

  constructor(config?: AxiosRequestConfig) {
    this.client = axios.create(config);

    this.setInterceptor();
  }

  get<T>(...args: Parameters<typeof this.client.get>) {
    return this.client.get<T, T>(...args);
  }

  post<T>(...args: Parameters<typeof this.client.post>) {
    return this.client.post<T, T>(...args);
  }

  put<T>(...args: Parameters<typeof this.client.put>) {
    return this.client.put<T, T>(...args);
  }

  patch<T>(...args: Parameters<typeof this.client.patch>) {
    return this.client.patch<T, T>(...args);
  }

  delete<T>(...args: Parameters<typeof this.client.delete>) {
    return this.client.delete<T, T>(...args);
  }

  private setInterceptor() {
    this.client.interceptors.request.use(this.onRequestFulfilled, this.onRequestRejected);
    this.client.interceptors.response.use(this.onResponseFulfilled, this.onResponseRejected);
  }

  private onRequestFulfilled(config: InternalAxiosRequestConfig) {
    const token = Cookies.get(COOKIE_KEY.ACCESS_TOKEN);

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  }

  private onRequestRejected(error: AxiosError) {
    return Promise.reject(error);
  }

  private onResponseFulfilled(response: AxiosResponse) {
    return response.data;
  }

  private onResponseRejected(error: AxiosError) {
    if (!isAxiosError(error)) return Promise.reject(error);
    // TODO : 강제 로그아웃 처리 필요

    return Promise.reject(error.response?.data);
  }
}

export default HttpClient;
