import { Project, Skill, Experience } from './types';

export const PERSONAL_INFO = {
  name: 'Hassan Mehdi',
  title: 'Full-Stack Developer',
  email: 'hassanmehdi1444@gmail.com',
  github: 'https://github.com/hassanmehdi',
  linkedin: 'https://linkedin.com/in/hassanmehdi',
  twitter: 'https://twitter.com/hassanmehdi',
  bio: 'A results-driven Full-Stack Developer with over 4 years of experience building high-performance, secure web applications. Specializing in designing robust Node.js/Express backend microservices, paired with fluid, responsive React interfaces. Passionate about system architecture, performance optimization, and integrating AI workflows.',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400', // Modern elegant professional avatar asset placeholder
  location: 'Dallas, TX (Remote Available)',
  availability: 'Open to Full-Time & Freelance Contracts',
};

export const PROJECTS: Project[] = [
  {
    id: 'devflow',
    title: 'DevFlow Workspace',
    subtitle: 'Real-Time SaaS Collaboration Platform',
    description: 'A comprehensive, multi-module SaaS workspace featuring collaborative kanban boards, markdown editors, nested documents, and team status reports.',
    longDescription: 'DevFlow is a fully custom-built workspace designed for agile development teams. It utilizes server-authoritative states to synchronize task boards, markdown documents, and sprint logs in real-time. Features include recursive directories, deep filtering, multi-user cursors, and custom theme presets.',
    category: 'Full-Stack',
    tags: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Socket.io', 'Tailwind CSS'],
    githubUrl: 'https://github.com/hassanmehdi/devflow',
    liveUrl: 'https://devflow.hassanmehdi.dev',
    features: [
      'Real-time kanban board synchronization across multiple active clients',
      'Nested document hierarchy with folder creations and markdown editor',
      'Unified search capability with semantic content indexing',
      'Integrated team workload dashboards and analytical charts',
    ],
    metrics: [
      { label: 'Real-time Sync Latency', value: '< 45ms' },
      { label: 'Document Queries', value: 'Optimized index' },
      { label: 'Active Users Capacity', value: '1,000+ simultaneous' },
    ],
  },
  {
    id: 'shopsphere',
    title: 'ShopSphere Engine',
    subtitle: 'High-Performance E-commerce Storefront',
    description: 'A headless e-commerce backend and modular frontend equipped with checkout flows, invoice dispatching, and vendor dashboard analytics.',
    longDescription: 'ShopSphere is a highly performant headless storefront engine designed for millisecond page responses. It integrates with stripe payment gateways, calculates custom shipping metrics, handles inventory locking on checkout, and outputs rich PDF invoices. Powered by a Redis cache layer for product catalogs.',
    category: 'Full-Stack',
    tags: ['React', 'Next.js', 'Express', 'MongoDB', 'Redis', 'Stripe', 'Tailwind CSS'],
    githubUrl: 'https://github.com/hassanmehdi/shopsphere',
    liveUrl: 'https://shopsphere.hassanmehdi.dev',
    features: [
      'Stripe checkout integration with secure server-side webhook validation',
      'In-memory Redis cache for product data yielding extremely low latency',
      'Comprehensive vendor control panels with charts for earnings and sales',
      'Custom inventory locking system during high-traffic checkout window',
    ],
    metrics: [
      { label: 'Lighthouse Performance Score', value: '98/100' },
      { label: 'API Response Time', value: '30ms average' },
      { label: 'Transactional Accuracy', value: '100% ACID compliant' },
    ],
  },
  {
    id: 'quantumcrypt',
    title: 'QuantumCrypt PDF Search',
    subtitle: 'AI Document Intelligence & Vector Search',
    description: 'An AI-powered document search engine utilizing Gemini 3.5 Flash vector-embeddings to scan, chunk, and index unstructured corporate documents.',
    longDescription: 'QuantumCrypt leverages advanced natural language models to ingest and vectorize unstructured PDF repositories. Users can ask questions about complex financial reports, contracts, or technical manuals, receiving accurate semantic answers with exact source citations. Features an automated OCR text parser.',
    category: 'Cloud/DevOps',
    tags: ['Python', 'FastAPI', 'Gemini API', 'Postgres/pgvector', 'Docker', 'AWS ECS'],
    githubUrl: 'https://github.com/hassanmehdi/quantumcrypt',
    liveUrl: 'https://quantumcrypt.hassanmehdi.dev',
    features: [
      'Semantic search utilizing Gemini-embedding-2-preview and pgvector database',
      'Automated background worker utilizing Redis queue for OCR document ingestion',
      'Interactive chat console giving grounded answers with precise document pages',
      'Multi-tenant project organization with custom folder uploads',
    ],
    metrics: [
      { label: 'Semantic Query Accuracy', value: '94.2% top-1 recall' },
      { label: 'PDF Parsing Speed', value: '15 pages / sec' },
      { label: 'Vector Index Size', value: 'Up to 10M documents' },
    ],
  },
  {
    id: 'bentoport',
    title: 'BentoPort Creator',
    subtitle: 'Interactive Bio-Link Engine with Analytics',
    description: 'A beautiful visual dashboard where developers and creators can design bento-style link portfolios with live analytics and drag-and-drop customization.',
    longDescription: 'BentoPort provides interactive, modular blocks that represent social links, active Spotify tracks, GitHub commit feeds, and custom text cards. Features an analytical reporting section tracking visitors, clicks, geographic locations, and screen resolution splits.',
    category: 'Frontend',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Chart.js', 'LocalStorage'],
    githubUrl: 'https://github.com/hassanmehdi/bentoport',
    liveUrl: 'https://bentoport.hassanmehdi.dev',
    features: [
      'Interactive visual dashboard supporting drag-and-drop tile arrangements',
      'Live integrations pulling real-time GitHub commits and repository stars',
      'Analytics suite detailing visitor counts, click-through rates, and referrers',
      'One-click templates with responsive styling presets',
    ],
    metrics: [
      { label: 'Interaction FPS', value: '60fps locked' },
      { label: 'Analytics Pipeline Lag', value: 'Near real-time' },
      { label: 'Customization Blocks', value: '12 distinct types' },
    ],
  },
];

