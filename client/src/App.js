import './App.css';
import AddProducts from './Pages/Admin/AddProducts';
import HomeAdmin from './Pages/Admin/HomeAdmin';
import Home from './Pages/Users/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Pages/Users/LoginPage';
import SignupPage from './Pages/Users/SignupPage';
import UserDetails from './Contexts/UserContext';
import EditProductPage from './Pages/Admin/EditProductPage';
import CartPage from './Pages/Users/CartPage';
import PlaceOrderPage from './Pages/Users/PlaceOrderPage';
import ViewOrderPage from './Pages/Users/ViewOrderPage';
import ViewOrderDetailPage from './Pages/Users/ViewOrderDetailPage';
import SplashScreen from './Components/SplashScreen/SplashScreen';
import { useEffect, useState } from 'react';
import AdminLoginPage from './Pages/Admin/AdminLoginPage';
import AdminDetails from './Contexts/AdminContext';
import PrivateRoutes from './Components/PrivateRoutes/PrivateRoutes';
import ProductDetailPage from './Pages/Users/ProductDetailPage';
import AllProductsPage from './Pages/Users/AllProductsPage';
import AdminAllOrdersPage from './Pages/Admin/AdminAllOrdersPage';




function App() {
  const [showSplash, setShowSplas] = useState(true);
  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    if (hasVisited) {
      setShowSplas(false);
    } else {

      setTimeout(() => {
        setShowSplas(false);
        localStorage.setItem('hasVisited', true)
      }, 5000);

    }

  }, [])
  return (
    <div className="App">
     

      <UserDetails>
        <Router>
          <Routes>
            <Route path='/spa' element={<SplashScreen/>} />
            <Route path='/' element={showSplash ? <SplashScreen /> : <Home />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<SignupPage />} />
            <Route path='/cart' element={<CartPage />} />
            <Route path='/place-order/:total' element={<PlaceOrderPage />} />
            <Route path='/place-each-order/:total/:proId' element={<PlaceOrderPage />} />
            <Route path='/view-orders' element={<ViewOrderPage />} />
            <Route path='/view-order-details/:id' element={<ViewOrderDetailPage />} />
            <Route path='/Product-detail/:id' element={<ProductDetailPage />} />
            <Route path='/products' element={<AllProductsPage />} />
            

          </Routes>
        </Router>
      </UserDetails>

      <AdminDetails>
        <Router>
          <Routes>

            <Route path='/admin/login' element={<AdminLoginPage />} />
            <Route path='/admin' element={<PrivateRoutes/>}>

            <Route path='home' element={<HomeAdmin/>} />
            <Route path='add-product' element={<AddProducts />} />
            <Route path='edit-product/:id' element={<EditProductPage />} />
            <Route path='allOrders' element={<AdminAllOrdersPage />} />
            </Route>

          </Routes>
        </Router>
      </AdminDetails>

    </div>
  );
}

export default App;
