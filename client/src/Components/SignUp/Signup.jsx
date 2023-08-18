import React, { useState } from 'react'
import axios from 'axios';
import { baseUrl } from '../../URL';
import { useNavigate } from 'react-router-dom';
function Signup() {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [conpass, setConpass] = useState('');
    const [mobile, setMobile] = useState(0);
    const [mismatch,setMismatch]= useState(false);
    const navigate = useNavigate();
    

    const handlePass = (e)=>{
        e.preventDefault();
        
        if(password !== conpass){
            setMismatch(true)
            
        }else{setMismatch(false)
        }
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        const user = {fullname, email, password, mobile};
        axios.post(`${baseUrl}/signup`,user).then((response)=>{
            if(response.data === 'false'){
               
                alert('Email Already Exist')
                navigate('/signup')
            }else{
                
                navigate('/')
                
            }
            
        }).catch((err)=>{alert(err)})

    }

    return (
        <div className="container">
            <div className='row mt-5 d-flex justify-content-center'>
                <div className="col-md-6 ">
                    <div class="form-group">
                        <label for="exampleInputEmail1">Full Name</label>
                        <input type="text" class="form-control"   placeholder="Enter Full Name" onChange={(e)=>setFullname(e.target.value)}/>
                    </div>
                    <div class="form-group mt-3">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" class="form-control"  aria-describedby="emailHelp" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)} />
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div class="form-group mt-3">
                        <label for="exampleInputEmail1">Password</label>
                        <input type="password" class="form-control"   placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                    </div>
                    { mismatch ?<div className='mt-2 d-flex justify-content-center'>
                        <p className='text-danger'>Password Mismatch</p>
                    </div> : null}
                    <div class="form-group mt-3">
                        <label for="exampleInputEmail1">Confirm Password</label>
                        <input type="password" class="form-control"   placeholder="Confirm Password" onChange={(e)=>setConpass(e.target.value)} onBlur={handlePass}/>
                    </div>
                    <div class="form-group mt-3">
                        <label for="exampleInputEmail1">Mobile Number</label>
                        <input type="Number" class="form-control"   placeholder="Mobile Number" onChange={(e)=>{setMobile(e.target.value)}}/>
                    </div>
                    <div className="mt-3  d-flex justify-content-center">
                        <button className='btn btn-success' onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup