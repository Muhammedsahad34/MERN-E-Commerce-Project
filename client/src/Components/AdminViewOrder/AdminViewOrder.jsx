import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../../URL';
import './AdminViewOrder.css';
import { useNavigate, useParams } from 'react-router-dom';

function AdminViewOrder() {
    const [allOrders, setAllOrders] = useState([]);
    const {subpage} = useParams();
    const navigate = useNavigate();
    console.log(subpage)
    useEffect(()=>{
        axios.get(`${baseUrl}/admin/allOrders/${subpage}`,{withCredentials:true}).then((res)=>{
          setAllOrders(res.data);
        })
      },[subpage])
  return (
    allOrders.length > 0 ?
    <div className='table-container'>
        <table>
          <thead>
            <tr className='t-row-1'>
              <th>Order Id</th>
              <th>Date</th>
              <th>User Number</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            { allOrders.map((obj)=>{
              return(

                
              <tr className='t-row-1 row-2' style={{cursor:"pointer"}} onClick={()=>{navigate(`/admin/viewOrder/${obj._id}`)}}>
              <td>{obj._id}</td>
              <td>{obj.date.slice(0,24)}</td>
              <td>{obj.deliveryDetails.number}</td>
              <td>{obj.status}</td>
            </tr>
                )
              })
            }
          </tbody>
        </table>
    </div>
    :<div className=' w-100 vh-100'>Not Found</div>
  )
}

export default AdminViewOrder