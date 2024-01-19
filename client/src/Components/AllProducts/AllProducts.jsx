import React, { useContext, useEffect, useState } from 'react';
import './AllProducts.css';
import axios from 'axios';
import { baseUrl } from '../../URL';
import { useNavigate } from 'react-router-dom';
import { addtoCart } from '../../Helpers/CartHelper';
import { UserContext } from '../../Contexts/UserContext';

function AllProducts() {
    const [products, setProducts] = useState([]);
    const [select, setSelect] = useState('A-Z');
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const {userDetail} = useContext(UserContext);
    

    useEffect(() => {
        axios.get(`${baseUrl}/getProduct`).then((res) => {
            setProducts(res.data);

        })
            .catch((err) => {
                alert("An error Occured");
            })
    }, []);
    useEffect(() => {
        sortProducts();

    }, [select])
    const sortProducts = () => {

        const sortedProducts = [...products];
        console.log(sortedProducts);
        if (select === 'Price-low') {
            sortedProducts.sort((a, b) => {
                return a.price - b.price
            });
            setProducts(sortedProducts);
        } else if (select === 'Price-high') {
            sortedProducts.sort((a, b) => {
                return b.price - a.price
            })
            setProducts(sortedProducts);
        } else if (select === 'Z-A') {
            sortedProducts.sort((a, b) => {
                return b.name.localeCompare(a.name)
            })
            setProducts(sortedProducts);
        } else {
            sortedProducts.sort((a, b) => {
                return a.name.localeCompare(b.name)
            })
            setProducts(sortedProducts);
        }
        // setProducts(sortedProducts);
    }
    const handleChange = (e) => {
        setSelect(e.target.value);
    }

    return (
        products.length > 0 ?

            <div className='All-products-main w-100'>
                <div className="sub-header mt-3 d-flex">
                    <div>
                        <label htmlFor="selectionList">Sort:</label>
                        <select id="selectionList" className='selection' onChange={handleChange}>
                            <option value="A-Z">A-Z</option>
                            <option value="Z-A">Z-A</option>
                            <option value="Price-low">Price Low</option>
                            <option value="Price-high">Price High</option>
                        </select>
                    </div>
                    <div className='me-5 search'>
                        <input type="text" name="" id="" placeholder='Search for product' onChange={(e) => { setSearch(e.target.value) }} />

                    </div>

                </div>
                <div className='each-product w-100 mt-3 d-flex flex-column'>
                    {products.filter((item) => {

                        return search.toLowerCase() === '' ?
                            item : item.name.toLowerCase().includes(search.toLowerCase())
                    }).map((obj) => {
                        return (

                            <div className='every-product d-flex bg-dark mb-2'>
                                <img src={`${baseUrl}/images/product-images/${obj.image}`} alt="Logo" onClick={()=>{navigate(`/Product-detail/${obj._id}`)}}/>
                                <div className='content m-2'>
                                    <h3 className='text-white text-center'>{obj.name}(<span>{obj.category}</span>)</h3>
                                    <h5 className='text-danger text-center'>Price: {obj.price}</h5>
                                    <button className='btn btn-success'>Buy now</button>
                                    <button className='btn btn-primary car-btn' onClick={()=>{addtoCart(obj._id,navigate,userDetail)}}>Add to cart</button>
                                </div>

                            </div>
                        )
                    })
                    }
                    {products
                        .filter((item) => {
                            return search.toLowerCase() === '' ? item : item.name.toLowerCase().includes(search.toLowerCase());
                        })
                        .length === 0 && <h2 className="text-dark text-center">Nothing found</h2>
                    }

                </div>
            </div>
            : <div>Loading...</div>
    )
}

export default AllProducts