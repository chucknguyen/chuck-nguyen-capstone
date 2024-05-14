import React from 'react'
import './Item.scss'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Item = ({item, setCart, setOpenCart}) => {
    const navigate = useNavigate();
    const handleAddItem = (e) => {
        e.preventDefault();
        const currentCart = JSON.parse(localStorage.getItem('cart'));
        setOpenCart(true);
        if (!currentCart) {
            const cart = {
                items: [
                    {
                        id: item.id,
                        item_name: item.item_name,
                        price: item.price,
                        qty: 1,
                        media: item.media
                    }
                ]
            }
            setCart(cart);
        } else {
            if (currentCart.items.find(cartItem => cartItem.id === item.id)) {
                const cart = {
                    ...currentCart,
                    items: currentCart.items.map(cartItem => {
                        if (cartItem.id === item.id) {
                            return {
                                ...cartItem,
                                qty: cartItem.qty + 1
                            }
                        } else {
                            return cartItem
                        }
                    })
                }
                setCart(cart);
            }
            else {
                const cart = {
                    items: [
                        ...currentCart.items,
                        {
                            id: item.id,
                            item_name: item.item_name,
                            price: item.price,
                            qty: 1,
                            media: item.media
                        }
                    ]
                }
                setCart(cart);
            }
        }
    }
    const buyNow = (e) => {
        e.preventDefault();
        const currentCart = JSON.parse(localStorage.getItem('cart'));
        if (!currentCart) {
            const cart = {
                items: [
                    {
                        id: item.id,
                        item_name: item.item_name,
                        price: item.price,
                        qty: 1,
                        media: item.media
                    }
                ]
            }
            setCart(cart);
        } else {
            if (currentCart.items.find(cartItem => cartItem.id === item.id)) {
                const cart = {
                    ...currentCart,
                    items: currentCart.items.map(cartItem => {
                        if (cartItem.id === item.id) {
                            return {
                                ...cartItem,
                                qty: cartItem.qty + 1
                            }
                        } else {
                            return cartItem
                        }
                    })
                }
                setCart(cart);
            }
            else {
                const cart = {
                    items: [
                        ...currentCart.items,
                        {
                            id: item.id,
                            item_name: item.item_name,
                            price: item.price,
                            qty: 1,
                            media: item.media
                        }
                    ]
                }
                setCart(cart);
            }
        }
        setTimeout(() => {
            navigate('/cart');
        }, 500);
    }   
    return (
        <article className='item'>
            <div className='image-container'>
                <img src={item.media[0]} className='item__img' alt={item.item_name} />
            </div>
            <div className='item__cont'>
                <h3 className='item__title'>{item.item_name}</h3>
                <p className='item__price'>Price: ${item.price}</p>
                <button className='item__add' onClick={handleAddItem}>Add to Cart</button>
                <button className='item__buy' onClick={buyNow}>Buy Now</button>
            </div>
        </article>
        
  )
}

export default Item

