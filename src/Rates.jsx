import React from 'react';
import './Rates.css';
import { motion } from 'framer-motion';

const ratesList = [
  { name: 'Chicken Biryani', price: '₹180' },
  { name: 'Mutton Biryani', price: '₹220' },
  { name: 'Veg Dum Biryani', price: '₹150' },
  { name: 'Paneer Butter Masala', price: '₹160' },
  { name: 'Mixed Vegetable Curry', price: '₹130' },
  { name: 'Dal Tadka', price: '₹100' },
  { name: 'Chicken Curry', price: '₹170' },
  { name: 'Mutton Rogan Josh', price: '₹220' },
  { name: 'Fish Masala', price: '₹190' },
  { name: 'Mango Juice', price: '₹50' },
  { name: 'Watermelon Juice', price: '₹40' },
  { name: 'Pineapple Juice', price: '₹50' },
];

function Rates() {
  return (
    <motion.div
      className="rates-section"
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <h2 className="rates-title">📋 Food Price List</h2>
      <div className="rates-table-wrapper">
        <table className="rates-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {ratesList.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td className="price-cell">{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

export default Rates;
