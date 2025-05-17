
// axios 공통 처리
// 토큰 안넣는 것

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://soulmate.o-r.kr',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
