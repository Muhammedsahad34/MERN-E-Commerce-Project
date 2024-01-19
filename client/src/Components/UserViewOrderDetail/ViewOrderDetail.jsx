import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { baseUrl } from '../../URL';
import './ViewOrderDetail.css';


function ViewOrderDetail() {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState([]);
  const [productDetails, setproductDetails] = useState([]);


  useEffect(() => {

    axios.get(`${baseUrl}/fetchEachOrder/${id}`, { withCredentials: true }).then((res) => {
      setOrderDetails(res.data[0]);
      setproductDetails(res.data[0].productDetails);
    }).catch((err) => {
      console.log(err);
    })
  }, [id]);




  return (
    <div className='container order-detail'>
      {productDetails && orderDetails ?
        <div className="row">

          <div className="col-12 col-md-6 col-lg-4 mt-4">
            <div className='p-2 border  order-details'>
              <h5 className='fw-bold'>Order Details</h5>
              <p align='justify' className=''><span>OrderID: </span>{orderDetails ? orderDetails._id : ''}</p>
              <p align='justify' className=''><span>Address: </span>{orderDetails?.deliveryDetails?.adress ?? 'address not available'}</p>
              <p className=''><span>Pincode: </span>{orderDetails?.deliveryDetails?.pincode ?? 'pincode not available'}</p>
              <p><span>Mob no: </span></p>
              <p><span>Date of Order: {orderDetails?.date?.slice(0, 24) ?? 'not available'}</span></p>
              <p><span>Status: </span>{orderDetails?.status ?? 'not available'}</p>
              <p><span>Payment Method: </span>{orderDetails?.paymentMethod ?? 'not available'}</p>
              <p><span>Total Amount: </span>{orderDetails?.total ?? 'not available'}</p>
            </div>
          </div>

            {productDetails.map((obj) => {
              return (
                <div className="col-12 col-md-6 col-lg-4 mt-4">


                <div className='product-detail border p-2'>
                  <h5 className='fw-bold'>Product details</h5>
                  <p><span>Name: {obj.name}</span></p>
                  <p><span>Category: {obj.category}</span></p>
                  <p><span>Price: {obj.price}</span></p>
                  <p align='justify'><span>Description: {obj.description}</span></p>
                </div>
          </div>
              )
            })
            }
            {
              productDetails.map((obj)=>{
                return(

                  <div className="col-12 col-md-6 col-lg-4 mt-4 mb-4">
            <div className='image'>
              <img src={`${baseUrl}/images/product-images/${obj.image}`} alt="product" className='image-product' />
              
            </div>

          </div>
            )
          })
            }



        </div>
        : <h1>Loading....</h1>}
    </div>


  )
}

export default ViewOrderDetail