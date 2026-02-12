import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useMotionValue, animate } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const isHoveringRef = useRef(false);

  const dotX = useSpring(-100, { stiffness: 3000, damping: 100 });
  const dotY = useSpring(-100, { stiffness: 3000, damping: 100 });

  const ringX = useSpring(-100, { stiffness: 300, damping: 30 });
  const ringY = useSpring(-100, { stiffness: 300, damping: 30 });

  const ringScale = useMotionValue(1);
  const ringOpacity = useMotionValue(0.8);

  useEffect(() => {
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

      const isCurrentlyHovering = 
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button');

      if (isCurrentlyHovering !== isHoveringRef.current) {
        isHoveringRef.current = !!isCurrentlyHovering;
        const scale = isCurrentlyHovering ? 1.6 : 1;
        const opacity = isCurrentlyHovering ? 0.5 : 0.8;
        animate(ringScale, scale, { duration: 0.2, ease: 'easeOut' });
        animate(ringOpacity, opacity, { duration: 0.2, ease: 'easeOut' });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [dotX, dotY, ringX, ringY, ringScale, ringOpacity]);

  if (isTouchDevice) {
    return null;
  }

  return (
    <>
      {/* Ring */}
      <motion.div
        style={{
          translateX: ringX,
          translateY: ringY,
          scale: ringScale,
          opacity: ringOpacity,
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
