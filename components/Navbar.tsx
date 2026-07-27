import React from 'react';
import { motion, useTransform, useSpring } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useScrollData } from '../components/providers/ScrollProvider';
import { Sun, Moon } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { scrollY, scrollVelocity, springScrollY } = useScrollData();
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
  const y = useTransform(springScrollY, (latest: number) => {
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
      className="fixed top-0 left-0 right-0 z-40 flex justify-center pointer-events-none"
    >
      <div className="w-full bg-[#F4F3EF]/90 dark:bg-[#0A0A0A]/90 backdrop-blur-md border-b border-zinc-300 dark:border-stone-800 px-6 md:px-12 lg:px-24 py-4 flex items-center justify-between pointer-events-auto transition-colors duration-300">
        <button onClick={() => scrollTo('top')} className="font-display font-medium text-zinc-950 dark:text-stone-50 tracking-tight text-2xl">
            A<span className="text-zinc-400 dark:text-stone-600">.S</span>
        </button>
        <div className="hidden md:flex items-center gap-12">
          {['Projects', 'Models', 'Engineering', 'Experience'].map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item.toLowerCase())}
              className="text-xs tracking-widest uppercase font-sans font-medium text-zinc-500 dark:text-stone-400 hover:text-zinc-900 dark:hover:text-stone-100 transition-colors"
            >
              {item}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-6">
             <button
                onClick={toggleTheme}
                className="text-zinc-500 dark:text-stone-400 hover:text-zinc-900 dark:hover:text-stone-100 transition-colors"
                aria-label="Toggle Theme"
             >
                {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
             </button>

            <button 
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="hidden md:block border border-zinc-900 dark:border-stone-100 text-zinc-900 dark:text-stone-100 text-xs tracking-widest uppercase font-medium px-6 py-3 hover:bg-zinc-900 hover:text-white dark:hover:bg-stone-100 dark:hover:text-zinc-900 transition-all cursor-pointer"
            >
              Let's Talk
            </button>
        </div>
      </div>
    </motion.nav>
  );
};
