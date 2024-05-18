import type { AxiosError } from 'axios';

import HttpClient from './httpClient';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const api = new HttpClient({
  baseURL: API_URL,
});

export interface CustomError extends AxiosError {
  code: string;
  data?: string;
  message: string;
}
