import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './LoginPage.scss'
import logo from '../../assets/logos/logo.svg'
import axios from 'axios'
const LoginPage = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [invalidUsername, setInvalidUsername] = useState(false);
    const [invalidPassword, setInvalidPassword] = useState(false);
    const [formData, setFormData] = useState({
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
        const { username, password } = formData;
        setInvalidUsername(false);
        setInvalidPassword(false);
        setErrorMessage('');
        if (!username || username.length < 4 || username.length > 20) {
            setInvalidUsername(true);
            return;
        }
        if (!password || password.length < 8 || password.length > 20) {
            setInvalidPassword(true);
            return;
        }
        try {
            const response = await axios.post('http://localhost:8080/login', formData);
            if (response.data) {
                setErrorMessage('');
                sessionStorage.setItem("JWTtoken", response.data.token);
                navigate('/home');
            } 
        } catch (error) {
            setErrorMessage(error.response.data.error.message);
            console.error(error);
        }
    }
    return (
        <div className='login'>
            <div className='login__cont'>
                <img src={logo} alt='logo' className='login__logo'/>
                <h1 className='login__header'>Log In</h1>
                {errorMessage && <p className='login__error'>{errorMessage}</p>}
                <form className='login__form' onSubmit={handleSubmit}>
                    <label className='login__form-label'>
                        Username
                        <input type="text" name='username' className={`login__form-input ${invalidUsername ? 'login__form-input--invalid' : ''}`} required onChange={handleChange} />
                        {invalidUsername && <p className='login__error'>Username must be between 4 and 20 characters</p>}
                    </label>
                    <label className='login__form-label'>
                        Password
                        <input type="password" name='password' className={`login__form-input ${invalidUsername ? 'login__form-input--invalid' : ''}`} required onChange={handleChange} />
                        {invalidPassword && <p className='login__error'>Password must be between 8 and 20 characters</p>}
                    </label>
                    <p>Forgot your password?</p>
                    <button className='login__form-btn' type='submit'>Log In</button>
                </form>
                <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
                <Link to={'/home'} className='login__link'>Continue as Guest</Link>
            </div>
        </div>
    )
}

export default LoginPage
