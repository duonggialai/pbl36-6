import React, { useEffect, useState } from 'react';
import productServices from '../services/ProductServices';
import BoxProduct from './BoxProduct';
import '../styles/Home.css';
const ListProduct = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  useEffect(() => {
    const fetchDataProduct = async () => {
      try {
        const res = await productServices.getAllProduct();
        setProducts(res.products || res);
      } catch (error) {
        console.error("Lỗi khi fetch sản phẩm:", error);
      }
    };

    fetchDataProduct();
  }, []);

  const totalPages = Math.ceil(products.length / productsPerPage);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const handleClickPage = (page) => {
    setCurrentPage(page);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage <= totalPages) setCurrentPage(currentPage + 1);
  };

const getPageNumbers = () => {
  const pages = [];
  const maxVisible = 4;

  let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  let end = start + maxVisible - 1;

  if (end > totalPages) {
    end = totalPages;
    start = Math.max(1, end - maxVisible + 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return [...new Set(pages)]; 
};



  return (
    <div >
      <div className="products-list">
        {currentProducts.map(product => (
          <BoxProduct key={product.id} product={product} />
        ))}
      </div>

      <div className="pagination">
        <button onClick={handlePrev} disabled={currentPage === 1}>«</button>

        {getPageNumbers().map(page => (
          <button
            key={page}
            onClick={() => handleClickPage(page)}
            className={currentPage === page ? 'active' : ''}
          >
            {page}
          </button>
        ))}

        {totalPages > 4 && !getPageNumbers().includes(totalPages - 1) && <span>...</span>}
          {totalPages > 4 && !getPageNumbers().includes(totalPages) && (
            <button onClick={() => setCurrentPage(totalPages)}>{totalPages}</button>
          )}


        <button onClick={handleNext} disabled={currentPage === totalPages}>»</button>
      </div>
    </div>
  );
};

export default ListProduct;
