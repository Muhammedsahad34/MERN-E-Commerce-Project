import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../URL';

function EditProduct({match}) {
    const [product, setProduct] = useState({
        name: '',
        category: '',
        price: '',
        description: '',
        image: ''
    });
    const [oldimage, setOldimage] = useState('');
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get(`${baseUrl}/oneProduct/${id}`).then((res)=>{
            setProduct(res.data);
            setOldimage(res.data.image);
            
        }).catch((err)=>{
            console.log(err);
        })

    },[id])

    const handleUpdate = (e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('name',product.name);
        formData.append('category',product.category);
        formData.append('price',product.price);
        formData.append('description',product.description);
        formData.append('oldimage',oldimage);
        formData.append('image',product.image);
        axios.post(`${baseUrl}/updateProduct/${id}`,formData).then((res)=> {
            alert('Product Updated successfully')
            navigate('/admin')
        }).catch(error=>alert(error))
    }

    return (
        <div>
            <div className='container mt-4'>
                <div className="row">
                    <div className="col-md-6">
                        <h2 className="text-center">Edit Product</h2>
                        <label htmlFor="">Name</label>
                        <input type="text" name='Name' className='form-control' onChange={(e) => { setProduct({...product,name:e.target.value}) }} defaultValue={product.name}/>
                        <label htmlFor="">Category</label>
                        <input type="text" name='category' className='form-control' onChange={(e) => { setProduct({...product,category:e.target.value}) }} defaultValue={product.category}/>
                        <label htmlFor="">Price</label>
                        <input type="number" name='Price' className='form-control' onChange={(e) => { setProduct({...product,price:e.target.value}) }} defaultValue={product.price}/>
                        <label htmlFor="">Description</label>
                        <input type="text" name='Description' className='form-control' onChange={(e) => { setProduct({...product,description:e.target.value}) }} defaultValue={product.description}/>
                        <img src={`${baseUrl}/images/product-images/${product.image}`} alt="" style={{width: '150px',height:'auto'}}/>
                        <label htmlFor="">Image</label>
                        <input type="file" className='form-control' onChange={(e) => { setProduct({...product,image:e.target.files[0]}) }} />

                        <button className='btn btn-success mt-4' onClick={handleUpdate}>Submit</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default EditProduct