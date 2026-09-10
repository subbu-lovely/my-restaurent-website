
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { collection, doc, getDocs, setDoc, Timestamp } from 'firebase/firestore';
import db from './firebase';
import './MenuCard.css';

const biryaniItems = [
  {
    name: "Chicken Biryani",
    rating: 4.5,
    price: "₹280",
    image: "https://cdn.pixabay.com/photo/2024/01/18/17/20/ai-generated-8517258_1280.jpg"
  },
  {
    name: "Mutton Biryani",
    rating: 4.7,
    price: "₹350",
    image: "https://cdn.pixabay.com/photo/2024/02/10/00/53/biryani-8563961_1280.jpg"
  },
  {
    name: "Prawns Biryani",
    rating: 4.6,
    price: "₹300",
    image: "https://www.cubesnjuliennes.com/wp-content/uploads/2020/12/Prawns-Biryani-1.jpg"
  },
  {
    name: "Chicken Biryani",
    rating: 4.5,
    price: "₹280",
    image: "https://cdn.pixabay.com/photo/2024/01/18/17/20/ai-generated-8517258_1280.jpg"
  },
  {
    name: "Mutton Biryani",
    rating: 4.7,
    price: "₹350",
    image: "https://cdn.pixabay.com/photo/2024/02/10/00/53/biryani-8563961_1280.jpg"
  },
  {
    name: "Prawns Biryani",
    rating: 4.6,
    price: "₹300",
    image: "https://www.cubesnjuliennes.com/wp-content/uploads/2020/12/Prawns-Biryani-1.jpg"
  },
];

const Biryanis = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const [formData, setFormData] = useState({
    customerName: '',
    quantity: 1,
    place: ''
  });

  const [showSuccess, setShowSuccess] = useState(false);

  // Open the order popup
  const handlePlaceOrder = (item) => {
    setSelectedItem(item);

    setFormData({
      customerName: '',
      quantity: 1,
      place: ''
    });

    setShowSuccess(false);
  };

  // Close the order popup
  const handleClose = () => {
    setSelectedItem(null);
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Find the next available Order number
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

      // Create document with our own ID
      const orderRef = doc(db, 'orders', orderId);

      // Save order to Firestore
      await setDoc(orderRef, {
        customerName: formData.customerName.trim(),
        itemName: selectedItem.name,
        price: selectedItem.price,
        quantity: Number(formData.quantity),
        place: formData.place.trim(),
        section: 'Biryani',
        orderNumber: nextOrderNumber,
        timestamp: Timestamp.now()
      });

      console.log(`Order saved successfully as ${orderId}`);

      // Close order form
      setSelectedItem(null);

      // Show success popup
      setShowSuccess(true);

    } catch (error) {
      console.error('Error placing order:', error);

      alert('Failed to place order. Please try again.');
    }
  };

  return (
    <div className="menu-section">

      <h2 className="section-title">
        🍗 Biryani Specials
      </h2>

      <div className="menu-grid">

        {biryaniItems.map((item, index) => (
          <motion.div
            className="menu-card"
            key={index}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 50 }}
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

              <div className="stars">
                {'★'.repeat(Math.floor(item.rating))}
                {'☆'.repeat(5 - Math.floor(item.rating))}
              </div>

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


              {/* Confirm Order */}
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
};

export default Biryanis;
