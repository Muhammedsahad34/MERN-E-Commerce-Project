import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { baseUrl } from '../../URL';

function DropDown(props) {
    const [isOpen, setIsopen] = useState(false);
    const [valid,setValid] = useState();
    const [user,setUser] = useState([]);
    const navigate = useNavigate();
    const toggleDropdown = () => {
        setIsopen(!isOpen);
    }
    useEffect(()=>{
      
        axios.get(`${baseUrl}/getprofile`,{withCredentials: true}).then((response)=>{
            setUser(response.data.user);
            setValid(response.data.valid);
            console.log(response.data);
        }).catch((err)=>{
            console.log(err);
        })
        
    }, [])
    return (
        <div className='dropdown'>
            <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                onClick={toggleDropdown}
            >{valid? user.fullname : "Account"}</button>
            <div className={`dropdown-menu${isOpen ? 'show' : ''}`}>
                <a className="dropdown-item" onClick={()=>{navigate('/login')}} style={{cursor:'pointer'}}>
                    Login
                </a>
                
            </div>
        </div>
    )
}

export default DropDown