import React from 'react'
import Header from '../../components/Header/Header'
import Cart from '../../components/Cart/Cart'
import './Catalog.scss'
import { useState } from 'react'
const Catalog = () => {
  const [openCart, setOpenCart] = useState(false);
  return (
      <div className='catalog'>
          <Header setOpenCart={setOpenCart} openCart={openCart}/>
          <div className='catalog__hero'>
            <h1>Catalog</h1>
          </div>
          <Cart openCart={openCart}/>
      </div>
  )
}

export default Catalog
