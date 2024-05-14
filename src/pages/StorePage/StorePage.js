import React, { useState, useEffect, useMemo } from 'react'
import Header from '../../components/Header/Header'
import Cart from '../../components/Cart/Cart'
import Item from '../../components/Item/Item'
import { useParams } from 'react-router-dom'
import './StorePage.scss'
import axios from 'axios'
const StorePage = () => {
    const { userid } = useParams();
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')));
    const [openForm, setOpenForm] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const [files, setFiles] = useState([]);
    const [openCart, setOpenCart] = useState(false);
    const [catalog, setCatalog] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const JWTtoken = sessionStorage.getItem("JWTtoken");
    const checkAuth = async () => {
        try {
            const response = await axios.get('http://localhost:8080/user/auth', { headers: { Authorization: `Bearer ${JWTtoken}` } });
            if (response.data == userid) setIsLoggedIn(true);
            else setIsLoggedIn(false);
        } catch (error) {
            setIsLoggedIn(false);
            console.error(error)
        }
    }
    const fetchCatalog = useMemo(() => {
        const fetchCatalog = async () => {
            const response = await axios.get(`http://localhost:8080/user/${userid}/inventory`);
            setCatalog(response.data);
        }
        fetchCatalog()
        return fetchCatalog;
    }, [])
    const [formData, setFormData] = useState({
        item_name: '',
        user_id: userid,
        price: '',
        description: '',
        quantity: '',
        media: null,
        brand: '',
        type: '',
        category: ''
    })
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart])
    useEffect(() => {
        checkAuth();
        console.log(isLoggedIn)
    }, [isLoggedIn])
    const onSelectFile = (e) => {
        setFiles(e.target.files);
        const selectedFiles = e.target.files;
        const selectedFilesArray = Array.from(selectedFiles);
        const imagesArray = selectedFilesArray.map((file) => URL.createObjectURL(file));
        setSelectedImages((previousImages) => previousImages.concat(imagesArray));
    };
    
    const deleteHandler = (index) => {
        const updatedImages = [...selectedImages];
        updatedImages.splice(index, 1);
        setSelectedImages(updatedImages);
    }
    const handleUpload = async () => {
        try {
            const imageData = new FormData();
            for (const file of files) {
                imageData.append('files', file);
            }
            const response = await axios.post('http://localhost:8080/upload', imageData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            if (response.data) {
                const updatedMedia = response.data; 
                await setFormData({
                    ...formData,
                    media: updatedMedia
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleUpload();
        const { item_name, price, description, quantity, media, brand, type, category } = formData;
        if (!item_name || !price || !description|| !quantity || !media || !brand || !type || !category) {
            console.log(formData)
            return;
        }
        try {
            const response = await axios.post('http://localhost:8080/inventory', formData);
            if (response.data) {
                setFormData({
                    item_name: '',
                    price: '',
                    description: '',
                    quantity: '',
                    media: null,
                    brand: '',
                    type: '',
                    category: ''
                })
                setSelectedImages([]);
                setFiles([]);
                setOpenForm(!openForm);
            } 
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div className='store'>
            <Header setOpenCart={setOpenCart} openCart={openCart}/>
            <div className='store-page'>
                <h1>Store Page</h1>
                <section className='store-page__cont'>
                    {isLoggedIn && <h2>List a new item <span onClick={() => setOpenForm(!openForm)} className='store-page__cont-btn'>+</span> </h2>}
                    {openForm && <form className='store-page__form' onSubmit={handleSubmit}>
                        <label className='store-page__form-label'>Item Name
                            <input type="text" name="item_name" className='store-page__form-input' onChange={handleChange} value={formData.item_name}/>
                        </label>
                        <label className='store-page__form-label'>Item Price
                            <input type="number" name="price" className='store-page__form-input' onChange={handleChange} value={formData.price}/>
                        </label>
                        <label className='store-page__form-label'>Item Description
                            <textarea name="description" className='store-page__form-textarea' onChange={handleChange} value={formData.description}></textarea>
                        </label>
                        <label className='store-page__form-label'>Item Quantity
                            <input type="number" name="quantity" className='store-page__form-number' onChange={handleChange} value={formData.quantity}/>
                        </label>
                        <label className='store-page__form-label'>Item Brand
                            <input type="text" name="brand" className='store-page__form-input' onChange={handleChange} value={formData.brand}/>
                        </label>
                        <label className='store-page__form-label'>Item Type
                            <input type="text" name="type" className='store-page__form-input' onChange={handleChange} value={formData.type}/>
                        </label>
                        <label className='store-page__form-label'>Item Category
                            <input type="text" name="category" className='store-page__form-input' onChange={handleChange} value={formData.category}/>
                        </label>
                        <label className='store-page__form-label'>Item Images
                            <div className="images">
                                {selectedImages &&
                                selectedImages.map((image, index) => 
                                    <div key={index} className="store-page__form-image">
                                        <p>{index + 1}</p>
                                        <img src={image} alt="upload" />
                                        <h4>{image}</h4>
                                        <button onClick={(e) => {e.preventDefault(); deleteHandler(index)}} >
                                            delete image
                                        </button>
                                    </div>
                                    
                                )}
                            </div>
                            <input type="file" name="media" multiple accept='image/*' className='store-page__form-file' onChange={onSelectFile}/>
                        </label>
                        <button type="submit" className='store-page__form-btn'>Submit</button>
                    </form>}
                </section>
                <section className='store-page__cont'>
                    {catalog && catalog.map((item) => <Item key={item.id} item={item} setCart={setCart} setOpenCart={setOpenCart}/>)}
                </section>
            </div>
            <Cart openCart={openCart} cart={cart} setCart={setCart}/>
        </div>
    )
}

export default StorePage
