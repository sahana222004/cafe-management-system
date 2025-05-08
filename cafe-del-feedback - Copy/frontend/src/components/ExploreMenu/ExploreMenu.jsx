import React, { useEffect } from 'react';
import './ExploreMenu.css';
import { menu_list } from '../../assets/assets';

const ExploreMenu = ({ category, setCategory }) => {

  useEffect(() => {
    if (category === "All") {
      setCategory(menu_list[0].menu_name);
    }
  }, [category, setCategory]);

  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore our Menu</h1>
      <p className="explore-menu-text">Choose from an extensive menu of delicious dishes..</p>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => (
          <div 
            onClick={() => setCategory(item.menu_name)} 
            key={index} 
            className="explore-menu-list-item"
          >
            <img 
              src={item.menu_image} 
              alt={item.menu_name} 
              className={category === item.menu_name ? 'active' : ''}
            />
            <p>{item.menu_name}</p>
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
}

export default ExploreMenu;
