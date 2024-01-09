import React, { useContext } from 'react';
import { AdminContext } from '../../Contexts/AdminContext';
import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoutes() {
    const {adminDetails} = useContext(AdminContext);
  return (
    adminDetails !== null ? <Outlet/>:<Navigate to='/admin/login'/>
  )
}

export default PrivateRoutes