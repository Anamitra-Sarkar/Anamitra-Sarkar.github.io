import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PERSONAL_INFO, HERO_VARIANTS } from '../constants';
import { ArrowDown, Github, Linkedin, BrainCircuit } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      duration: 0.5,
      ease: 'easeOut'
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};


export const Hero: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % HERO_VARIANTS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
        className="relative min-h-screen flex flex-col justify-center px-6 pt-20 overflow-hidden z-10"
    >
      
      {/* Playful Background Elements */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 right-[-100px] w-96 h-96 rounded-full border border-dashed border-orange-200 dark:border-orange-900/30 opacity-50 pointer-events-none"
      />
      <motion.div 
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-40 left-10 w-32 h-32 bg-purple-100 dark:bg-purple-900/20 rounded-full blur-2xl opacity-60 pointer-events-none"
      />
      <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-teal-400 rounded-full" />
      <div className="absolute bottom-1/4 left-1/3 w-6 h-6 bg-orange-400 rounded-md rotate-12" />

      <div className="max-w-7xl mx-auto w-full z-10">
        <motion.div variants={itemVariants} className="max-w-4xl">
          <div
            className="flex items-center gap-3 mb-6"
          >
            <span className="px-4 py-1.5 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 font-bold text-sm tracking-wide">
              HELLO WORLD
            </span>
            <span className="h-px w-20 bg-orange-200 dark:bg-orange-800/50"></span>
          </div>

          {/* Cycling Headline */}
          <div className="h-48 md:h-40 mb-6 relative">
            <AnimatePresence mode="wait">
              <motion.h1
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="font-display font-extrabold text-5xl md:text-7xl lg:text-8xl text-zinc-900 dark:text-stone-100 leading-[0.95] tracking-tight absolute top-0 left-0"
              >
                {HERO_VARIANTS[index].headline}
              </motion.h1>
            </AnimatePresence>
          </div>

          <motion.p
            key={`sub-${index}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-lg md:text-2xl text-zinc-600 dark:text-stone-400 max-w-2xl leading-relaxed mb-10 font-medium"
          >
             Hi, I'm <strong className="text-zinc-900 dark:text-stone-200">{PERSONAL_INFO.name}</strong>. {HERO_VARIANTS[index].subline}
          </motion.p>

          <div
            className="flex flex-col sm:flex-row gap-5 items-start sm:items-center"
          >
            <button 
              onClick={scrollToProjects}
              className="px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-stone-900 font-bold rounded-xl hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all hover:shadow-lg hover:shadow-zinc-900/20 active:scale-95 cursor-pointer"
            >
              See My Work
            </button>
            
            <div className="flex gap-4 items-center pl-2">
               <SocialLink href={PERSONAL_INFO.github} icon={Github} />
               <SocialLink href={PERSONAL_INFO.linkedin} icon={Linkedin} />
               <SocialLink href={PERSONAL_INFO.huggingface} icon={BrainCircuit} />
            </div>
          </div>
        </motion.div>
      </div>
      
      <motion.div 
        variants={itemVariants}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-zinc-400 dark:text-stone-600"
      >
        <span className="text-xs font-bold tracking-widest uppercase">Scroll</span>
        <ArrowDown className="w-4 h-4 animate-bounce" />
      </motion.div>
    </motion.div>
  );
};

const SocialLink = ({ href, icon: Icon }: { href: string, icon: any }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="p-3 bg-white dark:bg-stone-800 border border-zinc-200 dark:border-stone-700 rounded-full text-zinc-600 dark:text-stone-400 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-400 dark:hover:border-stone-500 hover:scale-110 transition-all duration-300"
  >
    <Icon className="w-5 h-5" />
  </a>
);