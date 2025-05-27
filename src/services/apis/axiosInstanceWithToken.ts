// 토큰 넣어서 요청보내는 api는 전부 이걸로 감싸서 보냄
// 401 403 에러 발생하면 로그인 화면으로 이동

import axios from "axios";

let axiosInstanceWithToken: ReturnType<typeof axios.create> | null = null;

export const CreateAxiosInstanceWithToken = () => {
  if (!axiosInstanceWithToken) {
    axiosInstanceWithToken = axios.create({
      baseURL: "https://soulmate.o-r.kr",
      withCredentials: true,
    });

    axiosInstanceWithToken.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    axiosInstanceWithToken.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          window.location.href = "/login";
        }
        return Promise.reject(error);
      },
    );
  }

  return axiosInstanceWithToken;
};
