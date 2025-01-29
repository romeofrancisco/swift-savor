import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice'
import productsReducer from './products/productPaginateSlice'
import categoriesReducer from './categories/categorySlice'
import productListReducer from './products/productListSlice'
import orderReducer from './order/orderSlice'
import transactionReducer from './transactions/transactionSlice'
import chartReducer from './charts/chartSlice'

export default configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    categories: categoriesReducer,
    productList: productListReducer,
    orders: orderReducer,
    transactions: transactionReducer,
    charts: chartReducer,
  }
})