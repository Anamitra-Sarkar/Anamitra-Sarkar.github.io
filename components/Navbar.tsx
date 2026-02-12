import React from 'react';
import { motion, useTransform, useSpring } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useScrollData } from '../components/providers/ScrollProvider';
import { Sun, Moon } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { scrollY, scrollVelocity } = useScrollData();
  const { theme, toggleTheme } = useTheme();

  // Spring-ify the scroll velocity for smoother animations
  const smoothScrollVelocity = useSpring(scrollVelocity, {
    stiffness: 400,
    damping: 40,
  });

  // When scrolling down fast, blur and scale down the navbar
  const blur = useTransform(smoothScrollVelocity, [-15, 0, 15], [8, 0, 8]);
  const scale = useTransform(smoothScrollVelocity, [-15, 0, 15], [0.9, 1, 0.9]);

  // Hide the navbar if the user scrolls past a certain threshold
  const y = useTransform(scrollY, (latest) => {
    return latest > 300 ? '-100%' : '0%';
  });

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      style={{
        y,
        scale,
        filter: useTransform(blur, (v) => `blur(${v}px)`),
        willChange: 'transform, filter',
      }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-40 flex justify-center pt-6 px-4 pointer-events-none"
    >
      <div className="bg-white/80 dark:bg-stone-900/80 backdrop-blur-md border border-zinc-200 dark:border-stone-800 shadow-xl shadow-zinc-200/10 dark:shadow-stone-900/20 px-8 py-4 rounded-2xl flex items-center gap-12 pointer-events-auto transition-colors duration-300">
        <button onClick={() => scrollTo('top')} className="font-display font-extrabold text-zinc-900 dark:text-white tracking-tight text-xl">
            AS<span className="text-orange-500">.</span>
        </button>
        <div className="hidden md:flex items-center gap-8">
          {['Projects', 'Models', 'Engineering', 'Experience'].map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item.toLowerCase())}
              className="text-sm font-semibold text-zinc-500 dark:text-stone-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              {item}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-4">
             <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-zinc-500 dark:text-stone-400 hover:bg-zinc-100 dark:hover:bg-stone-800 transition-colors"
                aria-label="Toggle Theme"
             >
                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
             </button>

            <button 
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-zinc-900/20 dark:shadow-none"
            >
              Let's Talk
            </button>
        </div>
      </div>
    </motion.nav>
  );
};
