import { PortfolioData } from './types';

export const portfolioData: PortfolioData = {
  profile: {
    name: 'Guneet Sura',
    title: 'Frontend-Focused Software Engineer',
    tagline:
      "I build fast, considered web products — from client sites to a production HRMS — using React, Next.js, and TypeScript.",
    location: 'Mumbai, India',
    github: 'https://github.com/guneetsura',
    linkedin: 'https://linkedin.com/in/guneetsura',
    currentlyAt: 'Ad2connect',
  },

  experiences: [
    {
      id: 'ad2connect',
      company: 'Ad2connect',
      role: 'Software Engineer Intern',
      location: 'Mumbai',
      period: 'Apr 2026 - Present',
      current: true,
      description: [
        'Built and deployed 3 production-grade web applications using Next.js, Tailwind CSS, and Framer Motion, including client websites and an internal HRMS, hosted on Vercel.',
        'Integrated Next.js with WordPress Headless CMS, enabling non-technical teams to manage content independently while maintaining frontend performance.',
        'Engineered a production HRMS using Next.js, Clerk, Drizzle ORM, and Neon PostgreSQL, automating biometric attendance synchronization via Python services running on Oracle Cloud Infrastructure.',
      ],
      technologies: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'Clerk', 'Drizzle ORM', 'Neon PostgreSQL', 'OCI'],
    },
    {
      id: 'algoocean',
      company: 'Algoocean Technologies Pvt Ltd.',
      role: 'Web Developer Intern',
      location: 'Mumbai',
      period: 'Jul 2025 - Oct 2025',
      description: [
        'Built responsive production UIs using React and Next.js, improving page consistency and load performance.',
        'Developed reusable component-based modules, reducing future feature development effort.',
        'Integrated frontend with REST APIs, handling async states, errors, and edge cases.',
      ],
      technologies: ['React.js', 'Next.js', 'REST APIs'],
    },
    {
      id: 'kpmg',
      company: 'KPMG',
      role: 'Cyber Security Analyst Intern',
      location: 'Mumbai',
      period: 'Jan 2024 - Jul 2024',
      description: [
        'Developed a web-based AI-powered security testing tool using HTML, JavaScript, and Flask.',
        'Built frontend visualizations for OWASP Top 10 vulnerabilities, improving demo clarity for stakeholders.',
        'Applied secure coding principles across frontend and backend workflows.',
      ],
      technologies: ['JavaScript', 'Flask', 'HTML5', 'Security'],
    },
    {
      id: 'maalvo',
      company: 'Maalvo',
      role: 'ReactJs Developer Intern',
      location: 'Mumbai',
      period: 'Sept 2021 - Mar 2022',
      description: [
        'Built reusable React components for an e-commerce platform, accelerating feature delivery.',
        'Converted Figma designs into responsive, pixel-accurate interfaces.',
        'Integrated frontend components with backend APIs for dynamic data rendering.',
      ],
      technologies: ['React.js', 'Figma', 'APIs'],
    },
  ],

  projects: [
     {
       id: 'saas-growth-marketing',
       title: 'SaaS Growth Marketing',
       description:
         'A production B2B SaaS growth marketing website built for Ad2connect, with structured services, case studies, and clear strategy-call conversion paths.',
       technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
       live: 'https://saasgrowthmarketing.com',
       featured: true,
       award: 'Client website built at Ad2connect',
     },
    {
      id: 'indiadatahub',
      title: 'IndiaDataHub Dashboard',
      description:
        'A full-stack data analytics platform with real-time authentication, data caching, and responsive design. Built hierarchical navigation, debounced search, and mobile-first pagination while improving page load performance by roughly 40%.',
      technologies: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'Supabase', 'PostgreSQL'],
      github: '#',
      live: '#',
      featured: true,
    },
    {
      id: 'dark-web-crawler',
      title: 'Dark Web Crawler',
      description:
        'A full-stack platform for dark web threat intelligence, built for the KAVACH 2023 national hackathon. Includes a React dashboard for data visualization and backend services that crawl, process, and classify content using NLP.',
      technologies: ['Python', 'React.js', 'Django', 'EC2', 'MongoDB', 'NLP'],
      github: '#',
      live: '#',
      featured: true,
      award: 'KAVACH 2023 — National Winner',
    },
    {
      id: 'url-shortener',
      title: 'URL Shortener',
      description:
        'A full-stack URL shortener with authentication and PostgreSQL-backed analytics — dashboards for managing links, visit counts, and usage history, with real-time data operations and interactive UI animations.',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'NeonDB', 'PostgreSQL'],
      github: '#',
      live: '#',
      featured: false,
    },
  ],

  skills: [
    {
      category: 'Frontend',
      items: ['React.js', 'Next.js', 'TypeScript', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Tailwind CSS', 'Framer Motion', 'SCSS'],
    },
    {
      category: 'Backend',
      items: ['Python', 'Node.js', 'REST APIs', 'PostgreSQL', 'NeonDB', 'Drizzle ORM', 'PHP', 'Django', 'Flask', 'MongoDB'],
    },
    {
      category: 'Tools & Platforms',
      items: ['Git', 'GitHub', 'Clerk', 'Supabase', 'WordPress Headless CMS', 'Vercel', 'Oracle Cloud Infrastructure (OCI)', 'Figma'],
    },
    {
      category: 'AI-Assisted Development',
      items: ['Claude Code', 'OpenAI Codex', 'ChatGPT', 'Gemini', 'DeepSeek', 'OpenCode'],
    },
  ],

  education: [
    {
      institution: 'KJ Somaiya College of Engineering',
      degree: 'B.Tech. in Information Technology (Cyber Security Hons.)',
      location: 'Mumbai',
      period: 'Sept 2020 - Jul 2024',
      detail: 'CGPA: 8.97 / 10',
    },
  ],

  awards: [
    {
      title: 'KAVACH 2023 — Winner',
      issuer: 'Government of India',
      date: 'Aug 2023',
      detail: 'PS ID KVH006 — Dark Web Crawler',
    },
  ],
};
