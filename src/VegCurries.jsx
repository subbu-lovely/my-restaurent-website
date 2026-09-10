import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  collection,
  doc,
  getDocs,
  setDoc,
  Timestamp,
} from 'firebase/firestore';
import db from './firebase';
import './MenuCard.css';

const vegItems = [
  {
    name: 'butter panner masala',
    image:
      'https://tse4.mm.bing.net/th/id/OIP.0hiXPRFtt89DMwp6EeDwjgHaLH?pid=Api&P=0&h=180',
    price: '₹160',
    isVeg: true,
  },
  {
    name: 'Mixed Vegetable Curry',
    image:
      'https://cdn.pixabay.com/photo/2023/10/18/08/38/stew-8323284_1280.jpg',
    price: '₹130',
    isVeg: true,
  },
  {
    name: 'Dal Tadka',
    image:
      'https://cdn.pixabay.com/photo/2021/02/09/03/54/thai-food-5997312_1280.jpg',
    price: '₹100',
    isVeg: true,
  },
  {
    name: 'special panner butter masala',
    image:
      'https://tse4.mm.bing.net/th/id/OIP.0hiXPRFtt89DMwp6EeDwjgHaLH?pid=Api&P=0&h=180',
    price: '₹160',
    isVeg: true,
  },
  {
    name: 'Mixed Vegetable Curry',
    image:
      'https://cdn.pixabay.com/photo/2023/10/18/08/38/stew-8323284_1280.jpg',
    price: '₹130',
    isVeg: true,
  },
  {
    name: 'Dal Tadka',
    image:
      'https://cdn.pixabay.com/photo/2021/02/09/03/54/thai-food-5997312_1280.jpg',
    price: '₹100',
    isVeg: true,
  },
  {
    name: 'Paneer Butter Masala',
    image:
      'https://tse4.mm.bing.net/th/id/OIP.0hiXPRFtt89DMwp6EeDwjgHaLH?pid=Api&P=0&h=180',
    price: '₹160',
    isVeg: true,
  },
  {
    name: 'Mixed Vegetable Curry',
    image:
      'https://cdn.pixabay.com/photo/2023/10/18/08/38/stew-8323284_1280.jpg',
    price: '₹130',
    isVeg: true,
  },
  {
    name: 'Dal Tadka',
    image:
      'https://cdn.pixabay.com/photo/2021/02/09/03/54/thai-food-5997312_1280.jpg',
    price: '₹100',
    isVeg: true,
  },
];

function VegCurries() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    customerName: '',
    quantity: 1,
    place: '',
  });

  const handlePlaceOrder = (item) => {
    setSelectedItem(item);

    setFormData({
      customerName: '',
      quantity: 1,
      place: '',
    });
  };

  const handleClose = () => {
    setSelectedItem(null);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const getNextOrderNumber = async () => {
    const ordersRef = collection(db, 'orders');
    const snapshot = await getDocs(ordersRef);

    let maxNumber = 0;

    snapshot.forEach((order) => {
      const orderId = order.id;

      const match = orderId.match(/^Order (\d+)$/);

      if (match) {
        const number = parseInt(match[1]);

        if (number > maxNumber) {
          maxNumber = number;
        }
      }
    });

    return maxNumber + 1;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.customerName.trim() ||
      !formData.place.trim() ||
      !formData.quantity
    ) {
      alert('Please fill all the fields');
      return;
    }

    try {
      const nextOrderNumber = await getNextOrderNumber();

      const orderId = `Order ${nextOrderNumber}`;

      await setDoc(doc(db, 'orders', orderId), {
        customerName: formData.customerName,
        itemName: selectedItem.name,
        price: selectedItem.price,
        quantity: Number(formData.quantity),
        place: formData.place,
        section: 'Veg Curries',
        orderNumber: nextOrderNumber,
        timestamp: Timestamp.now(),
      });

      setSelectedItem(null);
      setShowSuccess(true);

      setFormData({
        customerName: '',
        quantity: 1,
        place: '',
      });
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  return (
    <div className="menu-container">
      <h2 className="section-title">🥦 Vegetarian Curries</h2>

      <div className="menu-grid">
        {vegItems.map((item, index) => (
          <motion.div
            className="menu-card"
            key={index}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
            }}
          >
            <div className="image-wrapper">
              <img
                src={item.image}
                alt={item.name}
                className="menu-img"
              />

              {item.isVeg && (
                <span className="veg-icon">🟢 Veg</span>
              )}
            </div>

            <div className="menu-details">
              <h3 className="menu-name">{item.name}</h3>

              <p className="menu-price">{item.price}</p>

              <button
                className="order-btn"
                onClick={() => handlePlaceOrder(item)}
              >
                🛒 Place Order
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ORDER POPUP */}
      {selectedItem && (
        <div className="order-overlay">
          <div className="order-popup">
            <h2>Place Your Order</h2>

            <form onSubmit={handleSubmit}>
              <label>Customer Name</label>

              <input
                type="text"
                name="customerName"
                placeholder="Enter your name"
                value={formData.customerName}
                onChange={handleChange}
                required
              />

              <label>Selected Item</label>

              <div className="selected-food">
                {selectedItem.name} - {selectedItem.price}
              </div>

              <label>Quantity</label>

              <input
                type="number"
                name="quantity"
                min="1"
                value={formData.quantity}
                onChange={handleChange}
                required
              />

              <label>Place</label>

              <input
                type="text"
                name="place"
                placeholder="Enter your place"
                value={formData.place}
                onChange={handleChange}
                required
              />

              <div className="popup-buttons">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={handleClose}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="confirm-order-btn"
                >
                  Place Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SUCCESS POPUP */}
      {showSuccess && (
        <div className="success-overlay">
          <div className="success-popup">
            <div className="success-icon">✓</div>

            <h2>Order Placed Successfully!</h2>

            <p>Thank you for your order.</p>

            <button
              className="success-btn"
              onClick={() => setShowSuccess(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default VegCurries;