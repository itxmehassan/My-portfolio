import { useEffect, useRef, useState } from 'react';
import { Code, Github, MessageSquare, Terminal, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { PERSONAL_INFO } from '../data';

interface HeroProps {
  personalInfo?: any;
  onExploreProjects: () => void;
  onContact: () => void;
}

export default function Hero({ personalInfo, onExploreProjects, onContact }: HeroProps) {
  const info = personalInfo || PERSONAL_INFO;
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [typedText, setTypedText] = useState('');
  const fullText = `const developer = new FullStackDeveloper("${info.name}");`;

  // Canvas nodes effect with ResizeObserver
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: entryWidth, height: entryHeight } = entry.contentRect;
        width = entryWidth;
        height = entryHeight;
        canvas.width = entryWidth;
        canvas.height = entryHeight;
      }
    });

    resizeObserver.observe(container);

    // Node setup
    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }

    const nodes: Node[] = [];
    const nodeCount = 50;

    const createNodes = () => {
      nodes.length = 0;
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * (width || window.innerWidth),
          y: Math.random() * (height || window.innerHeight),
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 2 + 1,
        });
      }
    };

    // Keep track of mouse coords
    let mouseX = -9999;
    let mouseY = -9999;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    createNodes();

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Create a nice deep gradient background
      ctx.fillStyle = 'rgba(10, 10, 10, 1)';
      ctx.fillRect(0, 0, width, height);

      // Draw lines & nodes
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.08)';
      ctx.lineWidth = 1;

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        
        // Update positions
        n.x += n.vx;
        n.y += n.vy;

        // Bounce walls
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        // Interaction with mouse
        let force = 1.0;
        if (mouseX !== -9999 && mouseY !== -9999) {
          const dx = mouseX - n.x;
          const dy = mouseY - n.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            force = (150 - dist) / 150;
            // Gently pull toward mouse
            n.x += (dx / dist) * force * 0.8;
            n.y += (dy / dist) * force * 0.8;
          }
        }

        // Draw nodes
        ctx.fillStyle = `rgba(129, 140, 248, ${0.15 + force * 0.35})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius + force * 1, 0, Math.PI * 2);
        ctx.fill();

        // Connect nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n.x - n2.x;
          const dy = n.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            const alpha = (120 - dist) / 120 * 0.15;
            ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  // Simple typing effect for terminal
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) {
        clearInterval(interval);
      }
    }, 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-24 select-none"
    >
      {/* Interactive canvas backdrop */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-neutral-950/40 to-neutral-950 z-0 pointer-events-none" />

      {/* Hero content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
        <div className="lg:col-span-7 flex flex-col items-start space-y-6">
          {/* Headline */}
          <div className="space-y-2">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-5xl md:text-7xl font-sans font-extrabold text-white tracking-tight leading-tight"
            >
              I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-500">{info.name}</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl text-neutral-300 font-medium tracking-tight"
            >
              {info.title}
            </motion.p>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-sm md:text-base text-neutral-400 max-w-xl leading-relaxed"
          >
            {info.bio}
          </motion.p>

          {/* Social connections & Actions */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-wrap items-center gap-4 pt-4"
          >
            <button
              onClick={onExploreProjects}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-semibold flex items-center space-x-2 shadow-lg shadow-indigo-600/20 active:scale-95 transition-all duration-300 group border border-indigo-500/20"
            >
              <span>Explore Projects</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={onContact}
              className="px-6 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-800 hover:border-neutral-700 font-mono text-xs font-semibold flex items-center space-x-2 active:scale-95 transition-all duration-300"
            >
              <MessageSquare className="w-4 h-4 text-indigo-400" />
              <span>Contact Me</span>
            </button>
          </motion.div>

          {/* External Social Profiles */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex items-center space-x-4 pt-2"
          >
            <a
              href={info.github}
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-850 rounded-lg text-neutral-400 hover:text-white transition-all duration-300"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <button
              onClick={onContact}
              className="p-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-850 rounded-lg text-neutral-400 hover:text-white transition-all duration-300 text-xs font-mono"
            >
              Contact
            </button>
          </motion.div>
        </div>

        {/* Visual Premium Picture Box Card mimicking the provided style */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="lg:col-span-5 w-full max-w-[340px] md:max-w-sm mx-auto lg:mx-0 aspect-[3/4] relative rounded-[2rem] border border-neutral-800 overflow-hidden shadow-2xl group select-none"
        >
          {/* Subtle phone notch/lens ring decoration at the top center */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border border-neutral-800/60 bg-neutral-950/40 flex items-center justify-center backdrop-blur-sm z-20">
            <div className="w-2.5 h-2.5 rounded-full bg-neutral-900 border border-neutral-800/80" />
          </div>

          {/* Profile headshot image */}
          <img
            src={info.avatarUrl || "/src/assets/images/hassan_portrait_1782733982217.jpg"}
            alt={`${info.name} Portrait`}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Dark atmospheric linear gradient overlay from bottom to transparent */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent z-10" />

          {/* Card footer details overlay */}
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 z-20 flex flex-col justify-end">
            <div className="space-y-1 select-text">
              <span className="font-sans font-bold text-[10px] tracking-widest text-neutral-400 uppercase">
                HELLO, I AM
              </span>
              <h3 className="text-3xl md:text-4xl font-sans font-extrabold text-white tracking-tight leading-none">
                {info.name}
              </h3>
              <p className="text-xs font-mono font-bold text-rose-400/95 tracking-wide lowercase">
                {info.title.toLowerCase()}
              </p>
            </div>

            {/* Bottom action bar inside card */}
            <div className="bg-neutral-900/60 backdrop-blur-md border border-neutral-800 p-3 rounded-[1.25rem] flex items-center justify-between mt-5 shadow-lg select-none">
              <span className="text-xs font-sans font-bold text-neutral-200">
                Contact me
              </span>
              <a
                href={`mailto:${info.email}`}
                className="bg-[#203129] hover:bg-[#2c4439] border border-[#2b4136] text-white text-[11px] font-bold px-4 py-2 rounded-xl transition-all duration-300 shadow active:scale-95 flex items-center"
              >
                <span>Email</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
