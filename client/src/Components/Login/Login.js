import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {baseUrl} from '../../URL';


function Login() {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const navigate = useNavigate();
  useEffect(()=>{
    axios.get(`${baseUrl}/getprofile`).then((res)=>{
      if(res.data !== null){
        navigate('/')
      }
    })
  })

  const handleLogin = (e)=>{
    e.preventDefault();
    const user = {email, password}
    axios.post(`${baseUrl}/login`,user).then((res)=>{
      if(res.data.status === 'true'){
        // setUserDetails(res.data.user)
          navigate('/')
      }
      else{
        alert('Email or Password is Invalid')
        navigate('/login');
      }
      console.log(res.data);
    }).catch((err)=>{
      alert(err)
    })
  }
  axios.defaults.withCredentials = true;
  return (
    <div className="row">
      <div className="col-md-12">
        <div className='w-50 mx-auto mt-5'>
          <div className="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control"  placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)}/>
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group mt-3">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" className="form-control"  placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
          </div>
          <div className='mx-auto mb-2 mt-3' style={{ paddingLeft: '35rem' }}>
            <a className='text-align-center' onClick={() => navigate('/signup')} style={{ cursor: 'pointer' }}>Create Account ?</a>
          </div>
          <button type="submit" className="btn btn-primary" style={{ marginLeft: '22rem' }} onClick={handleLogin}>Submit</button>
        </div>
      </div>
    </div>
  )
}

export default Login