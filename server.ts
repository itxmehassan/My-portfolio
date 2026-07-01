import express from 'express';
import path from 'path';
import fs from 'fs';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;
const MESSAGES_FILE = path.join(process.cwd(), 'messages.json');
const PORTFOLIO_FILE = path.join(process.cwd(), 'portfolio_data.json');
const UPLOADS_DIR = path.join(process.cwd(), 'uploads');
const PASSCODE_FILE = path.join(process.cwd(), 'passcode.txt');

// Configure body limits for base64 uploads
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Initialize passcode.txt if it doesn't exist
if (!fs.existsSync(PASSCODE_FILE)) {
  try {
    fs.writeFileSync(PASSCODE_FILE, 'AMAFHHas786.', 'utf-8');
  } catch (err) {
    console.error('Error creating passcode file:', err);
  }
} else {
  // If it does exist but contains the old default 'hassan2026', migrate it to the new requested default
  try {
    const existing = fs.readFileSync(PASSCODE_FILE, 'utf-8').trim();
    if (existing === 'hassan2026') {
      fs.writeFileSync(PASSCODE_FILE, 'AMAFHHas786.', 'utf-8');
    }
  } catch (err) {
    console.error('Error migrating passcode file:', err);
  }
}

// Helper function to read the current passcode
function getPasscode(): string {
  try {
    if (fs.existsSync(PASSCODE_FILE)) {
      const current = fs.readFileSync(PASSCODE_FILE, 'utf-8').trim();
      if (current === 'hassan2026') {
        fs.writeFileSync(PASSCODE_FILE, 'AMAFHHas786.', 'utf-8');
        return 'AMAFHHas786.';
      }
      return current;
    }
  } catch (err) {
    console.error('Error reading passcode file:', err);
  }
  return 'AMAFHHas786.';
}

// Initialize messages.json if it doesn't exist
if (!fs.existsSync(MESSAGES_FILE)) {
  try {
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify([], null, 2));
  } catch (err) {
    console.error('Error creating messages file:', err);
  }
}

// Ensure uploads directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
  try {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  } catch (err) {
    console.error('Error creating uploads directory:', err);
  }
}

// Serve uploaded files statically
app.use('/uploads', express.static(UPLOADS_DIR));

