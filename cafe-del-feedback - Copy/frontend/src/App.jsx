import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Footer from './components/Footer/Footer';
import LoginPopup from './components/LoginPopup/LoginPopup';
import ExploreMenu from './components/ExploreMenu/ExploreMenu';
import FoodDisplay from './components/FoodDisplay/FoodDisplay';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [category, setCategory] = useState("All"); // Set initial category to "All"

  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin}/> : <></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route 
            path="/menu" 
            element={<ExploreMenu category={category} setCategory={setCategory} />} 
          />
          <Route 
            path="/fooddisplay" 
            element={<FoodDisplay category={category} />} 
          />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
