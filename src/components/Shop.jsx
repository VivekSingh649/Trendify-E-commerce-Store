import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import productLists from '../productsList';
import ProductCard from './ProductCard';
import { addCart } from '../store/cartSlice';
import { useDispatch } from 'react-redux'

function Shop() {
    const [allProducts, setAllProducts] = useState(productLists);
    const [categories, setCategories] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [color, setColors] = useState([]);
    const dispatch = useDispatch();
    const [activeFilters, setActiveFilters] = useState({
        category: null,
        size: null,
        color: null,
    });
    const [range, setRange] = useState(2000);

    useEffect(() => {
        const uniqueCategories = ["All", ...new Set(productLists.map(product => product.category))];
        setCategories(uniqueCategories);

        let uniqueSizes = [];
        productLists.forEach(product => {
            uniqueSizes = uniqueSizes.concat(product.size);
        });
        uniqueSizes = [...new Set(uniqueSizes)];
        setSizes(uniqueSizes);


        let uniqueColors = [];
        productLists.forEach(product => {
            uniqueColors = uniqueColors.concat(product.color);
        });
        uniqueColors = [...new Set(uniqueColors)];
        setColors(uniqueColors);

    }, [productLists]);

    const handleCategories = (category, index) => {
        setActiveFilters({ ...activeFilters, category: index === activeFilters.category ? null : index });
        setAllProducts(category === "All" ? productLists : productLists.filter(product => product.category === category));
    }

    const handleSizes = (size, index) => {
        setActiveFilters({ ...activeFilters, size: index === activeFilters.size ? null : index });
        const filteredProducts = allProducts.filter((product) => {
            return product.size.includes(size);
        });
        setAllProducts(filteredProducts);
    }

    const handleColors = (color, index) => {
        setActiveFilters({ ...activeFilters.color, color: index === activeFilters.color ? null : index });
        const filteredProducts = allProducts.filter((product) => {
            return product.color.includes(color);
        })
        setAllProducts(filteredProducts);
    }

    const handleRange = (e) => {
        const newRange = parseInt(e.target.value);
        setRange(newRange);

        const filterByRange = productLists.filter(product => product.sales_price <= newRange);
        setAllProducts(filterByRange);
    };

    const handleAdd = (product) => {
        dispatch(addCart(product));
    }

    return (
        <>

            <section className='breadcumbs'>
                <div className="container">
                    <div className="row">
                        <div className="breadcumbs_wrapper">
                            <Link to="/">Home /</Link><h4>Shop</h4>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-gray default-padding product_wrapper_grid">
                <div className="container">
                    <div className="row gx-5">
                        <div className="col-lg-3 filter_container order-2 oerder-lg-1">
                            <div className="filter_wrapper">
                                <div className="filter_type">
                                    <div className="filter_title">
                                        <h3>By Categories</h3>
                                    </div>
                                    <ul className="controal">
                                        {categories.map((category, index) => (
                                            <li
                                                key={index}
                                                className={activeFilters.category === index ? 'active' : ''}
                                                onClick={() => handleCategories(category, index)}>{category}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="filter_type">
                                    <div className="filter_title">
                                        <h3>By Size</h3>
                                    </div>
                                    <ul className="controal size">
                                        {sizes.map((size, index) => (
                                            <li
                                                key={index}
                                                className={activeFilters.size === index ? 'active' : ''}
                                                onClick={() => handleSizes(size, index)}>{size}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="filter_type">
                                    <div className="filter_title">
                                        <h3>By Color</h3>
                                    </div>
                                    <ul className="controal color">
                                        {color.map((color, index) => (
                                            <li
                                                key={index}
                                                className={activeFilters.color === index ? 'active' : ''}
                                                style={{ backgroundColor: color }}
                                                onClick={() => handleColors(color, index)}></li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="filter_type">
                                    <div className="filter_title">
                                        <h3>By Price</h3>
                                    </div>
                                    <div className="controal">
                                        <div className="price_range">
                                            <h4>{`₹516`}</h4>
                                            <h4>{`₹${range}`}</h4>
                                        </div>
                                        <input type="range"
                                            min="516"
                                            max="2000"
                                            value={range}
                                            onChange={handleRange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-9 order-1 oerder-lg-2">
                            <div className="row">
                                {allProducts.length <= 0 ?
                                    (
                                        <div className="col-12 text-center p-5 align-self-center"><h1>No Product Founds</h1></div>

                                    ) : (allProducts.map((product, index) => {
                                        const discountPercentage = Math.round(((product.regular_price - product.sales_price) / product.regular_price) * 100);
                                        return (
                                            <div className="col-6 col-lg-4" key={index}>
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
                                        );
                                    }))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Shop;
