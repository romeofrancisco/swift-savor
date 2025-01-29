import { getToken, setToken, removeToken } from "@/utils/tokenHelper";
import api from "@/services/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";
import {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGIN_PENDING,
  LOGOUT
} from "@/constants/toastMessages";

export const login = createAsyncThunk(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    const toastId = toast.loading(LOGIN_PENDING);
    try {
      const response = await api.post("/user/login", payload);
      const accessToken = response.data.access;
      const refreshToken = response.data.refresh;
      setToken(accessToken, refreshToken);

      toast.success(LOGIN_SUCCESS, {
        description: `Welcome back, ${response.data.user.username || "user"}!`,
      });

      return response.data;
    } catch (error) {
      toast.error(LOGIN_FAILED, {
        duration: 3000,
      });

      return rejectWithValue(error.response?.data || error.message);
    } finally {
      toast.dismiss(toastId);
    }
  }
);

export const getUser = createAsyncThunk(
  "auth/get-user",
  async (_, { rejectWithValue }) => {
    const token = getToken();
    try {
      const response = await api.get("/user/get-user");
      return {
        refresh: token.refresh,
        access: token.access,
        user: response.data,
      };
    } catch (error) {
      // try to refresh token
      if (error?.response?.status === 401) {
        try {
          // get new access token
          console.log(error);
          const refreshResponse = await api.post("/user/refresh-token", {
            refresh: token.refresh,
          });

          const accessToken = refreshResponse.data.access;
          setToken(accessToken, token.refresh);

          // get user with new access token
          const response = await api.get("/user/get-user");
          return {
            refresh: token.refresh,
            access: token.access,
            user: response.data,
          };
        } catch (error) {
          return rejectWithValue(
            refreshError.response?.data || "Failed to refresh token"
          );
        }
      }
      return rejectWithValue(error.response?.data || "Failed to fetch user");
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (token) {
        await axios.post("/auth/logout", { refresh: token.refresh });
      }
    } catch (e) {
      console.error("Logout failed:", e);
    } finally {
      removeToken();
      toast.info(LOGOUT)
    }
  }
);
