import api from "../../services/api";
import type {
  LoginResponse,
  RegisterResponse,
  MessageResponse,
} from "./auth.types";

export const loginApi = async (data: {
  email: string;
  password: string;
}) =>
  await api.post<LoginResponse>("/auth/login", data);

export const registerApi = async (data: {
  name: string;
  email: string;
  password: string;
}) =>
 await api.post<RegisterResponse>("/auth/register", data);

export const logoutApi = async () =>
  await api.post<MessageResponse>("/auth/logout");

export const forgotPasswordApi = async (email: string) =>
  await api.post<MessageResponse>("/auth/forgot-password", { email });

export const resetPasswordApi = async (token: string, password: string) =>
  await api.post<MessageResponse>(`/auth/reset-password/${token}`, {
    password,
  });
