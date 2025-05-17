import axios from "axios";

const API_URL = "http://localhost:8080/api/users";

const getAuthHeader = () => {
  const token = localStorage.getItem("authToken");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const authServices = {
  getCurrentUser: async () => {
    try {
      const res = await axios.get(`${API_URL}/myInfor`, getAuthHeader());
      return res.data;
    } catch (error) {
      console.error("Lỗi khi lấy thông tin người dùng:", error);
      throw error;
    }
  },

  updateUserInfo: async (userData, id) => {
    try {
      // id được truyền vào để cập nhật chính xác user
      const res = await axios.put(`${API_URL}/${id}`, userData, getAuthHeader());
      return res.data;
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin người dùng:", error);
      throw error;
    }
  },
};

export default authServices;
