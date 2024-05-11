import React from 'react'
import './SignupPage.scss'
import { Link } from 'react-router-dom'
import logo from '../../assets/logos/logo.svg'
const SignupPage = () => {
  return (
    <div className='signup'>
        <div className='signup__cont'>
            <img src={logo} alt='logo' className='signup__logo'/>
            <h1 className='signup__header'>Sign Up</h1>
            <form className='signup__form'>
                <label className='signup__form-label'>
                    Your Name
                    <input type="text" name='name' className='signup__form-input' required/>
                </label>
                <label className='signup__form-label'>
                    Your email address
                    <input type="text" name='email' className='signup__form-input' required/>
                </label>
                <label className='signup__form-label'>
                    Username
                    <input type="text" name='username' className='signup__form-input' required/>
                </label>
                <label className='signup__form-label'>
                    Password
                    <input type="password" name='password' className='signup__form-input' required/>
                </label>
                <button className='signup__form-btn'>Sign Up</button>
            </form>
            <p>Already have an account? <Link to="/login">Log In</Link></p>
            <Link to={'/home'} className='signup__link'>Continue as Guest</Link>
        </div>
    </div>
  )
}

export default SignupPage
