import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, User } from "./auth.types";

const initialState: AuthState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
  loading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(
      state,
      action: PayloadAction<{ user: unknown; accessToken: string }>,
    ) {
      state.user = action.payload.user as User;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
      state.loading = false;
    },
    setAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    },
    logout(state) {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setAuth(
      state,
      action: PayloadAction<{ user: unknown; accessToken: string }>,
    ) {
      state.user = action.payload.user as User;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
      state.loading = false;
    },
  },
});

export const { loginSuccess, setAccessToken, logout, setLoading, setAuth } =
  authSlice.actions;
export default authSlice.reducer;
