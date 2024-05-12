import React, { useState } from 'react'
import './Cart.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
const Cart = ({openCart,cart,setCart}) => {
    const addItem = (itemId) => {
        const currentCart = JSON.parse(localStorage.getItem('cart'));
        const newCart = {
            ...currentCart,
            items: currentCart.items.map(cartItem => {
                if (cartItem.id === itemId) {
                    return {
                        ...cartItem,
                        qty: cartItem.qty + 1
                    }
                } else {
                    return cartItem
                }
            })
        }
        setCart(newCart);
    }

    const subtractItem = (itemId) => {
        const currentCart = JSON.parse(localStorage.getItem('cart'));
        const subtractedItem = currentCart.items.find(cartItem => cartItem.id === itemId);
        if (subtractedItem.qty === 1) {
            const newCart = {
                ...currentCart,
                items: currentCart.items.filter(cartItem => cartItem.id !== itemId)
            }
            setCart(newCart);
            return;
        }
        const newCart = {
            ...currentCart,
            items: currentCart.items.map(cartItem => {
                if (cartItem.id === itemId) {
                    return {
                        ...cartItem,
                        qty: cartItem.qty - 1
                    }
                } else {
                    return cartItem
                }
            })
        }
        setCart(newCart);
    }
    
    const removeItem = (itemId) => {
        const currentCart = JSON.parse(localStorage.getItem('cart'));
        const newCart = {
            ...currentCart,
            items: currentCart.items.filter(cartItem => cartItem.id !== itemId)
        }
        setCart(newCart);
    }
    return (
        <aside className={`cart ${openCart ? 'cart--open' : 'cart--closed'}`}>
            <h2 className='cart__header'>Your Cart</h2>
            <div className='cart__cont'>
                {cart.items.length>0 ?cart.items.map(item => 
                <article className='cart__item' key={item.id}>
                    <img src={item.media[0]} className='cart__img'></img>
                    <div className='cart__info'>
                        <h3 className='cart__title'>{item.item_name}</h3>
                        <p className='cart__price'>${item.price}</p>
                        <p className='cart__qty'><span className='cart__qty-btn' onClick={(e) => {e.preventDefault(); subtractItem(item.id)}}>—</span> <span className='cart__qty-num'>{item.qty}</span> <span className='cart__qty-btn' onClick={(e) => {e.preventDefault(); addItem(item.id)}}>+</span></p>
                        <FontAwesomeIcon icon={faTrash} className='cart__icon' alt='Delete Item' onClick={(e) => {e.preventDefault(); removeItem(item.id)}}/>
                    </div>
                </article>) : <h3>No items in your cart</h3>}
            </div>
            <div className='cart__total'>
                <h3 className='cart__total-header'>Subtotal: ${cart ? cart.items.reduce((acc, item) => acc + item.price * item.qty, 0) : 0}</h3>
                <button className='cart__btn'>Checkout</button>
            </div>
        </aside>
    )
}

export default Cart
