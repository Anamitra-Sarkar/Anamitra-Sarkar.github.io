import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelection } from '../providers/SelectionProvider';

export const SelectionHighlighter: React.FC = () => {
  const { isSelecting, selectionRect } = useSelection();

  return (
    <AnimatePresence>
      {isSelecting && selectionRect && (
        <motion.div
          className="fixed z-40 pointer-events-none bg-orange-500/30 mix-blend-multiply dark:mix-blend-screen"
          style={{
            left: selectionRect.left,
            top: selectionRect.top,
            width: selectionRect.width,
            height: selectionRect.height,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
        />
      )}
    </AnimatePresence>
  );
};
