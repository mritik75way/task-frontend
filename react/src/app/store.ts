import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/auth.slice";
import uploadReducer from "../features/uploads/uploadsSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    upload: uploadReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
