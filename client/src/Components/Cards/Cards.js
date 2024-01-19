import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../../URL';
import { UserContext } from '../../Contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import './Cards.css';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addtoCart } from '../../Helpers/CartHelper';

function Cards() {
    const [viewProduct, setViewProduct] = useState([]);
    const { userDetails } = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(`${baseUrl}/getProduct`).then((response) => {

            setViewProduct(response.data)
        }).catch((error) => { console.log(error) })

    }, [])
    

    return (

        <div className='container pos'>
            <div className="row">
                {
                    viewProduct.map((obj) => {
                        return (
                            <div className='col-8 col-sm-6 col-md-4 col-lg-3 mt-4 me-1'>
                                <div class="card ms-5 mb-4 shadow-lg" style={{ width: '100%', height: '23rem' }}>
                                    <img class="card-img-top" src={`${baseUrl}/images/product-images/${obj.image}`} alt="Card image cap" style={{ height: '12rem', cursor: 'pointer' }} onClick={() => { navigate(`/Product-detail/${obj._id}`) }} />
                                    <div class="card-body">
                                        <h5 class="card-title ms-5">{obj.name} <br></br> <span className='text-danger'> {obj.price}</span></h5>
                                        <p class="card-text ms-5">{obj.category}</p>
                                        <a class="btn btn-primary ms-5" onClick={() => addtoCart(obj._id,navigate,userDetails)}>Add to Cart</a>
                                    </div>



                                </div>
                            </div>
                        )
                    })}
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Bounce}/>
        </div>

    )
}

export default Cards
