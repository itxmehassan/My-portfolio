import React from 'react';
import { motion } from 'motion/react';
import { 
  Code2, 
  Globe, 
  Palette, 
  FileCode, 
  Flame, 
  Cpu, 
  GitBranch, 
  Layout, 
  Boxes, 
  Gauge, 
  Monitor, 
  Smartphone, 
  Terminal, 
  Layers, 
  Bug 
} from 'lucide-react';

import { Skill } from '../types';
import { SKILLS } from '../data';

interface SkillsProps {
  skills?: Skill[];
}

export default function Skills({ skills }: SkillsProps) {
  const displaySkills = skills || SKILLS;

  const getIconForSkill = (name: string, category: string) => {
    const lowercaseName = name.toLowerCase();
    if (lowercaseName.includes('react') || lowercaseName.includes('next')) {
      return { icon: <Code2 className="w-4 h-4 text-sky-400" />, bgClass: 'bg-sky-500/10 border-sky-500/20' };
    }
    if (lowercaseName.includes('js') || lowercaseName.includes('javascript') || lowercaseName.includes('ts') || lowercaseName.includes('typescript')) {
      return { icon: <Globe className="w-4 h-4 text-amber-400" />, bgClass: 'bg-amber-500/10 border-amber-500/20' };
    }
    if (lowercaseName.includes('tailwind') || lowercaseName.includes('css') || lowercaseName.includes('html')) {
      return { icon: <Palette className="w-4 h-4 text-teal-400" />, bgClass: 'bg-teal-500/10 border-teal-500/20' };
    }
    if (lowercaseName.includes('firebase') || lowercaseName.includes('firestore')) {
      return { icon: <Flame className="w-4 h-4 text-orange-400" />, bgClass: 'bg-orange-500/10 border-orange-500/20' };
    }
    if (lowercaseName.includes('node') || lowercaseName.includes('express')) {
      return { icon: <Cpu className="w-4 h-4 text-emerald-400" />, bgClass: 'bg-emerald-500/10 border-emerald-500/20' };
    }
    if (lowercaseName.includes('git') || lowercaseName.includes('github')) {
      return { icon: <GitBranch className="w-4 h-4 text-purple-400" />, bgClass: 'bg-purple-500/10 border-purple-500/20' };
    }
    if (lowercaseName.includes('python') || lowercaseName.includes('fastapi')) {
      return { icon: <Terminal className="w-4 h-4 text-neutral-400" />, bgClass: 'bg-neutral-500/10 border-neutral-500/20' };
    }
    
    // Fallbacks based on category
    if (category === 'frontend') {
      return { icon: <Layout className="w-4 h-4 text-blue-400" />, bgClass: 'bg-blue-500/10 border-blue-500/20' };
    }
    if (category === 'backend') {
      return { icon: <Cpu className="w-4 h-4 text-emerald-400" />, bgClass: 'bg-emerald-500/10 border-emerald-500/20' };
    }
    if (category === 'database') {
      return { icon: <Layers className="w-4 h-4 text-rose-400" />, bgClass: 'bg-rose-500/10 border-rose-500/20' };
    }
    return { icon: <Boxes className="w-4 h-4 text-teal-400" />, bgClass: 'bg-teal-500/10 border-teal-500/20' };
  };

  return (
    <section id="skills" className="py-24 bg-neutral-950 border-t border-neutral-900 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Centered Section Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-sans font-extrabold text-white tracking-tight">
            Creative & <span className="text-indigo-400">Tech Stack</span>
          </h2>
          <div className="h-[3px] w-24 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
        </div>

        {/* Dynamic Skills Grid */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {displaySkills.map((item, idx) => {
              const { icon, bgClass } = getIconForSkill(item.name, item.category);
              return (
                <motion.div
                  key={item.name + idx}
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.04 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="bg-neutral-900/40 hover:bg-neutral-900/80 border border-neutral-850/60 hover:border-neutral-800 rounded-xl p-3.5 flex flex-col items-center justify-center text-center transition-all duration-300 shadow-md group relative overflow-hidden cursor-pointer"
                >
                  {/* Soft glow background item */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/[0.01] to-transparent pointer-events-none" />

                  {/* Icon Container */}
                  <div className={`p-1.5 rounded-lg border ${bgClass} shadow-sm group-hover:scale-110 transition-transform duration-300 mb-2.5`}>
                    {icon}
                  </div>

                  {/* Title & Subtitle */}
                  <div className="space-y-0.5">
                    <h3 className="text-xs font-sans font-extrabold text-neutral-200 group-hover:text-white tracking-tight leading-tight transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-[9px] font-mono text-neutral-500 tracking-wider uppercase font-semibold">
                      {item.category}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
