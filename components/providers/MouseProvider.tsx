import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { useSpring, MotionValue } from 'framer-motion';

interface MouseContextData {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  mouseVelocity: MotionValue<number>;
}

const MouseContext = createContext<MouseContextData | null>(null);

export const useMousePosition = () => {
  const context = useContext(MouseContext);
  if (!context) {
    throw new Error('useMousePosition must be used within a MouseProvider');
  }
  return context;
};

export const MouseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const mouseX = useSpring(0, { stiffness: 500, damping: 50 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 50 });
  const mouseVelocity = useSpring(0, { stiffness: 400, damping: 40 });

  const lastPosition = useRef({ x: 0, y: 0, time: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      const deltaX = e.clientX - lastPosition.current.x;
      const deltaY = e.clientY - lastPosition.current.y;
      const deltaTime = now - lastPosition.current.time;

      if (deltaTime > 0) {
        const velocity = Math.sqrt(deltaX * deltaX + deltaY * deltaY) / deltaTime;
        mouseVelocity.set(velocity);
      }
      
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      lastPosition.current = { x: e.clientX, y: e.clientY, time: now };
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY, mouseVelocity]);

  const value = {
    mouseX,
    mouseY,
    mouseVelocity,
  };

  return (
    <MouseContext.Provider value={value}>
      {children}
    </MouseContext.Provider>
  );
};
