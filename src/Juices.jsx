
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { collection, doc, getDocs, setDoc, Timestamp } from 'firebase/firestore';
import db from './firebase';
import './MenuCard.css';

const juiceItems = [
  {
    name: 'Mango Juice',
    image: 'https://images.pexels.com/photos/8679358/pexels-photo-8679358.jpeg',
    price: '₹50',
  },
  {
    name: 'Watermelon Juice',
    image: 'https://images.pexels.com/photos/1337825/pexels-photo-1337825.jpeg',
    price: '₹40',
  },
  {
    name: 'Pineapple Juice',
    image: 'https://images.pexels.com/photos/8963466/pexels-photo-8963466.jpeg',
    price: '₹50',
  },
  {
    name: 'Orange Juice',
    image: 'https://images.pexels.com/photos/96620/pexels-photo-96620.jpeg',
    price: '₹50',
  },
  {
    name: 'Coconut Juice',
    image: 'https://images.pexels.com/photos/1803516/pexels-photo-1803516.jpeg',
    price: '₹40',
  },
  {
    name: 'Dragon Fruit Juice',
    image: 'https://images.pexels.com/photos/4443495/pexels-photo-4443495.jpeg',
    price: '₹50',
  },
  {
    name: 'Pomegranate Juice',
    image: 'https://images.pexels.com/photos/7656393/pexels-photo-7656393.jpeg',
    price: '₹50',
  },
  {
    name: 'Kiwi Fruit Juice',
    image: 'https://images.pexels.com/photos/8679374/pexels-photo-8679374.jpeg',
    price: '₹40',
  },
  {
    name: 'Cherry Juice',
    image: 'https://images.pexels.com/photos/10802281/pexels-photo-10802281.jpeg',
    price: '₹50',
  },
];

function Juices() {
  const [selectedItem, setSelectedItem] = useState(null);

  const [formData, setFormData] = useState({
    customerName: '',
    quantity: 1,
    place: ''
  });

  const [showSuccess, setShowSuccess] = useState(false);

  // Open order popup
  const handlePlaceOrder = (item) => {
    setSelectedItem(item);

    setFormData({
      customerName: '',
      quantity: 1,
      place: ''
    });

    setShowSuccess(false);
  };

  // Close order popup
  const handleClose = () => {
    setSelectedItem(null);
  };

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Get next Order number
  const getNextOrderNumber = async () => {
    const ordersRef = collection(db, 'orders');
    const snapshot = await getDocs(ordersRef);

    let highestOrderNumber = 0;

    snapshot.forEach((orderDoc) => {
      const orderId = orderDoc.id;

      const match = orderId.match(/^Order (\d+)$/);

      if (match) {
        const number = parseInt(match[1], 10);

        if (number > highestOrderNumber) {
          highestOrderNumber = number;
        }
      }
    });

    return highestOrderNumber + 1;
  };

  // Submit order
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.customerName.trim()) {
      alert('Please enter your name.');
      return;
    }

    if (!formData.place.trim()) {
      alert('Please enter the place.');
      return;
    }

    if (Number(formData.quantity) < 1) {
      alert('Quantity must be at least 1.');
      return;
    }

    try {
      // Get next order number
      const nextOrderNumber = await getNextOrderNumber();

      // Example: Order 1, Order 2, Order 3...
      const orderId = `Order ${nextOrderNumber}`;

      // Create Firestore document
      const orderRef = doc(db, 'orders', orderId);

      await setDoc(orderRef, {
        customerName: formData.customerName.trim(),
        itemName: selectedItem.name,
        price: selectedItem.price,
        quantity: Number(formData.quantity),
        place: formData.place.trim(),
        section: 'Juice',
        orderNumber: nextOrderNumber,
        timestamp: Timestamp.now()
      });

      console.log(`Order saved successfully as ${orderId}`);

      // Close form
      setSelectedItem(null);

      // Show success popup
      setShowSuccess(true);

    } catch (error) {
      console.error('Error placing order:', error);

      alert('Failed to place order. Please try again.');
    }
  };

  return (
    <div className="menu-container">

      <h2 className="section-title">
        🍹 Fresh Juices
      </h2>

      <div className="menu-grid">

        {juiceItems.map((item, index) => (
          <motion.div
            className="menu-card"
            key={index}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1
            }}
          >

            <div className="image-wrapper">
              <img
                src={item.image}
                alt={item.name}
                className="menu-img"
              />
            </div>

            <div className="menu-details">

              <h3 className="menu-name">
                {item.name}
              </h3>

              <p className="menu-price">
                {item.price}
              </p>

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


      {/* ============================= */}
      {/* ORDER FORM POPUP */}
      {/* ============================= */}

      {selectedItem && (
        <div className="order-overlay">

          <div className="order-popup">

            <button
              className="close-order"
              onClick={handleClose}
            >
              ✕
            </button>

            <h2>🛒 Place Your Order</h2>

            {/* Selected Item */}
            <div className="selected-food">

              <p>Selected Item</p>

              <h3>
                {selectedItem.name}
              </h3>

              <span>
                {selectedItem.price}
              </span>

            </div>


            <form onSubmit={handleSubmit}>

              {/* Customer Name */}
              <label>
                Customer Name
              </label>

              <input
                type="text"
                name="customerName"
                placeholder="Enter your name"
                value={formData.customerName}
                onChange={handleChange}
                required
              />


              {/* Quantity */}
              <label>
                Quantity
              </label>

              <input
                type="number"
                name="quantity"
                min="1"
                value={formData.quantity}
                onChange={handleChange}
                required
              />


              {/* Place */}
              <label>
                Place
              </label>

              <input
                type="text"
                name="place"
                placeholder="Enter your place"
                value={formData.place}
                onChange={handleChange}
                required
              />


              {/* Place Order */}
              <button
                type="submit"
                className="confirm-order-btn"
              >
                ✅ Place Order
              </button>

            </form>

          </div>

        </div>
      )}


      {/* ============================= */}
      {/* SUCCESS POPUP */}
      {/* ============================= */}

      {showSuccess && (
        <div className="success-overlay">

          <div className="success-popup">

            <div className="success-icon">
              ✓
            </div>

            <h2>
              Order Completed!
            </h2>

            <p>
              Your order has been successfully placed.
            </p>

            <button
              onClick={() => setShowSuccess(false)}
              className="success-btn"
            >
              OK
            </button>

          </div>

        </div>
      )}

    </div>
  );
}

export default Juices;
