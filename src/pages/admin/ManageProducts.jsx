import React, { useEffect, useState } from "react";
import productServices from "../../services/ProductServices";
import "../../styles/ManageProducts.css";
import authServices from "../../services/authServices";
import supplierService from "../../services/supplierService";

const emptyProduct = {
  categoryid: 1,
  price: "",
  quantity: "",
  battery: "",
  bluetooth: "",
  color: "",
  cpu: "",
  description: "",
  front_camera: "",
  name: "",
  ram: "",
  rear_camera: "",
  rom: "",
  screen: "",
  sim_slot: "",
  status: "",
  warranty: "",
  weight: "",
  main_image_url: "",
  supplierid: "",  
  created_date: "",
  modified_date: "",
  created_by: "",
  modified_by: "",
};

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState(emptyProduct);
  const [showForm, setShowForm] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [user, setUser] = useState("");

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

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await productServices.getAllProduct();
      setProducts(data);
      setError("");
    } catch (err) {
      setError("Lỗi khi tải danh sách sản phẩm");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userData = await authServices.getCurrentUser();
        setUser(userData.username);
      } catch (err) {
        console.log("lỗi");
      }
    };
    fetchUserInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
 
      [name]: name === "supplierid" ? Number(value) : value,
    }));
  };

  const handleAddNew = () => {
    setEditingProduct(null);
    setFormData({
      ...emptyProduct,
      supplierid: suppliers.length > 0 ? suppliers[0].id : "", 
      created_date: new Date().toISOString(),
      modified_date: new Date().toISOString(),
      created_by: user,
      modified_by: user,
    });
    setShowForm(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      ...product,
      supplierid: product.supplierid, 
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa sản phẩm này không?")) {
      try {
        await productServices.deleteProduct(id);
        alert("Xóa sản phẩm thành công");
        fetchProducts();
      } catch {
        alert("Lỗi khi xóa sản phẩm");
      }
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price) {
      alert("Tên và giá sản phẩm là bắt buộc");
      return;
    }

    try {
      if (editingProduct) {
        await productServices.updateProduct(editingProduct.id, {
          ...formData,
          modified_by: user,
          modified_date: new Date().toISOString(),
        });
      } else {
        await productServices.createProduct(formData);
      }
      setShowForm(false);
      fetchProducts();
    } catch (err) {
      alert("Lỗi khi lưu sản phẩm");
    }
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="manage-products">
      <h2>Quản lý sản phẩm</h2>

      <div className="top-bar">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên sản phẩm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button onClick={handleAddNew} className="btn-add">
          Thêm sản phẩm mới
        </button>
      </div>

      {loading ? (
        <p>Đang tải danh sách sản phẩm...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : filteredProducts.length === 0 ? (
        <p>Không tìm thấy sản phẩm nào.</p>
      ) : (
        <table className="product-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên</th>
              <th>Giá (₫)</th>
              <th>Số lượng</th>
              <th>Màu sắc</th>
              <th>RAM</th>
              <th>ROM</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{Number(product.price).toLocaleString()}</td>
                <td>{product.quantity}</td>
                <td>{product.color}</td>
                <td>{product.ram}</td>
                <td>{product.rom}</td>
                <td>{product.status}</td>
                <td>
                  <button
                    className="btn-edit"
                    onClick={() => handleEdit(product)}
                  >
                    Sửa
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(product.id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showForm && (
        <div className="modal">
          <form className="product-form" onSubmit={handleSave}>
            <h3>{editingProduct ? "Sửa sản phẩm" : "Thêm sản phẩm mới"}</h3>

            <label>
              Tên sản phẩm*:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>

            {/* Dropdown chọn nhà cung cấp với tên hãng */}
            <label>
              Nhà cung cấp*:
              <select
                name="supplierid"
                value={formData.supplierid}
                onChange={handleChange}
                required
              >
                <option value="">-- Chọn nhà cung cấp --</option>
                {suppliers.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.suppliername}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Giá (VNĐ)*:
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min={0}
              />
            </label>
            <label>
              Số lượng:
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                min={0}
              />
            </label>
            <label>
              Màu sắc:
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleChange}
              />
            </label>
            <label>
              RAM:
              <input
                type="text"
                name="ram"
                value={formData.ram}
                onChange={handleChange}
              />
            </label>
            <label>
              ROM:
              <input
                type="text"
                name="rom"
                value={formData.rom}
                onChange={handleChange}
              />
            </label>
            <label>
              Màn hình:
              <input
                type="text"
                name="screen"
                value={formData.screen}
                onChange={handleChange}
              />
            </label>
            <label>
              Camera trước:
              <input
                type="text"
                name="front_camera"
                value={formData.front_camera}
                onChange={handleChange}
              />
            </label>
            <label>
              Camera sau:
              <input
                type="text"
                name="rear_camera"
                value={formData.rear_camera}
                onChange={handleChange}
              />
            </label>
            <label>
              Pin:
              <input
                type="text"
                name="battery"
                value={formData.battery}
                onChange={handleChange}
              />
            </label>
            <label>
              Bluetooth:
              <input
                type="text"
                name="bluetooth"
                value={formData.bluetooth}
                onChange={handleChange}
              />
            </label>
            <label>
              CPU:
              <input
                type="text"
                name="cpu"
                value={formData.cpu}
                onChange={handleChange}
              />
            </label>
            <label>
              Khối lượng:
              <input
                type="text"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
              />
            </label>
            <label>
              Bảo hành:
              <input
                type="text"
                name="warranty"
                value={formData.warranty}
                onChange={handleChange}
              />
            </label>
            <label>
              SIM:
              <input
                type="text"
                name="sim_slot"
                value={formData.sim_slot}
                onChange={handleChange}
              />
            </label>
            <label>
              Mô tả:
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </label>
            <label>
              Trạng thái:
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="">Chọn trạng thái</option>
                <option value="Còn hàng">Còn hàng</option>
                <option value="Hết hàng">Hết hàng</option>
                <option value="Ngưng bán">Ngưng bán</option>
              </select>
            </label>
            <label>
              Ảnh chính (URL):
              <input
                type="text"
                name="main_image_url"
                value={formData.main_image_url}
                onChange={handleChange}
              />
            </label>

            <div className="form-actions">
              <button type="submit" className="btn-save">
                Lưu
              </button>
              <button
                type="button"
                className="btn-cancel"
                onClick={() => setShowForm(false)}
              >
                Hủy
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
