import axios from "axios";

const API_URL = "http://localhost:8080/api/users";

const RegisterServices = {
  register: async (data) => {
    try {
      const res = await axios.post(API_URL, data);
      return res.data;
    } catch (err) {
      if (err.response) {
        throw new Error(err.response.data.message || "Lỗi máy chủ");
      } else if (err.request) {
        throw new Error("Không thể kết nối đến máy chủ.");
      } else {
        throw new Error("Lỗi không xác định.");
      }
    }
  },
};

export default RegisterServices;
