import React from 'react';
import { motion, useTransform, AnimatePresence } from 'framer-motion';
import { useMousePosition } from '../providers/MouseProvider';
import { useSelection } from '../providers/SelectionProvider';

const Cursor: React.FC = () => {
  const { mouseX, mouseY, mouseVelocity } = useMousePosition();
  const { isSelecting } = useSelection();

  // Transform velocity into a scale factor and an opacity for the trail
  const scale = useTransform(mouseVelocity, [0, 50], [1, 2.5]);
  const trailOpacity = useTransform(mouseVelocity, [0, 20], [0, 0.4]);

  return (
    <>
      <AnimatePresence>
        {!isSelecting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Main cursor dot */}
            <motion.div
              className="fixed z-50 pointer-events-none rounded-full bg-orange-500 mix-blend-difference"
              style={{
                x: mouseX,
                y: mouseY,
                scale,
                width: 12,
                height: 12,
                xPercent: -50, // Center the cursor
                yPercent: -50,
                willChange: 'transform',
              }}
            />

            {/* Center dot */}
            <div
              className="fixed z-50 pointer-events-none rounded-full bg-white"
              style={{ 
                left: '50%', 
                top: '50%', 
                width: 4, 
                height: 4, 
                transform: 'translate(-50%, -50%)' // Keep centered
              }}
            />

            {/* Velocity-based trail */}
            <motion.div
              className="fixed z-40 pointer-events-none rounded-full bg-orange-500/50 mix-blend-difference"
              style={{
                x: mouseX,
                y: mouseY,
                scale,
                opacity: trailOpacity,
                width: 40,
                height: 40,
                xPercent: -50,
                yPercent: -50,
                filter: 'blur(10px)',
                willChange: 'transform, opacity',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isSelecting && (
          <motion.div
            className="fixed z-50 pointer-events-none rounded-full bg-orange-500/50"
            style={{
              x: mouseX,
              y: mouseY,
              width: 8,
              height: 8,
              xPercent: -50,
              yPercent: -50,
              willChange: 'transform',
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Cursor;
