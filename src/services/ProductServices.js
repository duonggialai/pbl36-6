  import axios from "axios";

  const API_URL = "http://localhost:8080/api/products";

  const getAuthHeader = () => {
    const token = localStorage.getItem("authToken");
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  const productServices = {
    getAllProduct: async () => {
      try {
        const response = await axios.get(API_URL);
        return response.data;
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
        throw error;
      }
    },

    getProductById: async (id) => {
      try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
        throw error;
      }
    },

    getProductsByPage: async (limit, page) => {
      try {
        const response = await axios.get(API_URL, {
          params: { limit, page },
        });
        return response.data;
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
        throw error;
      }
    },
    createProduct: async (productData) => {
      try {
        const response = await axios.post(API_URL, productData, getAuthHeader());
        return response.data;
      } catch (error) {
        console.error("Lỗi khi tạo sản phẩm:", error);
        throw error;
      }
    },
    updateProduct: async (id, productData) => {
      try {
        const response = await axios.put(`${API_URL}/${id}`, productData, getAuthHeader());
        return response.data;
      } catch (error) {
        console.error("Lỗi khi cập nhật sản phẩm:", error);
        throw error;
      }
    },
    deleteProduct: async (id) => {
      try {
        const response = await axios.delete(`${API_URL}/${id}`, getAuthHeader());
        return response.data;
      } catch (error) {
        console.error("Lỗi khi xóa sản phẩm:", error);
        throw error;
      }
    }
  };

  export default productServices;
