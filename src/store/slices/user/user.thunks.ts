import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  DashboardStats,
  EditProfileThunkPayload,
  UserProfile,
} from "./user.types";
import axios from "axios";
// import { getCookie } from "@/utils/cookie";
import api from "@/utils/axios";

export const fetchUserProfile = createAsyncThunk<
  UserProfile,
  void,
  { rejectValue: string }
>("user/fetchProfile", async (_, thunkAPI) => {
  try {
    // const token = getCookie("token");
    // if (!token) return thunkAPI.rejectWithValue("Token not found");

    const response = await api.get("/users/me");

    return response.data as UserProfile;
  } catch (error: unknown) {
    let message = "Failed to fetch user profile";
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
      message = error.message;
    } else {
      console.error("Unknown error occurred.");
    }

    return thunkAPI.rejectWithValue(message);
  }
});

export const fetchDashboardStats = createAsyncThunk(
  "user/fetchDashboardStats",
  async (_, thunkAPI) => {
    try {
      // const token = getCookie("token");
      // if (!token) return thunkAPI.rejectWithValue("Token not found");

      const response = await api.get("/dashboard/stats");

      return response.data as DashboardStats;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.message);
      } else {
        console.error("Unknown error occurred.");
      }
      return thunkAPI.rejectWithValue("Failed to load dashboard stats");
    }
  }
);

export const updateUserProfile = createAsyncThunk<
  UserProfile,
  EditProfileThunkPayload,
  { rejectValue: string }
>("user/updateUserProfile", async ({ values, userId, onSuccess }, thunkAPI) => {
  try {
    // const token = getCookie("token");
    // if (!token) return thunkAPI.rejectWithValue("Token not found");

    const response = await api.patch(`/users/${userId}`, values);

    onSuccess();

    return response.data as UserProfile;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const message: string =
        error.response?.data?.message || "Unexpected error occurred";
      return thunkAPI.rejectWithValue(message);
    }
    return thunkAPI.rejectWithValue("Unknown error");
  }
});
