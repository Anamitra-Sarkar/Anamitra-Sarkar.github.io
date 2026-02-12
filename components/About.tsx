import React from 'react';
import { Section } from './ui/Section';
import { EXECUTIVE_SUMMARY } from '../constants';

export const About: React.FC = () => {
  return (
    <Section id="about">
      <div className="bg-zinc-900 rounded-3xl p-8 md:p-16 text-center md:text-left relative overflow-hidden">
        {/* Subtle geometric pattern */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Executive Profile</h2>
          <p className="text-zinc-300 text-lg md:text-xl leading-relaxed font-light">
            {EXECUTIVE_SUMMARY}
          </p>
        </div>
      </div>
    </Section>
  );
};