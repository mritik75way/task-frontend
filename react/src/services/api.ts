import axios, { AxiosError } from "axios";
import { store } from "../app/store";
import { logout, setAccessToken } from "../features/auth/auth.slice";
import { message } from "antd";

const api = axios.create({
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
  (error: AxiosError<{ message: string }>) => {
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

    if (!error.response) {
      message.error("Network error. Please check your connection.");
      return Promise.reject(error);
    }

    if (originalRequest.url?.includes("/auth/refresh")) {
      store.dispatch(logout());
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await api.post<{ accessToken: string }>("/auth/refresh");

        const accessToken = res.data.accessToken;

        store.dispatch(setAccessToken(accessToken));

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        store.dispatch(logout());
        return Promise.reject(refreshError);
      }
    }

    const msg =
      error.response?.data?.message ?? "An unexpected error occurred";
    message.error(msg);

    return Promise.reject(error);
  }
);

export default api;