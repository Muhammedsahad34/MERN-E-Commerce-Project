import React, { useContext, useEffect, useState } from 'react';
import './AdminHeader.css';
import { NavLink, Link } from 'react-router-dom';
import { AdminContext } from '../../Contexts/AdminContext';
import axios from 'axios';
import { baseUrl} from '../../URL';

function AdminHeader() {
    const [isOpen, setIsOpen] = useState(false);
    const {adminDetails,setAdminDetails} = useContext(AdminContext);
    useEffect(()=>{
        axios.get(`${baseUrl}/admin/getAdmin`,{withCredentials:true}).then((res)=>{
            setAdminDetails(res.data);
        })
    },[])


    return (
        <nav className='bg-secondary mb-5 nav-admin'>
            <Link to='/admin/home' className='title'>Let's Buy Admin</Link>
            <div><input type="text" placeholder='search the products' className='ps-5' /></div>
            <div className={`menu ${isOpen ? "rot" : ""}`} onClick={() => { setIsOpen(!isOpen) }}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <ul className={isOpen ? "open" : ''}>
                <li>
                    <NavLink to='/admin/profile'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                    </svg> {adminDetails && adminDetails.data? adminDetails.data.username:'Profile'}</NavLink>
                </li>
                <li>
                    <NavLink to='/admin/home'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-cart-fill" viewBox="0 0 16 16">
                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                    </svg> All Products</NavLink>
                </li>
                <li>
                    <NavLink to='/admin/allOrders'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-truck" viewBox="0 0 16 16">
                        <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5zm1.294 7.456A2 2 0 0 1 4.732 11h5.536a2 2 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456M12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2" />
                    </svg> All Orders</NavLink>
                </li>
                <li>
                    <NavLink to='/admin/allUsers'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-people-fill" viewBox="0 0 16 16">
                        <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
                    </svg> All Users</NavLink>
                </li>
            </ul>


        </nav>


    )
}

export default AdminHeader;