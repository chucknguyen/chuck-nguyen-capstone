import React from 'react'
import Hero from '../../components/Hero/Hero'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Item from '../../components/Item/Item'
import { useSearchParams } from 'react-router-dom'
const HomePage = () => {
    const [catalog, setCatalog] = useState([]);
    const [searchParams] = useSearchParams()
    const query = searchParams.get("checkout");
    const fetchCatalog = async () => {
        try {
            const response = await axios.get('http://localhost:8080/inventory');
            const data = response.data;
            setCatalog(data);
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        fetchCatalog();
    }, [])
    if (!catalog) return <p>Loading ... </p>
    return (
        <div>
            <Hero />
            <section className='suggestions'>
                <h2>Featured products</h2>
                {catalog.map(item => <Item key={item.id} item={item} query={query}/> )}
            </section>
        </div>
  )
}

export default HomePage
