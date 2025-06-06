import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/log-in";

const LoginServices = {
  login: async (username, password) => {
    try {
      const res = await axios.post(API_URL, {
        username,
        password,
      }, {
        withCredentials: true
      });
      return res.data;
    } catch (err) {
      if (err.response) {
        
        if (err.response.status === 400) {
          throw new Error("Đăng nhập thất bại: Sai tài khoản hoặc mật khẩu");
        }
        throw new Error(err.response.data.message || "Lỗi máy chủ");
      } else if (err.request) {
        throw new Error("Không thể kết nối đến máy chủ.");
      } else {
        throw new Error("Lỗi không xác định.");
      }
    }
  },
};

export default LoginServices;
