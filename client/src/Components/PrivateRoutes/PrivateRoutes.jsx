import React from 'react';

import { Navigate, Outlet } from 'react-router-dom';


function PrivateRoutes() {
    const LoggedIn = localStorage.getItem('LoggedIn');
   
  return(
   LoggedIn ? <Outlet/>:<Navigate to='/admin/login'/>
  )
}

export default PrivateRoutes;