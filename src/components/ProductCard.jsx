import React from 'react'
import { Link } from 'react-router-dom'

function ProductCard(props) {
    return (
        <>
            <div className="product_wrapper">
                <div className="featured_image">
                    <Link to={`/products/${props.id}`}>
                        <img src={props.featured_image} alt="" />
                    </Link>
                    <button className="quick-btn add_to_cart" onClick={props.onClick}>
                        <i className="bi bi-cart-check"></i>Add to Cart
                    </button>
                    <div className="quick-btn off_bage">
                        {props.offer}
                    </div>
                </div>
                <div className="product_content">
                    <h3>{props.name}</h3>
                    <div className="price_wrapper">
                        <h4>₹{props.sales_price} <span>₹{props.regular_price}</span></h4>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductCard
