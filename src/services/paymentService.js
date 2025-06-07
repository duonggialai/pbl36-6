import axios from 'axios';

const API_BASE = 'http://localhost:8080/api/payments';

const getAuthHeader = () => {
  const token = localStorage.getItem('authToken');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
};

const paymentService = {
  createPayment: async (orderId) => {
    const config = getAuthHeader();
    const res = await axios.post(`${API_BASE}/create`, { orderId }, config);
    return res.data;
  },
};


export default paymentService;
