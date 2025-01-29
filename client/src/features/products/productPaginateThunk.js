import api from "@/services/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {toast} from "sonner"
import { ADD_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT } from "@/constants/toastMessages";

export const getProducts = createAsyncThunk(
  "get/products",
  async ({page , order }, { rejectWithValue }) => {
    try {
      const response = await api.get(`products?page=${page}&ordering=${order}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const postProduct = createAsyncThunk(
  "post/products",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.post("products", payload);

      toast.success(ADD_PRODUCT)

      return { result: response.data };
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "update/products",
  async ({id, payload}, { rejectWithValue }) => {
    try {
      const response = await api.patch(`products/${id}`, payload);

      toast.success(UPDATE_PRODUCT)

      return { result: response.data };
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "delete/products",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`products/${id}`);

      toast.success(DELETE_PRODUCT)

      return id;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
