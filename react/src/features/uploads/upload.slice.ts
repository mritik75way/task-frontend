import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UploadItem, UploadState } from "./upload.types";

const initialState: UploadState = {
  items: [],
  visible: false,
};

const uploadsSlice = createSlice({
  name: "uploads",
  initialState,
  reducers: {
    addUpload(state, action: PayloadAction<UploadItem>) {
      state.items.push(action.payload);
      state.visible = true;
    },
    updateProgress(state, action: PayloadAction<{ id: string; progress: number }>) {
      const item = state.items.find(i => i.id === action.payload.id);
      if (item) item.progress = action.payload.progress;
    },
    markCompleted(state, action: PayloadAction<string>) {
      const item = state.items.find(i => i.id === action.payload);
      if (item) {
        item.progress = 100;
        item.status = "completed";
      }
    },
    markError(state, action: PayloadAction<string>) {
      const item = state.items.find(i => i.id === action.payload);
      if (item) item.status = "error";
    },
    hidePopper(state) {
      state.visible = false;
    },
    clearCompleted(state) {
      state.items = state.items.filter(i => i.status !== "completed");
    },
  },
});

export const {
  addUpload,
  updateProgress,
  markCompleted,
  markError,
  hidePopper,
  clearCompleted,
} = uploadsSlice.actions;


export default uploadsSlice.reducer;
