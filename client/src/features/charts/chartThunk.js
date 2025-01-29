import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/services/api";

export const getChart = createAsyncThunk(
  "get/sales-statistics",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("chart");
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
