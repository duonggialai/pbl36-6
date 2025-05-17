import axios from 'axios';

const API_BASE = 'http://localhost:8080/api/suppliers';

const supplierService = {
  getAllSuppliers: async () => {
    const response = await axios.get(API_BASE);
    return response;
  },

  getSupplierById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE}/${id}`);
      return response;
    } catch (error) {
      console.error("Lỗi khi lấy supplier theo ID:", error);
      throw error;
    }
  },
};

export default supplierService;
