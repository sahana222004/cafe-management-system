import React, { useContext, useEffect, useState } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import Fooditem from '../Fooditem/Fooditem';

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {

    if (category === 'All') {
      setFilteredItems(food_list); 
    } else {
      setFilteredItems(food_list.filter(item => item.category === category));
    }
  }, [category, food_list]);

  return (
    <div className="food-display" id="food_display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {filteredItems.map((item, index) => {
          return (
            <Fooditem 
              key={index}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
