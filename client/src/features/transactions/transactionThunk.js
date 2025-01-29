import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/services/api";
import { toast } from "sonner";
import {
  ORDER_SUCCESS,
  ORDER_FAILED,
  ORDER_PENDING,
} from "@/constants/toastMessages";
import { formattedDate } from "@/utils/orderUtils";
import { delay } from "@/utils/orderUtils";

export const postTransaction = createAsyncThunk(
  "post/transactions",
  async (payload, { rejectWithValue }) => {
    const toastId = toast.loading(ORDER_PENDING);
    try {
      await delay();
      const response = await api.post("transactions", payload);

      toast.success(ORDER_SUCCESS, {
        description: formattedDate(),
        duration: 3000,
      });

      return response.data;
    } catch (error) {
      toast.error(ORDER_FAILED);
      return rejectWithValue(error.response.data);
    } finally {
      toast.dismiss(toastId);
    }
  }
);

export const getTransactions = createAsyncThunk(
  "get/transactions",
  async ({ start_date, end_date, page }, { rejectWithValue }) => {
    try {
      const response = await api.get("transactions", {
        params: { start_date, end_date, page },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
