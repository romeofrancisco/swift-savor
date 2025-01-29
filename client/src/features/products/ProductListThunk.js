import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/services/api";

export const getProductList = createAsyncThunk(
  "get/all-products",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`all-products`);
      return { products: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