const INITIAL_PORTFOLIO_DATA = {
  personalInfo: {
    name: 'Hassan Mehdi',
    title: 'Full-Stack Developer',
    email: 'hassanmehdi1444@gmail.com',
    github: 'https://github.com/hassanmehdi',
    linkedin: 'https://linkedin.com/in/hassanmehdi',
    twitter: 'https://twitter.com/hassanmehdi',
    bio: 'A results-driven Full-Stack Developer with over 4 years of experience building high-performance, secure web applications. Specializing in designing robust Node.js/Express backend microservices, paired with fluid, responsive React interfaces. Passionate about system architecture, performance optimization, and integrating AI workflows.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    polaroidUrl: '/src/assets/images/hassan_polaroid_portrait_1782736124384.jpg',
    location: 'Dallas, TX (Remote Available)',
    availability: 'Open to Full-Time & Freelance Contracts'
  },
  projects: [
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
        'Integrated team workload dashboards and analytical charts'
      ],
      metrics: [
        { label: 'Real-time Sync Latency', value: '< 45ms' },
        { label: 'Document Queries', value: 'Optimized index' },
        { label: 'Active Users Capacity', value: '1,000+ simultaneous' }
      ],
      imageUrl: '',
      bgImageUrl: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&w=800&q=80'
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
        'Custom inventory locking system during high-traffic checkout window'
      ],
      metrics: [
        { label: 'Lighthouse Performance Score', value: '98/100' },
        { label: 'API Response Time', value: '30ms average' },
        { label: 'Transactional Accuracy', value: '100% ACID compliant' }
      ],
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80',
      bgImageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'
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
        'Multi-tenant project organization with custom folder uploads'
      ],
      metrics: [
        { label: 'Semantic Query Accuracy', value: '94.2% top-1 recall' },
        { label: 'PDF Parsing Speed', value: '15 pages / sec' },
        { label: 'Vector Index Size', value: 'Up to 10M documents' }
      ],
      imageUrl: '',
      bgImageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'
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
        'One-click templates with responsive styling presets'
      ],
      metrics: [
        { label: 'Interaction FPS', value: '60fps locked' },
        { label: 'Analytics Pipeline Lag', value: 'Near real-time' },
        { label: 'Customization Blocks', value: '12 distinct types' }
      ],
      imageUrl: '',
      bgImageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80'
    }
  ],
  skills: [
    { name: 'React / Next.js', category: 'frontend', proficiency: 95, yearsOfExperience: 4 },
    { name: 'TypeScript', category: 'frontend', proficiency: 90, yearsOfExperience: 4 },
    { name: 'Tailwind CSS', category: 'frontend', proficiency: 98, yearsOfExperience: 4 },
    { name: 'Framer Motion', category: 'frontend', proficiency: 85, yearsOfExperience: 3 },
    { name: 'HTML5 & CSS3', category: 'frontend', proficiency: 95, yearsOfExperience: 4 },
    { name: 'Node.js / Express', category: 'backend', proficiency: 92, yearsOfExperience: 4 },
    { name: 'Python / FastAPI', category: 'backend', proficiency: 85, yearsOfExperience: 3 },
    { name: 'REST APIs & GraphQL', category: 'backend', proficiency: 90, yearsOfExperience: 4 },
    { name: 'WebSockets (Socket.io)', category: 'backend', proficiency: 82, yearsOfExperience: 3 },
    { name: 'PostgreSQL', category: 'database', proficiency: 88, yearsOfExperience: 3 },
    { name: 'MongoDB', category: 'database', proficiency: 85, yearsOfExperience: 4 },
    { name: 'Redis Cache', category: 'database', proficiency: 80, yearsOfExperience: 2 },
    { name: 'Firestore / Firebase', category: 'database', proficiency: 88, yearsOfExperience: 3 },
    { name: 'Docker / Containers', category: 'tools', proficiency: 80, yearsOfExperience: 2 },
    { name: 'Git & GitHub Actions', category: 'tools', proficiency: 90, yearsOfExperience: 4 },
    { name: 'AWS (ECS, S3, RDS)', category: 'tools', proficiency: 75, yearsOfExperience: 2 },
    { name: 'Linux Server Admin', category: 'tools', proficiency: 80, yearsOfExperience: 3 }
  ],
  experiences: [
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
        'Mentored 3 junior developers and instituted unified code quality checklists, resulting in a 25% reduction in production hotfixes.'
      ],
      skillsUsed: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'AWS', 'Tailwind CSS']
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
        'Maintained automated testing pipelines using Jest and React Testing Library, boosting code coverage benchmarks to 85%.'
      ],
      skillsUsed: ['React', 'JavaScript', 'Node.js', 'Jest', 'Tailwind CSS', 'Git']
    }
  ]
};

// Initialize portfolio_data.json if it doesn't exist
if (!fs.existsSync(PORTFOLIO_FILE)) {
  try {
    fs.writeFileSync(PORTFOLIO_FILE, JSON.stringify(INITIAL_PORTFOLIO_DATA, null, 2));
  } catch (err) {
    console.error('Error creating portfolio data file:', err);
  }
}

// Helper to get Gemini Client safely
function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY environment variable is missing');
  }
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// API Routes

