import React, { useState } from 'react'
import images from '../../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import productLists from '../../productsList'

function Header() {
    const items = useSelector(state => state.cart);
    const [search, setSearch] = useState("")
    const [isActive, setIsActive] = useState(false);
    const [allProducts, setAllProducts] = useState([]);

    const handleSearch = (e) => {
        setSearch(e.target.value);
        let filteredProducts = productLists.filter(product => product.name.trim().toLocaleLowerCase().includes(search));
        setAllProducts(filteredProducts);
        setIsActive(true)

        if (e.target.value === "") {
            setAllProducts([])
            setIsActive(!isActive);
        }
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/"><img src={images.logo} alt="" /></Link>
                    <div className="toggleBtn_wrapper">
                        <Link className="icon_btn" to='/cart'>
                            <i className="bi bi-cart-check"></i>
                            <div className="cart_count">{items.length}</div>
                        </Link>
                        <button className="toggleBtn" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <i class="bi bi-list"></i>
                        </button>
                    </div>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/categories/mens">Mens</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/categories/womens">Womens</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/categories/sneakers">Sneakers</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/shop">Shop</NavLink>
                            </li>
                        </ul>
                        <div className="header_search">
                            <input
                                type="text"
                                placeholder="Search for products, brands and more"
                                value={search}
                                onChange={handleSearch} />
                            <i className="bi bi-search"></i>
                            <ul className={isActive ? "search_result active" : "search_result"}>
                                {allProducts.length > 0 ?
                                    (allProducts.map((product, index) => (
                                        <li key={index}>
                                            <Link className="image" to={`/products/${product.id}`}>
                                                <img src={product.featured_image} alt={product.name} />
                                            </Link>
                                            <div className="content">
                                                <Link className="image" to={`/products/${product.id}`}>
                                                    <h2>{product.name}</h2>
                                                </Link>
                                            </div>
                                        </li>
                                    ))) : (
                                        <h3>Products not found!</h3>
                                    )}
                            </ul>
                        </div>
                        <div className="header_icons">
                            <Link className="icon_btn" to='/cart'>
                                <i className="bi bi-cart-check"></i>
                                <div className="cart_count">{items.length}</div>
                            </Link>
                            <button className='btn-first'>
                                <span>Login</span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header
