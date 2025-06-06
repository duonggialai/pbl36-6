import axios from 'axios';

const API_BASE = 'http://localhost:8080/api/orders';

const getAuthHeader = () => {
    const token = localStorage.getItem("authToken");
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

const orderService = {
  createOrder: async (orderData) => {
    const config = getAuthHeader();
    const res = await axios.post(API_BASE, orderData, config);
    return res.data;
  },

getOrdersByToken: async () => {
  const res = await axios.get(API_BASE, getAuthHeader());
  // if (res.data && Array.isArray(res.data.result)) {
  //   return res.data.result;
  // }
  // throw new Error("Dữ liệu trả về không hợp lệ.");
   return res.data;
},

  cancelOrder: async (id) => {  
    const res = await axios.put(`${API_BASE}/${id}/cancel`, null, getAuthHeader());
    return res.data;
  },

  acceptOrder: async (id) => {
    const config = getAuthHeader();
    const res = await axios.put(`${API_BASE}/${id}/accept`, null, config);
    return res.data;
  },

  completeOrder: async (id) => {
    const config = getAuthHeader();
    const res = await axios.put(`${API_BASE}/${id}/complete`, null, config);
    return res.data;
  },

  getAllOrders: async () => {
    const res = await axios.get(`${API_BASE}/AllOrder`, getAuthHeader());
    return res.data;
  },

  
};

export default orderService;