// Chatbot endpoint representing Hassan Mehdi
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const ai = getGeminiClient();

    // Construct a strong developer persona context
    const systemInstruction = `
You are the AI Twin of Hassan Mehdi, an elite Full-Stack Developer. Your goal is to represent Hassan in chats with recruiters, hiring managers, and potential clients.
Answer questions about Hassan's experience, technologies, skills, projects, and availability in a professional, polite, and slightly confident tone.

Here is Hassan's profile details:
- Name: Hassan Mehdi
- Title: Full-Stack Developer
- Email: hassanmehdi1444@gmail.com
- Availability: Open to full-time and freelance contracts. Ready to start immediately.
- Location: Dallas, TX (Open to Remote / Hybrid / On-site in TX)
- Work Experience:
  1. Apex Cloud Systems (Senior Full-Stack Developer, 2024 - Present): Deployed containerized Express backends on AWS, served 50k+ users, converted legacy apps to Vite/TypeScript, improved page load by 40%.
  2. Synergy Tech Agency (Full-Stack Software Engineer, 2022 - 2024): Deployed 8+ client products, stripe payment, Redis caching (averaging 30ms API latency), and transactional SQL/NoSQL systems.
  3. Vanguard SaaS Platforms (Software Development Intern, 2021 - 2022): React design system component development, automated testing (Jest) achieving 85% coverage.
- Top Skills: React, Next.js, TypeScript, Tailwind CSS, Node.js, Express, FastAPI, PostgreSQL, MongoDB, Redis, Docker, AWS (ECS, S3, RDS), Git, GitHub Actions.
- Notable Projects:
  1. DevFlow Workspace: Real-time SaaS collaboration platform (React, Node, Postgres, Socket.io) with custom Kanban and nested document hierarchy.
  2. ShopSphere Engine: Headless e-commerce (Next.js, MongoDB, Stripe, Redis cache) featuring transactional invoice rendering.
  3. QuantumCrypt PDF Search: Semantic AI search engine (Python, FastAPI, Postgres/pgvector, Gemini API embeddings) for complex company reports.
  4. BentoPort Creator: Link-in-bio dashboard (React, TS, Tailwind, local analytics pipeline) with drag-and-drop tiles.

Rules for response:
- Keep answers professional, concise, and focused on showcasing Hassan's strong backend, frontend, and database capabilities.
- Be friendly, welcoming, and directly helpful to recruiters.
- If asked about something Hassan cannot do or hasn't done, frame it positively (e.g., "Hassan has a strong foundation in software engineering and picks up new languages/technologies incredibly quickly—he would love to master that for your team").
- Advise them to leave a message in the Contact Form or email him directly at hassanmehdi1444@gmail.com for interview scheduling.
- Provide direct, concise replies. Keep paragraph count low (1-2 short paragraphs) for high readability in a chatbot container.
`;

    // Convert history format to GenAI Content objects if provided
    const contents = [];
    if (history && Array.isArray(history)) {
      for (const msg of history) {
        contents.push({
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }],
        });
      }
    }
    contents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({ reply: response.text || 'I am happy to discuss further!' });
  } catch (error: any) {
    console.error('Chat API Error:', error);
    res.status(500).json({ error: error.message || 'An error occurred during generating reply.' });
  }
});

// Contact message submit endpoint
app.post('/api/contact', (req, res) => {
  try {
    const { name, email, company, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'Name, email, subject, and message are required' });
    }

    const newMessage = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      name,
      email,
      company: company || '',
      subject,
      message,
      createdAt: new Date().toISOString(),
    };

    let messages = [];
    if (fs.existsSync(MESSAGES_FILE)) {
      try {
        const fileContent = fs.readFileSync(MESSAGES_FILE, 'utf-8');
        messages = JSON.parse(fileContent);
      } catch (err) {
        console.error('Error reading messages file, starting fresh:', err);
      }
    }

    messages.unshift(newMessage);
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2));

    res.json({ success: true, message: 'Message logged successfully!' });
  } catch (error: any) {
    console.error('Contact API Error:', error);
    res.status(500).json({ error: 'Server error processing contact message' });
  }
});

// GET passcode status
app.get('/api/passcode/status', (req, res) => {
  const current = getPasscode();
  res.json({
    isDefault: current === 'AMAFHHas786.',
    isSet: current !== ''
  });
});

// POST verify passcode
app.post('/api/passcode/verify', (req, res) => {
  const { username, password } = req.body;
  const current = getPasscode();
  if (username === 'hassanmehdi1444@gmail.com' && password === current) {
    res.json({ success: true });
  } else {
    res.status(401).json({ error: 'Invalid admin credentials. Please try again.' });
  }
});

// POST update passcode (requires current passcode for verification)
app.post('/api/passcode/update', (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const current = getPasscode();
    
    if (currentPassword !== current) {
      return res.status(401).json({ error: 'Incorrect current passcode' });
    }
    
    if (!newPassword || newPassword.trim().length < 4) {
      return res.status(400).json({ error: 'New passcode must be at least 4 characters long' });
    }
    
    fs.writeFileSync(PASSCODE_FILE, newPassword.trim(), 'utf-8');
    res.json({ success: true, message: 'Passcode updated successfully!' });
  } catch (error) {
    console.error('Update passcode error:', error);
    res.status(500).json({ error: 'Server error updating passcode' });
  }
});

