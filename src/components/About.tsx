import { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Code2, Smartphone, Gauge, Palette, Download, FileText } from 'lucide-react';
import { PERSONAL_INFO } from '../data';

interface AboutProps {
  personalInfo?: any;
}

export default function About({ personalInfo }: AboutProps) {
  const [downloading, setDownloading] = useState(false);
  const info = personalInfo || PERSONAL_INFO;

  const handleDownloadCV = () => {
    setDownloading(true);
    // Create a mock resume download
    const docContent = `
=========================================
${info.name.toUpperCase()} - ${info.title.toUpperCase()}
=========================================
Email: ${info.email}
GitHub: ${info.github}
LinkedIn: ${info.linkedin}
Location: ${info.location}

SUMMARY:
${info.bio}
=========================================
`;
    const blob = new Blob([docContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'hassan_mehdi_resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    setTimeout(() => {
      setDownloading(false);
    }, 1000);
  };

  const pillars = [
    {
      title: 'React & Frontend Architecture',
      description: 'Building highly modular, component-driven applications with clean state management and fluid micro-interactions.',
      icon: <Code2 className="w-5 h-5 text-indigo-400" />,
      bgIcon: 'bg-indigo-500/10 border-indigo-500/20',
    },
    {
      title: 'Responsive Layouts',
      description: 'Ensuring perfectly fluid, adaptive viewport responsiveness across mobile, tablet, and ultra-wide screens.',
      icon: <Smartphone className="w-5 h-5 text-emerald-400" />,
      bgIcon: 'bg-emerald-500/10 border-emerald-500/20',
    },
    {
      title: 'Backend Performance',
      description: 'Architecting fast Express microservices, relational schemas, Redis caching, and robust type safety.',
      icon: <Gauge className="w-5 h-5 text-amber-400" />,
      bgIcon: 'bg-amber-500/10 border-amber-500/20',
    },
    {
      title: 'Modern Interfaces',
      description: 'Fusing clean typography with purposeful layout transitions, spacing hierarchies, and responsive visual design.',
      icon: <Palette className="w-5 h-5 text-purple-400" />,
      bgIcon: 'bg-purple-500/10 border-purple-500/20',
    },
  ];

  return (
    <section id="about" className="py-24 bg-neutral-950 border-t border-neutral-900 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column - Polaroid & Availability Button */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {/* The Polaroid Picture Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, rotate: -6 }}
              whileInView={{ opacity: 1, scale: 1, rotate: -3 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ rotate: 0, scale: 1.02 }}
              className="relative bg-stone-100 p-4 pb-12 rounded-3xl shadow-2xl border border-stone-200/90 text-stone-800 max-w-[280px] md:max-w-[310px] w-full cursor-pointer group"
            >
              {/* Top gray duct tape simulation */}
              <div 
                className="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-7 bg-neutral-600/30 backdrop-blur-[2px] rounded-sm border border-neutral-500/10 shadow-sm z-20 mix-blend-multiply"
                style={{ transform: 'rotate(1deg)' }}
              />

              {/* Picture Inner Canvas */}
              <div className="aspect-[4/5] overflow-hidden rounded-[1rem] border border-stone-200 bg-stone-200 relative">
                <img
                  src={info.polaroidUrl || "/src/assets/images/hassan_polaroid_portrait_1782736124384.jpg"}
                  alt={`${info.name} Polaroid Portrait`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              {/* Polaroid Signature/Caption Label */}
              <div className="mt-5 text-center font-sans select-text">
                <p className="font-extrabold text-xs tracking-wide text-stone-700">
                  {info.name} - {info.title}
                </p>
              </div>
            </motion.div>

            {/* Availability Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8"
            >
              <div className="inline-flex items-center space-x-2 bg-neutral-900 border border-neutral-800 px-5 py-2.5 rounded-full shadow-lg">
                <span className="text-xs font-mono font-bold tracking-wide uppercase text-neutral-300">
                  {info.availability ? info.availability.toUpperCase() : 'AVAILABLE FOR HIRE'}
                </span>
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              </div>
            </motion.div>
          </div>

          {/* Right Column - Heading, Bio, Services Cards Grid & Download action */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Header with horizontal divider and sparkle icon */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-4xl md:text-5xl font-sans font-extrabold text-white tracking-tight">
                  ABOUT <span className="text-indigo-400">ME</span>
                </h2>
                <div className="flex-1 h-[1px] bg-neutral-800 ml-6 mr-4 self-center hidden sm:block" />
                <Sparkles className="w-5 h-5 text-indigo-400 hidden sm:block animate-pulse" />
              </div>

              <p className="text-sm text-neutral-400 leading-relaxed font-sans max-w-2xl select-text">
                {info.bio}
              </p>
            </div>

            {/* Grid of 4 modular pillars */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pillars.map((pillar, idx) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-neutral-900/40 hover:bg-neutral-900/80 border border-neutral-850 rounded-[2rem] p-6 flex flex-col space-y-4 transition-all duration-300 shadow-md group"
                >
                  <div className={`p-2.5 w-max rounded-xl border ${pillar.bgIcon} shadow-sm group-hover:scale-105 transition-transform`}>
                    {pillar.icon}
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-sm font-sans font-extrabold text-neutral-200">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                      {pillar.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA action button wrapper */}
            <div className="pt-2">
              <button
                onClick={handleDownloadCV}
                disabled={downloading}
                className="bg-[#0e1f17] hover:bg-[#153023] border border-[#163526] text-emerald-400 font-sans text-xs font-bold px-6 py-3.5 rounded-full flex items-center space-x-2 transition-all duration-300 shadow active:scale-95 cursor-pointer disabled:opacity-50"
              >
                {downloading ? (
                  <>
                    <FileText className="w-4 h-4 animate-bounce" />
                    <span>Preparing Document...</span>
                  </>
                ) : (
                  <>
                    <span>Download CV</span>
                    <Download className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
