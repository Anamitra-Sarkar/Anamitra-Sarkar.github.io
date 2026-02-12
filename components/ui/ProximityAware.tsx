import React, { useRef, useState, useEffect } from 'react';
import { motion, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useMousePosition } from '../providers/MouseProvider';

interface ProximityAwareProps {
  children: React.ReactNode;
  className?: string;
  distanceThreshold?: number;
  lift?: number;
  brightness?: number;
}

export const ProximityAware: React.FC<ProximityAwareProps> = ({
  children,
  className,
  distanceThreshold = 250,
  lift = 4,
  brightness = 1.05,
}) => {
  const { mouseX, mouseY } = useMousePosition();
  const ref = useRef<HTMLDivElement>(null);
  
  const [elementPosition, setElementPosition] = useState({ x: 0, y: 0, width: 0, height: 0 });

  // Recalculate element's position on scroll and resize to keep proximity detection accurate
  useEffect(() => {
    const updatePosition = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setElementPosition({
          x: rect.left,
          y: rect.top,
          width: rect.width,
          height: rect.height,
        });
      }
    };
    
    updatePosition();

    window.addEventListener('scroll', updatePosition, { passive: true });
    window.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
    };
  }, []);

  const centerX = elementPosition.x + elementPosition.width / 2;
  const centerY = elementPosition.y + elementPosition.height / 2;

  // Create a MotionValue for the distance from the mouse to the center of the element
  const distanceMotionValue = useMotionValue(0);

  // Update the distance whenever mouse moves or element position changes
  useEffect(() => {
    // Consolidated function to calculate and update distance
    const updateDistance = () => {
      const x = mouseX.get();
      const y = mouseY.get();
      const dist = Math.sqrt(Math.pow(centerX - x, 2) + Math.pow(centerY - y, 2));
      distanceMotionValue.set(dist);
    };

    // Subscribe to mouse position changes
    const unsubscribeX = mouseX.on('change', updateDistance);
    const unsubscribeY = mouseY.on('change', updateDistance);

    // Initial distance calculation
    updateDistance();

    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [mouseX, mouseY, centerX, centerY]);

  // Transform the distance into a proximity value (0 = far, 1 = close)
  const proximity = useTransform(distanceMotionValue, [distanceThreshold, 0], [0, 1]);

  // Use a spring to smooth the proximity value for natural-feeling animations
  const smoothProximity = useSpring(proximity, { stiffness: 500, damping: 40, mass: 1 });

  // Map the smoothed proximity value to visual transformations
  const scale = useTransform(smoothProximity, [0, 1], [1, 1.02]);
  const yTransform = useTransform(smoothProximity, [0, 1], [0, -lift]);
  const brightnessTransform = useTransform(smoothProximity, [0, 1], [1, brightness]);
  
  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        scale,
        y: yTransform,
        filter: useTransform(brightnessTransform, b => `brightness(${b})`),
        willChange: 'transform, filter', // Performance optimization
      }}
    >
      {children}
    </motion.div>
  );
};
