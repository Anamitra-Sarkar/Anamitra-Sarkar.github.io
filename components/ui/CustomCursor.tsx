import React, { useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // For the dot - should be almost instant
  const dotX = useSpring(-100, { stiffness: 3000, damping: 100 });
  const dotY = useSpring(-100, { stiffness: 3000, damping: 100 });

  // For the ring - has a slight delay
  const ringX = useSpring(-100, { stiffness: 300, damping: 30 });
  const ringY = useSpring(-100, { stiffness: 300, damping: 30 });

  useEffect(() => {
    // Check for touch device on mount
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);

      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        window.getComputedStyle(target).cursor === 'pointer'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [dotX, dotY, ringX, ringY]);

  if (isTouchDevice) {
    return null;
  }

  const ringVariants = {
    default: {
      scale: 1,
      opacity: 0.8,
      transition: { duration: 0.2, ease: 'easeOut' },
    },
    hover: {
      scale: 1.6,
      opacity: 0.5,
      transition: { duration: 0.2, ease: 'easeOut' },
    },
  };

  return (
    <>
      {/* Ring */}
      <motion.div
        variants={ringVariants}
        animate={isHovering ? 'hover' : 'default'}
        style={{
          translateX: ringX,
          translateY: ringY,
        }}
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-zinc-900 dark:border-white"
      />
      {/* Dot */}
      <motion.div
        style={{
          translateX: dotX,
          translateY: dotY,
        }}
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-900 dark:bg-white"
      />
    </>
  );
};

export default CustomCursor;