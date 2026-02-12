import React, { createContext, useContext, useEffect, useState } from 'react';
import { useMotionValue, useSpring, MotionValue } from 'framer-motion';

interface ScrollContextData {
  scrollY: number;
  scrollVelocity: number;
  springScrollY: MotionValue<number>;
}

const ScrollContext = createContext<ScrollContextData | null>(null);

export const useScrollData = () => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error('useScrollData must be used within a ScrollProvider');
  }
  return context;
};

export const ScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [scrollY, setScrollY] = useState(0);
  const [scrollVelocity, setScrollVelocity] = useState(0);

  const motionScrollY = useMotionValue(0);
  const springScrollY = useSpring(motionScrollY, { stiffness: 500, damping: 50 });

  useEffect(() => {
    let lastY = window.scrollY;
    let lastTime = performance.now();

    const handleScroll = () => {
      const y = window.scrollY;
      const time = performance.now();
      const deltaTime = time - lastTime;

      // Avoid division by zero
      if (deltaTime > 0) {
        const velocity = (y - lastY) / deltaTime;
        setScrollVelocity(velocity);
      }

      setScrollY(y);
      motionScrollY.set(y);

      lastY = y;
      lastTime = time;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [motionScrollY]);

  const value = {
    scrollY,
    scrollVelocity,
    springScrollY,
  };

  return <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>;
};
