// src/services/orderService.js
import axios from 'axios';

const API_BASE = 'http://localhost:8080/api/orders';

const orderService = {
  createOrder: async (orderData) => {
    const res = await axios.post(API_BASE, orderData);
    return res.data;
  }
};

export default orderService;
