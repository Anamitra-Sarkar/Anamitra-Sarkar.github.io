import React, { useState } from 'react';
import { Section } from './ui/Section';
import { PROJECTS } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, ExternalLink, Github, Code2, Layers } from 'lucide-react';

export const Projects: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedProject = PROJECTS.find(p => p.id === selectedId);

  return (
    <Section id="projects">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
           <h2 className="font-display font-extrabold text-4xl md:text-5xl text-zinc-900 dark:text-stone-100 mb-4">
            Selected Work
          </h2>
          <p className="text-zinc-500 dark:text-stone-400 text-lg max-w-xl">
             A collection of high-impact projects where design meets deep tech. Click on any card to dive into the case study.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROJECTS.map((project) => (
          <motion.div
            layoutId={`card-${project.id}`}
            key={project.id}
            onClick={() => setSelectedId(project.id)}
            className="group relative bg-white dark:bg-stone-900 rounded-3xl p-8 border border-zinc-200 dark:border-stone-800 cursor-pointer overflow-hidden hover:shadow-2xl hover:shadow-zinc-200/50 dark:hover:shadow-black/40 transition-shadow flex flex-col justify-between min-h-[320px]"
          >
            <div>
                <motion.div layoutId={`type-${project.id}`} className="mb-4 flex justify-between items-start">
                    <span className={`inline-block px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wide bg-${project.color}-100 dark:bg-${project.color}-900/30 text-${project.color}-600 dark:text-${project.color}-400`}>
                        {project.type}
                    </span>
                    <div className="bg-zinc-100 dark:bg-stone-800 text-zinc-400 dark:text-stone-500 group-hover:bg-zinc-900 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-stone-900 p-2 rounded-full transition-colors">
                        <Plus className="w-4 h-4" />
                    </div>
                </motion.div>
                
                <motion.h3 layoutId={`title-${project.id}`} className="font-display font-bold text-2xl text-zinc-900 dark:text-stone-200 mb-3 leading-tight">
                    {project.title}
                </motion.h3>
                
                <motion.p layoutId={`desc-${project.id}`} className="text-zinc-500 dark:text-stone-400 font-medium text-base leading-relaxed mb-6">
                    {project.shortDescription}
                </motion.p>
            </div>

            <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                    {project.techStack.slice(0, 3).map((tech, i) => (
                        <span key={i} className="text-xs font-semibold text-zinc-500 dark:text-stone-400 bg-zinc-50 dark:bg-stone-800 px-2 py-1 rounded-md border border-zinc-100 dark:border-stone-700">
                            {tech}
                        </span>
                    ))}
                    {project.techStack.length > 3 && (
                        <span className="text-xs font-semibold text-zinc-400 dark:text-stone-500 bg-zinc-50 dark:bg-stone-800 px-2 py-1 rounded-md border border-zinc-100 dark:border-stone-700">+{project.techStack.length - 3}</span>
                    )}
                </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedId && selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 pointer-events-none">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedId(null)}
                className="absolute inset-0 bg-zinc-900/60 dark:bg-black/80 backdrop-blur-sm pointer-events-auto"
            />
            
            <motion.div
                layoutId={`card-${selectedId}`}
                className="relative w-full max-w-4xl bg-white dark:bg-stone-900 rounded-3xl overflow-hidden shadow-2xl pointer-events-auto max-h-[90vh] overflow-y-auto no-scrollbar flex flex-col"
            >
                <button 
                    onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
                    className="absolute top-6 right-6 z-10 p-2 bg-white/80 dark:bg-stone-800/80 hover:bg-zinc-100 dark:hover:bg-stone-700 rounded-full backdrop-blur-md transition-colors border border-zinc-200 dark:border-stone-700"
                >
                    <X className="w-6 h-6 text-zinc-900 dark:text-white" />
                </button>

                <div className="p-8 md:p-12">
                    <motion.div layoutId={`type-${selectedId}`} className="mb-4">
                        <span className={`inline-block px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wide bg-${selectedProject.color}-100 dark:bg-${selectedProject.color}-900/30 text-${selectedProject.color}-600 dark:text-${selectedProject.color}-400`}>
                            {selectedProject.type}
                        </span>
                    </motion.div>

                    <motion.h3 layoutId={`title-${selectedId}`} className="font-display font-bold text-4xl md:text-5xl text-zinc-900 dark:text-white mb-2">
                        {selectedProject.title}
                    </motion.h3>

                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="mt-8 space-y-10"
                    >
                        {/* Meta Info */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-zinc-100 dark:border-stone-800">
                             <div>
                                <h4 className="font-bold text-zinc-900 dark:text-stone-200 mb-2 text-sm uppercase tracking-wide">My Role</h4>
                                <p className="text-zinc-600 dark:text-stone-400 font-medium">{selectedProject.role}</p>
                             </div>
                             <div className="md:col-span-2">
                                <h4 className="font-bold text-zinc-900 dark:text-stone-200 mb-2 text-sm uppercase tracking-wide">Tech Stack</h4>
                                <div className="flex flex-wrap gap-2">
                                    {selectedProject.techStack.map(t => (
                                        <span key={t} className="px-3 py-1 bg-zinc-100 dark:bg-stone-800 rounded-md text-sm font-medium text-zinc-700 dark:text-stone-300">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                             </div>
                        </div>

                        {/* Case Study Content */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                             <CaseStudyBlock title="The Problem" content={selectedProject.caseStudy.problem} icon={Layers} />
                             <CaseStudyBlock title="The Solution" content={selectedProject.caseStudy.solution} icon={Code2} />
                        </div>

                        {selectedProject.caseStudy.architectureSnippet && (
                            <div className="bg-zinc-900 dark:bg-black text-zinc-300 p-6 rounded-xl font-mono text-sm leading-relaxed overflow-x-auto border border-zinc-800 dark:border-stone-800">
                                <h4 className="text-white font-bold mb-2 uppercase tracking-wide text-xs">Architecture</h4>
                                {selectedProject.caseStudy.architectureSnippet}
                            </div>
                        )}

                        {selectedProject.caseStudy.codeSnippet && (
                            <div className="bg-zinc-50 dark:bg-stone-800/50 border border-zinc-200 dark:border-stone-700 p-6 rounded-xl">
                                <h4 className="text-zinc-900 dark:text-stone-200 font-bold mb-4 uppercase tracking-wide text-xs">Key Implementation Logic</h4>
                                <pre className="font-mono text-sm text-zinc-600 dark:text-stone-400 overflow-x-auto whitespace-pre-wrap">
                                    {selectedProject.caseStudy.codeSnippet}
                                </pre>
                            </div>
                        )}

                        <div className="bg-teal-50 dark:bg-teal-900/20 p-6 rounded-xl border border-teal-100 dark:border-teal-900/30">
                             <h4 className="text-teal-900 dark:text-teal-400 font-bold mb-2 uppercase tracking-wide text-xs">The Outcome</h4>
                             <p className="text-teal-800 dark:text-teal-300 font-medium text-lg">{selectedProject.caseStudy.outcome}</p>
                        </div>

                        {selectedProject.collaborators && (
                            <p className="text-sm text-zinc-400 italic">
                                * {selectedProject.collaborators}
                            </p>
                        )}

                        {/* Actions */}
                        <div className="pt-4 flex flex-wrap gap-4 justify-end border-t border-zinc-100 dark:border-stone-800">
                            {selectedProject.repoUrl && (
                                <a 
                                    href={selectedProject.repoUrl} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-zinc-700 dark:text-stone-300 bg-zinc-100 dark:bg-stone-800 hover:bg-zinc-200 dark:hover:bg-stone-700 transition-colors"
                                >
                                    <Github className="w-4 h-4" /> View Code
                                </a>
                            )}
                            {selectedProject.demoUrl && (
                                <a 
                                    href={selectedProject.demoUrl} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="flex items-center gap-2 bg-zinc-900 dark:bg-white text-white dark:text-stone-900 px-6 py-3 rounded-xl font-bold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-transform active:scale-95 shadow-lg shadow-zinc-900/10 dark:shadow-none"
                                >
                                    Live Demo <ExternalLink className="w-4 h-4" />
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

const CaseStudyBlock = ({ title, content, icon: Icon }: { title: string, content: string, icon: any }) => (
    <div>
        <h4 className="font-bold text-xl text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
            <Icon className="w-5 h-5 text-zinc-400 dark:text-stone-500" /> {title}
        </h4>
        <p className="text-zinc-600 dark:text-stone-300 leading-relaxed text-lg">
            {content}
        </p>
    </div>
);