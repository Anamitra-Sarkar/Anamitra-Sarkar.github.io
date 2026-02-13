import React from 'react';
import { Section } from './ui/Section';
import { EXPERIENCE, EDUCATION, ACHIEVEMENTS } from '../constants';
import { Briefcase, GraduationCap, Trophy } from 'lucide-react';

export const Experience: React.FC = () => {
  return (
    <div className="bg-white dark:bg-stone-900 transition-colors duration-500">
      <Section id="experience" className="!pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Work Experience */}
          <div className="lg:col-span-7">
            <h3 className="font-display font-bold text-3xl text-zinc-900 dark:text-stone-100 mb-8 flex items-center gap-3">
              <Briefcase className="w-8 h-8 text-teal-500" /> Experience
            </h3>
            <div className="space-y-8">
              {EXPERIENCE.map((exp, idx) => (
                <div key={idx} className="group relative pl-8 border-l-2 border-zinc-100 dark:border-stone-800 hover:border-teal-200 dark:hover:border-teal-900 transition-colors">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white dark:bg-stone-900 border-4 border-zinc-200 dark:border-stone-700 group-hover:border-teal-500 transition-colors"></div>
                  <div className="mb-3">
                    <h4 className="text-xl font-bold text-zinc-900 dark:text-stone-200">{exp.role}</h4>
                    <p className="text-zinc-500 dark:text-stone-400 font-medium">{exp.company}</p>
                    <span className="text-xs font-bold uppercase tracking-wide text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30 px-2 py-1 rounded mt-2 inline-block">
                        {exp.period}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {exp.points.map((pt, pIdx) => (
                      <li key={pIdx} className="text-zinc-600 dark:text-stone-400 text-sm leading-relaxed">
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Achievements */}
          <div className="lg:col-span-5 space-y-12">
            
            <div>
              <h3 className="font-display font-bold text-3xl text-zinc-900 dark:text-stone-100 mb-8 flex items-center gap-3">
                <GraduationCap className="w-8 h-8 text-orange-500" /> Education
              </h3>
              {EDUCATION.map((edu, idx) => (
                <div key={idx} className="bg-warm-50 dark:bg-stone-800 p-6 rounded-2xl border border-warm-100 dark:border-stone-700 transition-colors">
                  <h4 className="font-bold text-zinc-900 dark:text-stone-200 text-lg">{edu.degree}</h4>
                  <p className="text-zinc-500 dark:text-stone-400">{edu.institution}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-sm text-zinc-400 dark:text-stone-500">{edu.location}</span>
                    <span className="text-sm font-bold text-zinc-900 dark:text-stone-200">{edu.year}</span>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <h3 className="font-display font-bold text-3xl text-zinc-900 dark:text-stone-100 mb-8 flex items-center gap-3">
                <Trophy className="w-8 h-8 text-purple-500" /> Recognition
              </h3>
              <div className="grid gap-4">
                {ACHIEVEMENTS.map((ach, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-zinc-50 dark:hover:bg-stone-800 transition-colors">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 shrink-0"></div>
                    <div>
                        <h4 className="font-bold text-zinc-900 dark:text-stone-200">{ach.title}</h4>
                        <p className="text-xs text-purple-600 dark:text-purple-400 font-bold uppercase tracking-wide mb-1">{ach.organization}</p>
                        <p className="text-sm text-zinc-500 dark:text-stone-400">{ach.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </Section>
    </div>
  );
};