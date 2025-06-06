import axios from 'axios';

const API_BASE = 'http://localhost:8080/api/shipping';

const getAuthHeader = () => {
  const token = localStorage.getItem('authToken');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const shippingService = {

  getAllShippings: async () => {
    try {
      const response = await axios.get(API_BASE, getAuthHeader());
      return response.data;
    } catch (error) {
      console.error('Lỗi khi lấy danh sách vận chuyển:', error);
      throw error;
    }
  },

 
  getShippingById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE}/${id}`, getAuthHeader());
      return response.data;
    } catch (error) {
      console.error(`Lỗi khi lấy vận chuyển id=${id}:`, error);
      throw error;
    }
  },

  
  createShipping: async (shippingData) => {
    try {
      const response = await axios.post(API_BASE, shippingData, getAuthHeader());
      return response.data;
    } catch (error) {
      console.error('Lỗi khi tạo đơn vận chuyển:', error);
      throw error;
    }
  },


  updateShippingStatus: async (id, statusData) => {
    try {
      const response = await axios.put(`${API_BASE}/${id}`, statusData, getAuthHeader());
      return response.data;
    } catch (error) {
      console.error(`Lỗi khi cập nhật vận chuyển id=${id}:`, error);
      throw error;
    }
  },
};

export default shippingService;
