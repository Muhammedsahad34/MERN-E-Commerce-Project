import { createContext, useState } from "react";
export const ProductContext = createContext(null);

function Product({children}){
    const [productDetails,setProductDetails] = useState();
    return(
        <div className='position-fixed w-100 header-bar'>
            <nav className="navbar navbar-expand-lg navbar-light bg-secondary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to={'/'}>Let's Buy</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page">Products</Link>
                            </li>
                            <li className="nav-item">
                                
                                    <Link to={userDetails && userDetails.valid ?'/cart':'/login'} className="nav-link">Cart</Link>
                            </li>
                            <li className="nav-item">
                                
                                    <Link to={userDetails && userDetails.valid ? '/view-orders':'/login'} className="nav-link" >Orders</Link>
                            </li>

                        </ul>
                        
                            <div>
                                <DropDown />
                            </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}
export default Product;

