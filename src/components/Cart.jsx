import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeCart } from '../store/cartSlice';

function Cart() {
    const products = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const [quantities, setQuantities] = useState({});
    const [discount, setDiscount] = useState(0);
    const [discountCoupon, setDiscountCoupon] = useState('');
    const PROMOCODE = "FREE";

    useEffect(() => {
        const initialQuantities = {};
        products.forEach(product => {
            initialQuantities[product.id] = 1;
        });
        setQuantities(initialQuantities);
    }, [products]);

    const handleRemove = (id) => {
        dispatch(removeCart(id));
    }

    const increaseQuantity = (id) => {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [id]: (prevQuantities[id] || 0) + 1,
        }));
    }

    const decreaseQuantity = (id) => {
        if (quantities[id] > 1) {
            setQuantities(prevQuantities => ({
                ...prevQuantities,
                [id]: prevQuantities[id] - 1,
            }));
        }
    }

    const getSubTotal = (product) => {
        const price = product.sales_price ? product.sales_price : product.regular_price;
        return quantities[product.id] * price;
    }

    const getTotal = () => {
        const subtotal = products.reduce((total, product) => total + getSubTotal(product), 0);
        const total = subtotal - discount;
        return total;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (PROMOCODE === discountCoupon) {
            alert("Coupon is right")
            setDiscount(100)
        } else {
            alert("This Coupon is Invalid");
        }
    }

    return (
        <section className="bg-gray default-padding">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="row gx-5 gy-5 mt-0">
                        <div className="col-lg-9">
                            <h3 className="card-header">Shopping Bag</h3>
                            <table className="custom_table table-responsive">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product, index) => (
                                        <tr key={index}>
                                            <td><i className="bi bi-trash3" onClick={() => handleRemove(product.id)}></i></td>
                                            <td className='image_wrapper'>
                                                <Link className="image" to={`/products/${product.id}`}><img src={product.featured_image ? product.featured_image : product.product.featured_image} alt={product.name} /></Link>
                                                <div className="product_content">
                                                    <h3>{product.name}</h3>
                                                    <div className="cart_attributes">
                                                        <div className="cart_attributes">
                                                            <h4>Color: <span>{product.selectedColor ? product.selectedColor : "Red"}</span></h4>
                                                            <h4>Size: <span>{product.selectedSize ? product.selectedSize : "S"}</span></h4>
                                                        </div>
                                                    </div>
                                                    <h4>ID: <span>{product.id}</span></h4>
                                                </div>
                                            </td>
                                            <td>{product.sales_price ? `₹${product.sales_price}` : `₹${product.regular_price}`}</td>
                                            <td>
                                                <div className="qunatity_btns">
                                                    <div className="icon"><i className="bi bi-dash-circle-fill" onClick={() => decreaseQuantity(product.id)}></i></div>
                                                    <input type="number" value={quantities[product.id]} onChange={(e) => setQuantities({ ...quantities, [product.id]: parseInt(e.target.value) || 1 })} />
                                                    <div className="icon"><i className="bi bi-plus-circle-fill" onClick={() => increaseQuantity(product.id)}></i></div>
                                                </div>
                                            </td>
                                            <td>{`₹${getSubTotal(product)}`}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="row mt-5 justify-content-between">
                                <div className="col-md-6">
                                    <form className='global_white' onSubmit={handleSubmit}>
                                        <div className="input_wrapper d-flex gap-3">
                                            <input type="text" placeholder="Promo Code Here" value={discountCoupon} onChange={(e) => setDiscountCoupon(e.target.value)} />
                                            <button type="submit" className="btn-first">Apply</button>
                                        </div>
                                    </form>
                                </div>
                                <div className="col-md-6 col-lg-4 align-self-center text-end">
                                    <button className="btn-first">
                                        Update Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <h3 className="card-header">Cart Totals</h3>
                            <div className="global_white">
                                <ul className="cart_list">
                                    <li>
                                        Subtotal: <span>{`₹${getTotal()}`}</span>
                                    </li>
                                    <li>
                                        Discount: <span>{`₹${discount}`}</span>
                                    </li>
                                    <li>
                                        Free Shipping: <span>₹0</span>
                                    </li>
                                    <li>
                                        Total: <span>{`₹${getTotal()}`}</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="d-grid gap-2 mt-3">
                                <button type="button" className="btn-first secondary">PROCEED TO CHECKOUT</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
}

export default Cart;
