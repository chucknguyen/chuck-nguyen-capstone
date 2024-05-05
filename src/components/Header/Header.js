import React from 'react'
import logo from '../../assets/logos/logo.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons/faCartShopping'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass'
import './Header.scss'
const Header = () => {
    const navigate = useNavigate();
  return (
    <nav className='nav'>
        <div className='nav__cont'>
            <Link to="/home"><img src={logo} alt='logo' className='nav__logo'/></Link>
            <Link to="/catalog" className='nav__link'>Catalog</Link>
        </div>
        <div className='nav__cont'> 
            <FontAwesomeIcon icon={faMagnifyingGlass} className='nav__icon fa-2x'/>
            <FontAwesomeIcon icon={faUser} className='nav__icon fa-2x'/>
            <FontAwesomeIcon icon={faCartShopping} className='nav__icon fa-2x' onClick={() => navigate('/cart')}/>
        </div>
    </nav>
  )
}

export default Header
