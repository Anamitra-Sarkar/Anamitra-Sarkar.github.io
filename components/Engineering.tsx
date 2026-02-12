import React, { useState } from 'react';
import { Section } from './ui/Section';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Layers, X, ArrowRight, Zap, ShieldAlert, Cpu, 
    Eye, EyeOff, Activity, GitCommit, MousePointer2,
    MessageSquare, AlertCircle, Database, Lock, Check
} from 'lucide-react';

const STORIES = [
  {
    id: 'medai',
    title: 'Why MedAI is not just a chatbot',
    standard: 'Generic LLM wrappers that can only process text and hallucinate on medical images.',
    fail: 'Cannot analyze retina scans or prescriptions, lacking the visual context critical for diagnosis.',
    solution: 'Full-stack ecosystem: Custom ResNet50 trained from scratch for diabetic retinopathy grading + Gemini AI to synthesize patient history & prescriptions.',
    outcome: 'A complete diagnostic loop: Image Classification → Context Retrieval → Gemini Diagnosis.'
  },
  {
    id: 'streaming',
    title: 'The "Robot" Typing Effect',
    standard: 'Streaming tokens to the UI exactly as they arrive from the API socket.',
    fail: 'Jittery, uneven reading experience. Fast bursts followed by hangs.',
    solution: 'Adaptive Buffering: I buffer tokens into semantic chunks (words/phrases) and render them at a consistent, readable pace (60ms/char).',
    outcome: 'A UI that feels like it’s "thinking" and communicating, not just dumping data.'
  },
  {
    id: 'auth',
    title: 'Authentication is not a feature',
    standard: 'Default NextAuth.js login page with unstyled buttons.',
    fail: 'Breaks immersion immediately. Tells the user "you are leaving the product".',
    solution: 'Embedded magic links & biometrics. No passwords, no redirects. The app "unlocks" rather than "logs in".',
    outcome: '30% higher conversion from visitor to active user.'
  }
];

const REFUSALS = [
    "Spinners that don't explain what's happening.",
    "Chatbots that apologize for being AI.",
    "Dark mode that is just pure black (#000000).",
    "Dashboards that look pretty but answer zero questions.",
    "Error messages like 'Something went wrong'."
];