// Get received contact messages (password protected)
app.post('/api/messages', (req, res) => {
  try {
    const { password } = req.body;
    if (password !== getPasscode()) {
      return res.status(401).json({ error: 'Unauthorized passcode' });
    }

    let messages = [];
    if (fs.existsSync(MESSAGES_FILE)) {
      try {
        const fileContent = fs.readFileSync(MESSAGES_FILE, 'utf-8');
        messages = JSON.parse(fileContent);
      } catch (err) {
        console.error('Error reading messages file:', err);
      }
    }

    res.json({ messages });
  } catch (error: any) {
    console.error('Get Messages Error:', error);
    res.status(500).json({ error: 'Server error fetching messages' });
  }
});

// Clear messages endpoint (password protected)
app.post('/api/messages/clear', (req, res) => {
  try {
    const { password } = req.body;
    if (password !== getPasscode()) {
      return res.status(401).json({ error: 'Unauthorized passcode' });
    }

    fs.writeFileSync(MESSAGES_FILE, JSON.stringify([], null, 2));
    res.json({ success: true, message: 'Inbox cleared successfully!' });
  } catch (error: any) {
    console.error('Clear Messages Error:', error);
    res.status(500).json({ error: 'Server error clearing inbox' });
  }
});

// GET dynamic portfolio data
app.get('/api/portfolio', (req, res) => {
  try {
    if (fs.existsSync(PORTFOLIO_FILE)) {
      const data = fs.readFileSync(PORTFOLIO_FILE, 'utf-8');
      res.json(JSON.parse(data));
    } else {
      res.json(INITIAL_PORTFOLIO_DATA);
    }
  } catch (error: any) {
    console.error('Get Portfolio Error:', error);
    res.status(500).json({ error: 'Server error retrieving portfolio data' });
  }
});

// POST update dynamic portfolio data
app.post('/api/portfolio', (req, res) => {
  try {
    const { password, portfolioData } = req.body;
    if (password !== getPasscode()) {
      return res.status(401).json({ error: 'Unauthorized passcode' });
    }
    if (!portfolioData) {
      return res.status(400).json({ error: 'Portfolio data is required' });
    }

    fs.writeFileSync(PORTFOLIO_FILE, JSON.stringify(portfolioData, null, 2));
    res.json({ success: true, message: 'Portfolio updated successfully!' });
  } catch (error: any) {
    console.error('Update Portfolio Error:', error);
    res.status(500).json({ error: 'Server error updating portfolio data' });
  }
});

// POST upload image (Base64)
app.post('/api/upload', (req, res) => {
  try {
    const { filename, base64Data, password } = req.body;
    if (password !== getPasscode()) {
      return res.status(401).json({ error: 'Unauthorized passcode' });
    }
    if (!filename || !base64Data) {
      return res.status(400).json({ error: 'Filename and base64Data are required' });
    }

    // Extract base64 payload
    const base64Image = base64Data.split(';base64,').pop();
    const buffer = Buffer.from(base64Image, 'base64');

    // Create unique filename
    const ext = path.extname(filename) || '.jpg';
    const nameWithoutExt = path.basename(filename, ext).replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const uniqueFilename = `${nameWithoutExt}_${Date.now()}${ext}`;

    const filePath = path.join(UPLOADS_DIR, uniqueFilename);
    fs.writeFileSync(filePath, buffer);

    res.json({ url: `/uploads/${uniqueFilename}` });
  } catch (error: any) {
    console.error('Image Upload Error:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

// GET list of uploads (images)
app.get('/api/uploads', (req, res) => {
  try {
    if (fs.existsSync(UPLOADS_DIR)) {
      const files = fs.readdirSync(UPLOADS_DIR);
      // Filter for common image extensions
      const images = files.filter(f => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(f)).map(f => `/uploads/${f}`);
      res.json({ images });
    } else {
      res.json({ images: [] });
    }
  } catch (error: any) {
    console.error('List Uploads Error:', error);
    res.status(500).json({ error: 'Server error listing uploads' });
  }
});

// Start server configuration
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Hassan Mehdi Portfolio backend running on port ${PORT}`);
  });
}

startServer();
