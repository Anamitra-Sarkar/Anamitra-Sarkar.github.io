import React from 'react';
import { motion } from 'framer-motion';
import { Section } from './ui/Section';
import { Palette, Server, BrainCircuit, ShieldCheck } from 'lucide-react';

const transition = { duration: 1.2, ease: [0.6, 0.05, 0.01, 0.9] };

export const Services: React.FC = () => {
  return (
    <Section className="relative z-20 py-32 border-b border-zinc-300 dark:border-stone-800">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={transition}
      >
        <div className="flex flex-col md:flex-row gap-12 justify-between items-start md:items-end mb-24">
            <h2 className="font-display font-medium text-5xl md:text-7xl text-zinc-950 dark:text-stone-50 tracking-tight max-w-2xl">
              Disciplines
            </h2>
            <p className="text-zinc-600 dark:text-stone-400 max-w-sm font-sans font-light text-lg leading-relaxed">
              A multidisciplinary approach to engineering. From building low-level systems to crafting high-fidelity user experiences.
            </p>
        </div>

        <div className="flex flex-col border-t border-zinc-300 dark:border-stone-800">
          <ServiceRow 
              title="Systems & DevOps" 
              desc="Designing scalable cloud infrastructure, CI/CD pipelines, and secure server environments. From Kubernetes orchestration to Linux kernel customization."
              icon={Server}
              number="01"
          />
          <ServiceRow 
              title="Applied AI & ML" 
              desc="Training and optimizing Small Language Models (SLMs) for edge inference. Bridging the gap between raw research and production-ready intelligent systems."
              icon={BrainCircuit}
              number="02"
          />
          <ServiceRow 
              title="Security & Auditing" 
              desc="Implementing zero-trust architectures, automated compliance scanning, and forensic log analysis to harden applications against vulnerabilities."
              icon={ShieldCheck}
              number="03"
          />
          <ServiceRow 
              title="Frontend Engineering" 
              desc="Developing accessible, high-performance web applications with a focus on editorial design, fluid animations, and pixel-perfect responsiveness."
              icon={Palette}
              number="04"
          />
        </div>
      </motion.div>
    </Section>
  );
};

const ServiceRow = ({ title, desc, icon: Icon, number }: any) => (
    <div className="group relative flex flex-col md:flex-row justify-between items-start md:items-center py-12 md:py-16 border-b border-zinc-300 dark:border-stone-800 hover:bg-white dark:hover:bg-stone-900 transition-colors duration-500 px-6 -mx-6 md:mx-0 md:px-8 cursor-default">
        
        <div className="flex items-center gap-8 mb-6 md:mb-0 w-full md:w-1/3">
            <span className="font-sans text-xs tracking-widest text-zinc-400 dark:text-stone-600 uppercase">
                [ {number} ]
            </span>
            <div className="hidden md:flex items-center justify-center w-12 h-12 border border-zinc-300 dark:border-stone-700 rounded-full group-hover:scale-110 transition-transform duration-500">
                <Icon className="w-5 h-5 text-zinc-900 dark:text-stone-100" strokeWidth={1.5} />
            </div>
            <h3 className="font-display font-medium text-3xl text-zinc-950 dark:text-stone-50 group-hover:pl-2 transition-all duration-500">
                {title}
            </h3>
        </div>

        <div className="w-full md:w-1/2 flex items-center justify-between">
            <p className="text-zinc-600 dark:text-stone-400 font-sans font-light leading-relaxed text-lg max-w-lg">
                {desc}
            </p>
            <div className="hidden lg:block overflow-hidden">
                <motion.div 
                    className="flex flex-col gap-10 translate-y-10 group-hover:translate-y-0 transition-transform duration-500"
                >
                    <Icon className="w-8 h-8 text-zinc-300 dark:text-stone-700" strokeWidth={1} />
                    <Icon className="w-8 h-8 text-zinc-900 dark:text-stone-100" strokeWidth={1} />
                </motion.div>
            </div>
        </div>
    </div>
);