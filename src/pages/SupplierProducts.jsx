    import React, { useEffect, useState } from 'react';
    import { useParams } from 'react-router-dom';
    import productServices from '../services/ProductServices';
    import BoxProduct from '../components/BoxProduct';
    import '../styles/SupplierProducts.css';

    const SupplierProducts = () => {
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSupplierProducts = async () => {
        setLoading(true);
        setError(null);
        try {
        const res = await productServices.getAllProduct();
        
            const allProducts =res.products || res;
            console.log(allProducts);
            const filteredProducts = allProducts.filter(
            (p) => p.supplierid === parseInt(id)
            );
            setProducts(filteredProducts);
        } catch (error) {
            setError('Lỗi khi tải sản phẩm của hãng.');
            console.error(error);
        } finally {
            setLoading(false);
        }
        };

        fetchSupplierProducts();
    }, [id]);

    if (loading) return <p>Đang tải...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    if (products.length === 0) return <p>Không có sản phẩm nào từ hãng này.</p>;

    return (
            <div className="container">
               <div> <h2>Sản phẩm của hãng</h2></div>
                {loading && <p className="message">Đang tải...</p>}
                {error &&   <p className="error">{error}</p>}
                {!loading && !error && products.length === 0 && (
                <p className="message">Không có sản phẩm nào từ hãng này.</p>
                )}
                {!loading && !error && products.length > 0 && (
                <div className="product-list">
                    {products.map(product => (
                    <BoxProduct key={product.id} product={product} />
                    ))}
                </div>
                )}
            </div>
            );

                };

    export default SupplierProducts;
// import React, { useEffect, useState } from 'react';