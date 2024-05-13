import React from 'react'
import Hero from '../../components/Hero/Hero'
import axios from 'axios'
import { useState, useMemo, useEffect } from 'react'
import Item from '../../components/Item/Item'
import { useSearchParams } from 'react-router-dom'
import FilterBar from '../../components/FilterBar/FilterBar'
import Cart from '../../components/Cart/Cart'
import './HomePage.scss'
import Header from '../../components/Header/Header'
const HomePage = () => {
    const [catalog, setCatalog] = useState([]);
    const [openCart, setOpenCart] = useState(false);
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')));
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const JWTtoken = sessionStorage.getItem("JWTtoken");
    const fetchCart = async () => {
        try {
            const response = await axios.get('http://localhost:8080/cart', { headers: { Authorization: `Bearer ${JWTtoken}` } });
            const data = response.data.existing;
            setCart({items:data});
        } catch (error) {
            console.error(error)
        }
    }
    
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

    useEffect(() => {
        if (JWTtoken) {
          setIsLoggedIn(true);
          fetchCart();
        }
      }, [JWTtoken]);
    
    useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);
    if (!catalog) return <p>Loading ... </p>
    return (
        <div className='homepage'>
            <Header setOpenCart={setOpenCart} openCart={openCart}/>
            <div className='homepage__cont'>
                <Hero />
                <Cart openCart={openCart} cart={cart} setCart={setCart}/>
                <div className='homepage__main'>
                    <FilterBar catalog={catalog}/>
                    <section className='suggestions'>
                        <h2>Featured products</h2>
                        <div className='suggestions__cont'>
                            {catalog.map(item => <Item key={item.id} item={item} setCart={setCart} cart={cart}/> )}
                        </div>
                    </section>
                    
                </div>
            </div>
        </div>
  )
}

export default HomePage
