import React from 'react'
import './Item.scss'
import axios from 'axios'
const Item = ({item, query}) => {
    const handleAddItem = async () => {
        try {
            axios.post("http://localhost:8080/cart", {item_name:item.item_name, price:item.price})
        } catch (error) {
            console.error(error);
        }
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
                <button className='item__buy'>Buy Now</button>
            </div>
        </article>
        
  )
}

export default Item

