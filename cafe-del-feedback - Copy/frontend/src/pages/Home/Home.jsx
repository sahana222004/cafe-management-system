import React, { useState, useEffect } from 'react';
import './Home.css';
import Header from '../../components/Header/Header';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';

const Home = () => {
  const [category, setCategory] = useState("All");

  useEffect(() => {
    const scrollToMenu = localStorage.getItem("scrollToMenu");
    if (scrollToMenu === "true") {
      const menuElement = document.getElementById("explore-menu");
      if (menuElement) {
        menuElement.scrollIntoView({ behavior: "smooth" });
      }
      localStorage.removeItem("scrollToMenu");
    }
  }, []);

  return (
    <div className="home-page">
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
    </div>
  );
};

export default Home;
