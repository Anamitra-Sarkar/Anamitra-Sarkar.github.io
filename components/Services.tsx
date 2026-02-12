import React from 'react';
import { motion } from 'framer-motion';
import { Section } from './ui/Section';
import { Palette, Terminal, BrainCircuit } from 'lucide-react';

// Variants for the main container to orchestrate staggering
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

// Variants for individual items like the title or cards
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

// Variants specifically for the icon scaling
const iconVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
        scale: 1,
        opacity: 1,
        transition: { duration: 0.4, ease: 'easeOut' }
    }
};

export const Services: React.FC = () => {
  return (
    <Section className="relative z-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="font-display font-bold text-4xl mb-4 text-zinc-900 dark:text-stone-100">Not just a coder. An Engineer.</h2>
          <p className="text-zinc-500 dark:text-stone-400 max-w-xl mx-auto text-lg">
              I don't just write scripts; I build complete, polished products from the kernel to the pixel.
          </p>
        </motion.div>

        <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants} // This will stagger the ServiceCards
        >
          <ServiceCard 
              title="UI/UX & Frontend" 
              desc="I craft buttery smooth, accessible, and responsive interfaces. No boring layouts allowed."
              icon={Palette}
              color="bg-pink-500"
              tags={["React", "Framer Motion", "Tailwind"]}
          />
          <ServiceCard 
              title="Full-Stack Systems" 
              desc="Robust backends, secure APIs, and custom OS environments. Scalability is standard."
              icon={Terminal}
              color="bg-teal-500"
              tags={["Python", "Node.js", "Linux"]}
          />
          <ServiceCard 
              title="AI & Machine Learning" 
              desc="Deploying real intelligence. From RAG pipelines to optimizing SLMs for edge devices."
              icon={BrainCircuit}
              color="bg-purple-500"
              tags={["PyTorch", "Gemini", "LLMs"]}
          />
        </motion.div>
      </motion.div>
    </Section>
  );
};

const ServiceCard = ({ title, desc, icon: Icon, color, tags }: any) => (
    <motion.div 
        variants={itemVariants}
        className="group p-8 bg-white dark:bg-stone-900 rounded-3xl border border-zinc-100 dark:border-stone-800 shadow-sm hover:shadow-xl hover:-translate-y-2 dark:hover:border-stone-700 transition-all duration-300"
    >
        <motion.div 
            variants={iconVariants}
            className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg rotate-3 group-hover:rotate-6 transition-transform`}
        >
            <Icon className="w-7 h-7" />
        </motion.div>
        <h3 className="font-display font-bold text-2xl mb-3 text-zinc-900 dark:text-stone-100">{title}</h3>
        <p className="text-zinc-500 dark:text-stone-400 leading-relaxed mb-6">{desc}</p>
        <div className="flex flex-wrap gap-2">
            {tags.map((t: string) => (
                <span key={t} className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-stone-500 bg-zinc-50 dark:bg-stone-800 px-2 py-1 rounded-md">
                    {t}
                </span>
            ))}
        </div>
    </motion.div>
);