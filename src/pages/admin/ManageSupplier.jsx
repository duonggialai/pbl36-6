import React, { useEffect, useState } from "react";
import supplierService from "../../services/supplierService";
import "../../styles/ManageSupplier.css";
import { useDispatch, useSelector } from 'react-redux';
const emptySupplier = {
  suppliername: "",
  contactemail: "",
  contactphone: "",
  description: "",
};

const ManageSupplier = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [formData, setFormData] = useState(emptySupplier);
  const [showForm, setShowForm] = useState(false);

  const token = useSelector((state) => state.auth.token) || localStorage.getItem('token');
  const fetchSuppliers = async () => {
    try {
      const res = await supplierService.getAllSuppliers();
      setSuppliers(res.data.result || []);
    } catch (err) {
      console.error("Lỗi khi tải danh sách nhà cung cấp", err);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddNew = () => {
    setEditingSupplier(null);
    setFormData(emptySupplier);
    setShowForm(true);
  };

  const handleEdit = (supplier) => {
    setEditingSupplier(supplier);
    setFormData(supplier);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa nhà cung cấp này không?")) {
      try {
        await supplierService.deleteSupplier(id, token);
        alert("Xóa thành công.");
        fetchSuppliers();
      } catch {
        alert("Lỗi khi xóa.");
      }
    }
  };

   const handleSave = async (e) => {
    e.preventDefault();
   if (!formData.suppliername || !formData.contactphone) {
  alert("Tên hãng và số điện thoại là bắt buộc.");
  return;
}


    try {
      if (editingSupplier) {
        await supplierService.updateSupplier(editingSupplier.id, formData, token);
        alert("Cập nhật thành công.");
      } else {
        await supplierService.createSupplier(formData, token);
        alert("Thêm mới thành công.");
      }
      setShowForm(false);
      fetchSuppliers();
    } catch {
      alert("Lỗi khi lưu.");
    }
  };

  const filteredSuppliers = suppliers.filter((s) =>
    s.suppliername.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="manage-suppliers">
      <h2>Quản lý Nhà Cung Cấp</h2>

      <div className="top-bar">
        <input
          type="text"
          placeholder="Tìm theo tên hãng..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button onClick={handleAddNew} className="btn-add">
          Thêm hãng mới
        </button>
      </div>

      <table className="supplier-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên hãng</th>
            <th>Email</th>
            <th>SĐT</th>
            <th>Mô tả</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredSuppliers.length > 0 ? (
            filteredSuppliers.map((s) => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.suppliername}</td>
                <td>{s.contactemail}</td>
                <td>{s.contactphone}</td>
                <td>{s.description}</td>
                <td>
                  <button className="btn-edit" onClick={() => handleEdit(s)}>
                    Sửa
                  </button>
                  <button className="btn-delete" onClick={() => handleDelete(s.id)}>
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">Không tìm thấy nhà cung cấp.</td>
            </tr>
          )}
        </tbody>
      </table>
      {showForm && (
        <div className="modal">
          <form className="supplier-form" onSubmit={handleSave}>
            <h3>{editingSupplier ? "Sửa nhà cung cấp" : "Thêm nhà cung cấp mới"}</h3>

            <label>
              Tên hãng*:
              <input
                type="text"
                name="suppliername"
                value={formData.suppliername}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Email*:
              <input
                type="email"
                name="contactemail"
                value={formData.contactemail}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Số điện thoại:
              <input
                type="text"
                name="contactphone"
                value={formData.contactphone}
                onChange={handleChange}
              />
            </label>
            <label>
              Mô tả:
              <textarea
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </label>

            <div className="form-actions">
              <button type="submit" className="btn-save">
                Lưu
              </button>
              <button type="button" className="btn-cancel" onClick={() => setShowForm(false)}>
                Hủy
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManageSupplier;
