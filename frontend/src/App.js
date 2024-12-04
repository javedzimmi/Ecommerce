
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Footer from './component/layout/footer/Footer';
import Header from './component/layout/Header/Header';
import Home from './component/home/Home';
import ProductDetails from './component/ProductDetails';

function App() {
  return (

    <Router>
      <Header />
      <Routes>
        <Route path='/' Component={Home}/>
        <Route path='/product/:id' Component={ProductDetails}/>
        

      </Routes>
      <Footer />
    </Router>

  );
}

export default App;
