import React from 'react';
import { Section } from './ui/Section';
import { MODELS } from '../constants';
import { BrainCircuit, ExternalLink, Activity } from 'lucide-react';

export const Models: React.FC = () => {
  return (
    <Section id="models" className="bg-warm-100 dark:bg-stone-850 transition-colors duration-500">
      <div className="mb-12">
        <h2 className="font-display font-extrabold text-4xl text-zinc-900 dark:text-stone-100 mb-4 flex items-center gap-3">
          <BrainCircuit className="w-10 h-10 text-purple-600 dark:text-purple-400" /> Research & Models
        </h2>
        <p className="text-zinc-500 dark:text-stone-400 text-lg max-w-2xl">
          Beyond application layers, I train and fine-tune actual models. Check out my published work on Hugging Face.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MODELS.map((model) => (
          <div key={model.id} className="bg-white dark:bg-stone-900 p-6 rounded-2xl border border-zinc-200 dark:border-stone-800 shadow-sm hover:shadow-lg transition-all group">
            <div className="flex justify-between items-start mb-4">
                <div className="flex gap-2 flex-wrap">
                    {model.tags.map(tag => (
                        <span key={tag} className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-300 bg-purple-50 dark:bg-purple-900/30 px-2 py-1 rounded-md">
                            {tag}
                        </span>
                    ))}
                </div>
                <a href={model.link} target="_blank" rel="noreferrer" className="text-zinc-400 dark:text-stone-600 hover:text-zinc-900 dark:hover:text-white transition-colors">
                    <ExternalLink className="w-5 h-5" />
                </a>
            </div>

            <h3 className="font-display font-bold text-2xl text-zinc-900 dark:text-stone-200 mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                {model.name}
            </h3>
            <p className="text-zinc-500 dark:text-stone-400 mb-6 leading-relaxed">
                {model.description}
            </p>

            <div className="flex gap-3 flex-wrap pt-4 border-t border-zinc-100 dark:border-stone-800">
                {model.metrics.map((metric, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm font-semibold text-zinc-700 dark:text-stone-300">
                        <Activity className="w-4 h-4 text-teal-500" />
                        {metric}
                    </div>
                ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <a 
            href="https://huggingface.co/Arko007" 
            target="_blank" 
            rel="noreferrer" 
            className="inline-flex items-center gap-2 font-bold text-zinc-600 dark:text-stone-400 hover:text-zinc-900 dark:hover:text-white border-b-2 border-zinc-200 dark:border-stone-700 hover:border-zinc-900 dark:hover:border-white transition-all pb-1"
        >
            View all 35+ Models on Hugging Face <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </Section>
  );
};