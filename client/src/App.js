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

            <Route path='/' element={showSplash ? <SplashScreen /> : <Home />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<SignupPage />} />
            <Route path='/cart' element={<CartPage />} />
            <Route path='/place-order/:total' element={<PlaceOrderPage />} />
            <Route path='/view-orders' element={<ViewOrderPage />} />
            <Route path='/view-order-details/:id' element={<ViewOrderDetailPage />} />

          </Routes>
        </Router>
      </UserDetails>

      <AdminDetails>
        <Router>
          <Routes>

            <Route path='/admin/login' element={<AdminLoginPage />} />
            <Route element={<PrivateRoutes/>}>

            <Route path='/admin/home' element={<HomeAdmin/>} />
            <Route path='/admin/add-product' element={<AddProducts />} />
            <Route path='/admin/edit-product/:id' element={<EditProductPage />} />
            </Route>

          </Routes>
        </Router>
      </AdminDetails>

    </div>
  );
}

export default App;
