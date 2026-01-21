import axios, { AxiosError } from "axios";
import { store } from "../app/store";
import { logout, setAccessToken } from "../features/auth/auth.slice";
import { message } from "antd";

interface BackendError {
  message: string;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});
const refreshApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError<BackendError>) => {
    const msg = error.response?.data?.message || "An unexpected error occurred";
    if (error.response?.status !== 401) {
      message.error(msg);
    }
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    const msg = error.response?.data?.message || "An unexpected error occured"
    message.error(msg)

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await refreshApi.post("/auth/refresh");
        const { accessToken } = res.data;
        store.dispatch(setAccessToken(accessToken));
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        store.dispatch(logout());
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
