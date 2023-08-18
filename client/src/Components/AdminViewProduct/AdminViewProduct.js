import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../URL';
import { ProductContext } from '../../Contexts/ProductContext';


function AdminViewProduct() {
    const navigate = useNavigate();
    const [product, setProduct] = useState([]);
    const {setProductDetails} = useContext(ProductContext);
    
    useEffect(()=>{
        axios.get(`${baseUrl}/getProduct`).then((response)=>{
            // console.log(response.data)
            setProduct(response.data)
            setProductDetails(response.data);
            
            
            
        }).catch((error)=>{console.log(error)})

    })
    return (
        <div className='container-fluid'>
            <div className='row'>
                <button className='btn btn-success w-25 mt-4 ms-auto' onClick={()=>{navigate('/add-product')}}>Add Products</button>
            </div>
            
                <table class="table table-dark mt-5">
                    <thead>
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">Title</th>
                            <th scope="col">Category</th>
                            <th scope="col">Price</th>
                            <th scope="col">Description</th>
                            <th scope="col">Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        product.map((products)=>{
                            return(
                                
                            <tr>
                            <th scope="row">1</th>
                            <td>{  products.name}</td>
                            <td>{  products.category}</td>
                            <td>{  products.price}</td>
                            <td>{  products.description}</td>
                            <td><img src={`${baseUrl}/images/product-images/${  products.image}`} alt="" style={{width: "50px", height: "50px"}}/></td>
                        </tr>)})}
                    
                    </tbody>
                </table>
                
                
            </div>
        
    )
}

export default AdminViewProduct