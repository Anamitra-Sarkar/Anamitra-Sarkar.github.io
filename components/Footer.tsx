import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../constants';
import { Github, Linkedin, Mail, ArrowUpRight, BrainCircuit, Globe, Clock } from 'lucide-react';

export const Footer: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date, timeZone: string) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      timeZone,
    });
  };

  return (
    <footer id="contact" className="bg-zinc-900 dark:bg-black text-white pt-24 pb-12 px-6 overflow-hidden relative">
      {/* Decorative Circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-zinc-800 dark:bg-stone-900 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 opacity-50"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start mb-20 gap-12">
          <div className="max-w-2xl">
            <h2 className="font-display font-bold text-5xl md:text-7xl mb-8 leading-tight">
              Let's build the <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">impossible.</span>
            </h2>
            <p className="text-zinc-400 dark:text-zinc-500 text-xl max-w-lg mb-12">
              Have a complex AI challenge or a wild UI idea? I'm currently available for select projects.
            </p>
            
            <a href={`mailto:${PERSONAL_INFO.email}`} className="inline-flex items-center gap-3 bg-white text-zinc-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-teal-400 hover:text-white transition-all hover:scale-105">
              <Mail className="w-5 h-5" />
              {PERSONAL_INFO.email}
            </a>
          </div>

          <div className="flex flex-col gap-6">
             <SocialButton href={PERSONAL_INFO.github} label="GitHub" icon={Github} />
             <SocialButton href={PERSONAL_INFO.linkedin} label="LinkedIn" icon={Linkedin} />
             <SocialButton href={PERSONAL_INFO.huggingface} label="Hugging Face" icon={BrainCircuit} />
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-800 flex flex-col lg:flex-row justify-between items-center text-zinc-500 text-sm gap-6">
          <p>© {new Date().getFullYear()} Anamitra Sarkar. Crafted with React & caffeine.</p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-center sm:text-left">
            <div className="flex items-center gap-2 text-zinc-400">
                <Globe className="w-4 h-4 text-teal-500" />
                <span>Kolkata, India</span>
            </div>
            
            {mounted && (
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                    <div className="flex items-center gap-2 font-mono text-zinc-400">
                        <Clock className="w-4 h-4 text-orange-500" />
                        <span>IST: {formatTime(time, 'Asia/Kolkata')}</span>
                    </div>
                    <div className="flex items-center gap-2 font-mono text-zinc-400">
                        <Clock className="w-4 h-4 text-purple-500" />
                        <span>UTC: {formatTime(time, 'UTC')}</span>
                    </div>
                </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialButton = ({ href, label, icon: Icon }: any) => (
    <a href={href} target="_blank" rel="noreferrer" className="flex items-center justify-between w-48 p-4 bg-zinc-800 dark:bg-stone-900 rounded-2xl hover:bg-zinc-700 dark:hover:bg-stone-800 transition-colors group">
        <div className="flex items-center gap-3">
            <Icon className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
            <span className="font-bold">{label}</span>
        </div>
        <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-teal-400 transition-colors" />
    </a>
);