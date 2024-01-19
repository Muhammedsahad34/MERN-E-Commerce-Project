import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../URL';
import './AdminViewProduct.css';



function AdminViewProduct() {
    const navigate = useNavigate();
    const [product, setProduct] = useState([]);
    const handleDelete = (proId)=>{
        if(window.confirm('Are you want to delete')){

        
        axios.get(`${baseUrl}/productDelete/${proId}`).then((res)=>{
            console.log(res.data);
        }).catch((err)=>{
            console.log(err);
        })
    }
    }
    
    
    useEffect(()=>{
        axios.get(`${baseUrl}/getProduct`).then((response)=>{
            setProduct(response.data)
            
            
        }).catch((error)=>{console.log(error)})

    },[])
    return (
        <div className='container-fluid admin-view-product'>
            <div className='row'>
                <button className='btn btn-success w-25 mt-4 ms-auto me-3' onClick={()=>{navigate('/admin/add-product')}}>Add Products</button>
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
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        product.map((products,index)=>{
                            return(
                                
                            <tr>
                            <th scope="row">{index + 1}</th>
                            <td>{  products.name}</td>
                            <td>{  products.category}</td>
                            <td>{  products.price}</td>
                            <td>{  products.description}</td>
                            <td><img src={`${baseUrl}/images/product-images/${products.image}`} alt="" style={{width: "50px", height: "50px"}}/></td>
                            <td><button className='btn btn-primary'onClick={()=>{
                                navigate(`/admin/edit-product/${products._id}`)
                            }}>Edit</button>
                                <button className='btn btn-danger ms-2'onClick={()=>{
                                    handleDelete(products._id)}}>Delete</button></td>
                        </tr>)})}
                    
                    </tbody>
                </table>
                
                
            </div>
        
    )
}

export default AdminViewProduct