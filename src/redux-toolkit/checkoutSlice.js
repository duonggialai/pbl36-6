import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],  // danh sách sản phẩm chọn để đặt hàng
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setCheckoutProducts(state, action) {
      state.products = action.payload;
    },
    resetCheckout(state) {
      state.products = [];
    },
  },
});

export const { setCheckoutProducts, resetCheckout } = checkoutSlice.actions;
export default checkoutSlice.reducer;
