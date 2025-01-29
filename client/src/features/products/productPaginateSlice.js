import { createSlice } from "@reduxjs/toolkit";
import {
  getProducts,
  postProduct,
  deleteProduct,
  updateProduct,
} from "./productPaginateThunk";

const initialState = {
  count: null,
  next: null,
  previous: null,
  results: [],
  loading: false,
};

const productPaginateSlice = createSlice({
  name: "productPaginate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get Products
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        const { count, next, previous, results } = action.payload;
        state.count = count;
        state.next = next;
        state.previous = previous;
        state.results = results;
        state.loading = false;
      })

      // Post Product
      .addCase(postProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(postProduct.fulfilled, (state, action) => {
        const { result } = action.payload;
        state.results = [...state.results, result];
        state.count += 1;
        state.loading = false;
      })
      .addCase(postProduct.rejected, (state) => {
        state.loading = false;
      })

      // Update Product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const { result } = action.payload;
        state.results = state.results.map((product) =>
          product.id === result.id ? result : product
        );
        state.loading = false;
      })
      .addCase(updateProduct.rejected, (state) => {
        state.loading = false;
      })

      // Delete Product
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const id = action.payload;
        state.results = state.results.filter((product) => product.id !== id);
        state.loading = false;
      })
      .addCase(deleteProduct.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default productPaginateSlice.reducer;
