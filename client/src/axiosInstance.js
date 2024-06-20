import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

let accessToken = '';

function setAccessToken(newToken) {
  accessToken = newToken;
}

axiosInstance.interceptors.request.use((config) => {
  config.withCredentials = true;
  if (!config.headers.Authorization) {
    config.headers.Authorization = `Whales ${accessToken}`;
  }
  return config;
});

export { setAccessToken };

export default axiosInstance;
