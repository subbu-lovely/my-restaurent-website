import React from 'react';
import { motion } from 'framer-motion';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import  db  from './firebase';
import './MenuCard.css'; // your styles for menu cards

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
  const placeOrder = async (item) => {
    try {
      await addDoc(collection(db, 'orders'), {
        itemName: item.name,
        section: "Biryani",
        price: item.price,
        timestamp: Timestamp.now()
      });
      alert(`${item.name} ordered successfully!`);
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div className="menu-section">
      <h2 className="section-title">🍗 Biryani Specials</h2>
      <div className="menu-grid">
        {biryaniItems.map((item, index) => (
          <motion.div
            className="menu-card"
            key={index}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="image-wrapper">
              <img src={item.image} alt={item.name} className="menu-img" />
            </div>
            <div className="menu-details">
              <h3 className="menu-name">{item.name}</h3>
              <div className="stars">
                {'★'.repeat(Math.floor(item.rating))}{'☆'.repeat(5 - Math.floor(item.rating))}
              </div>
              <p className="menu-price">{item.price}</p>
              <button className="order-btn" onClick={() => placeOrder(item)}>
                Place Order
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Biryanis;
