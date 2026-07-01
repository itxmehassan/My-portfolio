export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription?: string;
  tags: string[];
  category: 'Full-Stack' | 'Frontend' | 'Cloud/DevOps';
  githubUrl: string;
  liveUrl: string;
  features: string[];
  metrics?: { label: string; value: string }[];
  imageUrl?: string;
  bgImageUrl?: string;
}

export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'tools';
  proficiency: number; // 0-100
  yearsOfExperience: number;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string[];
  skillsUsed: string[];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}
