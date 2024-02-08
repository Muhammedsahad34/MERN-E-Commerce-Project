import React from 'react';
import AdminHeader from '../../Components/AdminHeader/AdminHeader';
import ViewOrderDetail from '../../Components/UserViewOrderDetail/ViewOrderDetail';

function ViewOrderDetails() {
  return (
    <>
        <AdminHeader/>
        <ViewOrderDetail admin = {true}/>
    </>
  )
}

export default ViewOrderDetails