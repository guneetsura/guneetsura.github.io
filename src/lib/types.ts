export interface Profile {
  name: string;
  title: string;
  tagline: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  resumeUrl?: string;
  currentlyAt?: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  location: string;
  period: string;
  current?: boolean;
  description: string[];
  technologies: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  github?: string;
  live?: string;
  featured?: boolean;
  award?: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface Education {
  institution: string;
  degree: string;
  location: string;
  period: string;
  detail?: string;
}

export interface Award {
  title: string;
  issuer: string;
  date: string;
  detail?: string;
}

export interface PortfolioData {
  profile: Profile;
  experiences: ExperienceItem[];
  projects: ProjectItem[];
  skills: SkillGroup[];
  education: Education[];
  awards: Award[];
}

export type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
