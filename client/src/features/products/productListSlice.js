import { createSlice } from "@reduxjs/toolkit";
import { getProductList } from "./ProductListThunk";

const initialState = {
  products: [],
  filter: null,
  search: "",
  loading: null,
};

const productListSlice = createSlice({
  name: "productList",
  initialState,
  reducers: {
    filterProducts(state, action) {
      const id = action.payload;
      state.filter = id;
    },
    searchProducts(state, action){
      const search = action.payload
      state.search = search
    },
    decreaseStock(state, action) {
      const { id, quantity } = action.payload;
      const product = state.products.find((item) => item.id === id);
      product.stock -= quantity;
    },
    increaseStock(state, action) {
      const { id, quantity } = action.payload;
      const product = state.products.find((item) => item.id === id);
      product.stock += quantity;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductList.pending, (state) => {
        state.loading = false;
      })
      .addCase(getProductList.fulfilled, (state, action) => {
        const { products } = action.payload;
        state.products = products;
        state.loading = false;
      })
      .addCase(getProductList.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { decreaseStock, increaseStock, filterProducts, searchProducts } = productListSlice.actions;

export default productListSlice.reducer;
