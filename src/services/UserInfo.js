// import React, { useEffect, useState } from "react";
// import authServices from "../services/authServices";

// const UserInfo = () => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const userData = await authServices.getCurrentUser();
//         setUser(userData);
//       } catch (error) {
//         console.error("Không thể lấy user:", error);
//       }
//     };

//     fetchUser();
//   }, []);

//   if (!user) return <p>Đang tải thông tin...</p>;

//   return (
//     <div>
//       <h2>Thông tin người dùng</h2>
//       <p><strong>Tên:</strong> {user.name}</p>
//       <p><strong>Email:</strong> {user.email}</p>
//       {/* thêm các thông tin khác nếu có */}
//     </div>
//   );
// };

// export default UserInfo;
