import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="page-container">
      <motion.div 
        className="glass-panel"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>Interactive Portfolio</h1>
        <p>
          Welcome to the 3D Interactive Cover Page concepts. 
          Please select one of the variations above to explore the different "4th wall breaking" effects built with React Three Fiber.
        </p>
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '30px' }}>
          <Link to="/shatter">
            <button className="premium-btn">The Shatter</button>
          </Link>
          <Link to="/outofbounds">
            <button className="premium-btn" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>Out of Bounds</button>
          </Link>
          <Link to="/portal">
            <button className="premium-btn" style={{ background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)' }}>The Portal</button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
