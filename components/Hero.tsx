import React from 'react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '../constants';
import { ArrowDown, Github, Linkedin, MapPin, Briefcase } from 'lucide-react';
import { Selectable } from './ui/Selectable';

const transition = { duration: 1.4, ease: [0.6, 0.01, 0.05, 0.9] };

const titleAnimation = {
  initial: { y: 100, opacity: 0 },
  animate: { y: 0, opacity: 1 },
};

const lineReveal = {
  initial: { clipPath: 'inset(0% 100% 0% 0%)' },
  animate: { clipPath: 'inset(0% 0% 0% 0%)' },
};

export const Hero: React.FC = () => {
  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
        initial="initial"
        animate="animate"
        className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 overflow-hidden z-10"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col items-start z-10">
        
        {/* Availability Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, ...transition }}
          className="flex items-center gap-4 mb-8 sm:mb-12 border-l border-zinc-300 dark:border-stone-800 pl-4 py-1"
        >
            <div className="flex items-center gap-2 text-zinc-500 dark:text-stone-400 font-sans text-xs tracking-widest uppercase">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-800 dark:bg-stone-300 opacity-30"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-zinc-900 dark:bg-stone-100"></span>
              </div>
              Accepting Roles
            </div>
            <div className="h-3 w-px bg-zinc-300 dark:bg-stone-800"></div>
            <div className="flex items-center gap-1.5 text-zinc-500 dark:text-stone-400 font-sans text-xs tracking-widest uppercase">
              <MapPin className="w-3.5 h-3.5" />
              Kolkata
            </div>
        </motion.div>

        {/* Huge Typographic Title */}
        <div className="overflow-hidden mb-2">
            <Selectable>
              <motion.h1 
                variants={titleAnimation}
                transition={{ delay: 0.1, ...transition }}
                className="font-display text-[4.5rem] md:text-[7rem] lg:text-[9rem] leading-[1.1] tracking-[-0.03em] text-zinc-950 dark:text-stone-50 font-medium"
              >
                AI/ML
              </motion.h1>
            </Selectable>
        </div>
        <div className="overflow-hidden mb-8 md:mb-16 pb-3">
            <Selectable>
              <motion.h1 
                variants={titleAnimation}
                transition={{ delay: 0.2, ...transition }}
                className="font-display text-[4.5rem] md:text-[7rem] lg:text-[9rem] leading-[1.1] tracking-[-0.03em] text-zinc-950 dark:text-stone-50 font-medium italic pr-4"
              >
                Engineer.
              </motion.h1>
            </Selectable>
        </div>

        {/* Divider Line */}
        <motion.div 
            variants={lineReveal}
            transition={{ delay: 0.6, ...transition }}
            className="w-full h-px bg-zinc-300 dark:bg-stone-800 mb-8 md:mb-12 max-w-4xl"
        />

        {/* Bio & CTA */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 w-full max-w-4xl justify-between items-start md:items-end">
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, ...transition }}
                className="max-w-md font-sans text-lg md:text-xl text-zinc-600 dark:text-stone-400 leading-relaxed font-light"
            >
                <Selectable>
                  I'm <strong className="text-zinc-900 dark:text-stone-200 font-medium">{PERSONAL_INFO.name}</strong>. I specialize in designing robust backend systems, scalable frontends, and fine-tuning specialized ML models to build seamless, high-performance applications.
                </Selectable>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, ...transition }}
                className="flex gap-4 items-center"
            >
                <button 
                  onClick={scrollToProjects}
                  className="group relative flex items-center gap-3 px-6 py-4 bg-transparent border border-zinc-900 dark:border-stone-100 text-zinc-900 dark:text-stone-100 font-sans font-medium text-sm tracking-wide uppercase overflow-hidden transition-colors hover:text-white dark:hover:text-zinc-900 cursor-pointer"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    View Archive <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
                  </span>
                  <div className="absolute inset-0 h-full w-0 bg-zinc-900 dark:bg-stone-100 transition-all duration-500 ease-out group-hover:w-full z-0"></div>
                </button>

                <div className="flex gap-2">
                   <SocialLink href={PERSONAL_INFO.github} icon={Github} delay={0.9} />
                   <SocialLink href={PERSONAL_INFO.linkedin} icon={Linkedin} delay={1.0} />
                </div>
            </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const SocialLink = ({ href, icon: Icon, delay }: { href: string, icon: any, delay: number }) => (
  <motion.a 
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.8, ease: [0.6, 0.01, 0.05, 0.9] }}
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="p-4 bg-transparent border border-zinc-300 dark:border-stone-800 text-zinc-600 dark:text-stone-400 hover:text-zinc-900 dark:hover:text-stone-100 hover:border-zinc-900 dark:hover:border-stone-100 transition-all duration-500"
  >
    <Icon className="w-4 h-4" />
  </motion.a>
);