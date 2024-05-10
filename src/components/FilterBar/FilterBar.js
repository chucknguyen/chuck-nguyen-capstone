import React from 'react'
import './FilterBar.scss'
import Slider from 'react-slider'
import { useState } from 'react'
const FilterBar = () => {
    const min = 0;
    const max = 4000;
    const [value, setValue] = useState([min,max])
    return (
        <aside className='aside'>
            <h2 className='aside__header'>Find your items</h2>
            <input type="text" placeholder='Search...' />
            <button className='aside__btn aside__btn--search'>Search</button>
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
                    <h3>Price Range</h3>
                    <p>{value[0]} - {value[1]}</p>
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
