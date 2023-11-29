import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {baseUrl} from '../../URL';
import './UserViewOrder.css';
import { useNavigate } from 'react-router-dom';

function UserViewOrder() {
  const [orderDetails, setOrderDetails] = useState([]);
  const navigate = useNavigate();
  useEffect(()=>{
    axios.get(`${baseUrl}/fetchOrderDetails`,{withCredentials:true}).then((res)=>{
      setOrderDetails(res.data);
    }).catch((err)=>{
      console.log(err);
    })

  },[])
  return (
    <div className='container'>
      <div className="row">
        <div className="col-md-12">
          <table className='table mt-5 centered-headings'>
            <thead>
              <tr>
                <th scope='col'>Order Id</th>
                <th scope='col'>Date</th>
                <th scope='col'>Delivery Details</th>
                <th scope='col'>Total Price</th>
                <th scope='col'>Status</th>
              </tr>
            </thead>
            <tbody>
              {
                orderDetails.map((orders)=>{
                  return (

                  
              <tr style={{cursor:'pointer'}} className='t-row' onClick={()=>{navigate(`/view-order-details/${orders._id}`)}}>
                <td>{orders._id}</td>
                <td>{orders.date.slice(0,24)}</td>
                <td>{orders.deliveryDetails.adress} <br />{orders.deliveryDetails.pincode} <br />{orders.deliveryDetails.number}</td>
                <td>{orders.total}</td>
                <td>{orders.status}</td>
              </tr>
              )
            })
              }
            </tbody>

          </table>
        </div>
      </div>

    </div>
  )
}

export default UserViewOrder