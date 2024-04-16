// SingleProductPage.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import productLists from '../productsList';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';
import { addCart } from '../store/cartSlice';
import { useDispatch } from 'react-redux';

const SingleProductPage = () => {
    const { productId } = useParams();
    const [imageGallery, setImageGallery] = useState([]);
    const [product, setProduct] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [colors, setColors] = useState([]);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [offer, setOffer] = useState(null);
    const productsList = productLists;
    const dispatch = useDispatch();
    const [isActive, setIsActive] = useState({
        size: null,
        color: null,
    })

    useEffect(() => {
        const fetchData = () => {

            const productData = productsList.find(product => product.id === parseInt(productId));
            setProduct(productData);
            setImageGallery(productData.image_gallery);
            setSizes(productData.size)
            setColors(productData.color)
            const discountPercentage = Math.round(((productData.regular_price - productData.sales_price) / productData.regular_price) * 100);
            setOffer(discountPercentage);
        };
        fetchData();

        let lightbox = new PhotoSwipeLightbox({
            gallery: '#my-gallery',
            children: 'a',
            pswpModule: () => import('photoswipe'),
        });
        lightbox.init();

        return () => {
            lightbox.destroy();
            lightbox = null;
        };

    }, [productId]);

    const handleAdd = () => {
        const productWithSelection = {
            ...product,
            selectedSize,
            selectedColor
        };
        dispatch(addCart(productWithSelection));
    };

    const handleColor = (color, id) => {
        setSelectedColor(color);
        setIsActive({ ...isActive, color: id })

    };

    const handleSize = (size, index) => {
        setSelectedSize(size);
        setIsActive({ ...isActive, size: index });
    };

    return (
        <>
            <section className='breadcumbs'>
                <div className="container">
                    <div className="row">
                        <div className="breadcumbs_wrapper">
                            {product ? (
                                <>
                                    <Link to="/">Home /</Link>
                                    <Link to={`/categories/${product.category}`}>{product.category} /</Link>
                                    <h4>{product.name}</h4>
                                </>
                            ) : ""}
                        </div>
                    </div>
                </div>
            </section>
            <section className='bg-gray default-padding'>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-lg-8">
                            <div className="image_gallery pswp-gallery" id='my-gallery'>
                                <Link
                                    to={product.featured_image}
                                    data-pswp-width="2000"
                                    data-pswp-height="2000"
                                    target="_blank"
                                    rel="noreferrer">
                                    <img src={product.featured_image} alt={product.name} />
                                </Link>
                                {imageGallery.map((image, id) => (
                                    <Link
                                        key={id}
                                        to={image}
                                        data-pswp-width="2000"
                                        data-pswp-height="2000"
                                        target="_blank"
                                        rel="noreferrer">
                                        <img src={image} alt={product.name} />
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4">
                            <div className="proudct_content">
                                <div className="rating">
                                    <div className="rating_icon">
                                        <i className="bi bi-star-fill"></i>
                                        <i className="bi bi-star-fill"></i>
                                        <i className="bi bi-star-fill"></i>
                                        <i className="bi bi-star-fill"></i>
                                        <i className="bi bi-star-half"></i>
                                    </div>
                                    <p>{product.rating}</p>
                                </div>
                                <div className="product_name">
                                    <h3>{product.name}</h3>
                                </div>
                                <div className="product_price">
                                    <h3 className='main'>₹{product.sales_price}</h3>
                                    <h3 className='line_trough'>MRP <span>₹{product.regular_price}</span></h3>
                                    <h3 className='off'>{`(${offer}%)`}</h3>
                                </div>
                                <div className="product_size">
                                    <h3 className='sec_title'>SELECT SIZE</h3>
                                    <ul className="size_wrapper">
                                        {sizes.map((size, id) => (
                                            <li key={id} className={isActive.size === id ? "sizes active" : "sizes"} onClick={() => handleSize(size, id)}>{size}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="product_colors">
                                    <h3 className='sec_title'>SELECT COLORS</h3>
                                    <ul className="size_colors">
                                        {colors.map((color, id) => (
                                            <li key={id} className={isActive.color === id ? "colors active" : "colors"} style={{ backgroundColor: color }} onClick={() => handleColor(color, id)}></li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="single_add_to_cart">
                                    <button className='btn-first' onClick={() => handleAdd(product)}><i className="bi bi-bag-check"></i>Add to Cart</button>
                                </div>
                                <div className="product_description">
                                    <h3 className='sec_title'>PRODUCT DETAILS</h3>
                                    <div dangerouslySetInnerHTML={{ __html: product.description }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default SingleProductPage;
