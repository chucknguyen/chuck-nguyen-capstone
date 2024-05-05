import React from 'react'
import heroImg from '../../assets/images/c74906cf0f025b3c3578d942e24eca2a_original.jpg'
import './Hero.scss'
const Hero = () => {
  return (
    <div className='hero'>
        <img src={heroImg} className='hero__img'/>
        <div className='hero__container'>
          <h1 className='hero__header'> Welcome to Chuckun Specials!</h1>
          <h2 className='hero__slogan'> Where your pool journey begins</h2>
        </div>
    </div>
  )
}

export default Hero
