import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  addToCartAPI,
  updateCartItemAPI,
  removeCartItemAPI,
  getCartFromServerAPI,
} from '../services/cartService';


export const fetchCartFromServer = createAsyncThunk(
  'cart/fetchCartFromServer',
  async (token, thunkAPI) => {
    try {
      const data = await getCartFromServerAPI(token);
      //  console.log('[fetchCartFromServer] data from API:', data);
      //  console.log('haha');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Error');
    }
  }
);

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
