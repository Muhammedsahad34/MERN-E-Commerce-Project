import React, { useContext, useEffect, useState } from 'react';
import './ProductDetail.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {baseUrl} from '../../URL'
import { UserContext } from '../../Contexts/UserContext';
import { addtoCart } from '../../Helpers/CartHelper';


function ProductDetail() {
    const {id} = useParams();
    const [product, setProduct] = useState({});
    const {userDetails} = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(()=>{
        axios.get(`${baseUrl}/eachProduct/${id}`).then((res)=>{
            setProduct(res.data);
        })
    }, [])
    
    return (
        <div className='product-detail-main'>
            <div className="row">
                <div className='col-12 col-sm-12 col-md-6 col-lg-4 m-4 pe-5'>
                    <div className='left-side'>
                        <div className='product-image mb-3 w-100'>
                            <img src={`${baseUrl}/images/product-images/${product.image}`} alt="Logo" className='w-100' />
                        </div>
                        <button className='btn btn-primary cart-btn' onClick={()=>{addtoCart(product._id,navigate,userDetails)}}>Add to Cart</button>
                        <button className='btn btn-success buy-btn '>Buy now</button>
                    </div>
                    
                </div>
                <div className='col-12 col-sm-12 col-md-4 col-lg-6 mt-5'>
                    <h3 className='ms-5'>{product ? product.name:""}(<span className='spn'>{product? product.category:''}</span>)</h3>
                    <p className='fw-bold text-danger ms-5 price'>Price: {product ? product.price:""}</p>
                    <p className='description ms-5'>{product ? product.description : ""}</p>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail