import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Contexts/UserContext';
import './Header.css';
import axios from 'axios';
import { baseUrl } from '../../URL';

function Header() {

    const { userDetails, setUserDetails } = useContext(UserContext);
    const [isOpen, setIsOpen] = useState(false);
    const isMounted = useRef(true);
    const navigate = useNavigate();
    useEffect(() => {
        if (isMounted.current) {
            isMounted.current = false
        } else {
            axios.get(`${baseUrl}/getprofile`, { withCredentials: true }).then((res) => {
                setUserDetails(res.data);
                
            }).catch((err) => {
                alert(err);
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
        <nav className='bg-secondary mb-5 nav-admin'>
            <Link to='/' className='title'>Let's Buy</Link>
            <div className={`menu ${isOpen ? "rot" : ""}`} onClick={() => { setIsOpen(!isOpen) }}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <ul className={isOpen ? "open" : ''}>
                <li>
                    <NavLink to={userDetails !== null ? '/Profile' : '/login'}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                    </svg> {userDetails !== null ? userDetails.user.fullname : 'Login'}</NavLink>
                </li>
                <li>
                    <NavLink to='/products'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-cart-fill" viewBox="0 0 16 16">
                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                    </svg> All Products</NavLink>
                </li>
                <li>
                    <NavLink to={userDetails !== null ? '/view-orders' : "/login"}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-truck" viewBox="0 0 16 16">
                        <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5zm1.294 7.456A2 2 0 0 1 4.732 11h5.536a2 2 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456M12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2" />
                    </svg> Orders</NavLink>
                </li>
                <li>
                    <NavLink to={userDetails !== null ? '/cart' : 'login'}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-bag-fill" viewBox="0 0 16 16">
                        <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4z" />
                    </svg> Cart</NavLink>
                </li>
                {
                    userDetails !==null ?
                        <li>
                            <Link to='#' onClick={handleLogout}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-power" viewBox="0 0 16 16">
                                <path d="M7.5 1v7h1V1z" />
                                <path d="M3 8.812a5 5 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812" />
                            </svg> LogOut</Link>
                        </li>
                    :null
                }
            </ul>


        </nav>
    )
}

export default Header