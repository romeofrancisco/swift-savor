import { createSlice } from "@reduxjs/toolkit";
import { TAX_RATE } from "@/constants/order";

const initialState = {
  orders: [],
  total: 0,
  subTotal: 0,
  tax: 0,
  cashier: null,
  loading: false,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder(state, action) {
      const { id, name, image, quantity, price } = action.payload;
      const order = state.orders.find((item) => item.product === id);
      const unitPrice = quantity * price;

      if (order) {
        order.quantity = Number(order.quantity) + Number(quantity);
        order.unitTotal = Number(order.quantity) * Number(price);
        state.total = state.total + unitPrice;
      } else {
        state.orders.push({
          product: id,
          name,
          image,
          quantity,
          price,
          unitTotal: unitPrice,
        });
        state.total = state.total + unitPrice;
      }
      state.tax = parseFloat((state.total * TAX_RATE).toFixed(2)); // Round to 2 decimals
      state.subTotal = parseFloat((state.total - state.tax).toFixed(2));
    },
    incrementQuantity(state, action) {
      const { id } = action.payload;
      const order = state.orders.find((item) => item.product === id);
      order.quantity += 1;
      order.unitTotal = Number(order.quantity) * Number(order.price);
      state.total += Number(order.price);
      state.tax = parseFloat(state.total * TAX_RATE).toFixed(2);
      state.subTotal = parseFloat(state.total - state.tax).toFixed(2);
    },
    decrementQuantity(state, action) {
      const { id } = action.payload;
      const order = state.orders.find((item) => item.product === id);
      order.quantity -= 1;
      order.unitTotal = Number(order.quantity) * Number(order.price);
      state.total -= Number(order.price);
      state.tax = parseFloat((state.total * TAX_RATE).toFixed(2)); // Round to 2 decimals
      state.subTotal = parseFloat((state.total - state.tax).toFixed(2));
    },
    removeOrder(state, action) {
      const { id } = action.payload;
      const index = state.orders.findIndex((item) => item.product === id);
      if (index !== -1) {
        const removedOrder = state.orders.splice(index, 1)[0];
        state.total -= removedOrder.quantity * removedOrder.price;
      }
      state.tax = parseFloat((state.total * TAX_RATE).toFixed(2)); // Round to 2 decimals
      state.subTotal = parseFloat((state.total - state.tax).toFixed(2));
    },
    clearOrder(state) {
      state.orders = [];
      (state.total = 0),
        (state.subTotal = 0),
        (state.tax = 0),
        (state.cashier = null),
        (state.loading = false);
    },
  },
});

export const {
  addOrder,
  incrementQuantity,
  decrementQuantity,
  removeOrder,
  clearOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
