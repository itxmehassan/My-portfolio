import { useState } from 'react';
import { motion } from 'motion/react';
import { Briefcase, MapPin, Calendar, ArrowRight, BookOpen } from 'lucide-react';
import { Experience as ExpType } from '../types';
import { EXPERIENCES } from '../data';

interface ExperienceProps {
  experiences?: ExpType[];
}

export default function Experience({ experiences }: ExperienceProps) {
  const [hoveredExp, setHoveredExp] = useState<string | null>(null);
  const displayExperiences = experiences || EXPERIENCES;

  return (
    <section id="experience" className="py-24 bg-neutral-950 border-t border-neutral-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Centered Section Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-sans font-extrabold text-white tracking-tight">
            Professional <span className="text-indigo-400">Experience</span>
          </h2>
          <div className="h-[3px] w-24 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
        </div>

        {/* Experience Cards Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto py-4">
          {displayExperiences.map((exp, idx) => {
            const isHovered = hoveredExp === exp.id;
            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onMouseEnter={() => setHoveredExp(exp.id)}
                onMouseLeave={() => setHoveredExp(null)}
                className="relative group h-full"
              >
                {/* Main Card */}
                <div className="p-5 md:p-6 rounded-2xl bg-neutral-900/40 hover:bg-neutral-900/80 border border-neutral-850/60 hover:border-indigo-500/20 shadow-md transition-all duration-300 space-y-4 h-full flex flex-col justify-between">
                  <div className="space-y-3">
                    {/* Title & Metadata */}
                    <div className="flex flex-col gap-1.5">
                      <div>
                        <h3 className="text-base md:text-lg font-sans font-bold text-white group-hover:text-indigo-400 transition-colors">
                          {exp.role}
                        </h3>
                        <p className="text-xs font-sans font-semibold text-neutral-300 mt-0.5">{exp.company}</p>
                      </div>

                      <div className="flex flex-wrap gap-x-3 gap-y-1 text-[10px] font-mono text-neutral-500 pt-0.5">
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3 text-indigo-400" />
                          <span>{exp.period}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3 text-rose-400" />
                          <span>{exp.location}</span>
                        </span>
                      </div>
                    </div>

                    {/* Bullet description */}
                    <ul className="space-y-1.5 pt-1.5">
                      {exp.description.map((bullet, bIdx) => (
                        <li key={bIdx} className="text-[11px] text-neutral-400 leading-normal flex items-start space-x-1.5">
                          <span className="text-indigo-400 font-mono mt-0.5">▪</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies tags capsule list */}
                  <div className="flex flex-wrap gap-1 pt-2.5 border-t border-neutral-950">
                    {exp.skillsUsed.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 bg-neutral-950/60 border border-neutral-900 rounded-md font-mono text-[9px] text-indigo-300/80"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Education addition */}
        <div className="mt-16 max-w-5xl mx-auto bg-neutral-900/30 border border-neutral-850/60 rounded-3xl p-6 md:p-8 space-y-6">
          <h3 className="font-sans font-bold text-sm text-neutral-200 uppercase tracking-wider flex items-center space-x-2">
            <BookOpen className="w-4 h-4 text-indigo-400" />
            <span>Academic Background</span>
          </h3>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <p className="text-sm font-sans font-bold text-white">B.S. in Computer Science</p>
              <p className="text-xs text-neutral-400 mt-0.5">The University of South Asia at Lahore</p>
            </div>
            <div className="flex items-center space-x-2 font-mono text-xs text-neutral-500">
              <Calendar className="w-3.5 h-3.5 text-indigo-400" />
              <span>Graduated 2026</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
