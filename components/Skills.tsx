import React from 'react';
import { Section } from './ui/Section';
import { SKILLS } from '../constants';

export const Skills: React.FC = () => {
  return (
    <Section id="skills" className="bg-white dark:bg-stone-900 transition-colors duration-500">
      <div className="mb-12 text-center md:text-left">
        <h2 className="font-display font-bold text-4xl text-zinc-900 dark:text-stone-100 mb-4">Tech Stack & Tools</h2>
        <p className="text-zinc-500 dark:text-stone-400 max-w-2xl">
          The arsenal I use to bring ideas to life. From frontend finesse to backend brawn.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SKILLS.map((category, idx) => (
          <div 
            key={idx} 
            className="p-8 rounded-3xl border border-zinc-100 dark:border-stone-800 bg-white dark:bg-stone-950/50 shadow-sm hover:shadow-xl hover:border-zinc-200 dark:hover:border-stone-700 transition-all duration-300"
          >
            <div className={`inline-flex p-3 rounded-xl ${category.color} dark:bg-opacity-20 mb-6`}>
                <category.icon className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-xl text-zinc-900 dark:text-stone-200 mb-6">{category.title}</h3>
            
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill, sIdx) => (
                <span 
                  key={sIdx} 
                  className="px-3 py-2 text-sm bg-zinc-50 dark:bg-stone-800 border border-zinc-100 dark:border-stone-700 rounded-lg text-zinc-600 dark:text-stone-300 font-semibold hover:bg-zinc-100 dark:hover:bg-stone-700 hover:scale-105 transition-all cursor-default"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};