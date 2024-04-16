import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import productLists from '../productsList';
import NewArrivals from './Home/NewArrivals';
import ProductCard from './ProductCard';
import { addCart } from '../store/cartSlice';
import { useDispatch } from 'react-redux'

function Categories() {
    const { categoryName } = useParams();
    const [category, setCategory] = useState([]);
    const productsList = productLists;
    const dispacth = useDispatch();

    useEffect(() => {
        const fetchCate = () => {
            const cateProduct = productsList.filter(product => product.category === categoryName);
            setCategory(cateProduct);
        };

        fetchCate();
    }, [categoryName]);

    const handleAdd = (product) => {
        dispacth(addCart(product));
    }

    return (
        <>

            <section className='breadcumbs'>
                <div className="container">
                    <div className="row">
                        <div className="breadcumbs_wrapper">
                            <Link to="/">Home /</Link><h4>{categoryName}</h4>
                        </div>
                    </div>
                </div>
            </section>

            <NewArrivals
                subTitle="COLLECTIONS"
                mainTitle={`${categoryName} COLLECTION`}
                products={category.map((product, index) => {
                    const discountPercentage = Math.round(((product.regular_price - product.sales_price) / product.regular_price) * 100);
                    return (
                        <div className="col-md-6 col-lg-3" key={product.id}>
                            <ProductCard
                                id={product.id}
                                featured_image={product.featured_image}
                                name={product.name}
                                sales_price={product.sales_price}
                                regular_price={product.regular_price}
                                offer={`${discountPercentage}%`}
                                onClick={() => handleAdd(product)}
                            />
                        </div>
                    )
                })}
            />
        </>
    );
}

export default Categories;
