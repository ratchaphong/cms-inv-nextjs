import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { getCookie } from "@/utils/cookie";
import { StockArchivedReport, StockItem } from "./stocks.types";
import { StockFormValues } from "@/app/stocks/stocks.types";
import api from "@/utils/axios";

export const fetchStockItems = createAsyncThunk<
  StockItem[],
  void,
  { rejectValue: string }
>("stocks/fetchStockItems", async (_, thunkAPI) => {
  try {
    // const token = getCookie("token");
    // if (!token) return thunkAPI.rejectWithValue("Token not found");

    const response = await api.get("/stocks");

    const stocks = response.data;
    return stocks;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
    } else {
      console.error("Unknown error occurred.");
    }

    return thunkAPI.rejectWithValue("Failed to fetch stock items");
  }
});

export const addStockItem = createAsyncThunk<
  StockItem,
  {
    values: StockFormValues;
    onSuccess: () => void;
  },
  { rejectValue: string }
>("stocks/add", async ({ values, onSuccess }, thunkAPI) => {
  try {
    // const token = getCookie("token");
    // if (!token) return thunkAPI.rejectWithValue("Token not found");

    const response = await api.post("/stocks", {
      productId: Number(values.productId),
      quantity: values.quantity,
      type: values.action,
      note: values.note,
    });

    const item = response.data;

    onSuccess();

    return item;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
    } else {
      console.error("Unknown error occurred.");
    }

    return thunkAPI.rejectWithValue("Failed to add stock item");
  }
});

export const fetchStockArchivedReports = createAsyncThunk<
  StockArchivedReport[],
  void,
  { rejectValue: string }
>("stocks/fetchArchivedReports", async (_, thunkAPI) => {
  try {
    // const token = getCookie("token");
    // if (!token) return thunkAPI.rejectWithValue("Token not found");

    const response = await api.get("/stocks/report/archived");

    const reports = response.data;
    return reports;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
    } else {
      console.error("Unknown error occurred.");
    }

    return thunkAPI.rejectWithValue("Failed to fetch archived stock reports");
  }
});
