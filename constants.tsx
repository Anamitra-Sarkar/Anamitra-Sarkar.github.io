import { 
  Code2, 
  BrainCircuit, 
  Terminal, 
  Layout, 
  Palette,
  Globe,
  Cpu,
  Database,
  ShieldCheck,
  Server
} from 'lucide-react';
import { SkillCategory, Project, Experience, Education, Achievement, Model } from './types';

export const PERSONAL_INFO = {
  name: "Anamitra Sarkar",
  title: "AI/ML Engineer & Developer",
  email: "anamitrasarkar13@gmail.com",
  phone: "+91 99037 19645",
  location: "Kolkata, India",
  linkedin: "https://www.linkedin.com/in/anamitra-sarkar-7538b936b/",
  github: "https://github.com/Anamitra-Sarkar",
  huggingface: "https://huggingface.co/Arko007"
};

export const EXECUTIVE_SUMMARY = "AI/ML Engineer specializing in training Small Language Models (SLMs) for efficient inference and building the robust infrastructure needed to deploy them. My work ranges from model architecture design to developing production-grade AI applications, with an emphasis on performance and thoughtful UX.";

export const HERO_VARIANTS = [
  {
    headline: "Engineering AI systems.",
    subline: "I build specialized models and the full-stack infrastructure required to serve them."
  },
  {
    headline: "Full-stack & systems.",
    subline: "From model architecture design to full-stack AI deployment."
  },
  {
    headline: "Research to production.",
    subline: "Turning complex ML architectures into robust, user-centric applications."
  }
];

export const SKILLS: SkillCategory[] = [
  {
    title: "Frontend & UI Design",
    icon: Palette,
    color: "bg-pink-100 text-pink-600",
    skills: [
      { name: "React.js / Next.js" },
      { name: "UI/UX Design" },
      { name: "Tailwind CSS" },
      { name: "Framer Motion" },
      { name: "TypeScript" },
      { name: "Responsive Layouts" }
    ]
  },
  {
    title: "Backend & Systems",
    icon: Server,
    color: "bg-teal-100 text-teal-600",
    skills: [
      { name: "Node.js / Express" },
      { name: "Python / FastAPI" },
      { name: "Java (Elite)" },
      { name: "REST / GraphQL APIs" }
    ]
  },
  {
    title: "DevOps & Security",
    icon: ShieldCheck,
    color: "bg-orange-100 text-orange-600",
    skills: [
      { name: "Docker / Kubernetes" },
      { name: "CI/CD & Deployment" },
      { name: "Cloud (GCP / AWS)" },
      { name: "Security Auditing" },
      { name: "Nginx / Proxies" }
    ]
  },
  {
    title: "AI & ML Ops",
    icon: BrainCircuit,
    color: "bg-purple-100 text-purple-600",
    skills: [
      { name: "PyTorch / JAX" },
      { name: "Hugging Face / Transformers" },
      { name: "RAG Pipelines" },
      { name: "Gemini API" },
      { name: "Model Quantization" }
    ]
  }
];

