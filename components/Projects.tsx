import React, { useState } from 'react';
import { Section } from './ui/Section';
import { PROJECTS } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, ArrowRight } from 'lucide-react';
import { ProximityAware } from './ui/ProximityAware';

export const Projects: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedProject = PROJECTS.find(p => p.id === selectedId);

  return (
    <Section id="projects" className="py-32">
      <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
          <div className="w-full">
            <h2 className="font-display text-5xl md:text-7xl text-zinc-950 dark:text-stone-50 font-medium mb-6 tracking-tight">
              Selected Works
            </h2>
            <div className="w-full h-px bg-zinc-300 dark:bg-stone-800" />
          </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
        {PROJECTS.filter(p => p.featured).map((project, index) => (
          <ProximityAware key={project.id}>
            <motion.div
              layoutId={`card-${project.id}`}
              onClick={() => setSelectedId(project.id)}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.6, 0.05, 0.01, 0.9] }}
              className={`group cursor-pointer relative flex flex-col ${index % 2 !== 0 ? 'md:mt-32' : ''}`}
            >
              {/* Project Image / Abstract Block */}
              <div className="w-full aspect-[4/3] bg-zinc-200 dark:bg-stone-900 overflow-hidden mb-6 relative">
                 {/* Abstract geometric representation of the project using the color */}
                 <div className={`absolute inset-0 bg-${project.color}-500/10 dark:bg-${project.color}-500/5 mix-blend-multiply dark:mix-blend-screen transition-all duration-700 group-hover:scale-105`} />
                 <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-sm bg-black/20 dark:bg-white/10">
                     <span className="font-sans tracking-widest text-xs text-white font-medium uppercase px-4 py-2 border border-white/30 backdrop-blur-md">View Study</span>
                 </div>
                 {/* Decorative typography in background */}
                 <span className="absolute -bottom-8 -right-8 text-[12rem] font-display font-bold text-zinc-100 dark:text-stone-950 opacity-50 select-none pointer-events-none group-hover:translate-x-4 transition-transform duration-700">
                    {project.title.charAt(0)}
                 </span>
              </div>

              {/* Text Block */}
              <div>
                  <div className="flex justify-between items-start mb-3">
                      <motion.h3 layoutId={`title-${project.id}`} className="font-display text-3xl md:text-4xl text-zinc-900 dark:text-stone-100 font-medium">
                          {project.title}
                      </motion.h3>
                      <ArrowRight className="w-6 h-6 text-zinc-400 dark:text-stone-600 group-hover:-rotate-45 transition-transform duration-500" />
                  </div>
                  
                  <motion.div layoutId={`type-${project.id}`} className="flex items-center gap-4 mb-4">
                      <span className="font-sans text-xs tracking-widest uppercase text-zinc-500 dark:text-stone-500">
                          {project.type}
                      </span>
                      <span className="w-8 h-px bg-zinc-300 dark:bg-stone-700" />
                      <span className="font-sans text-xs tracking-widest uppercase text-zinc-500 dark:text-stone-500">
                          {project.role}
                      </span>
                  </motion.div>
                  
                  <motion.p layoutId={`desc-${project.id}`} className="text-zinc-600 dark:text-stone-400 font-sans font-light leading-relaxed mb-6">
                      {project.shortDescription}
                  </motion.p>
              </div>
            </motion.div>
          </ProximityAware>
        ))}
      </div>

      <AnimatePresence>
        {selectedId && selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 pointer-events-none">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.5 } }}
                exit={{ opacity: 0, transition: { duration: 0.3 } }}
                onClick={() => setSelectedId(null)}
                className="absolute inset-0 bg-zinc-950/80 dark:bg-black/90 backdrop-blur-md pointer-events-auto"
            />
            
            <motion.div
                layoutId={`card-${selectedId}`}
                className="relative w-full max-w-5xl bg-[#F4F3EF] dark:bg-[#0A0A0A] overflow-hidden shadow-2xl pointer-events-auto max-h-[90vh] overflow-y-auto no-scrollbar flex flex-col border border-zinc-200 dark:border-stone-800"
            >
                <button 
                    onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
                    className="sticky top-0 float-right self-end m-6 z-20 p-4 bg-[#F4F3EF] dark:bg-[#0A0A0A] hover:bg-zinc-200 dark:hover:bg-stone-900 border border-zinc-300 dark:border-stone-800 transition-colors"
                >
                    <X className="w-5 h-5 text-zinc-900 dark:text-white" />
                </button>

                <div className="p-8 md:p-16 lg:p-24 pt-0">
                    <motion.div layoutId={`type-${selectedId}`} className="mb-8 font-sans text-xs tracking-widest uppercase text-zinc-500 dark:text-stone-500 border-b border-zinc-300 dark:border-stone-800 pb-4 inline-block">
                        {selectedProject.type} // {selectedProject.role}
                    </motion.div>

                    <motion.h3 layoutId={`title-${selectedId}`} className="font-display text-5xl md:text-7xl text-zinc-900 dark:text-white mb-12 font-medium">
                        {selectedProject.title}
                    </motion.h3>

                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.7, ease: [0.6, 0.05, 0.01, 0.9] }}
                        className="space-y-16 font-sans"
                    >
                        {/* Tech Stack */}
                        <div>
                            <h4 className="font-sans font-medium text-zinc-900 dark:text-stone-100 mb-4 text-sm uppercase tracking-widest">Technologies</h4>
                            <div className="flex flex-wrap gap-2">
                                {selectedProject.techStack.map(t => (
                                    <span key={t} className="px-4 py-2 border border-zinc-300 dark:border-stone-800 text-xs font-medium text-zinc-600 dark:text-stone-400 uppercase tracking-wider">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Grid Content */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                             <div>
                                 <h4 className="font-display text-3xl text-zinc-900 dark:text-white mb-6">The Challenge</h4>
                                 <p className="text-zinc-600 dark:text-stone-300 leading-relaxed font-light text-lg">
                                     {selectedProject.caseStudy.problem}
                                 </p>
                             </div>
                             <div>
                                 <h4 className="font-display text-3xl text-zinc-900 dark:text-white mb-6">The Approach</h4>
                                 <p className="text-zinc-600 dark:text-stone-300 leading-relaxed font-light text-lg">
                                     {selectedProject.caseStudy.solution}
                                 </p>
                             </div>
                        </div>

                        {/* Architecture / Code */}
                        <div className="space-y-8">
                            {selectedProject.caseStudy.architectureSnippet && (
                                <div className="border-l-2 border-zinc-900 dark:border-stone-100 pl-6 py-2">
                                    <h4 className="font-sans font-medium text-zinc-900 dark:text-white mb-2 uppercase tracking-widest text-xs">Architecture Pipeline</h4>
                                    <p className="font-mono text-sm text-zinc-600 dark:text-stone-400">
                                        {selectedProject.caseStudy.architectureSnippet}
                                    </p>
                                </div>
                            )}

                            {selectedProject.caseStudy.codeSnippet && (
                                <div className="bg-zinc-900 dark:bg-stone-900 p-8">
                                    <h4 className="text-white font-medium mb-6 uppercase tracking-widest text-xs opacity-50">Implementation Detail</h4>
                                    <pre className="font-mono text-sm text-zinc-300 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                                        {selectedProject.caseStudy.codeSnippet}
                                    </pre>
                                </div>
                            )}
                        </div>

                        {/* Outcome */}
                        <div className="bg-zinc-100 dark:bg-stone-950 p-8 md:p-12 border border-zinc-200 dark:border-stone-900">
                             <h4 className="font-display text-3xl text-zinc-900 dark:text-white mb-6">The Outcome</h4>
                             <p className="text-zinc-700 dark:text-stone-300 font-light leading-relaxed text-lg">
                                 {selectedProject.caseStudy.outcome}
                             </p>
                        </div>

                        {/* Links */}
                        <div className="pt-8 flex flex-wrap gap-6 border-t border-zinc-300 dark:border-stone-800">
                            {selectedProject.repoUrl && (
                                  <a 
                                      href={selectedProject.repoUrl} 
                                      target="_blank" 
                                      rel="noreferrer"
                                      className="flex items-center gap-3 px-8 py-4 border border-zinc-900 dark:border-stone-100 font-sans font-medium text-sm tracking-widest uppercase text-zinc-900 dark:text-stone-100 hover:bg-zinc-900 hover:text-white dark:hover:bg-stone-100 dark:hover:text-zinc-900 transition-colors"
                                  >
                                      <Github className="w-4 h-4" /> Source Code
                                  </a>
                            )}
                            {selectedProject.demoUrl && (
                                  <a 
                                      href={selectedProject.demoUrl} 
                                      target="_blank" 
                                      rel="noreferrer"
                                      className="flex items-center gap-3 bg-zinc-900 dark:bg-stone-100 text-white dark:text-zinc-900 px-8 py-4 font-sans font-medium text-sm tracking-widest uppercase hover:opacity-90 transition-opacity"
                                  >
                                      Live Prototype <ExternalLink className="w-4 h-4" />
                                  </a>
                            )}
                        </div>
                    </motion.div>
                </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Section>
  );
};