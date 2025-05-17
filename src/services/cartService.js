import axios from 'axios';

const API_BASE = 'http://localhost:8080/api/cartitem';

export const addToCartAPI = async (productId, quantity, token) => {
  const response = await axios.post(
    `${API_BASE}/add`,
    { productId, quantity },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};

export const updateCartItemAPI = async (id, quantity, token) => {
  await axios.put(
    `${API_BASE}/${id}`,
    { quantity },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );
};

export const removeCartItemAPI = async (id, token) => {
  await axios.delete(`${API_BASE}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getCartFromServerAPI = async (token) => {
  const response = await axios.get(API_BASE, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
