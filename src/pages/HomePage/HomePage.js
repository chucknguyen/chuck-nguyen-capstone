import React from 'react'
import Hero from '../../components/Hero/Hero'
import axios from 'axios'
import { useState, useMemo } from 'react'
import Item from '../../components/Item/Item'
import { useSearchParams } from 'react-router-dom'
import FilterBar from '../../components/FilterBar/FilterBar'
import Cart from '../../components/Cart/Cart'
import './HomePage.scss'
import Header from '../../components/Header/Header'
const HomePage = () => {
    const [catalog, setCatalog] = useState([]);
    const [openCart, setOpenCart] = useState(false);
    const [searchParams] = useSearchParams()
    const query = searchParams.get("checkout");
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
        <div className='homepage'>
            <Header setOpenCart={setOpenCart} openCart={openCart}/>
            <Hero />
            <Cart openCart={openCart}/>
            <div className='homepage__main'>
                <FilterBar />
                <section className='suggestions'>
                    <h2>Featured products</h2>
                    <div className='suggestions__cont'>
                        {catalog.map(item => <Item key={item.id} item={item} query={query}/> )}
                    </div>
                </section>
                
            </div>
        </div>
  )
}

export default HomePage
