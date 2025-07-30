import React, { useState } from 'react';
import './OrderForm.css';
import { collection, addDoc } from 'firebase/firestore';
import db from './firebase'; // Make sure firebase.js exists and is configured

function OrderForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    item: '',
    quantity: 1,
  });

  const [submittedOrder, setSubmittedOrder] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, 'orders'), formData); // Save order to Firestore
      setSubmittedOrder(formData);
      alert('✅ Order placed successfully!');
      console.log('Order saved to Firestore:', formData);
      setFormData({ name: '', phone: '', item: '', quantity: 1 });
    } catch (error) {
      console.error('❌ Error adding order:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  return (
    <div className="order-form-container">
      <h2>🛒 Place Your Order</h2>
      <form className="order-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          required
          value={formData.phone}
          onChange={handleChange}
        />
        <select
          name="item"
          required
          value={formData.item}
          onChange={handleChange}
        >
          <option value="">-- Select Item --</option>
          <option value="Chicken Biryani">Chicken Biryani</option>
          <option value="Mutton Biryani">Mutton Biryani</option>
          <option value="Veg Biryani">Veg Biryani</option>
          <option value="Mango Juice">Mango Juice</option>
          <option value="Watermelon Juice">Watermelon Juice</option>
          <option value="Paneer Butter Masala">Paneer Butter Masala</option>
        </select>
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          min="1"
          value={formData.quantity}
          onChange={handleChange}
        />
        <button type="submit">Place Order</button>
      </form>

      {submittedOrder && (
        <div className="order-summary">
          <h3>✅ Order Summary</h3>
          <p><strong>Name:</strong> {submittedOrder.name}</p>
          <p><strong>Phone:</strong> {submittedOrder.phone}</p>
          <p><strong>Item:</strong> {submittedOrder.item}</p>
          <p><strong>Quantity:</strong> {submittedOrder.quantity}</p>
        </div>
      )}
    </div>
  );
}

export default OrderForm;
