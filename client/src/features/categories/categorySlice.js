import { createSlice } from "@reduxjs/toolkit";
import { getCategories } from "./categoryThunk";

const initialState = {
    categories: []
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        const { categories} = action.payload;
        state.categories = categories
      })
      .addCase(getCategories.rejected, (state) => {
        state.loading = false
      })
  },
});

export default categorySlice.reducer;
