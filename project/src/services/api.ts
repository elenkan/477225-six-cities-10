import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import {getToken} from './token';
import {StatusCodes} from 'http-status-codes';
import {toast} from 'react-toastify';
import {store} from '../store';
import {setIsRedirect} from '../actions/actions';

const URL = 'https://10.react.pages.academy/six-cities';
const REQUEST_TIMEOUT = 5000;

const StatusCodesData: Record<number, boolean> = {
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.BAD_REQUEST]: true
};

const displayError = (response: AxiosResponse) => !!StatusCodesData[response.status];

export const createApi = (): AxiosInstance => {
  const api = axios.create({
    baseURL: URL,
    timeout: REQUEST_TIMEOUT
  });

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = getToken();
      if (token) {
        config.headers['x-token'] = token;
      }
      return config;
    }
  );

  api.interceptors.response.use(
    response => {
      if (response.status === StatusCodes.NO_CONTENT) {
        toast.info('Сеанс завершён');
      }
      return response;
    },
    (error: AxiosError) => {
      if (error.response && displayError(error.response)) {
        toast.warn(error.response.data.error);
      }
      if (error.response?.status === StatusCodes.NOT_FOUND) {
        store.dispatch(setIsRedirect(true));
      }
      throw error;
    }
  );

  return api;
};

