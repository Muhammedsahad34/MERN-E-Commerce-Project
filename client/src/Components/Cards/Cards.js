import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../../URL';
import { UserContext } from '../../Contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import './Cards.css';

function Cards() {

    const [viewProduct, setViewProduct] = useState([]);
    const {userDetails} = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(`${baseUrl}/getProduct`).then((response) => {
            
            setViewProduct(response.data)
        }).catch((error) => { console.log(error) })

    }, [])

    const handleAddtoCart = (proId)=>{
        if(userDetails.valid){
            axios.get(`${baseUrl}/addToCart/${proId}`,{withCredentials:true}).then((res)=>{
                console.log(res.data)
            }).catch((err)=>{
                console.log(err);
            })
        }else{
            navigate('/login')
        }
        
    }

    return (

        <div className='container pos'>
            <div className="row">
                {
                    viewProduct.map((obj) => {
                        return (
                            <div className='col-sm-6 col-md-4 col-lg-3 mt-4 me-1'>
                                <div class="card mx-auto mb-4" style={{ width: '15rem', height: '25rem' }}>
                                    <img class="card-img-top" src={`${baseUrl}/images/product-images/${obj.image}`} alt="Card image cap" style={{ height: '12rem' }} />
                                    <div class="card-body">
                                        <h5 class="card-title">{obj.name}  Price: {obj.price}</h5>
                                        <p class="card-text">{obj.category}</p>
                                        <p class="card-text">{obj.description}</p>
                                        <a class="btn btn-primary" onClick={()=>handleAddtoCart(obj._id)}>Add to Cart</a>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
            </div>
        </div>

    )
}

export default Cards