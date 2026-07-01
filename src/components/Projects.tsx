import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, ExternalLink, X, ListCollapse, BarChart3, Sparkles, Smartphone, Calendar, CheckSquare, Search, FileCode } from 'lucide-react';
import { PROJECTS } from '../data';
import { Project } from '../types';

interface ProjectsProps {
  projects?: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const displayProjects = projects || PROJECTS;

  const getProjectById = (id: string): Project | undefined => {
    return displayProjects.find((p) => p.id === id);
  };

  const handleCardClick = (id: string) => {
    const proj = getProjectById(id);
    if (proj) setSelectedProject(proj);
  };

  const shopsphereProj = getProjectById('shopsphere');
  const devflowProj = getProjectById('devflow');
  const quantumcryptProj = getProjectById('quantumcrypt');
  const bentoportProj = getProjectById('bentoport');

  return (
    <section id="projects" className="py-24 bg-neutral-950 border-t border-neutral-900 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Centered Section Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-sans font-extrabold text-white tracking-tight">
            Selected <span className="text-indigo-400">Projects</span>
          </h2>
          <p className="text-sm text-neutral-400 max-w-md font-sans">
            Some works that highlight my expertise.
          </p>
          <div className="h-[3px] w-24 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
        </div>

        {/* Asymmetric Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* COLUMN 1: Large Featured Card (ShopSphere Engine) - lg:col-span-5 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -4 }}
            onClick={() => handleCardClick('shopsphere')}
            className="lg:col-span-5 relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#071610] via-neutral-900 to-neutral-950 border border-neutral-850/60 hover:border-[#3b82f6]/30 flex flex-col justify-between h-[520px] transition-all duration-500 shadow-2xl group cursor-pointer"
          >
            {/* 1. Default (Mockup) State Layer */}
            <div className="absolute inset-0 flex flex-col justify-between p-8 transition-all duration-500 group-hover:opacity-0 group-hover:scale-95 group-hover:pointer-events-none z-10">
              {/* Blurry circular element in background */}
              <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full border border-emerald-500/10 pointer-events-none" />
              <div className="absolute -top-6 -left-6 w-32 h-32 rounded-full border border-emerald-500/5 pointer-events-none" />

              {/* Faded Large Title Background */}
              <div className="absolute top-16 left-8 text-neutral-800/10 text-6xl font-black font-sans uppercase tracking-tight select-none pointer-events-none max-w-xs leading-none">
                Shop Sphere
              </div>

              {/* Absolute Positioned Image Mock on the Right */}
              <div className="absolute top-20 right-[-30px] w-[260px] h-[260px] pointer-events-none opacity-40 select-none">
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80"
                  alt="Headphones Mockup representation"
                  className="w-full h-full object-cover rounded-full"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-neutral-900/80 to-neutral-950/90 rounded-full" />
              </div>

              {/* Spacer */}
              <div className="h-20" />

              {/* Project description card layout at bottom */}
              <div className="space-y-4 relative">
                <div className="flex items-center space-x-1">
                  <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                    FEATURED
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-sans font-extrabold text-white flex items-center space-x-2">
                    <span>ShopSphere Engine</span>
                    <span className="text-lg text-neutral-500 inline-block">↗</span>
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed font-sans max-w-md">
                    A high-performance headless e-commerce system featuring real-time checkout flows, secure stripe validation, inventory controls, and detailed admin metrics.
                  </p>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="px-3 py-1 bg-sky-500/10 border border-sky-500/20 text-sky-400 rounded-full text-[10px] font-mono font-bold uppercase">React</span>
                  <span className="px-3 py-1 bg-red-500/10 border border-red-500/20 text-red-400 rounded-full text-[10px] font-mono font-bold uppercase">Redis</span>
                  <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full text-[10px] font-mono font-bold uppercase">Stripe</span>
                </div>
              </div>
            </div>

            {/* 2. Hovered (Real Project + Details) State Layer */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out z-20 flex flex-col justify-between p-8">
              {/* Real Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 scale-110 group-hover:scale-100" 
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80')` }}
              />
              {/* Premium Website Theme Glassmorphic Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-[#0d0a1a]/95 to-neutral-950/90 pointer-events-none" />

              {/* Header */}
              <div className="flex justify-between items-center z-10 font-mono text-[9px] text-indigo-400 select-none">
                <span>SYSTEM ACTIVE</span>
                <span className="px-2 py-0.5 bg-indigo-500/10 border border-indigo-500/20 rounded">01</span>
              </div>

              {/* Content */}
              <div className="space-y-4 z-10 text-left">
                <div className="space-y-1">
                  <h3 className="text-2xl font-sans font-extrabold text-white flex items-center space-x-1.5">
                    <span>ShopSphere Engine</span>
                    <span className="text-xl text-indigo-400 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
                  </h3>
                  <p className="text-xs text-indigo-300 font-sans font-medium">Headless storefront with secure Stripe checkouts</p>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                  High-performance e-commerce engine equipped with client checkout pipelines, backend inventory controllers, and analytics dashboards.
                </p>

                {/* Custom capsule-shaped technology pills */}
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="px-3.5 py-1.5 rounded-full border border-sky-500/20 bg-sky-500/5 text-sky-400 text-xs font-sans font-bold tracking-wide">React</span>
                  <span className="px-3.5 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/5 text-purple-400 text-xs font-sans font-bold tracking-wide">Redis</span>
                  <span className="px-3.5 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-xs font-sans font-bold tracking-wide">Stripe</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* COLUMN 2: Stack of 2 Smaller Projects - lg:col-span-4 */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* BentoPort Creator (Air Pods Max Card Vibe) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -4 }}
              onClick={() => handleCardClick('bentoport')}
              className="bg-[#111111] border border-neutral-850/60 hover:border-[#818cf8]/30 rounded-3xl h-[247px] transition-all duration-500 shadow-xl group cursor-pointer relative overflow-hidden"
            >
              {/* 1. Default Mockup State Layer */}
              <div className="absolute inset-0 flex flex-col justify-between p-6 transition-all duration-500 group-hover:opacity-0 group-hover:scale-95 group-hover:pointer-events-none z-10">
                {/* Device Header representation */}
                <div className="flex items-center justify-between text-neutral-600 font-mono text-[9px] select-none">
                  <span className="font-extrabold text-neutral-400">BENTOPORT</span>
                  <div className="flex space-x-2.5">
                    <span>LINKS</span>
                    <span>·</span>
                    <span>THEMES</span>
                    <span>·</span>
                    <span>ANALYTICS</span>
                  </div>
                </div>

