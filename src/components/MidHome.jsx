import React, { useEffect, useState } from 'react';
import '../styles/MidHome.css'; 
import productServices from '../services/ProductServices';
import { useNavigate } from 'react-router-dom';
import Banner2 from './Banner2';

const MidHome = () => {
    const [topRatedProducts, setTopRatedProducts] = useState([]);
    const [expensiveProducts, setExpensiveProducts] = useState([]);
    const images = ["/img/a1.png", "/img/a2.png", "/img/a3.png"];
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDataProduct = async () => {
            try {
                const res = await productServices.getAllProduct();
                const allProducts = res.products || res;

                
                const topRated = allProducts
                    .filter(product => product.total_rating)
                    .sort((a, b) => b.total_rating - a.total_rating)
                    .slice(0, 4);

          
                const mostExpensive = allProducts
                    .filter(product => product.price)
                    .sort((a, b) => b.price - a.price)
                    .slice(0, 4);

                setTopRatedProducts(topRated);
                setExpensiveProducts(mostExpensive);
            } catch (error) {
                console.error("Lỗi khi fetch sản phẩm:", error);
            }
        };

        fetchDataProduct();
    }, []);

    const handleViewDetail = (product) => {
        navigate(`/product/${product.id}`);
    };

    return (
        <div className='midhome'>
            <div className='imgs'>
                <img src={images[0]} alt="Image 1" className='img1' />
                <img src={images[1]} alt="Image 2" className='img2' />
                <img src={images[2]} alt="Image 3" className='img3' />
            </div>

            <div className='highlight-section'>
                <h2 className='section-title'>Sản phẩm nổi bật (đánh giá cao)</h2>
                <div className='p-grid'>
                    {topRatedProducts.map(product => (
                        <div
                            key={product.id}
                            className='p-card'
                            onClick={() => handleViewDetail(product)}
                            style={{ cursor: 'pointer' }}
                        >
                            <img src={product.main_image_url} alt={product.name} className='p-image' />
                            <h3 className='p-name'>{product.name}</h3>
                            <p className='p-price'>{product.price?.toLocaleString()} đ</p>
                            <p className='p-rating'>⭐ {product.total_rating}</p>
                        </div>
                    ))}
                </div>

                <h2 className='section-title'>Sản phẩm giá cao nhất</h2>
                <div className='p-grid'>
                    {expensiveProducts.map(product => (
                        <div
                            key={product.id}
                            className='p-card'
                            onClick={() => handleViewDetail(product)}
                            style={{ cursor: 'pointer' }}
                        >
                            <img src={product.main_image_url} alt={product.name} className='p-image' />
                            <h3 className='p-name'>{product.name}</h3>
                            <p className='p-price'>{product.price?.toLocaleString()} đ</p>
                            <p className='p-rating'>⭐ {product.total_rating}</p>
                        </div>
                    ))}
                </div>
            </div>

            <Banner2 />
           <div class="footer-bottom-text">
                    🔸 Uy tín tạo nên chất lượng – Đồng hành cùng bạn trong từng lựa chọn công nghệ.
                </div>

       </div>
    );
};

export default MidHome;
