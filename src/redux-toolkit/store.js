
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../redux-toolkit/cartSlice"
import authReducer from './authSlice';
import userReducer from './userSlice';
import checkoutReducer from './checkoutSlice';
const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    checkout: checkoutReducer,
    user: userReducer,
  },
});

export default store;
