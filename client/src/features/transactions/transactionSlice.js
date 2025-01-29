import { createSlice } from "@reduxjs/toolkit";
import { postTransaction, getTransactions } from "./transactionThunk";

const initialState = {
  count: 0,
  next: null,
  previous: null,
  dateFilter: {},
  currentPage: 1,
  results: [],
  loading: false,
};

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setDateFilter(state, action) {
      state.dateFilter = action.payload
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Post Transaction
      .addCase(postTransaction.pending, (state) => {
        state.loading = true;
      })
      .addCase(postTransaction.fulfilled, (state, action) => {
        const result = action.payload;
        state.results = [...state.results, result];
        state.count += 1;
        state.loading = false;
      })
      .addCase(postTransaction.rejected, (state) => {
        state.loading = false;
      })

      // Get Transactions
      .addCase(getTransactions.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTransactions.fulfilled, (state, action) => {
        const { count, next, previous, results } = action.payload;
        state.count = count;
        state.next = next;
        state.previous = previous;
        state.results = results;
        state.loading = false;
      })
      .addCase(getTransactions.rejected, (state) => {
        state.loading = false;
      });
  },
});


export const { setDateFilter, setCurrentPage } = transactionSlice.actions;
export default transactionSlice.reducer;
