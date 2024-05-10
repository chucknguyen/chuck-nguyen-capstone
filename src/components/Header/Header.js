import React from 'react'
import logo from '../../assets/logos/logo.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons/faCartShopping'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import { faStore } from '@fortawesome/free-solid-svg-icons/faStore'
import './Header.scss'
const Header = ({setOpenCart, openCart}) => {
    const navigate = useNavigate();
    console.log(openCart);
  return (
    <nav className='nav'>
        <div className='nav__cont'>
            <Link to="/home"><img src={logo} alt='logo' className='nav__logo'/></Link>
            <Link to="/catalog" className='nav__link'>Catalog</Link>
        </div>
        <div className='nav__cont'> 
            <FontAwesomeIcon icon={faStore} className='nav__icon fa-2x' alt='Your Store'/>
            <FontAwesomeIcon icon={faUser} className='nav__icon fa-2x' alt='Your Account'/>
            <FontAwesomeIcon icon={faCartShopping} className='nav__icon fa-2x nav__icon--cart' alt='Your Cart' onClick={()=> setOpenCart(!openCart)}/>
        </div>
    </nav>
  )
}

export default Header