export const MODELS: Model[] = [
  {
    id: "zenyx-deepseek",
    name: "Zenyx-DeepSeek-220M",
    description: "Nano-scale reasoning model trained with DeepSeek-R1 distillate. High information density.",
    metrics: ["220M Params", "DeepSeek Distillate", "Custom Llama Arch"],
    tags: ["Research", "NLP", "Reasoning"],
    link: "https://huggingface.co/Arko007/zenyx-deepseek-220m"
  },
  {
    id: "nfnet",
    name: "NFNet-F1 Plant Disease",
    description: "Multi-crop classification model trained from scratch. Evaluated under non-leaky validation.",
    metrics: ["95.4% Val Accuracy", "95.38% F1 Score", "79k Images"],
    tags: ["Computer Vision", "Agriculture"],
    link: "https://huggingface.co/Arko007/nfnet-f1-plant-disease"
  },
  {
    id: "retinopathy",
    name: "Diabetic Retinopathy",
    description: "Custom CNN variant trained on IDRiD dataset to classify retina images into 5 severity grades.",
    metrics: ["Custom CNN", "IDRiD Dataset", "Medical Imaging"],
    tags: ["Healthcare", "Vision"],
    link: "https://huggingface.co/Arko007/Diabetic-Retinopathy"
  },
  {
    id: "zenyx-base",
    name: "Zenyx Base 220M",
    description: "The foundation of the Zenyx family. Optimized for instruction tuning on consumer hardware.",
    metrics: ["220M Params", "Base Model"],
    tags: ["NLP", "Foundation"],
    link: "https://huggingface.co/Arko007/Zenyx-DeepSeek-220M" 
  },
  {
    id: "deepfake",
    name: "Deepfake Detector SOTA",
    description: "Forensic detection model for research purposes. Identifies synthetic artifacts in media.",
    metrics: ["Forensics", "Research Only"],
    tags: ["Security", "Vision"],
    link: "https://huggingface.co/Arko007/deepfake-detector-dfd-sota"
  },
  {
    id: "zenyx-v3",
    name: "Zenyx V3 — 1.58B Sparse MoE",
    description: "Training a 1.58B MoE with Multi-head Latent Attention, Hyper-Connections, and Top-2 expert routing on TPU v5e-8.",
    metrics: ["1.58B Params", "Sparse MoE (12 Experts)", "MLA", "Hyper-Connections"],
    tags: ["Research", "NLP", "Foundation Model"],
    link: "https://huggingface.co/Arko007/Zenyx-V3-Base"
  }
];

