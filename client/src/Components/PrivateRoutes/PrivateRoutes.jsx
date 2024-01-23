import axios from 'axios';
import React, { useEffect } from 'react';
import { baseUrl } from '../../URL';
import { Navigate, Outlet } from 'react-router-dom';


function PrivateRoutes() {
    const LoggedIn = localStorage.getItem('LoggedIn');
   
   
  return(
   LoggedIn ? <Outlet/>:<Navigate to='/admin/login'/>
  )
}

export default PrivateRoutes;