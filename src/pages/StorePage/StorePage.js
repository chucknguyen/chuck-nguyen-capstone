import React, { useState, useEffect } from 'react'
import Header from '../../components/Header/Header'
import Cart from '../../components/Cart/Cart'
const StorePage = () => {
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')));
    const [openCart, setOpenCart] = useState(false);
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
        }, [cart])
    return (
        <div>
            <Header setOpenCart={setOpenCart} openCart={openCart}/>
            <div className='store-page'>
                <h1>Store Page</h1>
                <section className='store-page__cont'>
                    <h2>Store Catalog</h2>

                </section>
            </div>
            <Cart openCart={openCart} cart={cart} setCart={setCart}/>
        </div>
    )
}

export default StorePage
