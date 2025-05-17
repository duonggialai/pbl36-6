
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../redux-toolkit/cartSlice"
import authReducer from './authSlice';
const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
  },
});

export default store;
