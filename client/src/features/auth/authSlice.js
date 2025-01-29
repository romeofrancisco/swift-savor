import { createSlice } from "@reduxjs/toolkit";
import { login, logout, getUser } from "./authThunk";

const initialState = {
  refresh: null,
  access: null,
  user: null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        const { refresh, access, user } = action.payload;
        state.refresh = refresh;
        state.access = access;
        state.user = user;
        state.loading = false;
      })
      // GET USER
      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        const { refresh, access, user } = action.payload;
        state.refresh = refresh;
        state.access = access;
        state.user = user;
        state.loading = false
      })
      // LOGOUT
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.rejected, (state) => {
        state.loading = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.refresh = null;
        state.access = null;
        state.user = null;
        state.loading = false;
      });
  },
});

export default authSlice.reducer;
