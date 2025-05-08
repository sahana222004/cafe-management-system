import React, { useContext, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const PlaceOrder = () => {
  const { getTotalCartAmount, cartItems } = useContext(StoreContext);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    pinCode: '',
    country: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const deliveryInfo = { ...formData };
    const subtotal = getTotalCartAmount();
    const deliveryFee = subtotal === 0 ? 0 : 2; // Example delivery fee
    const totalAmount = subtotal + deliveryFee;

    // Preparing cartItems for submission
    const cartItemsData = new Map();
    Object.keys(cartItems).forEach((itemId) => {
      if (cartItems[itemId] > 0) {
        cartItemsData.set(itemId, cartItems[itemId]);
      }
    });

    try {
      const response = await axios.post('http://localhost:4000/api/order/create', {
        deliveryInfo,
        cartItems: cartItemsData,
        totalAmount,
        deliveryFee,
        subtotal,
      });

      if (response.data.success) {
        alert('Order placed successfully!');
        // Handle post-order actions (e.g., redirect to confirmation page)
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place the order.');
    }
  };

  return (
    <form className='place-order' onSubmit={handleSubmit}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input type="text" name="firstName" placeholder='First Name' onChange={handleChange} />
          <input type="text" name="lastName" placeholder='Last Name' onChange={handleChange} />
        </div>
        <input type="text" name="email" placeholder='Email address' onChange={handleChange} />
        <input type="text" name="street" placeholder='Street' onChange={handleChange} />
        <div className="multi-fields">
          <input type="text" name="city" placeholder='City' onChange={handleChange} />
          <input type="text" name="state" placeholder='State' onChange={handleChange} />
        </div>
        <div className="multi-fields">
          <input type="text" name="pinCode" placeholder='Pin code' onChange={handleChange} />
          <input type="text" name="country" placeholder='Country' onChange={handleChange} />
        </div>
        <input type="text" name="phone" placeholder='Phone' onChange={handleChange} />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>RS:{getTotalCartAmount()}</p>
            </div>
            <div className="cart-total-details">
              <p>Delivery fee</p>
              <p>Rs: {getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <div className="cart-total-details">
              <b>Total</b>
              <b>RS:{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
