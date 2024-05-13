import React, { useState } from 'react'
import './SignupPage.scss'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/logos/logo.svg'
import axios from 'axios'
const SignupPage = () => {
    const navigate = useNavigate();
    const [invalidPassword, setInvalidPassword] = useState(false);
    const [invalidUsername, setInvalidUsername] = useState(false);
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [invalidName, setInvalidName] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        username: '',
        password: ''
    })
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, username, password } = formData;
        setInvalidName(false);
        setInvalidEmail(false);
        setInvalidUsername(false);
        setInvalidPassword(false);
        if (
            password.length < 8 ||    
            password.length > 20 ||    
            !/[a-z]/.test(password) ||  
            !/[A-Z]/.test(password) ||  
            !/\d/.test(password) || 
            !/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password) 
          ) {
            setInvalidPassword(true);
            return;
          }
        if (!name ) {
            setInvalidName(true);
            return;
        }
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            setInvalidEmail(true);
            return;
        }
        if (!username || username.length < 4 || username.length > 20) {
            setInvalidUsername(true);
            return;
        }
        try {
            const response = await axios.post('http://localhost:8080/signup', formData);
            console.log(response);
            navigate('/login');
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.error);
            }
            console.error(error)
        }
    }
    return (
        <div className='signup'>
            <div className='signup__cont'>
                <img src={logo} alt='logo' className='signup__logo'/>
                <h1 className='signup__header'>Sign Up</h1>
                {error && <p className='signup__form-error'>{error}</p>}
                <form className='signup__form' onSubmit={handleSubmit}>
                    <label className='signup__form-label'>
                        Your Name
                        <input type="text" name='name' className={invalidName ? 'signup__form-input signup__form-input--invalid' : 'signup__form-input'} required onChange={handleChange} />
                    </label>
                    <label className='signup__form-label'>
                        Your email address
                        <input type="text" name='email' className={invalidEmail ? 'signup__form-input signup__form-input--invalid' : 'signup__form-input'} required onChange={handleChange} />
                        {invalidEmail && <p className='signup__form-error'>Please enter a valid email address</p>}
                    </label>
                    <label className='signup__form-label'>
                        Username
                        <input type="text" name='username' className={invalidUsername ? 'signup__form-input signup__form-input--invalid' : 'signup__form-input'} required onChange={handleChange} />
                        {invalidUsername && <p className='signup__form-error'>Valid username must be between 4 and 20 characters</p>}
                    </label>
                    <label className='signup__form-label'>
                        Password
                        <input type="password" name='password' className={invalidPassword ? 'signup__form-input signup__form-input--invalid' : 'signup__form-input'} required onChange={handleChange} />
                        {invalidPassword && <p className='signup__form-error'>Password must be between 8 and 20 characters, contain both lower and upper case letters, at least one number and one special character</p>}
                    </label>
                    <button className='signup__form-btn' type='submit'>Sign Up</button>
                </form>
                <p>Already have an account? <Link to="/login">Log In</Link></p>
                <Link to={'/home'} className='signup__link'>Continue as Guest</Link>
            </div>
        </div>
    )
}

export default SignupPage
