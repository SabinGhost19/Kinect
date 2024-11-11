import axios from 'axios';
import {
  getAccesTokenFromLocalStorage,
  setAccesTokenInLocalStorare,
  getRefreshTokenFromLocalStorage,
} from './localStorageUtils';

export const customAxios = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: {
    'Content-type': 'application/json',
  },
  withCredentials: true,
});

customAxios.interceptors.request.use(
  async (config) => {
    //getting from local storage
    const accessToken = getAccesTokenFromLocalStorage();
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

customAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      const newAccesToken = await refreshTokenRequest();
      setAccesTokenInLocalStorare(newAccesToken);

      customAxios.defaults.headers.common['Authorization'] = `Bearer ${newAccesToken}`;
      return customAxios(originalRequest);
    }
  }
);

async function refreshTokenRequest() {
  const refreshToken = getRefreshTokenFromLocalStorage();
  try {
    const response = await customAxios.post('/auth/refresh', { token: refreshToken });
    const { accessToken } = response.data;
    return accessToken;
  } catch (error) {
    console.log(error);
    throw new Error('Refresh token expired');
  }
}
