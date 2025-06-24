// auth.thunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "@/utils/axios";
import {
  FixedApkQrResponse,
  LoginThunkPayload,
  RegisterThunkPayload,
} from "./auth.types";

export const loginThunk = createAsyncThunk<
  string,
  LoginThunkPayload,
  { rejectValue: string }
>("auth/login", async ({ values, onSuccess }, thunkAPI) => {
  try {
    const response = await api.post("/auth/login", {
      email: values.username,
      password: values.password,
    });

    const token = response.data.access_token;

    document.cookie = `token=${token}; path=/; max-age=3600`;
    document.cookie = `loginTime=${Date.now()}; path=/; max-age=3600`;

    onSuccess();

    return token;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const message: string =
        error.response?.data?.message || "Unexpected error occurred";
      return thunkAPI.rejectWithValue(message);
    }

    return thunkAPI.rejectWithValue("Unknown error");
  }
});

export const registerThunk = createAsyncThunk<
  void, // ✅ ไม่มีค่าที่ return ไปเก็บใน state
  RegisterThunkPayload,
  {
    rejectValue: string;
  }
>("auth/register", async ({ values, onSuccess }, thunkAPI) => {
  try {
    await api.post("/auth/register", values);

    onSuccess();
    return;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const message: string =
        error.response?.data?.message || "Unexpected error occurred";
      return thunkAPI.rejectWithValue(message);
    }

    return thunkAPI.rejectWithValue("Unknown error");
  }
});

export const restoreToken = createAsyncThunk<
  string, // ✅ return type
  string // ✅ argument type (token)
>("auth/restore", async (token) => {
  return token;
});

export const fixedApkQrThunk = createAsyncThunk<
  FixedApkQrResponse, // ✅ return type
  void, // ✅ ไม่มี argument
  { rejectValue: string }
>("qr/fixedApk", async (_, thunkAPI) => {
  try {
    const response = await api.get<FixedApkQrResponse>("/qr/fixed-apk");
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message || "Failed to generate QR code.";
      return thunkAPI.rejectWithValue(message);
    }

    return thunkAPI.rejectWithValue("Unknown error");
  }
});
