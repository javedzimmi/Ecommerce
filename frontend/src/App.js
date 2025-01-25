import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './component/home/Home';
import ProductDetails from './component/ProductDetails';
import Products from './component/Product/Products.js';
import SignUpLogin from './component/Users/SignUpLogin.js';
import Register from './component/Users/Register.js';

function App() {
  const isAuthenticated = localStorage.getItem('token'); // Check if the user is authenticated

  return (
    <Router>
  
      <Routes>
        {/* Public routes */}
        <Route path="/" Component={SignUpLogin} />
        <Route path="/Register" Component={Register} />

        {/* Protected routes */}
        <Route 
          path="/home" 
          element={isAuthenticated ? <Home /> : <Navigate to="/" />} 
        />
        <Route 
          path="/product/:id" 
          element={isAuthenticated ? <ProductDetails /> : <Navigate to="/" />} 
        />
        <Route 
          path="/products" 
          element={isAuthenticated ? <Products /> : <Navigate to="/" />} 
        />
        {/* Add a route to handle the search */}
        <Route 
          path="/products/:keyword"  // This handles search keywords
          element={isAuthenticated ? <Products /> : <Navigate to="/" />} 
        />
      </Routes>
     
    </Router>
  );
}

export default App;
