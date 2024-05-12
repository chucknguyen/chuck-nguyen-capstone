import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import './ItemPage.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCube, Thumbs, Navigation } from 'swiper/modules';
import 'swiper/css/effect-cube';
import 'swiper/css';
import 'swiper/css/thumbs';
import 'swiper/css/navigation';
import pic from '../../assets/images/jflowers-1.jpg';
import Cart from '../../components/Cart/Cart';
import { register } from 'swiper/element/bundle';
import pic2 from '../../assets/images/Ko-Web.jpg'
register();

const ItemPage = () => {
  const [openCart, setOpenCart] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')));
  return (
    <div className='item-page'>
      <Header openCart={openCart} setOpenCart={setOpenCart} />
      <section className='cont'>
        <h1>Item Page</h1>
        <div className='cont__box'>
            <div>
                <Swiper
                modules={[EffectCube, Thumbs]}
                effect='cube'
                grabCursor={true}
                loop={true}
                cubeEffect={{
                shadow: true,
                slideShadows: true,
                shadowOffset: 20,
                shadowScale: 0.94
                }}
                className='mySwiper'
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                >
                    <SwiperSlide>
                        <img src={pic} alt='pic' className='cont__img' />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={pic2} alt='pic' className='cont__img' />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={pic} alt='pic' className='cont__img' />
                    </SwiperSlide>
                </Swiper>

                <Swiper className='mySwiper2' 
                        slidesPerView={3}
                        onSwiper={setThumbsSwiper}
                        modules={[Navigation]}
                        navigation={true}>
                    <SwiperSlide>
                    <img src={pic} alt='pic' className='cont__img' />
                    </SwiperSlide>
                    <SwiperSlide>
                    <img src={pic2} alt='pic' className='cont__img' />
                    </SwiperSlide>
                    <SwiperSlide>
                    <img src={pic} alt='pic' className='cont__img' />
                    </SwiperSlide>
                    <SwiperSlide>
                    <img src={pic} alt='pic' className='cont__img' />
                    </SwiperSlide>
                    <SwiperSlide>
                    <img src={pic} alt='pic' className='cont__img' />
                    </SwiperSlide>
                </Swiper>
            </div>
         
          <div className='cont__info'>
            <h1 className='cont__title'>Item</h1>
            <p className='cont__price'>Price</p>
          </div>
        </div>
      </section>
      <Cart openCart={openCart} cart={cart} setCart={setCart}/>
    </div>
  );
};

export default ItemPage;