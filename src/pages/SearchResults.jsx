import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import BoxProduct from '../components/BoxProduct';
import productServices from '../services/ProductServices';
import '../styles/SearchResults.css';

const SearchResult = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get('keyword') || '';

  useEffect(() => {
    const fetchDataProduct = async () => {
      setLoading(true);
      try {
        const res = await productServices.getAllProduct();
        setProducts(res.products || res);
      } catch (error) {
        console.error("Lỗi khi fetch sản phẩm:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDataProduct();
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <div className="search-result-container">
      <h2 className="search-result-title">Kết quả tìm kiếm cho: "{keyword}"</h2>

      {loading ? (
        <p className="search-result-message">Đang tải dữ liệu...</p>
      ) : filteredProducts.length === 0 ? (
        <p className="search-result-message">Không tìm thấy sản phẩm nào phù hợp.</p>
      ) : (
        <div className="product-list">
          {filteredProducts.map(product => (
            <BoxProduct key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResult;
