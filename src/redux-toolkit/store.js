
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../redux-toolkit/cartSlice"

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;
