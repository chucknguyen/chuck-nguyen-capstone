import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header/Header';
import CartItem from '../../components/CartItem/CartItem';
import Cart from '../../components/Cart/Cart';
import './CartPage.scss'
const CartPage = () => {
  const navigate = useNavigate();
  const [cart,setCart] = useState(JSON.parse(localStorage.getItem('cart')));
  const [openCart,setOpenCart] = useState(false);
  const proceedToCheckout = (e) => {
      e.preventDefault();
      navigate("/home")
  }
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart])
  if (!cart) return <p>Loading ... </p>
  return (
    <div className='cart-page'>
      <Header setOpenCart={setOpenCart} openCart={openCart}/>
      <Cart cart={cart} setCart={setCart} openCart={openCart}/>
      <section className='cont'>
        <h1 className='cont__header'>Your Cart</h1>
        <div>
          {cart.items.map(cartItem => <CartItem cartItem={cartItem} setCart={setCart} key={cartItem.id}/>)}
        </div>
        <h3>Total amount: ${cart ? cart?.items?.reduce((acc, item) => acc + item.price * item.qty, 0) : 0}</h3>
        <button className='cont__btn' onClick={proceedToCheckout}>Proceed to checkout</button>
      </section>
    </div>
  )
}

export default CartPage
