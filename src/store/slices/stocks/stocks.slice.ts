import { createSlice } from "@reduxjs/toolkit";
import { StockState } from "./stocks.types";
import {
  addStockItem,
  fetchStockArchivedReports,
  fetchStockItems,
} from "./stocks.thunks";

const initialState: StockState = {
  stockItems: [],
  stockReports: [],
  loading: false,
};

const stocksSlice = createSlice({
  name: "stocks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStockItems.pending, (state) => {
        state.loading = true;
        state.stockItems = [];
      })
      .addCase(fetchStockItems.fulfilled, (state, action) => {
        state.loading = false;
        state.stockItems = action.payload;
      })
      .addCase(fetchStockItems.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addStockItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(addStockItem.fulfilled, (state, action) => {
        state.loading = false;
        state.stockItems.push(action.payload);
      })
      .addCase(addStockItem.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchStockArchivedReports.pending, (state) => {
        state.loading = true;
        state.stockReports = [];
      })
      .addCase(fetchStockArchivedReports.fulfilled, (state, action) => {
        state.loading = false;
        state.stockReports = action.payload;
      })
      .addCase(fetchStockArchivedReports.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default stocksSlice.reducer;
