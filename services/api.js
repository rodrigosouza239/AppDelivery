import axios from 'axios';

import { AsyncStorage } from 'react-native';

export const baseURL = 'http://206.189.219.178';

const API_VERSION = 'v1';

async function getToken() {
  const token = await AsyncStorage.getItem('@@DELIVERIE@@:token');
  return token;
}

const api = axios.create({
  baseURL: `${baseURL}/${API_VERSION}/`,
});

api.interceptors.request.use(async cfg => {
  cfg.headers['Accept-Language'] = 'pt';
  const token = await getToken();
  if (token) {
    cfg.headers.Authorization = `Bearer ${token}`;
  }
  return cfg;
});

api.interceptors.response.use(
  response => response,
  error => {
    // parseError(error);
    if (
      error.config &&
      error.response &&
      error.response.status === 401
    ) {
      /* TODO: REFRESH TOKEN */
    }
    return Promise.reject(error);
  },
);

export default api;
