import './App.css';
import AddProducts from './Pages/Admin/AddProducts';
import HomeAdmin from './Pages/Admin/HomeAdmin';
import Home from './Pages/Users/Home';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginPage from './Pages/Users/LoginPage';
import SignupPage from './Pages/Users/SignupPage';
import UserDetails from './Contexts/UserContext';
import EditProductPage from './Pages/Admin/EditProductPage';
import CartPage from './Pages/Users/CartPage';


function App() {
  return (
    <div className="App">
      
      <UserDetails>
      <Router>
        <Routes>
          
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/signup' element={<SignupPage/>}/>
          <Route path= '/admin' element={<HomeAdmin isAdmin={true}/>}/>
          <Route path='/add-product' element={<AddProducts/>}/>
          <Route path='/edit-product/:id' element={<EditProductPage/>}/>
          <Route path='/cart' element={<CartPage/>}/>

          
        </Routes>
      </Router>
      </UserDetails>
      
    </div>
  );
}

export default App;
