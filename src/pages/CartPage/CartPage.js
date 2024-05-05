import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const CartPage = () => {
    const navigate = useNavigate();
    const [cart,setCart] = useState([])
    const fetchCart = async () => {
        try {
            const response = await axios.get('http://localhost:8080/inventory');
            const data = response.data;
            setCart(data)
        } catch (error) {
            console.error(error)
        }
    }
    const proceedToCheckout = (e) => {
        e.preventDefault();
        navigate("/home?checkout=yes")

    }
    useEffect(() => {
        fetchCart();
    }, [])
    if (!cart) return <p>Loading ... </p>
  return (
    <div>
      {
        cart.map(item => <article key={item.id}>
            <h3>{item.item_name}</h3>
            <p>Price: {item.price}</p>
            <p>Quantity: 1</p>
        </article>)
      }
      <button onClick={proceedToCheckout}>Proceed to checkout</button>
    </div>
  )
}

export default CartPage
