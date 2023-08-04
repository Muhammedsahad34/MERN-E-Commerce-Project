import React from 'react'

function Header(props) {
    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">{props.isAdmin ? "Admin Panel" : "Shopping cart"}</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="#">{props.isAdmin ? "All Products" : "Products"}</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">{props.isAdmin ? "All Orders":"Cart"}</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" onClick={()=>{}}>{props.isAdmin ? "All Users":"Orders"}</a>
                            </li>
                            
                        </ul>
                        <form class="d-flex">
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button class="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header