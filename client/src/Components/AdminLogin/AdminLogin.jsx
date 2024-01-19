import React, { useContext, useEffect, useState } from 'react';
import './AdminLogin.css';
import axios from 'axios';
import {baseUrl} from '../../URL'
import { useNavigate } from 'react-router-dom';
import  { AdminContext } from '../../Contexts/AdminContext';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {setAdminDetails} = useContext(AdminContext);
  const navigate = useNavigate();
  useEffect(()=>{
    const loggedIn = localStorage.getItem('LoggedIn');
    if(loggedIn){
      navigate('/admin/home');
    }
  },[])
  const handleLogin = (e) => {
    e.preventDefault();
    axios.post(`${baseUrl}/admin/login`,{email,password}).then((res)=>{
      if(res.data.status){
        alert('Login Success');
        localStorage.setItem('LoggedIn',true)
        setAdminDetails(res.data.admin);
        navigate('/admin/home',{replace:true});
      }else{
        alert('Email or password incorrect');
      }
    })
  }
  axios.defaults.withCredentials = true;
  return (
    <div className='w-100 d-flex vh-100'>
      <div className='mx-auto mt-5 form w-50'>

        <h1 className='text-danger text-center'>Admin Login</h1>
        <p className='mt-3 mb-0'>Email Address</p>
        <input type="email"
          className='rounded'
          placeholder='Email'
          value={email}
          onChange={(e) => { setEmail(e.target.value) }}
        />
        <p className='mt-3 mb-0'>Password</p>
        <input type="password"
          className='rounded'
          placeholder='Password'
          value={password}
          onChange={(e) => { setPassword(e.target.value) }}
        />
        <button className='btn btn-success mt-3 w-100' onClick={handleLogin}>Login</button>
      </div>
    </div>
  )
}

export default AdminLogin