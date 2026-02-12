import { LucideIcon } from 'lucide-react';

export interface SkillItem {
  name: string;
  level?: string;
  category?: 'frontend' | 'backend' | 'ai' | 'tools';
}

export interface SkillCategory {
  title: string;
  skills: SkillItem[];
  icon: LucideIcon;
  color: string;
}

export interface CaseStudy {
  problem: string;
  solution: string;
  outcome: string;
  architectureSnippet?: string; // Description of architecture
  codeSnippet?: string; // Simulated code block
}

export interface Project {
  id: string;
  title: string;
  role: string;
  type: string;
  shortDescription: string;
  caseStudy: CaseStudy;
  techStack: string[];
  repoUrl?: string;
  demoUrl?: string;
  color: string;
  collaborators?: string; // To mark Bhumika repos etc.
  featured?: boolean;
}

export interface Model {
  id: string;
  name: string;
  description: string;
  metrics: string[]; // e.g. "95.4% Accuracy", "220M Params"
  tags: string[];
  link: string;
}

export interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  points: string[];
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  year: string;
  details?: string;
}

export interface Achievement {
  title: string;
  organization: string;
  date: string;
  description: string;
}