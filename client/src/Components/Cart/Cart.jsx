import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { baseUrl } from '../../URL'

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    useEffect(()=>{
        axios.get(`${baseUrl}/fetchCart`,{withCredentials:true}).then((response)=>{
            setCartItems(response.data);
        }).catch((err=>{
            alert(err)
        }))
    })
  return (
    <div className='container'>
        {
            cartItems ?
        
        <table className='table mt-5'>
            <thead>
                <tr>
                    <th scope='col'>Item</th>
                    <th scope='col'>Title</th>
                    <th scope='col'>Quantity</th>
                    <th scope='col'>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    cartItems.map((product)=>{
                        return(

                       
                <tr>
                    <td><img src={`${baseUrl}/images/product-images/${product.image}`} alt="" style={{width:'50px',height:'50px'}}/></td>
                    <td>{product.name}</td>
                    <td><button className='cart-item-count mr-3'>-</button> 1 <button className='cart-item-count ml-3'>+</button></td>
                    <td>
                        <button className='btn btn-danger'>Remove</button>
                    </td>
                </tr>
                 )
                })}
            </tbody>

        </table>
        :<h1>This is Empty</h1>}
    </div>
    
  )
}

export default Cart