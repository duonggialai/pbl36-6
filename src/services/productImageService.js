import axios from 'axios';

const API_URL = 'http://localhost:8080/api/productimages';

const productImageService = {
  getProductImagesByProductId: async (productId) => {
    try {
      const response = await axios.get(`${API_URL}/${productId}`);
      return response.data; 
    } catch (error) {
      console.error('Lỗi khi lấy ảnh sản phẩm:', error);
      throw error;
    }
  },
};

export default productImageService;
