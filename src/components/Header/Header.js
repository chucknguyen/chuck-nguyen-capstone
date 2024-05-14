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
    return (
      <nav className='nav'>
          <div className='nav__cont'>
              <Link to="/home" className='nav__link'><img src={logo} alt='logo' className='nav__logo'/></Link>
              <Link to="/catalog" className='nav__link'>Catalog</Link>
          </div>
          <div className='nav__bar'> 
            <div className='nav__icon-cont'> 
              <FontAwesomeIcon icon={faStore} className='nav__icon fa-2x' alt='Your Store'/>
              <p className='nav__icon-text'>Your Store</p>
            </div>
            <div className='nav__icon-cont'>
              <FontAwesomeIcon icon={faUser} className='nav__icon fa-2x' alt='Your Account'/>
              <p className='nav__icon-text'>Your Account</p>
            </div>
            <div className='nav__icon-cont'>
              <FontAwesomeIcon icon={faCartShopping} className='nav__icon fa-2x nav__icon--cart' alt='Your Cart' onClick={()=> setOpenCart(!openCart)}/>
              <p className='nav__icon-text'>Your Cart</p>
            </div>
          </div>
      </nav>
    )
}

export default Header
