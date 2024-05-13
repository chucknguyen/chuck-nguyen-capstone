import React from 'react'
import './FilterBar.scss'
import Slider from 'react-slider'
import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
const FilterBar = ({catalog}) => {
    const min = 0;
    const max = 4000;
    const [value, setValue] = useState([min,max]);
    const [searchValue, setSearchValue] = useState('');
    const search = useRef(null);
    
    return (
        <aside className='aside'>
            <h2 className='aside__header'>Find your items</h2>
            <div className='aside__search'>
                <input type="text" placeholder='Search...' ref={search} onChange={() => setSearchValue(search.current.value)} className='aside__search-input'/>
                <div className='aside__search-results'>
                {searchValue && catalog.filter(item => item.item_name && item.item_name.toLowerCase().includes(searchValue.toLowerCase())).map(item => (
                    <Link to={`/item/${item.id}`} key={item.id} className='aside__search-link'>{item.item_name}</Link>))}
                </div>
            </div>
            <form className='aside__form'>
                <label className='aside__form-label'>Type
                    <select>
                        <option value="all">All</option>
                        <option value="womens">Womens</option>
                        <option value="mens">Mens</option>
                    </select>
                </label>
                <label className='aside__form-label'>Brand
                    <select>
                        <option value="all">All</option>
                        <option value="womens">Womens</option>
                        <option value="mens">Mens</option>
                    </select>
                </label>
                <div className='aside__form-label'>
                    <h3 className='aside__form-price'>Price Range</h3>
                    <p className='aside__form-range'>${value[0]} - ${value[1]}</p>
                    <Slider
                        className='slider'
                        min={min}
                        max={max}
                        value={value}
                        onChange={setValue}
                    />
                </div>
            <button className='aside__btn aside__btn--filter'>Filter</button>

            </form>
        </aside>
    )
}

export default FilterBar
