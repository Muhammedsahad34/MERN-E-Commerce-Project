import './App.css';
import AddProducts from './Pages/Admin/AddProducts';
import HomeAdmin from './Pages/Admin/HomeAdmin';
import Home from './Pages/Users/Home';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path= '/admin' element={<HomeAdmin isAdmin={true}/>}/>
          <Route path='/add-product' element={<AddProducts/>}/>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
