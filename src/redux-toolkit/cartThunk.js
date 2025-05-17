import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  addToCartAPI,
  updateCartItemAPI,
  removeCartItemAPI,
  getCartFromServerAPI,
} from '../services/cartService';

// Lấy giỏ hàng người dùng từ server
export const fetchCartFromServer = createAsyncThunk(
  'cart/fetchCartFromServer',
  async (token, thunkAPI) => {
    try {
      const data = await getCartFromServerAPI(token);
       console.log('[fetchCartFromServer] data from API:', data);
       console.log('haha');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Error');
    }
  }
);

// Thêm sản phẩm vào giỏ hàng
export const addProductToCart = createAsyncThunk(
  'cart/addProductToCart',
  async ({ productId, quantity, token }, thunkAPI) => {
    try {
      const data = await addToCartAPI(productId, quantity, token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Error');
    }
  }
);

// Cập nhật số lượng sản phẩm
export const updateProductQuantity = createAsyncThunk(
  'cart/updateProductQuantity',
  async ({ id, quantity, token }, thunkAPI) => {
    try {
      await updateCartItemAPI(id, quantity, token);
      return { id, quantity };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Error');
    }
  }
);

// Xóa sản phẩm khỏi giỏ
export const removeProductFromCart = createAsyncThunk(
  'cart/removeProductFromCart',
  async ({ id, token }, thunkAPI) => {
    try {
      await removeCartItemAPI(id, token);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Error');
    }
  }
);
