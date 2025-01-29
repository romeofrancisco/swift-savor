import { createSlice } from "@reduxjs/toolkit";
import { getChart } from "./chartThunk";

const initialState = {
  total_orders: 0,
  total_items: 0,
  daily_sales: 0,
  weekly_sales: 0,
  yearly_sales: 0,
  sales_statistics: [],
  employee_sales: [],
  categories_sales: [],
  items_sales: [],
};

const chartSlice = createSlice({
  name: "charts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getChart.fulfilled, (state, action) => {
      state.sales_statistics = action.payload.sales_statistics;
      state.items_sales = action.payload.top_selling_items;
      state.employee_sales = action.payload.employee_sales;
      state.categories_sales = action.payload.category_sales;
      state.total_orders = action.payload.total_orders
      state.total_items = action.payload.total_items
      state.daily_sales = action.payload.daily_sales
      state.weekly_sales = action.payload.weekly_sales
      state.yearly_sales = action.payload.yearly_sales
    });
  },
});

export default chartSlice.reducer;
