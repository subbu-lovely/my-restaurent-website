import React from 'react';
import { motion } from 'framer-motion';
import './MenuCard.css';

const juiceItems = [
  {
    name: 'Mango Juice',
    image: 'https://images.pexels.com/photos/8679358/pexels-photo-8679358.jpeg?_gl=1*juzrtg*_ga*MTM3MjAxNTIxNi4xNzI2MTgyMzgw*_ga_8JE65Q40S6*czE3NTM4NDQ5NzkkbzE3JGcxJHQxNzUzODQ1MjA2JGo1OSRsMCRoMA..',
    price: '₹50',
  },
  {
    name: 'Watermelon Juice',
    image: 'https://images.pexels.com/photos/1337825/pexels-photo-1337825.jpeg?_gl=1*191vr2w*_ga*MTM3MjAxNTIxNi4xNzI2MTgyMzgw*_ga_8JE65Q40S6*czE3NTM4NDQ5NzkkbzE3JGcxJHQxNzUzODQ1MDczJGo0MyRsMCRoMA..',
    price: '₹40',
  },
  {
    name: 'Pineapple Juice',
    image: 'https://images.pexels.com/photos/8963466/pexels-photo-8963466.jpeg?_gl=1*1qk0m16*_ga*MTM3MjAxNTIxNi4xNzI2MTgyMzgw*_ga_8JE65Q40S6*czE3NTM4NDQ5NzkkbzE3JGcxJHQxNzUzODQ1NDkwJGo2MCRsMCRoMA..',
    price: '₹50',
  },
  {
    name: 'orange Juice',
    image: 'https://images.pexels.com/photos/96620/pexels-photo-96620.jpeg?_gl=1*webe18*_ga*MTM3MjAxNTIxNi4xNzI2MTgyMzgw*_ga_8JE65Q40S6*czE3NTM4NDQ5NzkkbzE3JGcxJHQxNzUzODQ0OTkxJGo0OCRsMCRoMA..',
    price: '₹50',
  },
  {
    name: 'coconut Juice ',
    image: 'https://images.pexels.com/photos/1803516/pexels-photo-1803516.jpeg?_gl=1*ckwfj5*_ga*MTM3MjAxNTIxNi4xNzI2MTgyMzgw*_ga_8JE65Q40S6*czE3NTM4NDQ5NzkkbzE3JGcxJHQxNzUzODQ1MTI1JGo2MCRsMCRoMA..',
    price: '₹40',
  },
  {
    name: 'Dragon Fruit Juice',
    image: 'https://images.pexels.com/photos/4443495/pexels-photo-4443495.jpeg?_gl=1*lyrf4g*_ga*MTM3MjAxNTIxNi4xNzI2MTgyMzgw*_ga_8JE65Q40S6*czE3NTM4NDQ5NzkkbzE3JGcxJHQxNzUzODQ1MjYxJGo0JGwwJGgw',
    price: '₹50',
  },
  {
    name: 'pomegrnente juice',
    image: 'https://images.pexels.com/photos/7656393/pexels-photo-7656393.jpeg?_gl=1*ucrnw7*_ga*MTM3MjAxNTIxNi4xNzI2MTgyMzgw*_ga_8JE65Q40S6*czE3NTM4NDQ5NzkkbzE3JGcxJHQxNzUzODQ1MzQwJGo0NSRsMCRoMA..',
    price: '₹50',
  },
  {
    name: 'Kiwi fruit juice',
    image: 'https://images.pexels.com/photos/8679374/pexels-photo-8679374.jpeg?_gl=1*7tjkrf*_ga*MTM3MjAxNTIxNi4xNzI2MTgyMzgw*_ga_8JE65Q40S6*czE3NTM4NDQ5NzkkbzE3JGcxJHQxNzUzODQ1NjAyJGo4JGwwJGgw',
    price: '₹40',
  },
  {
    name: 'cherry juice',
    image: 'https://images.pexels.com/photos/10802281/pexels-photo-10802281.jpeg?_gl=1*1m7q669*_ga*MTM3MjAxNTIxNi4xNzI2MTgyMzgw*_ga_8JE65Q40S6*czE3NTM4NDQ5NzkkbzE3JGcxJHQxNzUzODQ1NTUxJGo1OSRsMCRoMA..',
    price: '₹50',
  },
];

function Juices() {
  return (
    <div className="menu-container">
      <h2 className="section-title">🍹 Fresh Juices</h2>
      <div className="menu-grid">
        {juiceItems.map((item, index) => (
          <motion.div
            className="menu-card"
            key={index}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="image-wrapper">
              <img src={item.image} alt={item.name} className="menu-img" />
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

export default Juices;