export const PROJECTS: Project[] = [
  {
    id: "medai",
    title: "MedAI Suite",
    role: "Lead Engineer",
    type: "Healthcare + AI",
    shortDescription: "A Smart India Hackathon 2025 finalist project integrating Gemini 2.0 with custom vision models.",
    color: "teal",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    techStack: ["React", "Gemini 2.0", "EfficientNet", "Flask", "Tailwind"],
    repoUrl: "https://github.com/Anamitra-Sarkar/MedAI",
    featured: true,
    caseStudy: {
      problem: "Medical diagnosis in remote areas suffers from a lack of expert availability. Generic AI chatbots lack visual context (X-rays, dermoscopy), while specialized vision models lack the conversational ability to explain results to patients.",
      solution: "I built MedAI, a unified dashboard that couples Gemini 2.0 for conversational history-taking with a suite of custom-trained local vision models (ResNet50 for Retinopathy, EfficientNet for Skin Disease). The frontend manages state between the conversation and the image inference pipeline.",
      architectureSnippet: "User Upload -> React Frontend -> Flask API -> [Gemini 2.0 Context Manager + Custom CNN Inference] -> Unified JSON Response -> UI Rendering",
      codeSnippet: `// Integrating Vision result into Gemini Context
const handleAnalysis = async (image, history) => {
  const visionResult = await runEfficientNet(image);
  const prompt = \`The vision model detected: \${visionResult.label} (\${visionResult.conf}%). 
  Explain this condition to the patient based on their history: \${history}\`;
  
  return await gemini.generateContent(prompt);
};`,
      outcome: "Selected for SIH 2025. The Skin Disease detector (trained on 33k images) achieved 97.89% Top-3 accuracy. The system successfully enables a 'human-in-the-loop' workflow where AI handles triage."
    }
  },
  {
    id: "zenyx",
    title: "The Zenyx Series",
    role: "Lead Researcher",
    type: "Generative AI",
    shortDescription: "Training nano-scale reasoning models (220M) to rival larger architectures using DeepSeek distillates.",
    color: "purple",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    techStack: ["PyTorch", "JAX/Flax", "Transformers", "TPU v5e"],
    repoUrl: "https://huggingface.co/Arko007/zenyx-deepseek-220m",
    featured: true,
    caseStudy: {
      problem: "Running competent LLMs requires massive VRAM, making them inaccessible for edge devices or rapid prototyping. Most 'small' models (<1B) are incoherent and lack reasoning capabilities.",
      solution: "I developed the Zenyx series (220M, 114M, 42M). Using JAX on TPU v5e, I trained a custom Llama-style architecture (RoPE, SwiGLU) using knowledge distillation from DeepSeek-R1. This forces the small model to learn 'reasoning patterns' rather than just next-token statistics.",
      architectureSnippet: "Teacher (DeepSeek-R1) -> Output Logits + Chain of Thought -> Student (Zenyx 220M) -> KL Divergence Loss -> Optimized Nano Model",
      codeSnippet: `class ZenyxConfig(LlamaConfig):
    def __init__(self, vocab_size=152650, hidden_size=768, ...):
        # Using Qwen2 tokenizer for better compression
        self.num_hidden_layers = 12
        self.num_attention_heads = 12
        self.intermediate_size = 2048 # Optimized for 220M
        super().__init__(**kwargs)`,
      outcome: "Zenyx-DeepSeek-220M demonstrates surprising chain-of-thought capabilities for its size, validating that data quality (distillation) matters more than parameter count for specific domains."
    }
  },
  {
    id: "verify-ai",
    title: "Verify AI",
    role: "Lead Research Engineer",
    type: "Multi-Modal Forensics",
    shortDescription: "A comprehensive misinformation defense suite (formerly Credo AI). Features 71.25% accuracy text classifiers and deepfake detection.",
    color: "indigo",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80",
    techStack: ["RoBERTa", "DeBERTa", "React", "Chrome Ext", "Flask"],
    repoUrl: "https://github.com/Anamitra-Sarkar/Credo_AI",
    featured: true,
    caseStudy: {
      problem: "Misinformation is no longer just text—it's multi-modal. Deepfakes (audio/video) and synthetic text spread faster than human fact-checkers can handle. Simple RAG pipelines aren't enough.",
      solution: "I built Verify AI, a giant full-stack application that integrates dedicated classifiers for Image, Video, and Audio deepfakes. For text, I engineered a 'Two-Brain System' using fine-tuned DeBERTa and RoBERTa models to analyze semantic patterns. The platform also includes a Chrome Extension for real-time web analysis.",
      architectureSnippet: "Input (Media/Text) -> [ResNet Deepfake Detectors | RoBERTa + DeBERTa Ensemble] -> Weighted Logic Layer -> React Dashboard / Chrome Overlay",
      codeSnippet: `// The "Two-Brain" Text Classification Logic
class TextVerifier(nn.Module):
    def forward(self, text):
        # RoBERTa achieved 71.25% Acc on LIAR (World #2)
        r_out = self.roberta(text) 
        d_out = self.deberta(text)
        
        # Weighted ensemble for final verdict
        return (r_out * 0.6) + (d_out * 0.4)`,
      outcome: "The fine-tuned RoBERTa model achieved 71.25% test accuracy on the LIAR dataset (binary task), ranking 2nd globally. Evolved from a prototype (Credo) to a production-grade multi-modal security suite."
    }
  },
  {
    id: "synapse",
    title: "SYNAPSE AI",
    role: "Full-Stack Dev",
    type: "AI Platform",
    shortDescription: "A comprehensive AI platform aggregating multiple generative tools into one cohesive interface.",
    color: "blue",
    techStack: ["React", "Node.js", "OpenAI API", "Stripe"],
    repoUrl: "https://github.com/Anamitra-Sarkar/SYNAPSE-AI",
    featured: false,
    caseStudy: {
      problem: "Users have to switch between 5 different tabs for Text, Image, Code, and Audio generation.",
      solution: "Built a unified SaaS dashboard called SYNAPSE. It acts as an abstraction layer over multiple foundational models, providing a consistent UI for all generative tasks.",
      outcome: "Streamlined workflows. Demonstrated ability to handle complex state management and API metering in a React application."
    }
  },
  {
    id: "agromind",
    title: "AgroMind",
    role: "ML Engineer",
    type: "AgriTech",
    shortDescription: "Plant disease detection system using NFNet-F1, bridging computer vision with accessible UI.",
    color: "green",
    techStack: ["TensorFlow", "NFNet", "React Native", "Python"],
    repoUrl: "https://github.com/Anamitra-Sarkar/AgroMind",
    collaborators: "Collaboration with projectsportfolio75-coder",
    featured: false,
    caseStudy: {
      problem: "Farmers need instant diagnosis of crop diseases in the field, often without internet.",
      solution: "Trained NFNet-F1 on ~79k images across 88 classes. Optimized the model for mobile deployment via TFLite.",
      outcome: "Achieved ~95.4% validation accuracy. The app allows farmers to snap a photo and get instant treatment recommendations."
    }
  },
  {
    id: "stock",
    title: "MarketInsight",
    role: "Frontend Dev",
    type: "FinTech",
    shortDescription: "Real-time stock analysis dashboard with interactive charts and AI predictions.",
    color: "yellow",
    techStack: ["Next.js", "Recharts", "LSTM", "Python"],
    repoUrl: "https://github.com/Anamitra-Sarkar/MarketInsight",
    featured: false,
    caseStudy: {
      problem: "Retail traders lack access to institutional-grade predictive visualization.",
      solution: "Combined a clean Next.js dashboard with a Python backend running LSTM models for price trend prediction.",
      outcome: "High-performance UI capable of handling real-time WebSocket data streams."
    }
  },
  {
    id: "budget-ai",
    title: "Budget AI",
    role: "Creator & Lead Engineer",
    type: "Infrastructure / AI Ops",
    shortDescription: "A universal transparent proxy that reduces AI API token usage by 15–40% by compressing prompts and tool outputs in real-time.",
    color: "emerald",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80",
    techStack: ["Python", "mitmproxy", "FastAPI", "OpenAI", "Anthropic", "Gemini"],
    repoUrl: "https://github.com/Anamitra-Sarkar/budget-ai",
    featured: true,
    caseStudy: {
      problem: "AI coding tools burn through API tokens with verbose prompts filled with ANSI codes, stack traces, repeated boilerplate, and debug logs — wasting 15–40% of token budgets on noise.",
      solution: "Built Budget AI — a transparent HTTPS proxy sitting between AI tools and API providers. It intercepts requests, losslessly compresses prompt history by stripping terminal noise, deduplicating repeated content, removing boilerplate, and collapsing separators. Includes a budget policy engine (auto-downgrade model on overage), real-time analytics CLI, and exact-match caching. Supports OpenAI, Anthropic, Gemini, and Groq through a unified adapter layer.",
      architectureSnippet: "CLI Tool -> HTTPS Proxy (mitmproxy) -> Compression Engine (regex/dedup) -> Budget Policy Enforcer -> Provider Adapter [OpenAI/Anthropic/Gemini/Groq] -> Compressed Response",
      codeSnippet: `class BudgetCompressor:
    def compress(self, messages):
        for msg in messages[1:-1]:  # skip system + last prompt
            msg.content = self._strip_ansi(msg.content)
            msg.content = self._deduplicate(msg.content)
            msg.content = self._remove_boilerplate(msg.content)
        return messages`,
      outcome: "Achieves 15–40% token reduction across all major AI coding tools without degrading output quality. Features budget policies, real-time CLI analytics, and exact-match caching."
    }
  }
];

