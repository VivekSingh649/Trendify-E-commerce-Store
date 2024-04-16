import React from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Categories from './components/Categories'
import SingleProduct from './components/SingleProduct'
import Cart from './components/Cart'
import Shop from './components/Shop'
import Login from './components/Login'
import Signup from './components/Signup'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home/Home'
import { Provider } from 'react-redux'
import { store } from './store/store'


function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/categories/:categoryName" element={<Categories />} />
            <Route path="/products/:productId" element={<SingleProduct />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
          <Footer />
        </Router>

      </Provider>
    </>
  )
}

export default App
