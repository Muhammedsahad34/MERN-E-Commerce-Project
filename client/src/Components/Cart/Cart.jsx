import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { baseUrl } from '../../URL'
import { useNavigate } from 'react-router-dom';

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(`${baseUrl}/fetchCart`, { withCredentials: true }).then((response) => {
            setCartItems(response.data.data);
            setTotal(response.data.total);

        }).catch((err => {
            alert(err)
        }));
    }, [])

    const handleIncDec = (proId, count) => {
        axios.get(`${baseUrl}/incDecCart/${proId}/${count}`, { withCredentials: true }).then((res) => {
            const updatedCart = cartItems.map(product => {
                if (product._id === proId) {
                    if (count === 1) {
                        setTotal(total + product.price)
                    } else {
                        setTotal(total - product.price)
                    }

                    return { ...product, count: res.data.count };
                }
                return product;
            });
            setCartItems(updatedCart);
        }).catch((err) => console.log(err));
    }

    const handleRemove = (proId,count,price) => {
        if (window.confirm('Do you want to remove from the cart')) {
            axios.get(`${baseUrl}/removeFromCart/${proId}`, { withCredentials: true }).then((response) => {
                console.log(response.data);
                alert('product removed from the cart');
                if(response.data.products.length === 0){
                    setCartItems(false)
                }else{
                    setCartItems(cartItems.filter(item => item._id !== proId));
                    setTotal(total - count * price);
                }
                
            })
        }
    }

    return (
        <div className='container'>
            {
                cartItems ?
                    <div>
                        <table className='table mt-5 centered-headings'>
                            <thead>
                                <tr>
                                    <th scope='col'>Item</th>
                                    <th scope='col'>Title</th>
                                    <th scope='col'>Price</th>
                                    <th scope='col'>Quantity</th>
                                    <th scope='col'>Total Price</th>
                                    <th scope='col'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cartItems.map((product) => {

                                        return (


                                            <tr>
                                                <td><img src={`${baseUrl}/images/product-images/${product.image}`} alt="" style={{ width: '50px', height: '50px' }} /></td>
                                                <td>{product.name}</td>
                                                <td>{product.price}</td>
                                                <td>{product.count > 1 ?
                                                    <button className='cart-item-count mr-3' onClick={() => { handleIncDec(product._id, -1) }}>-</button> : null
                                                } {[product.count]} <button className='cart-item-count ml-3' onClick={() => { handleIncDec(product._id, 1) }}>+</button></td>
                                                <td>{product.price * product.count}</td>
                                                <td>
                                                    <button className='btn btn-success'>Buy Item</button>
                                                    <button className='btn btn-danger ms-3' onClick={() => { handleRemove(product._id,product.count,product.price) }}>Remove</button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                            </tbody>

                        </table>

                        <hr />
                        <div style={{ textAlign: 'right' }}>
                            <h5 className='me-5 mt-3'>Total: {total}</h5>
                            <button className='btn btn-success mt-3 me-5' onClick={() => { navigate(`/place-order/${total}`) }}>Place Order</button>
                        </div>
                    </div>
                    : <h1>This is Empty</h1>}


        </div>

    )
}

export default Cart