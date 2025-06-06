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

const userService = {

  getAllUsers: async () => {
    const response = await axios.get(API_URL, getAuthHeader());
    return response.data;
  },


  getUserById: async (id) => {
    const response = await axios.get(`${API_URL}/${id}`, getAuthHeader());
    return response.data;
  },

    updateUserInfo: async (userData, id) => {
    try {
      const res = await axios.put(`${API_URL}/${id}`, userData, getAuthHeader());
      return res.data;
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin người dùng:", error);
      throw error;
    }
  },


  deleteUser: async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`, getAuthHeader());
    return response.data;
  },
};

export default userService;
