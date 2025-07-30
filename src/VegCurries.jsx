
import React from 'react';
import { motion } from 'framer-motion';
import './MenuCard.css'; // Reuse the same styles

const vegItems = [
  {
    name: 'butter panner masala',
    image: 'https://tse4.mm.bing.net/th/id/OIP.0hiXPRFtt89DMwp6EeDwjgHaLH?pid=Api&P=0&h=180',
    price: '₹160',
    isVeg: true,
  },
  {
    name: 'Mixed Vegetable Curry',
    image: 'https://cdn.pixabay.com/photo/2023/10/18/08/38/stew-8323284_1280.jpg',
    price: '₹130',
    isVeg: true,
  },
  {
    name: 'Dal Tadka',
    image: 'https://cdn.pixabay.com/photo/2021/02/09/03/54/thai-food-5997312_1280.jpg',
    price: '₹100',
    isVeg: true,
  },
  {
    name: 'special panner butter masala',
    image: 'https://tse4.mm.bing.net/th/id/OIP.0hiXPRFtt89DMwp6EeDwjgHaLH?pid=Api&P=0&h=180',
    price: '₹160',
    isVeg: true,
  },
  {
    name: 'Mixed Vegetable Curry',
    image: 'https://cdn.pixabay.com/photo/2023/10/18/08/38/stew-8323284_1280.jpg',
    price: '₹130',
    isVeg: true,
  },
  {
    name: 'Dal Tadka',
    image: 'https://cdn.pixabay.com/photo/2021/02/09/03/54/thai-food-5997312_1280.jpg',
    price: '₹100',
    isVeg: true,
  },
  {
    name: 'Paneer Butter Masala',
    image: 'https://tse4.mm.bing.net/th/id/OIP.0hiXPRFtt89DMwp6EeDwjgHaLH?pid=Api&P=0&h=180',
    price: '₹160',
    isVeg: true,
  },
  {
    name: 'Mixed Vegetable Curry',
    image: 'https://cdn.pixabay.com/photo/2023/10/18/08/38/stew-8323284_1280.jpg',
    price: '₹130',
    isVeg: true,
  },
  {
    name: 'Dal Tadka',
    image: 'https://cdn.pixabay.com/photo/2021/02/09/03/54/thai-food-5997312_1280.jpg',
    price: '₹100',
    isVeg: true,
  },
];

function VegCurries() {
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
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="image-wrapper">
              <img src={item.image} alt={item.name} className="menu-img" />
              {item.isVeg && <span className="veg-icon">🟢 Veg</span>}
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

export default VegCurries;