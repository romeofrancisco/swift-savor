import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/services/api";

export const getCategories = createAsyncThunk(
  "get/categories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("categories");
      return { categories: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
