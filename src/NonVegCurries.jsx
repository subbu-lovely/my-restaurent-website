import React from 'react';
import { motion } from 'framer-motion';
import './MenuCard.css';

const nonVegItems = [
  {
    name: 'Chicken Curry',
    image: 'https://cdn.pixabay.com/photo/2016/07/22/05/07/delicious-1534207_1280.jpg',
    price: '₹170',
    isVeg: false,
  },
  {
    name: 'Mutton Rogan Josh',
    image: 'https://images.pexels.com/photos/15131224/pexels-photo-15131224.jpeg?_gl=1*n6o7ce*_ga*MTM3MjAxNTIxNi4xNzI2MTgyMzgw*_ga_8JE65Q40S6*czE3NTM4MDA4MDYkbzE2JGcxJHQxNzUzODAxNTM3JGozMSRsMCRoMA..',
    price: '₹220',
    isVeg: false,
  },
  {
    name: 'Fish Masala',
    image: 'https://cdn.pixabay.com/photo/2018/09/19/12/47/fish-curry-3688482_1280.jpg',
    price: '₹190',
    isVeg: false,
  },
];

function NonVegCurries() {
  return (
    <div className="menu-container">
      <h2 className="section-title">🍗 Non-Vegetarian Curries</h2>
      <div className="menu-grid">
        {nonVegItems.map((item, index) => (
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
              {!item.isVeg && <span className="nonveg-icon">🔴 Non-Veg</span>}
            </div>
            <div className="menu-details">
              <h3 className="menu-name">{item.name}</h3>
              <p className="menu-price">{item.price}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default NonVegCurries;
