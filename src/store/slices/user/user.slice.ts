import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "./user.types";
import {
  fetchUserProfile,
  fetchDashboardStats,
  updateUserProfile,
} from "./user.thunks";

const initialState: UserState = {
  profile: null,
  loading: false,
  dashboardStats: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearProfile(state) {
      state.profile = null;
      state.dashboardStats = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.profile = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true;
        state.dashboardStats = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboardStats = action.payload;
      })
      .addCase(fetchDashboardStats.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateUserProfile.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { clearProfile } = userSlice.actions;
export default userSlice.reducer;
