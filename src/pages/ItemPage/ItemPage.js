import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
import pic2 from '../../assets/images/Ko-Web.jpg'
import axios from 'axios';
import { register } from 'swiper/element/bundle';
register();

const ItemPage = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [openCart, setOpenCart] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')));
  const fetchItem = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/inventory/${id}`);
      setItem(response.data[0]);
    } catch (error) {
      console.error(error)
    }
  }
  const handleAddItem = (e) => {
    e.preventDefault();
    const currentCart = JSON.parse(localStorage.getItem('cart'));
    setOpenCart(true);
    if (!currentCart) {
      const cart = {
        items: [
          {
            id: item.id,
            item_name: item.item_name,
            price: item.price,
            qty: 1,
            media: item.media
          }
        ]
      }
      setCart(cart);
    } else {
      if (currentCart.items.find(cartItem => cartItem.id === item.id)) {
        const cart = {
          items: currentCart.items.map(cartItem => {
            if (cartItem.id === item.id) {
              return {
                ...cartItem,
                qty: cartItem.qty + 1
              }
            } else {
              return cartItem
            }
          })
        }
        setCart(cart);
      } else {
        const cart = {
          ...currentCart,
          items: [
            ...currentCart.items,
            {
              id: item.id,
              item_name: item.item_name,
              price: item.price,
              qty: 1,
              media: item.media
            }
          ]
        }
        setCart(cart);
      }
    }
  }
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart])
  useEffect(() => {
    fetchItem();
  }, [id])
  if (!item) return <p>Loading ... </p>
  return (
    <div className='item-page'>
      <Header openCart={openCart} setOpenCart={setOpenCart} />
      <section className='cont'>
        <h1>{item.item_name}</h1>
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
                  {item.media.map((media, index) => 
                      <SwiperSlide key={index}>
                          <img src={media} alt='pic' className='cont__img' />
                      </SwiperSlide>
                  )}
                </Swiper>

                <Swiper className='mySwiper2' 
                        slidesPerView={3}
                        onSwiper={setThumbsSwiper}
                        modules={[Navigation]}
                        navigation={true}>
                  {item.media.map((media, index) => 
                      <SwiperSlide key={index}>
                          <img src={media} alt='pic' className='cont__img' />
                      </SwiperSlide>
                  )}
                </Swiper>
            </div>
         
          <div className='cont__info'>
            <h2 className='cont__title'>{item.item_name}</h2>
            <h3 className='cont__details'>Price: ${item.price}</h3>
            <h3 className='cont__details'>Brand: {item.brand}</h3>
            <h3 className='cont__details'>Type: {item.type}</h3>
            <h3 className='cont__details'>Description: {item.description}</h3>
            <button onClick={handleAddItem} className='cont__btn'>Add to cart</button>
            <button className='cont__btn'>Buy now</button>
          </div>
        </div>
      </section>
      <Cart openCart={openCart} cart={cart} setCart={setCart}/>
    </div>
  );
};

export default ItemPage;