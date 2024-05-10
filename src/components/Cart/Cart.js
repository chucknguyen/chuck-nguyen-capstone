import React from 'react'
import './Cart.scss'
const Cart = ({openCart}) => {
    return (
        <aside className={`cart ${openCart ? 'cart--open' : 'cart--closed'}`}>
            <h2 className='cart__header'>Your Cart</h2>
            <div className='cart__cont'>
                <article className='cart__item'>
                    <img src='http://localhost:8080/jflowers-1.jpg' className='cart__img'></img>
                    <div className='cart__info'>
                        <h3 className='cart__title'>Item</h3>
                        <p className='cart__price'>Price</p>
                        <p className='cart__qty'><span>-</span> 1 <span>+</span></p>
                    </div>
                </article>
                <article className='cart__item'>
                    <img src='http://localhost:8080/jflowers-1.jpg' className='cart__img'></img>
                    <div className='cart__info'>
                        <h3 className='cart__title'>Item</h3>
                        <p className='cart__price'>Price</p>
                        <p className='cart__qty'><span>-</span> 1 <span>+</span></p>
                    </div>
                </article>
                <article className='cart__item'>
                    <img src='http://localhost:8080/jflowers-1.jpg' className='cart__img'></img>
                    <div className='cart__info'>
                        <h3 className='cart__title'>Item</h3>
                        <p className='cart__price'>Price</p>
                        <p className='cart__qty'><span>-</span> 1 <span>+</span></p>
                    </div>
                </article>
            </div>
            <div className='cart__total'>
                <h3 className='cart__total-header'>Subtotal</h3>
                <button className='cart__btn'>Checkout</button>
            </div>
        </aside>
    )
}

export default Cart
