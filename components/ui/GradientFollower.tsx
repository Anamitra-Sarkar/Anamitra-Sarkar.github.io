import React from 'react';
import { motion, useTransform, MotionValue } from 'framer-motion';
import { useMousePosition } from '../providers/MouseProvider';

const GradientFollower: React.FC = () => {
  const { mouseX, mouseY } = useMousePosition();

  // Create a radial gradient that follows the mouse
  const background = useTransform<number, string>(
    [mouseX, mouseY],
    ([x, y]) =>
      `radial-gradient(400px at ${x}px ${y}px, rgba(255, 165, 0, 0.1), transparent 80%)`
  );

  return (
    <motion.div
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ 
        background,
        willChange: 'background',
       }}
    />
  );
};

export default GradientFollower;
