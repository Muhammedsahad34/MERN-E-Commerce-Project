import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import DropDown from '../DropDownMenu/DropDown';
import { UserContext } from '../../Contexts/UserContext';

function Header(props) {

    const navigate = useNavigate();
    const { userDetails } = useContext(UserContext);
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">{props.isAdmin ? "Admin Panel" : "Shopping cart"}</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">{props.isAdmin ? "All Products" : "Products"}</a>
                            </li>
                            <li className="nav-item">
                                {props.isAdmin ? <a className="nav-link" href="#">All Orders</a> :
                                    <a className="nav-link" onClick={() => {
                                        if (userDetails.valid) {
                                            navigate('/cart')
                                        } else {
                                            navigate('/login');
                                        }
                                    }}>Cart</a>}
                            </li>
                            <li className="nav-item">
                                {props.isAdmin ? <a className="nav-link" onClick={() => { }} style={{ cursor: 'pointer' }}>All Users</a> :
                                    <a className="nav-link" onClick={() => {
                                        if (userDetails.valid) {
                                            navigate('/view-orders')
                                        } else { navigate('/login') }
                                    }} style={{ cursor: 'pointer' }}>Orders</a>}
                            </li>

                        </ul>
                        {props.isAdmin ? <div className='mx-auto'><input className="form-control" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success mt-3" type="submit">Search</button></div> :
                            <div>
                                <DropDown />
                            </div>}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header