import React, { useState } from 'react';
import { Section } from './ui/Section';
import { motion } from 'framer-motion';
import { Check, Zap, Server } from 'lucide-react';

export const Playground: React.FC = () => {
  return (
    <Section id="playground" className="bg-white border-t border-zinc-100">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
           <h2 className="font-display font-extrabold text-4xl text-zinc-900 mb-6">
            Frontend Playground
          </h2>
          <p className="text-zinc-500 text-lg mb-8 leading-relaxed">
             I don't just train models; I build the interfaces that make them usable. 
             Here are a few micro-interactions showing that I care about the details.
          </p>
          <div className="flex flex-col gap-4 text-sm text-zinc-400">
            <div className="flex items-center gap-3">
                <Check className="w-4 h-4 text-teal-500" /> 
                Clean State Management
            </div>
            <div className="flex items-center gap-3">
                <Check className="w-4 h-4 text-teal-500" /> 
                Fluid Animations (Framer Motion)
            </div>
            <div className="flex items-center gap-3">
                <Check className="w-4 h-4 text-teal-500" /> 
                Accessibility Focused
            </div>
          </div>
        </div>

        <div className="grid gap-6">
            <InteractiveCard />
            <div className="flex gap-6">
                <InteractiveButton />
                <StatusToggle />
            </div>
        </div>
      </div>
    </Section>
  );
};

const InteractiveCard = () => {
    return (
        <motion.div 
            whileHover={{ scale: 1.02 }}
            className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200 cursor-default group hover:bg-white hover:shadow-xl hover:shadow-zinc-200/50 transition-all duration-300"
        >
            <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold group-hover:scale-110 transition-transform">
                    <Zap className="w-5 h-5" />
                </div>
                <span className="px-2 py-1 bg-white rounded-md text-xs font-bold text-zinc-400 border border-zinc-100 group-hover:border-orange-200 group-hover:text-orange-500 transition-colors">
                    Hover Me
                </span>
            </div>
            <h4 className="font-bold text-zinc-900">Dynamic Cards</h4>
            <p className="text-zinc-500 text-sm mt-1">Subtle scaling and border transitions make data feel tangible.</p>
        </motion.div>
    );
}

const InteractiveButton = () => {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
    
    const handleClick = () => {
        if (status !== 'idle') return;
        setStatus('loading');
        // Simulate network request
        setTimeout(() => {
            setStatus('success');
            // Reset after showing success state
            setTimeout(() => {
                setStatus('idle');
            }, 2000);
        }, 1500);
    };
    
    return (
        <button 
            onClick={handleClick}
            disabled={status !== 'idle'}
            className={`flex-1 h-14 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 disabled:cursor-default overflow-hidden relative shadow-lg
                ${status === 'success' ? 'bg-teal-500 text-white shadow-teal-500/20' : 'bg-zinc-900 text-white hover:bg-zinc-800 shadow-zinc-900/20'}
            `}
        >
             <motion.div
                initial={false}
                animate={{ y: status === 'idle' ? 0 : -40, opacity: status === 'idle' ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="absolute"
            >
                Deploy
            </motion.div>
            
            <motion.div
                initial={false}
                animate={{ y: status === 'loading' ? 0 : 40, opacity: status === 'loading' ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="absolute flex items-center gap-2 text-zinc-200"
            >
               <span className="w-2 h-2 bg-teal-400 rounded-full animate-ping" /> Deploying...
            </motion.div>

            <motion.div
                initial={false}
                animate={{ y: status === 'success' ? 0 : 40, opacity: status === 'success' ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="absolute flex items-center gap-2"
            >
               <Check className="w-5 h-5" /> Deployed!
            </motion.div>
        </button>
    )
}

const StatusToggle = () => {
    const [active, setActive] = useState(false);
    return (
        <button 
            onClick={() => setActive(!active)}
            className={`flex-1 h-14 rounded-xl border-2 font-bold transition-all flex items-center justify-center gap-2 ${active ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-zinc-200 bg-white text-zinc-400 hover:border-zinc-300'}`}
        >
            <div className={`relative w-4 h-4 rounded-full transition-colors flex items-center justify-center ${active ? 'bg-teal-500' : 'bg-zinc-300'}`}>
                {active && <motion.div layoutId="glow" className="absolute inset-0 bg-teal-500 blur-sm rounded-full" />}
            </div>
            {active ? 'Online' : 'Offline'}
        </button>
    )
}