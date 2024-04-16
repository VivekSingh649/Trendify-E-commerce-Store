import React from 'react'
import images from '../../assets/assets'
import { Link } from 'react-router-dom'


function Footer() {
    return (
        <footer style={{ backgroundColor: "#f8eae2" }}>
            <div className="container">
                <div className="row p-4">
                    <div className="col-md-6 col-lg-4">
                        <Link href="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
                            <img src={images.logo} alt="" />
                        </Link>
                        <ul className='d-flex gap-4 footer_icon'>
                            <li><Link to="#!"><i className="bi bi-instagram"></i></Link></li>
                            <li><Link to="#!"><i className="bi bi-facebook"></i></Link></li>
                            <li><Link to="#!"><i className="bi bi-whatsapp"></i></Link></li>
                        </ul>
                    </div>
                    <div className="col-md-6 col-lg-4">
                        <h2 className='footer_title'>Quick Links</h2>
                        <ul>
                            <li><Link to="/categories/men">Mens Collection</Link></li>
                            <li><Link to="/categories/women">Womens Collection</Link></li>
                            <li><Link to="/shop">Our Store</Link></li>
                        </ul>
                    </div>
                    <div className="col-md-6 col-lg-4">
                        <h2 className='footer_title'>New's Letter</h2>
                        <div className="input_wrapper mt-4">
                            <form action="">
                                <input type="email" placeholder='Enter your Email' required />
                                <button type='submit' className='btn-first mt-3 secondary'><span>Submit</span></button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="copyright_line">
                © 2024 Trendyfy. All rights reserved.
            </div>
        </footer>
    )
}

export default Footer
