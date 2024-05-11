import React from 'react'
import { Link } from 'react-router-dom'
import './LoginPage.scss'
import logo from '../../assets/logos/logo.svg'
const LoginPage = () => {
  return (
    <div className='login'>
        <div className='login__cont'>
            <img src={logo} alt='logo' className='login__logo'/>
            <h1 className='login__header'>Log In</h1>
            <form className='login__form'>
                <label className='login__form-label'>
                    Username
                    <input type="text" name='username' className='login__form-input' required/>
                </label>
                <label className='login__form-label'>
                    Password
                    <input type="password" name='password' className='login__form-input' required/>
                </label>
                <p>Forgot your password?</p>
                <button className='login__form-btn' onClick={(e) => e.preventDefault()}>Log In</button>
            </form>
            <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
            <Link to={'/home'} className='login__link'>Continue as Guest</Link>
        </div>
    </div>
  )
}

export default LoginPage
