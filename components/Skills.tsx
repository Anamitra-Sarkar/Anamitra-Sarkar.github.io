import React from 'react';
import { motion } from 'framer-motion';
import { Section } from './ui/Section';
import { SKILLS } from '../constants';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
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

const iconVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
        scale: 1,
        opacity: 1,
        transition: { duration: 0.4, ease: 'easeOut' }
    }
};

export const Skills: React.FC = () => {
  return (
    <Section id="skills" className="bg-[#F4F3EF] dark:bg-[#0A0A0A] transition-colors duration-500 !pb-12 border-t border-zinc-300 dark:border-stone-800 pt-24 mt-24">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="mb-16 text-center md:text-left">
          <h2 className="font-display font-medium text-5xl md:text-7xl text-zinc-950 dark:text-stone-50 mb-6 tracking-tight">Capabilities</h2>
          <p className="text-zinc-600 dark:text-stone-400 max-w-2xl font-sans text-lg font-light leading-relaxed">
            The technical stack deployed to bring complex systems and elegant interfaces to life.
          </p>
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-zinc-300 dark:border-stone-800" variants={containerVariants}>
          {SKILLS.map((category, idx) => (
            <motion.div 
              key={idx} 
              variants={itemVariants}
              className={`p-10 border-b lg:border-b-0 lg:border-r border-zinc-300 dark:border-stone-800 bg-[#F4F3EF] dark:bg-[#0A0A0A] hover:bg-white dark:hover:bg-stone-900 transition-colors duration-500 ${idx === SKILLS.length - 1 ? 'border-b-0 lg:border-r-0' : ''}`}
            >
              <motion.div variants={iconVariants} className={`mb-8 opacity-70`}>
                  <category.icon className="w-8 h-8 text-zinc-900 dark:text-stone-100" strokeWidth={1} />
              </motion.div>
              <h3 className="font-sans font-medium text-sm tracking-widest uppercase text-zinc-900 dark:text-stone-100 mb-8">{category.title}</h3>
              
              <div className="flex flex-col gap-4">
                {category.skills.map((skill, sIdx) => (
                  <motion.span 
                    key={sIdx} 
                    variants={iconVariants}
                    className="text-zinc-600 dark:text-stone-400 font-sans font-light text-sm"
                  >
                    {skill.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </Section>
  );
};