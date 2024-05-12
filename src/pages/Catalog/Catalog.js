import React from 'react'
import Header from '../../components/Header/Header'
import Cart from '../../components/Cart/Cart'
import './Catalog.scss'
import { useState, useMemo } from 'react'
import Item from '../../components/Item/Item'
import FilterBar from '../../components/FilterBar/FilterBar'
import axios from 'axios'
const Catalog = () => {
  const [openCart, setOpenCart] = useState(false);
  const [catalog, setCatalog] = useState([]);
  const fetchCatalog = useMemo(() => {
      const fetchData = async () => {
          try {
              const response = await axios.get('http://localhost:8080/inventory');
              const data = response.data;
              setCatalog(data);
              return data;
          } catch (error) {
              console.error(error)
          }
      }
      return fetchData();
  }, []);
  if (!catalog) return <p>Loading ... </p>
  return (
      <div className='catalog'>
          <Header setOpenCart={setOpenCart} openCart={openCart}/>
          <main className='catalog__main'>
            <section className='catalog__hero'>
              <h1 className='catalog__hero-header'>Explore Our Catalog</h1>
              <h2 className='catalog__hero-slogan'>We have everything you need for your next adventure</h2>
            </section>
            <section className='catalog__list'>
                <FilterBar />
                <div className='catalog__list-cont'>
                    {catalog.map(item => <Item key={item.id} item={item}/>)}
                </div>
            </section>
            <Cart openCart={openCart}/>
          </main>
      </div>
  )
}

export default Catalog
