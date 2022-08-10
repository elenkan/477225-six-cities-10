import axios, {AxiosInstance} from 'axios';

const URL = 'https://10.react.pages.academy/six-cities';
const REQUEST_TIMEOUT = 5000;

export const createApi = (): AxiosInstance =>
  axios.create({
    baseURL: URL,
    timeout: REQUEST_TIMEOUT
  });
