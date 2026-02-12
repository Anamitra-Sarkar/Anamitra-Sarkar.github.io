import React from 'react';
import { motion, useTransform } from 'framer-motion';
import { useScrollData } from '../providers/ScrollProvider';

interface ParallaxSectionProps {
  children: React.ReactNode;
  speed: number; // e.g., 0.1 for a subtle effect
  className?: string;
}

export const ParallaxSection: React.FC<ParallaxSectionProps> = ({ children, speed, className }) => {
  const { springScrollY } = useScrollData();
  
  // We need a way to know the section's position relative to the viewport.
  // A simple approach is to apply a transform based on the global scroll value.
  // This creates a consistent parallax effect for all sections wrapped with this component.
  const y = useTransform(springScrollY, (value: number) => value * speed);

  return (
    <motion.div
      style={{ y, willChange: 'transform' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
