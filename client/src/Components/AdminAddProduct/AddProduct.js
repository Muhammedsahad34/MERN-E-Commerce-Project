import React, { useState } from 'react';
import axios from 'axios';

function AddProduct() {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [price,setPrice] = useState(0);
    const [description,setDescription] = useState('');
    const [image,setImage] = useState(null);

    const handleAddProduct = async () => {
      const data = {name,category,price,description}
      const formData = new FormData();
      formData.append('data', JSON.stringify(data));
      
      console.log(image)
    
      await axios.post('http://localhost:3001/addProduct',formData).then(res=>console.log(res)).catch(err=> console.log(err))
    }
  return (
    <div className='container mt-4'>
        <div className="row">
            <div className="col-md-6">
                <h2 className="text-center">Add Product</h2>
                <label htmlFor="">Name</label>
                <input type="text" name='Name' className='form-control' onChange={(e)=>{setName(e.target.value)}}/>
                <label htmlFor="">Category</label>
                <input type="text" name='category' className='form-control' onChange={(e)=>{setCategory(e.target.value)}}/>
                <label htmlFor="">Price</label>
                <input type="text" name='Price' className='form-control' onChange={(e)=>{setPrice(e.target.value)}}/>
                <label htmlFor="">Description</label>
                <input type="text" name='Description' className='form-control' onChange={(e)=>{setDescription(e.target.value)}}/>
                <label htmlFor="">Image</label>
                <input type="file"  className='form-control' onChange={(e)=>{setImage(e.target.files[0])}}/>

                <button className='btn btn-success mt-4' onClick={handleAddProduct}>Submit</button>
            </div>
        </div>

    </div>
  )
}

export default AddProduct