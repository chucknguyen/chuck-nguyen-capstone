import React, { useEffect, useState } from 'react'
import logo from '../../assets/logos/logo.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons/faCartShopping'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import { faStore } from '@fortawesome/free-solid-svg-icons/faStore'
import './Header.scss'
import axios from 'axios'
const Header = ({setOpenCart, openCart}) => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState('');
    const JWTtoken = sessionStorage.getItem("JWTtoken");
    const checkAuth = async () => {
        try {
            const response = await axios.get('http://localhost:8080/user/auth', { headers: { Authorization: `Bearer ${JWTtoken}` } });
            setUserId(response.data);
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        checkAuth();
    }, [])
    return (
      <nav className='nav'>
          <div className='nav__cont'>
              <Link to="/home" className='nav__link'><img src={logo} alt='logo' className='nav__logo'/></Link>
              <Link to="/catalog" className='nav__link'>Catalog</Link>
          </div>
          <div className='nav__bar'> 
            <div className='nav__icon-cont'> 
              <FontAwesomeIcon icon={faStore} className='nav__icon fa-2x' alt='Your Store' onClick={() => navigate(`/store/${userId}`)}/>
              <p className='nav__icon-text'>Your Store</p>
            </div>
            <div className='nav__icon-cont'>
              <FontAwesomeIcon icon={faUser} className='nav__icon fa-2x' alt='Your Account' onClick={() => navigate(`/login`)}/>
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
