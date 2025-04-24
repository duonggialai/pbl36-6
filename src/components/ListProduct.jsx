import React, { useEffect, useState } from 'react';
import productServices from '../services/ProductServices';
import BoxProduct from './BoxProduct';

const ListProduct = () => {
  const [products, setProducts] = useState([]);

  const fetchDataProduct = async () => {
    try {
      const res = await productServices.getAllProduct();
      setProducts(res.products); 
    } catch (error) {
      console.error("Lỗi khi fetch sản phẩm:", error);
    }
  };

  useEffect(() => {
    fetchDataProduct();
  }, []);

  return (
    <div className="product-list">
       {
        products.map(product => <BoxProduct key={product.id} product={product}/>)
       }
    </div>
  );
};

export default ListProduct;
