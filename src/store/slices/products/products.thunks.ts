import { createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "./products.types";
import { CreateProduct } from "@/app/products/products.types";
import axios from "axios";
// import { getCookie } from "@/utils/cookie";
import api from "@/utils/axios";

export const fetchProducts = createAsyncThunk<
  Product[],
  void,
  { rejectValue: string }
>("products/fetch", async (_, thunkAPI) => {
  try {
    // const token = getCookie("token");
    // if (!token) return thunkAPI.rejectWithValue("Token not found");

    const response = await api.get("/products");

    return response.data as Product[];
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message || "Failed to fetch products";
      return thunkAPI.rejectWithValue(message);
    }
    return thunkAPI.rejectWithValue("Unknown error");
  }
});

export const deleteProduct = createAsyncThunk<
  string, // ✅ return productId หลังลบเสร็จ
  string, // ✅ รับ productId เข้ามา
  { rejectValue: string }
>("products/delete", async (productId, thunkAPI) => {
  try {
    // const token = getCookie("token");
    // if (!token) return thunkAPI.rejectWithValue("Token not found");

    await api.delete(`/products/${productId}`);

    return productId;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message || "Failed to delete product";
      return thunkAPI.rejectWithValue(message);
    }

    return thunkAPI.rejectWithValue("Unknown error");
  }
});

export const editProduct = createAsyncThunk<
  Product,
  Product,
  { rejectValue: string }
>("products/edit", async (updatedProduct, thunkAPI) => {
  try {
    // const token = getCookie("token");
    // if (!token) return thunkAPI.rejectWithValue("Token not found");

    const { id, ...updateBody } = updatedProduct;
    const response = await api.patch(`/products/${id}`, {
      name: updateBody.name,
    });

    return response.data as Product;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message || "Failed to update product";
      return thunkAPI.rejectWithValue(message);
    }

    return thunkAPI.rejectWithValue("Unknown error");
  }
});

export const addProduct = createAsyncThunk<
  Product,
  {
    values: CreateProduct;
    onSuccess: () => void;
  },
  { rejectValue: string }
>("products/add", async ({ values, onSuccess }, thunkAPI) => {
  try {
    // const token = getCookie("token");
    // if (!token) return thunkAPI.rejectWithValue("Token not found");

    const response = await api.post("/products", values);

    onSuccess();

    return response.data as Product;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "Failed to add product";
      return thunkAPI.rejectWithValue(message);
    }

    return thunkAPI.rejectWithValue("Unknown error");
  }
});
