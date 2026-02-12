import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useScrollData } from './providers/ScrollProvider';
import { ProximityAware } from './ui/ProximityAware';

export const ScrollToTopButton: React.FC = () => {
  const { scrollY } = useScrollData();
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      // Show button when scrolled down more than one viewport height
      if (window.scrollY > window.innerHeight) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <ProximityAware distanceThreshold={200} lift={8}>
            <motion.div 
                className="fixed bottom-8 right-8 z-30 pointer-events-auto"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
            <button
                onClick={scrollToTop}
                className="bg-white/80 dark:bg-stone-900/80 backdrop-blur-md border border-zinc-200 dark:border-stone-800 shadow-xl shadow-zinc-200/20 dark:shadow-black/30 w-16 h-16 rounded-full flex items-center justify-center text-zinc-600 dark:text-stone-300 hover:text-zinc-900 dark:hover:text-white transition-colors"
                aria-label="Scroll to top"
            >
                <ArrowUp className="w-8 h-8" />
            </button>
            </motion.div>
        </ProximityAware>
      )}
    </AnimatePresence>
  );
};
