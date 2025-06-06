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


  createSupplier: async (supplierData, token) => {
    try {
      const response = await axios.post(API_BASE, supplierData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      console.error("Lỗi khi thêm supplier:", error);
      throw error;
    }
  },


  updateSupplier: async (id, supplierData, token) => {
    try {
      const response = await axios.put(`${API_BASE}/${id}`, supplierData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      console.error("Lỗi khi cập nhật supplier:", error);
      throw error;
    }
  },

  
  deleteSupplier: async (id, token) => {
    try {
      const response = await axios.delete(`${API_BASE}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      console.error("Lỗi khi xóa supplier:", error);
      throw error;
    }
  },
};

export default supplierService;
