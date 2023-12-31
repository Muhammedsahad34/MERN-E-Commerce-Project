import React, {  useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './DropDown.css';
import axios from 'axios';
import { baseUrl } from '../../URL';
import { UserContext } from '../../Contexts/UserContext';

function DropDown(props) {
    const [isOpen, setIsopen] = useState(false);
    const [valid,setValid] = useState();
    const [user,setUser] = useState([]);
    const {setUserDetails} = useContext(UserContext);
    const navigate = useNavigate();
    const isMounted = useRef(true);
    const toggleDropdown = () => {
        setIsopen(!isOpen);
    }
    useEffect(()=>{
        if(isMounted.current){
            isMounted.current = false;
        }else{
      
        axios.get(`${baseUrl}/getprofile`,{withCredentials: true}).then((response)=>{
            setUser(response.data.user);
            setValid(response.data.valid);
            setUserDetails(response.data);
        }).catch((err)=>{
            console.log(err);
        })
    }
        
    }, [])

    const handleLogout = (e)=>{
        e.preventDefault();
        axios.get(`${baseUrl}/logout`,{withCredentials:true}).then((response)=>{
            if(response.data.status === 'error'){
                alert('Logout Failed')
            }else{
                navigate('/login')
            }
        })
    }

    return (
        <div className='dropdown'>
            <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                onClick={toggleDropdown}
            >{valid? user.fullname : "Account"}</button>
            <div className={`dropdown-menu${isOpen ? 'show' : ''}`}>
                {valid ? <a className='dropdown-item' style={{cursor:'pointer'}} onClick={handleLogout}>Logout</a> : 
                <a className="dropdown-item" onClick={()=>{navigate('/login')}} style={{cursor:'pointer'}}>
                    Login
                </a>}
                
            </div>
        </div>
    )
}

export default DropDown