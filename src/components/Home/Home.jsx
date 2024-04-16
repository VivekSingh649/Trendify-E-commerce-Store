import React from 'react'
import ProductCard from "../ProductCard";
import HeroSection from "./HeroSection";
import productLists from "../../productsList";
import NewArrivals from './NewArrivals';
import { useDispatch } from 'react-redux';
import { addCart } from '../../store/cartSlice';


function Home() {
    const allProducts = productLists;
    const dispacth = useDispatch();

    const handleAdd = (product) => {
        dispacth(addCart(product));
    }
    return (
        <>
            <HeroSection />
            <NewArrivals
                subTitle="new Arrivals"
                mainTitle="NEW ARRIVALS"
                products={allProducts.map((product, index) => {
                    const discountPercentage = Math.round(((product.regular_price - product.sales_price) / product.regular_price) * 100);
                    return (
                        <div className="col-6 col-lg-3" key={index}>
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
    )
}

export default Home
