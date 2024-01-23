import React, { useState } from 'react'
import './PlaceOrder.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../URL';

function PlaceOrder() {
    const { total,proId } = useParams();
    console.log(proId)
    const navigate = useNavigate();
    const [adress, setAdress] = useState('');
    const [pincode, setPincode] = useState(0);
    const [number, setNumber] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('');
    const handleSubmit = () => {
        const details = { adress, pincode, number, total, paymentMethod,proId };
        axios.post(`${baseUrl}/placeOrder`, details,{withCredentials:true}).then((res) => {
            if (res.data.placed) {
                alert('Order Placed Successfully');
                navigate('/view-orders');
            } else {
                console.log(res.data);
                var options = {
                    key: "rzp_test_TNgeRWAxCwvh66", // Enter the Key ID generated from the Dashboard
                    amount: res.data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                    currency: "INR",
                    name: "Let's Buy", //your business name
                    description: "Test Transaction",
                    order_id: res.data.id,
                    handler:function(response){
                        console.log(response)
                        const data = {
                            paymentDetails:response,
                            orderDetails:res.data
                        }
                        axios.post(`${baseUrl}/savePayment`,data,{withCredentials:true}).then((res)=>{
                            if(res.data.status){
                                alert('Payment Success');
                                navigate('/view-orders');
                            }else{
                                alert('Payment Failed');
                                rzp1.open()
                            }
                            
                        }).catch(err=>alert(err));
                     }
                };
                const rzp1 = new window.Razorpay(options);
                rzp1.open();
            }
        }).catch((err) => {
            alert(err);
        })
    }
    return (
        <div className='container'>
            <div className="row mt-3">
                <div className="col-md-4 mt-5">
                    <label htmlFor=""> Adress 1</label><br />
                    <textarea name="" id="" cols="10" rows="3" className='w-100 mt-3' onChange={(e) => { setAdress(e.target.value) }}></textarea>
                    <label htmlFor="">Pincode</label>
                    <input type="number" className='mt-2 w-100' onChange={(e) => { setPincode(e.target.value) }} />
                    <label htmlFor="" className='mt-2'>Mobile Number</label>
                    <input type="number" className='mt-2 w-100' onChange={(e) => { setNumber(e.target.value) }} />
                </div>

                <div className="col-md-8  d-flex align-items-center justify-content-center">
                    <div className='payment'>
                        <h4 className='mt-3'>Payment Mode</h4>
                        <input className="form-check-input mt-3" type="radio" name="flexRadioDefault" onChange={(e) => { setPaymentMethod('COD') }} />
                        <label className="form-check-label mt-2 ms-2" for="flexRadioDefault1">
                            Cash On Delivery
                        </label>
                        <br />
                        <input className="form-check-input mt-3" type="radio" name="flexRadioDefault" onChange={(e) => { setPaymentMethod('Online-Payment') }} />
                        <label className="form-check-label mt-3 ms-2" for="flexRadioDefault1">
                            Online Payment
                        </label>
                        <h6 className='mt-4'>Amount: {total}</h6>
                        <br />
                        <button className='btn btn-success mt-3 ms-4' onClick={handleSubmit}>Place Order</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default PlaceOrder