export const EXPERIENCE: Experience[] = [
  {
    role: "Freelance AI & Full-Stack Engineer",
    company: "Self-Employed",
    location: "Remote",
    period: "July 2025 – Present",
    points: [
      "Fine-tuned Small Language Models (SLMs) for specialized NLP tasks (Zenyx Series).",
      "Designed & built scalable web apps using Next.js and MERN stack.",
      "Consulted on Linux environment setups and resource optimization."
    ]
  },
  {
    role: "Human Resource Intern",
    company: "Centennial Infotech",
    location: "Kolkata, India",
    period: "May 2025 – Jul 2025",
    points: [
      "Optimized recruitment workflows and talent operations.",
      "Maintained employee databases with 100% data accuracy."
    ]
  }
];

export const EDUCATION: Education[] = [
  {
    degree: "B.Tech in AI & Machine Learning",
    institution: "RCC Institute of Information Technology",
    location: "Kolkata, India",
    year: "2023 – 2027",
    details: "4th Year"
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    title: "Java Elite Certification",
    organization: "NPTEL / IIT Kharagpur",
    date: "Nov 2025",
    description: "Mastery of OOP concepts."
  },
  {
    title: "Fundamentals of LLMs",
    organization: "Hugging Face",
    date: "Dec 2025",
    description: "Transformer Architectures."
  },
  {
    title: "Gen AI Exchange Hackathon",
    organization: "Google Cloud / Hack2Skill",
    date: "2025",
    description: "Prototype Refinement Phase for Verify AI (formerly Credo)."
  },
  {
    title: "Smart India Hackathon",
    organization: "Government of India",
    date: "2025",
    description: "MedAI Suite (Diabetic Retinopathy)."
  }
];