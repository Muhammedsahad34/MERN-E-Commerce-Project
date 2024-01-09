import React, {  useContext, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './DropDown.css';
import axios from 'axios';
import { baseUrl } from '../../URL';
import { UserContext } from '../../Contexts/UserContext';

function DropDown() {
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
            if(response.data === false){
                alert('Logout Failed')
            }else{
                setUserDetails(null)
                navigate('/login')
            }
        })
    }

    return (
        <div className='dropdown position-fixed drop'>
            <button
                className="btn btn-secondary dropdown-toggle bg-white text-dark"
                type="button"
                onClick={toggleDropdown}
            >{valid? user.fullname : "Account"}</button>
            <div className={`dropdown-menu lists ${isOpen ? 'show' : ''}`}>
                {valid ? <Link to='#' className='dropdown-item ps-5 pt-0 w-100 item' style={{cursor:'pointer'}} onClick={handleLogout}>Logout</Link> : 
                <Link to={'/login'}className="dropdown-item"  style={{cursor:'pointer'}}>
                    Login
                </Link>}
                
            </div>
        </div>
    )
}

export default DropDown