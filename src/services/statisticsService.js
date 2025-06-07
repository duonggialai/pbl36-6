import axios from 'axios';

const API_BASE = 'http://localhost:8080/api/statistics';

const getAuthHeader = () => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    throw new Error("Auth token not found.");
  }
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const statisticsService = {

  getMonthlyRevenue: async () => {
    const res = await axios.get(`${API_BASE}/monthly-revenue`, getAuthHeader());
    return res.data;
  },


  getTotalRevenue: async () => {
    const res = await axios.get(`${API_BASE}/total-revenue`, getAuthHeader());
    return res.data;
  },

  getTopProducts: async () => {
    const res = await axios.get(`${API_BASE}/top-products`, getAuthHeader());
    return res.data;
  },


  getOrderStatusCount: async () => {
    const res = await axios.get(`${API_BASE}/order-status-count`, getAuthHeader());
    return res.data;
  },
};

export default statisticsService;
