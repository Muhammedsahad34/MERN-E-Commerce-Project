import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../../URL';

function Cards() {

    const [viewProduct, setViewProduct] = useState([])
    useEffect(() => {
        axios.get(`${baseUrl}/getProduct`).then((response) => {
            // console.log(response.data)
            setViewProduct(response.data)




        }).catch((error) => { console.log(error) })

    }
        , [])
    return (

        <div className='container'>
            <div className="row">
                {
                    viewProduct.map((obj) => {
                        return (
                            <div className='col-md-3 mt-4'>
                            <div class="card" style={{ width: '15rem',height:'25rem' }}>
                                <img class="card-img-top" src={`${baseUrl}/images/product-images/${obj.image}`} alt="Card image cap" style={{height:'12rem'}}/>
                                <div class="card-body">
                                    <h5 class="card-title">{obj.name}  Price: {obj.price}</h5>
                                    <p class="card-text">{obj.category}</p>
                                    <p class="card-text">{obj.description}</p>
                                    <a href="#" class="btn btn-primary">Go somewhere</a>
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