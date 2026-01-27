export interface User {
  _id: string;
  name: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

export interface LoginResponse {
  user: AuthUser;
  accessToken: string;
}

export interface RegisterResponse {
  user: AuthUser;
}

export interface MessageResponse {
  message: string;
}