                {/* Minimalist Graphic Asset Mock */}
                <div className="my-2 flex justify-center relative">
                  <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-3 flex items-center space-x-3 w-[80%] shadow-lg">
                    <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                      <Smartphone className="w-4 h-4 text-indigo-400" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="h-1.5 w-16 bg-neutral-700 rounded-full" />
                      <div className="h-1 w-24 bg-neutral-800 rounded-full" />
                    </div>
                    <div className="h-2 w-8 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[8px] font-mono rounded flex items-center justify-center font-bold px-1 select-none">
                      ACTIVE
                    </div>
                  </div>
                </div>

                {/* Title & Description */}
                <div className="space-y-1">
                  <h3 className="text-base font-sans font-extrabold text-white flex items-center justify-between">
                    <span>BentoPort Creator</span>
                    <span className="text-xs text-neutral-500">↗</span>
                  </h3>
                  <p className="text-[11px] text-neutral-400 leading-tight">
                    Drag-and-drop link portfolios styled like gorgeous bento-grid layouts with real-time visitor reporting.
                  </p>
                </div>
              </div>

              {/* 2. Hovered (Real Project + Details) State Layer */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out z-20 flex flex-col justify-between p-6">
                {/* Real Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 scale-110 group-hover:scale-100" 
                  style={{ backgroundImage: `url('https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80')` }}
                />
                {/* Premium Website Theme Glassmorphic Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-[#0d0a1a]/95 to-neutral-950/90 pointer-events-none" />

                {/* Header */}
                <div className="flex justify-between items-center z-10 font-mono text-[9px] text-indigo-400 select-none">
                  <span>SYSTEM ACTIVE</span>
                  <span className="px-2 py-0.5 bg-indigo-500/10 border border-indigo-500/20 rounded">02</span>
                </div>

                {/* Content */}
                <div className="space-y-3 z-10 text-left">
                  <div className="space-y-0.5">
                    <h3 className="text-lg font-sans font-extrabold text-white flex items-center space-x-1.5">
                      <span>BentoPort Creator</span>
                      <span className="text-base text-indigo-400 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
                    </h3>
                    <p className="text-[11px] text-indigo-300 font-sans font-medium">Interactive drag-and-drop bio-links builder</p>
                  </div>
                  <p className="text-[11px] text-neutral-400 leading-normal font-sans">
                    Interactive dashboard where users arrange social link blocks, active media slots, and custom templates with visual analytics tracking.
                  </p>

                  {/* Custom capsule-shaped technology pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="px-3 py-1 rounded-full border border-sky-500/20 bg-sky-500/5 text-sky-400 text-[10px] font-sans font-bold tracking-wide">React</span>
                    <span className="px-3 py-1 rounded-full border border-teal-500/20 bg-teal-500/5 text-teal-400 text-[10px] font-sans font-bold tracking-wide">Tailwind</span>
                    <span className="px-3 py-1 rounded-full border border-purple-500/20 bg-purple-500/5 text-purple-400 text-[10px] font-sans font-bold tracking-wide">Framer</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* QuantumCrypt PDF Search (Minimalist Car/Clean Card Vibe) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -4 }}
              onClick={() => handleCardClick('quantumcrypt')}
              className="bg-white text-neutral-900 rounded-3xl h-[247px] transition-all duration-500 shadow-xl group cursor-pointer relative overflow-hidden border border-neutral-200"
            >
              {/* 1. Default Mockup State Layer */}
              <div className="absolute inset-0 flex flex-col justify-between p-6 transition-all duration-500 group-hover:opacity-0 group-hover:scale-95 group-hover:pointer-events-none z-10">
                {/* Top Meta Tag */}
                <div className="flex items-center justify-between text-neutral-400 font-mono text-[9px] select-none">
                  <span className="font-extrabold text-neutral-500 uppercase tracking-widest">AI DOCUMENT INTELLIGENCE</span>
                  <span className="font-bold text-neutral-600">01.00</span>
                </div>

                {/* Vector Document Scanner Mock */}
                <div className="my-2 flex justify-center">
                  <div className="bg-neutral-50 rounded-xl p-3 border border-neutral-100 flex items-center justify-between w-[90%] shadow-sm">
                    <div className="flex items-center space-x-2">
                      <Search className="w-4 h-4 text-indigo-500" />
                      <span className="text-[10px] font-mono text-neutral-400">vector_embeddings.db</span>
                    </div>
                    <div className="flex space-x-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-300" />
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-100" />
                    </div>
                  </div>
                </div>

                {/* Title & Description */}
                <div className="space-y-1">
                  <h3 className="text-base font-sans font-extrabold text-neutral-900 flex items-center justify-between">
                    <span>QuantumCrypt Search</span>
                    <span className="text-xs text-neutral-500">↗</span>
                  </h3>
                  <p className="text-[11px] text-neutral-600 leading-tight">
                    Semantic intelligence indexing unstructured PDF records with pgvector databases & FastAPI pipelines.
                  </p>
                </div>
              </div>

              {/* 2. Hovered (Real Project + Details) State Layer */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out z-20 flex flex-col justify-between p-6">
                {/* Real Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 scale-110 group-hover:scale-100" 
                  style={{ backgroundImage: `url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80')` }}
                />
                {/* Premium Website Theme Glassmorphic Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-[#0d0a1a]/95 to-neutral-950/90 pointer-events-none" />

                {/* Header */}
                <div className="flex justify-between items-center z-10 font-mono text-[9px] text-indigo-400 select-none">
                  <span>SYSTEM ACTIVE</span>
                  <span className="px-2 py-0.5 bg-indigo-500/10 border border-indigo-500/20 rounded">03</span>
                </div>

                {/* Content */}
                <div className="space-y-3 z-10 text-left">
                  <div className="space-y-0.5">
                    <h3 className="text-lg font-sans font-extrabold text-white flex items-center space-x-1.5">
                      <span>QuantumCrypt Search</span>
                      <span className="text-base text-indigo-400 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
                    </h3>
                    <p className="text-[11px] text-indigo-300 font-sans font-medium">AI Document Intelligence & Vector Search</p>
                  </div>
                  <p className="text-[11px] text-neutral-400 leading-normal font-sans">
                    Ingests and indexes unstructured PDFs using Gemini embeddings and pgvector database, with grounded chat citation maps.
                  </p>

                  {/* Custom capsule-shaped technology pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="px-3 py-1 rounded-full border border-sky-500/20 bg-sky-500/5 text-sky-400 text-[10px] font-sans font-bold tracking-wide">FastAPI</span>
                    <span className="px-3 py-1 rounded-full border border-orange-500/20 bg-orange-500/5 text-orange-400 text-[10px] font-sans font-bold tracking-wide">Gemini API</span>
                    <span className="px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-400 text-[10px] font-sans font-bold tracking-wide">Docker</span>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>

          {/* COLUMN 3: Right Tall Mobile/Dashboard Layout (DevFlow Workspace) - lg:col-span-3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ y: -4 }}
            onClick={() => handleCardClick('devflow')}
            className="lg:col-span-3 relative overflow-hidden rounded-3xl bg-neutral-900/40 hover:border-[#818cf8]/30 border border-neutral-850/60 p-6 flex flex-col justify-between h-[520px] transition-all duration-500 shadow-2xl group cursor-pointer"
          >
            {/* 1. Default Mockup State Layer */}
            <div className="absolute inset-0 flex flex-col justify-between p-6 transition-all duration-500 group-hover:opacity-0 group-hover:scale-95 group-hover:pointer-events-none z-10">
              {/* Simulated UI calendar header as in reference */}
              <div className="space-y-4">
                <div className="flex justify-between items-center select-none">
                  <span className="text-[9px] font-mono text-indigo-400 font-extrabold tracking-widest uppercase">WORKSPACE_GRID</span>
                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                </div>

                {/* Sleek calendar selector widgets */}
                <div className="grid grid-cols-2 gap-2 text-center text-xs select-none">
                  <div className="bg-neutral-950 border border-neutral-800 p-2.5 rounded-xl space-y-1">
                    <p className="text-[8px] font-mono text-neutral-500 font-bold uppercase">TUE</p>
                    <p className="text-sm font-sans font-extrabold text-neutral-200">12</p>
                    <p className="text-[8px] font-mono text-neutral-500">MAY</p>
                  </div>
                  <div className="bg-indigo-950/20 border border-indigo-500/20 p-2.5 rounded-xl space-y-1 shadow-inner relative">
                    <p className="text-[8px] font-mono text-indigo-400 font-bold uppercase">WED</p>
                    <p className="text-sm font-sans font-extrabold text-indigo-300">13</p>
                    <p className="text-[8px] font-mono text-indigo-400">MAY</p>
                  </div>
                </div>

                {/* Floating Task Item widgets resembling the image's modular UI cells */}
                <div className="space-y-2.5 select-none">
                  <div className="bg-neutral-950/80 border border-neutral-900 p-3 rounded-xl flex items-center justify-between shadow-sm">
                    <div className="flex items-center space-x-2.5">
                      <CheckSquare className="w-4 h-4 text-emerald-400" />
                      <span className="text-[10px] font-sans text-neutral-300">SaaS Sync Logic</span>
                    </div>
                    <span className="text-[8px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded uppercase font-bold">DONE</span>
                  </div>

                  <div className="bg-neutral-950/80 border border-neutral-900 p-3 rounded-xl flex items-center justify-between shadow-sm relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-indigo-500" />
                    <div className="flex items-center space-x-2.5">
                      <Calendar className="w-4 h-4 text-indigo-400" />
                      <span className="text-[10px] font-sans text-neutral-300">API Speed Optimization</span>
                    </div>
                    <span className="text-[8px] font-mono text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded uppercase font-bold">ACTIVE</span>
                  </div>

                  <div className="bg-neutral-950/80 border border-neutral-900 p-3 rounded-xl flex items-center justify-between shadow-sm">
                    <div className="flex items-center space-x-2.5 opacity-60">
                      <CheckSquare className="w-4 h-4 text-neutral-600" />
                      <span className="text-[10px] font-sans text-neutral-500">Containerize Services</span>
                    </div>
                    <span className="text-[8px] font-mono text-neutral-600 uppercase font-bold">BACKLOG</span>
                  </div>
                </div>
              </div>

              {/* Bottom details block */}
              <div className="space-y-3 relative">
                <h3 className="text-lg font-sans font-extrabold text-white flex items-center justify-between">
                  <span>DevFlow Workspace</span>
                  <span className="text-xs text-neutral-500">↗</span>
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                  A multi-module SaaS developer ecosystem featuring live collaborative Kanban, synchronized notes, and sprint workload tracking.
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="px-2 py-0.5 bg-neutral-950 border border-neutral-900 text-neutral-400 rounded-md text-[8px] font-mono">React</span>
                  <span className="px-2 py-0.5 bg-neutral-950 border border-neutral-900 text-neutral-400 rounded-md text-[8px] font-mono">Node.js</span>
                  <span className="px-2 py-0.5 bg-neutral-950 border border-neutral-900 text-neutral-400 rounded-md text-[8px] font-mono">Socket.io</span>
                </div>
              </div>
            </div>

            {/* 2. Hovered (Real Project + Details) State Layer */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out z-20 flex flex-col justify-between p-6">
              {/* Real Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 scale-110 group-hover:scale-100" 
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&w=800&q=80')` }}
              />
              {/* Premium Website Theme Glassmorphic Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-[#0d0a1a]/95 to-neutral-950/90 pointer-events-none" />

              {/* Header */}
              <div className="flex justify-between items-center z-10 font-mono text-[9px] text-indigo-400 select-none">
                <span>SYSTEM ACTIVE</span>
                <span className="px-2 py-0.5 bg-indigo-500/10 border border-indigo-500/20 rounded">04</span>
              </div>

              {/* Content */}
              <div className="space-y-4 z-10 text-left">
                <div className="space-y-1">
                  <h3 className="text-2xl font-sans font-extrabold text-white flex items-center space-x-1.5">
                    <span>DevFlow Workspace</span>
                    <span className="text-xl text-indigo-400 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
                  </h3>
                  <p className="text-xs text-indigo-300 font-sans font-medium">Real-Time SaaS Agile Collaboration Platform</p>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                  Fully modular digital team workspace containing server-authoritative kanban board syncs, collaborative markdown documentation grids, and team dashboard tracking.
                </p>

                {/* Custom capsule-shaped technology pills */}
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="px-3.5 py-1.5 rounded-full border border-sky-500/20 bg-sky-500/5 text-sky-400 text-xs font-sans font-bold tracking-wide">React</span>
                  <span className="px-3.5 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-xs font-sans font-bold tracking-wide">Node.js</span>
                  <span className="px-3.5 py-1.5 rounded-full border border-pink-500/20 bg-pink-500/5 text-pink-400 text-xs font-sans font-bold tracking-wide">Socket.io</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Dynamic Extra Projects added in Admin Panel */}
        {displayProjects.filter(p => !['shopsphere', 'devflow', 'quantumcrypt', 'bentoport'].includes(p.id)).length > 0 && (
          <div className="mt-16 space-y-8 select-text">
            <div className="flex items-center space-x-4">
              <h3 className="text-base font-sans font-extrabold text-indigo-400 uppercase tracking-widest">ADDITIONAL PROJECTS</h3>
              <div className="flex-1 h-[1px] bg-neutral-950/20" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayProjects.filter(p => !['shopsphere', 'devflow', 'quantumcrypt', 'bentoport'].includes(p.id)).map((proj, idx) => (
                <motion.div
                  key={proj.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -4 }}
                  onClick={() => setSelectedProject(proj)}
                  className="bg-neutral-900/40 hover:bg-neutral-900/80 border border-neutral-850/60 hover:border-indigo-500/30 rounded-3xl p-6 flex flex-col justify-between h-[340px] transition-all duration-300 shadow-lg cursor-pointer group relative overflow-hidden"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded font-bold uppercase">
                        {proj.category}
                      </span>
                      <span className="text-xs text-neutral-500">↗</span>
                    </div>

                    <div className="space-y-1.5">
                      <h4 className="text-base font-sans font-extrabold text-white group-hover:text-indigo-400 transition-colors">
                        {proj.title}
                      </h4>
                      <p className="text-xs text-neutral-400 leading-relaxed font-sans line-clamp-3">
                        {proj.description}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-1.5">
                      {proj.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="px-2.5 py-1 rounded-full border border-neutral-800 bg-neutral-950 text-neutral-400 text-[9px] font-sans font-bold">
                          {tag}
                        </span>
                      ))}
                      {proj.tags.length > 3 && (
                        <span className="text-[9px] text-neutral-500 font-bold self-center">+{proj.tags.length - 3} more</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Detailed Modal/Drawer overlay when card is clicked */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-neutral-950/80 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3 }}
                className="relative w-full max-w-3xl bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 p-2 bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-white rounded-xl transition-all shadow-sm z-10"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Header */}
                <div className="space-y-4">
                  <span className="font-mono text-[9px] text-indigo-400 font-bold uppercase tracking-widest px-2.5 py-1 bg-indigo-500/10 rounded-lg border border-indigo-500/20 w-max block">
                    {selectedProject.category}
                  </span>
                  <div>
                    <h3 className="text-2xl md:text-4xl font-sans font-extrabold text-white tracking-tight">
                      {selectedProject.title}
                    </h3>
                    <p className="text-xs font-mono text-indigo-400">{selectedProject.subtitle}</p>
                  </div>
                </div>

                {/* Body Content */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-8">
                  <div className="md:col-span-8 space-y-6">
                    {/* Deep explanation */}
                    <div className="space-y-2">
                      <h4 className="font-sans font-bold text-sm text-neutral-200">Architectural Summary</h4>
                      <p className="text-xs text-neutral-400 leading-relaxed">
                        {selectedProject.longDescription || selectedProject.description}
                      </p>
                    </div>

                    {/* Features list */}
                    <div className="space-y-3">
                      <h4 className="font-sans font-bold text-sm text-neutral-200 flex items-center space-x-1.5">
                        <ListCollapse className="w-4 h-4 text-indigo-400" />
                        <span>Core Features & Implementation</span>
                      </h4>
                      <ul className="space-y-2 pl-2 border-l-2 border-neutral-800">
                        {selectedProject.features.map((feat) => (
                          <li key={feat} className="text-xs text-neutral-400 leading-relaxed flex items-start space-x-2">
                            <span className="text-indigo-400 font-mono mt-0.5">▪</span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Metrics and metadata */}
                  <div className="md:col-span-4 space-y-6 bg-neutral-950/60 p-5 rounded-2xl border border-neutral-850 self-start">
                    {/* Visual metrics list */}
                    {selectedProject.metrics && (
                      <div className="space-y-4">
                        <h4 className="font-sans font-bold text-xs text-neutral-200 flex items-center space-x-1.5 uppercase tracking-wider">
                          <BarChart3 className="w-4 h-4 text-indigo-400" />
                          <span>System Metrics</span>
                        </h4>
                        <div className="space-y-3 font-mono text-[10px]">
                          {selectedProject.metrics.map((metric) => (
                            <div key={metric.label} className="border-b border-neutral-900 pb-2">
                              <p className="text-neutral-500 uppercase">{metric.label}</p>
                              <p className="text-neutral-200 font-bold text-xs mt-0.5">{metric.value}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action Triggers */}
                    <div className="space-y-2 pt-2">
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-2.5 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-800 hover:border-neutral-700 font-mono text-[11px] font-semibold flex items-center justify-center space-x-2 shadow-sm transition-all"
                      >
                        <Github className="w-4 h-4" />
                        <span>Source Code</span>
                      </a>
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-[11px] font-semibold flex items-center justify-center space-x-2 shadow-sm transition-all"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Live Demo</span>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
