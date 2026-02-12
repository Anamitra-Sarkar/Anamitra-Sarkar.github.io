import React from 'react';
import { Section } from './ui/Section';
import { Palette, Terminal, BrainCircuit } from 'lucide-react';

export const Services: React.FC = () => {
  return (
    <Section className="relative z-20">
      <div className="text-center mb-16">
        <h2 className="font-display font-bold text-4xl mb-4 text-zinc-900 dark:text-stone-100">Not just a coder. An Engineer.</h2>
        <p className="text-zinc-500 dark:text-stone-400 max-w-xl mx-auto text-lg">
            I don't just write scripts; I build complete, polished products from the kernel to the pixel.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
      </div>
    </Section>
  );
};

const ServiceCard = ({ title, desc, icon: Icon, color, tags }: any) => (
    <div className="group p-8 bg-white dark:bg-stone-900 rounded-3xl border border-zinc-100 dark:border-stone-800 shadow-sm hover:shadow-xl hover:-translate-y-2 dark:hover:border-stone-700 transition-all duration-300">
        <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg rotate-3 group-hover:rotate-6 transition-transform`}>
            <Icon className="w-7 h-7" />
        </div>
        <h3 className="font-display font-bold text-2xl mb-3 text-zinc-900 dark:text-stone-100">{title}</h3>
        <p className="text-zinc-500 dark:text-stone-400 leading-relaxed mb-6">{desc}</p>
        <div className="flex flex-wrap gap-2">
            {tags.map((t: string) => (
                <span key={t} className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-stone-500 bg-zinc-50 dark:bg-stone-800 px-2 py-1 rounded-md">
                    {t}
                </span>
            ))}
        </div>
    </div>
);