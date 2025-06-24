import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "./auth.types";
import { fixedApkQrThunk, loginThunk, restoreToken } from "./auth.thunks";

const initialState: AuthState = {
  token: null,
  loading: false,
  error: null,
  qrBase64: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload; // ได้ token จาก loginThunk
      })
      .addCase(
        loginThunk.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Login failed";
        }
      )
      .addCase(restoreToken.fulfilled, (state, action) => {
        state.token = action.payload;
      })
      .addCase(fixedApkQrThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.qrBase64 = null;
      })
      .addCase(fixedApkQrThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.qrBase64 = action.payload.qrBase64;
      })
      .addCase(
        fixedApkQrThunk.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "QR generation failed";
        }
      );
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