export const SKILLS: Skill[] = [
  // Frontend
  { name: 'React / Next.js', category: 'frontend', proficiency: 95, yearsOfExperience: 4 },
  { name: 'TypeScript', category: 'frontend', proficiency: 90, yearsOfExperience: 4 },
  { name: 'Tailwind CSS', category: 'frontend', proficiency: 98, yearsOfExperience: 4 },
  { name: 'Framer Motion', category: 'frontend', proficiency: 85, yearsOfExperience: 3 },
  { name: 'HTML5 & CSS3', category: 'frontend', proficiency: 95, yearsOfExperience: 4 },
  
  // Backend
  { name: 'Node.js / Express', category: 'backend', proficiency: 92, yearsOfExperience: 4 },
  { name: 'Python / FastAPI', category: 'backend', proficiency: 85, yearsOfExperience: 3 },
  { name: 'REST APIs & GraphQL', category: 'backend', proficiency: 90, yearsOfExperience: 4 },
  { name: 'WebSockets (Socket.io)', category: 'backend', proficiency: 82, yearsOfExperience: 3 },
  
  // Database
  { name: 'PostgreSQL', category: 'database', proficiency: 88, yearsOfExperience: 3 },
  { name: 'MongoDB', category: 'database', proficiency: 85, yearsOfExperience: 4 },
  { name: 'Redis Cache', category: 'database', proficiency: 80, yearsOfExperience: 2 },
  { name: 'Firestore / Firebase', category: 'database', proficiency: 88, yearsOfExperience: 3 },

  // Tools
  { name: 'Docker / Containers', category: 'tools', proficiency: 80, yearsOfExperience: 2 },
  { name: 'Git & GitHub Actions', category: 'tools', proficiency: 90, yearsOfExperience: 4 },
  { name: 'AWS (ECS, S3, RDS)', category: 'tools', proficiency: 75, yearsOfExperience: 2 },
  { name: 'Linux Server Admin', category: 'tools', proficiency: 80, yearsOfExperience: 3 },
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'exp1',
    role: 'Full-Stack Developer',
    company: 'Techions Dev',
    period: '2026 - Present',
    location: 'Lahore, ( Remote )',
    description: [
      'Architected and deployed highly scalable containerized Express backends on AWS, serving 50,000+ active users.',
      'Refactored legacy React applications into modular Vite and TypeScript configurations, cutting initial page-load sizes by 40%.',
      'Built custom dashboard visual tools using Recharts, helping stakeholders track critical operational and sales analytics.',
      'Mentored 3 junior developers and instituted unified code quality checklists, resulting in a 25% reduction in production hotfixes.',
    ],
    skillsUsed: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'AWS', 'Tailwind CSS'],
  },
  {
    id: 'exp3',
    role: 'Full-Stack Developer Intern',
    company: 'Codec Solutions',
    period: '2024 - 2025',
    location: 'Lahore',
    description: [
      'Collaborated on design system teams to build accessible, reusable React UI component systems with absolute styling consistency.',
      'Implemented front-to-back REST APIs for contact logging, user profiles, and activity historical graphs.',
      'Maintained automated testing pipelines using Jest and React Testing Library, boosting code coverage benchmarks to 85%.',
    ],
    skillsUsed: ['React', 'JavaScript', 'Node.js', 'Jest', 'Tailwind CSS', 'Git'],
  },
];
