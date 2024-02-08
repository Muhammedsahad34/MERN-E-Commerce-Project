import React from 'react';
import './AdminAllOrders.css';
import {Link, useParams} from 'react-router-dom';
import AdminViewOrder from '../AdminViewOrder/AdminViewOrder';

function AdminAllOrders() {
  const {subpage} = useParams();
  const changeClass = (type) =>{
    let classes = ""
    if(subpage === type){
      classes = "bg-dark rounded-5"
    }
    return classes
  }
  
  return (
     
    <div className='view-all-orders'>
      <div className='w-100 d-flex justify-content-center pt-4 pb-4'>
        <div className='status-links d-flex border border-dark rounded-5 p-2'>
          <div className={changeClass(undefined)}><Link to={'/admin/allOrders'}>Placed Orders</Link></div>
          <div className={changeClass('ShippedOrders')}><Link to={'/admin/allOrders/ShippedOrders'}>Shipped Orders</Link></div>
          <div className={changeClass('DeliverdOrders')}><Link to={'/admin/allOrders/DeliverdOrders'}>Delivered Orders</Link></div>
        </div>
      </div>
      {

      subpage === undefined?
      <AdminViewOrder/>
      
      :subpage === 'ShippedOrders' ? <AdminViewOrder/>:subpage === "DeliverdOrders"?<AdminViewOrder/>:null}
    </div>
   
  
    
  )
}

export default AdminAllOrders