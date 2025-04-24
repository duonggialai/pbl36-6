import axios from "axios";

const API_URL = "https://dummyjson.com/products?limit=20";

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
};

export default productServices;
