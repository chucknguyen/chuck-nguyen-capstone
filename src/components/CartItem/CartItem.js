import React from 'react'
import './CartItem.scss'
const CartItem = ({cartItem, setCart}) => {
    const removeItem = (itemId) => {
        const currentCart = JSON.parse(sessionStorage.getItem('cart'));
        const newCart = {
            ...currentCart,
            items: currentCart.items.filter(cartItem => cartItem.id !== itemId)
        }
        setCart(newCart);
        console.log(newCart);
    }
    return (
        <article className='cart-item'>
            <img className='cart-item__image' src={cartItem.media[0]} alt={cartItem.item_name} />
            <div className='cart-item__info'>
                <h3 className='cart-item__name'>{cartItem.item_name}</h3>
                <p className='cart-item__price'>${cartItem.price}</p>
                <p className='cart-item__qty'>Qty: {cartItem.qty}</p>
                <button onClick={(e) => {e.preventDefault(); removeItem(cartItem.id);}} className='cart-item__remove'>Remove</button>
            </div>
        </article>
    )
}

export default CartItem
