import axios from "axios";

const API_URL = "https://dummyjson.com/auth/login";

const LoginServices = {
  login: async (username, password) => {
    try {
      const res = await axios.post(API_URL, {
        username,
        password,
      });
      return res.data; // Trả về dữ liệu nếu đăng nhập thành công
    } catch (err) {
      if (err.response) {
        // Lỗi từ server (ví dụ: thông báo sai tài khoản/mật khẩu)
        throw new Error(err.response.data.message || "Đã xảy ra lỗi khi đăng nhập");
      } else if (err.request) {
        // Lỗi không nhận được phản hồi từ server (ví dụ: lỗi mạng)
        throw new Error("Không thể kết nối đến máy chủ, vui lòng thử lại sau.");
      } else {
        // Lỗi khác
        throw new Error("Đã xảy ra lỗi không xác định.");
      }
    }
  },
};

export default LoginServices;
