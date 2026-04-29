import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ExpertSlider = ({ children }) => {
  const [width, setWidth] = useState(0);
  const carousel = useRef();

  useEffect(() => {
    // Calculamos el ancho total deslizable (ancho total menos ancho visible)
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, []);

  return (
    <motion.div 
      ref={carousel} 
      className="carousel-container"
      style={{ cursor: 'grab', overflow: 'hidden', width: '100%' }}
    >
      <motion.div 
        drag="x" 
        dragConstraints={{ right: 0, left: -width }}
        whileTap={{ cursor: 'grabbing' }}
        className="inner-carousel"
        style={{ 
          display: 'flex', 
          gap: '20px', 
          padding: '20px 0' 
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default ExpertSlider;