export const Engineering: React.FC = () => {
    const [systemView, setSystemView] = useState(false);
    
    return (
        <Section id="engineering" className="bg-white dark:bg-stone-900 border-t border-zinc-100 dark:border-stone-800 transition-colors duration-500">
             <div className="mb-20">
                <h2 className="font-display font-extrabold text-4xl text-zinc-900 dark:text-stone-100 mb-6">
                    Engineering & Craft
                </h2>
                <p className="text-zinc-500 dark:text-stone-400 text-lg max-w-2xl leading-relaxed">
                    Code is easy. Decisions are hard. <br/>
                    Here is how I bridge the gap between "it works" and "it feels right".
                </p>
             </div>

             {/* 1. Build Stories */}
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-32">
                {STORIES.map(story => (
                    <StoryCard key={story.id} story={story} />
                ))}
             </div>

             {/* 2. Before / After Toggle */}
             <DesignComparison />

             {/* 3. System View Toggle */}
             <div className="my-32 p-8 md:p-12 bg-zinc-50 dark:bg-stone-950/50 rounded-3xl border border-zinc-200 dark:border-stone-800 relative overflow-hidden flex flex-col items-center">
                <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6 relative z-10 max-w-5xl">
                    <div>
                        <h3 className="font-bold text-2xl text-zinc-900 dark:text-stone-200 mb-2">The Invisible Work</h3>
                        <p className="text-zinc-500 dark:text-stone-400">Toggle to see what happens behind a simple UI interaction.</p>
                    </div>
                    <button 
                        onClick={() => setSystemView(!systemView)}
                        className={`flex items-center gap-3 px-6 py-3 rounded-full font-bold transition-all cursor-pointer shadow-lg hover:shadow-xl ${systemView ? 'bg-zinc-900 dark:bg-white text-white dark:text-stone-900 hover:bg-zinc-800 dark:hover:bg-zinc-200' : 'bg-white dark:bg-stone-800 text-zinc-600 dark:text-stone-300 border border-zinc-200 dark:border-stone-700 hover:bg-zinc-50 dark:hover:bg-stone-700'}`}
                    >
                        {systemView ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        {systemView ? 'System View' : 'User View'}
                    </button>
                </div>

                <div className="relative z-10 w-full flex justify-center px-4">
                    <SystemDemo systemView={systemView} />
                </div>
                
                 <div className="absolute top-0 right-0 p-32 bg-zinc-200/50 dark:bg-stone-800/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
             </div>

             {/* 4. Refuse To Ship */}
             <div className="border-l-4 border-red-500 pl-8 py-2">
                <h3 className="font-display font-bold text-2xl text-zinc-900 dark:text-stone-100 mb-6">Things I Refuse To Ship</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                    {REFUSALS.map((item, i) => (
                        <div key={i} className="flex items-center gap-3 text-zinc-600 dark:text-stone-400 font-medium">
                            <X className="w-4 h-4 text-red-400 shrink-0" /> {item}
                        </div>
                    ))}
                </div>
             </div>

             <div className="mt-24 text-center text-zinc-400 dark:text-stone-600 text-sm font-mono uppercase tracking-widest opacity-60">
                Clean UI is a feature, not decoration.
             </div>
        </Section>
    );
}

const StoryCard: React.FC<{ story: any }> = ({ story }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <motion.div 
            layout
            onClick={() => setExpanded(!expanded)}
            className="bg-zinc-50 dark:bg-stone-800/30 hover:bg-white dark:hover:bg-stone-800 border border-zinc-200 dark:border-stone-700 hover:shadow-xl hover:shadow-zinc-200/50 dark:hover:shadow-stone-900/50 rounded-2xl p-6 cursor-pointer transition-all duration-300 group"
        >
            <motion.h3 layout="position" className="font-bold text-xl text-zinc-900 dark:text-stone-200 mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                {story.title}
            </motion.h3>
            {!expanded && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-zinc-500 dark:text-stone-500 text-sm">
                    Click to see the engineering decision.
                </motion.p>
            )}
            
            <AnimatePresence>
                {expanded && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }} 
                        animate={{ opacity: 1, height: 'auto' }} 
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="pt-6 space-y-4">
                            <div className="pl-4 border-l-2 border-red-200 dark:border-red-900/50">
                                <p className="text-xs font-bold text-red-500 dark:text-red-400 uppercase mb-1">The Standard Way</p>
                                <p className="text-zinc-500 dark:text-stone-400 text-sm">{story.standard}</p>
                            </div>
                            <div className="pl-4 border-l-2 border-orange-200 dark:border-orange-900/50">
                                <p className="text-xs font-bold text-orange-500 dark:text-orange-400 uppercase mb-1">Why It Fails</p>
                                <p className="text-zinc-500 dark:text-stone-400 text-sm">{story.fail}</p>
                            </div>
                            <div className="pl-4 border-l-2 border-teal-500 bg-teal-50/50 dark:bg-teal-900/10 py-2 rounded-r-lg">
                                <p className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase mb-1">My Build</p>
                                <p className="text-zinc-800 dark:text-stone-200 text-sm font-medium">{story.solution}</p>
                            </div>
                            <div className="pt-2 flex items-center gap-2 text-xs font-bold text-zinc-400 dark:text-stone-500">
                                <Zap className="w-3 h-3" /> {story.outcome}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const DesignComparison = () => {
    const [mode, setMode] = useState<'generic' | 'mine'>('generic');
    const [emailStatus, setEmailStatus] = useState<'idle' | 'drafting' | 'done'>('idle');

    const handleDraft = () => {
        if (emailStatus !== 'idle') return;
        setEmailStatus('drafting');
        setTimeout(() => {
            setEmailStatus('done');
            setTimeout(() => setEmailStatus('idle'), 2000);
        }, 1500);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
                <div className="flex items-center gap-3 mb-4">
                     <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${mode === 'generic' ? 'bg-zinc-200 dark:bg-stone-700 text-zinc-600 dark:text-stone-300' : 'bg-transparent text-zinc-400 dark:text-stone-600'}`}>Typical AI App</span>
                     <button onClick={() => setMode(mode === 'generic' ? 'mine' : 'generic')} className="w-12 h-6 bg-zinc-200 dark:bg-stone-700 rounded-full p-1 relative transition-colors duration-300">
                        <motion.div 
                            animate={{ x: mode === 'generic' ? 0 : 24, backgroundColor: mode === 'generic' ? '#71717a' : '#14b8a6' }}
                            className="w-4 h-4 rounded-full shadow-sm"
                        />
                     </button>
                     <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${mode === 'mine' ? 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400' : 'bg-transparent text-zinc-400 dark:text-stone-600'}`}>What I Ship</span>
                </div>
                <h3 className="font-display font-bold text-3xl text-zinc-900 dark:text-stone-100 mb-4">
                    Context vs. Content
                </h3>
                <p className="text-zinc-500 dark:text-stone-400 leading-relaxed">
                    Most AI apps just dump text. I build interfaces that understand the *task*. 
                    <br/><br/>
                    Notice how the "Task-Aware" version parses the intent, offers a relevant action (Draft Email), and cites sources immediately, rather than forcing the user to read a wall of text.
                </p>
            </div>

            <div className="bg-zinc-100 dark:bg-stone-800 p-8 rounded-3xl">
                <AnimatePresence mode="wait">
                    {mode === 'generic' ? (
                        <motion.div 
                            key="generic"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="bg-white dark:bg-stone-900 p-6 rounded-2xl shadow-sm min-h-[220px]"
                        >
                            <div className="flex items-center gap-3 mb-4 border-b border-zinc-100 dark:border-stone-800 pb-4">
                                <div className="w-8 h-8 bg-zinc-200 dark:bg-stone-700 rounded-full" />
                                <div className="h-2 w-24 bg-zinc-200 dark:bg-stone-700 rounded-full" />
                            </div>
                            <div className="space-y-2">
                                <div className="h-2 w-full bg-zinc-100 dark:bg-stone-800 rounded-full" />
                                <div className="h-2 w-full bg-zinc-100 dark:bg-stone-800 rounded-full" />
                                <div className="h-2 w-3/4 bg-zinc-100 dark:bg-stone-800 rounded-full" />
                            </div>
                            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 text-sm rounded-lg">
                                Here is a summary of the meeting. We discussed Q3 goals...
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div 
                            key="mine"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="bg-white dark:bg-stone-900 p-6 rounded-2xl shadow-xl shadow-teal-500/10 dark:shadow-teal-900/20 min-h-[220px] border border-teal-100 dark:border-teal-900/30"
                        >
                             <div className="flex items-center justify-between mb-4 border-b border-zinc-100 dark:border-stone-800 pb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-teal-100 dark:bg-teal-900/50 text-teal-600 dark:text-teal-400 rounded-full flex items-center justify-center font-bold text-xs">AI</div>
                                    <span className="text-sm font-bold text-zinc-900 dark:text-stone-200">Meeting Summary</span>
                                </div>
                                <span className="text-xs bg-zinc-100 dark:bg-stone-800 text-zinc-500 dark:text-stone-400 px-2 py-1 rounded-md font-mono">240ms</span>
                            </div>
                            
                            <div className="mb-4">
                                <div className="flex gap-2 mb-2">
                                    <span className="text-xs font-bold bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 px-2 py-1 rounded">Q3 Goals</span>
                                    <span className="text-xs font-bold bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-300 px-2 py-1 rounded">Hiring</span>
                                </div>
                                <p className="text-sm text-zinc-600 dark:text-stone-300">The team agreed to prioritize the mobile revamp...</p>
                            </div>

                            <button 
                                onClick={handleDraft}
                                disabled={emailStatus !== 'idle'}
                                className={`w-full py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all duration-300 shadow-md ${emailStatus === 'done' ? 'bg-green-500 text-white' : 'bg-zinc-900 dark:bg-stone-100 text-white dark:text-stone-900 hover:bg-zinc-800 dark:hover:bg-white hover:scale-[1.02] active:scale-95'}`}
                            >
                                {emailStatus === 'idle' && <><MousePointer2 className="w-4 h-4" /> Action: Draft Follow-up Email</>}
                                {emailStatus === 'drafting' && <><div className="w-4 h-4 border-2 border-white/30 dark:border-black/30 border-t-white dark:border-t-black rounded-full animate-spin"/> Drafting...</>}
                                {emailStatus === 'done' && <><Check className="w-4 h-4" /> Draft Saved to CRM</>}
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

const SystemDemo = ({ systemView }: { systemView: boolean }) => {
    return (
        <div className="relative w-full max-w-lg bg-white dark:bg-stone-900 rounded-2xl shadow-2xl p-8 border border-zinc-100 dark:border-stone-800 transition-all duration-500 min-h-[220px] flex items-center justify-center">
            {/* Standard UI Layer */}
            <div className={`w-full flex gap-4 transition-all duration-500 ${systemView ? 'opacity-30 blur-[2px]' : 'opacity-100'}`}>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 shrink-0 shadow-lg" />
                <div className="flex-1 space-y-3">
                    <div className="h-4 w-1/3 bg-zinc-100 dark:bg-stone-800 rounded-full mb-4" />
                    <p className="text-zinc-600 dark:text-stone-300 leading-relaxed text-sm md:text-base">
                        Based on the patient's history of hypertension, I recommend monitoring blood pressure daily.
                    </p>
                </div>
            </div>

            {/* System Overlay Layer */}
            <AnimatePresence>
                {systemView && (
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-20 pointer-events-none"
                    >
                        {/* Token Count Overlay - Top Right */}
                        <div className="absolute -top-4 -right-4 flex flex-col gap-2 items-end">
                            <Badge color="bg-blue-600" text="Tokens: 42" icon={Database} delay={0.1} />
                            <Badge color="bg-indigo-600" text="Latency: 120ms" icon={Zap} delay={0.2} />
                        </div>

                        {/* RAG Overlay - Bottom Right */}
                        <div className="absolute -bottom-4 -right-4">
                            <Badge color="bg-purple-600" text="Source: Local Vector DB" icon={Layers} delay={0.3} />
                        </div>

                         {/* Model Overlay - Top Left */}
                        <div className="absolute -top-4 -left-4">
                            <Badge color="bg-orange-500" text="ResNet50: Retina Scan" icon={Activity} delay={0.4} />
                        </div>

                        {/* Confidence Overlay - Center */}
                        <motion.div 
                            initial={{ scale: 0.8, opacity: 0, y: "-40%" }}
                            animate={{ scale: 1, opacity: 1, y: "-50%" }}
                            transition={{ delay: 0.5, type: "spring" }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 bg-zinc-900 dark:bg-stone-100 text-white dark:text-stone-900 px-5 py-3 rounded-xl shadow-2xl border border-zinc-700/50 dark:border-stone-300 flex flex-col items-center min-w-[160px]"
                        >
                            <div className="text-[10px] font-mono uppercase text-zinc-400 dark:text-stone-500 mb-1 tracking-widest">Confidence</div>
                            <div className="text-3xl font-bold text-green-400 dark:text-green-600 tracking-tight">98.4%</div>
                        </motion.div>
                        
                        {/* Box Highlight */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute inset-2 border-2 border-dashed border-indigo-500/40 rounded-xl" 
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

const Badge = ({ color, text, icon: Icon, delay = 0 }: any) => (
    <motion.div 
        initial={{ opacity: 0, y: 10, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay, duration: 0.4, type: "spring" }}
        className={`${color} text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-2 border-2 border-white dark:border-stone-900`}
    >
        <Icon className="w-3 h-3" /> {text}
    </motion.div>
);