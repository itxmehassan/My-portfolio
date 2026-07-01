import { useState, useEffect } from 'react';
import { Menu, X, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

function TypewriterLogo() {
  const [displayText, setDisplayText] = useState('Code By Hassan');
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const target = isHovered ? 'Hassan Mehdi' : 'Code By Hassan';
    let current = displayText;
    let timer: NodeJS.Timeout;

    const tick = () => {
      if (current === target) return;

      if (!target.startsWith(current)) {
        current = current.slice(0, -1);
        setDisplayText(current);
        timer = setTimeout(tick, 35);
      } else {
        current = target.slice(0, current.length + 1);
        setDisplayText(current);
        timer = setTimeout(tick, 50);
      }
    };

    timer = setTimeout(tick, 40);
    return () => clearTimeout(timer);
  }, [isHovered, displayText]);

  return (
    <span
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative font-mono font-bold text-sm md:text-base tracking-tight select-none inline-block min-w-[140px] md:min-w-[160px] text-left cursor-pointer"
    >
      <span className="text-white">{displayText}</span>
      <span className="text-indigo-400 animate-pulse ml-0.5">|</span>
    </span>
  );
}

export default function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleItemClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <motion.nav
      id="navbar"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800/40 py-3 shadow-lg'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleItemClick('hero')}
          className="flex items-center text-white font-mono font-bold text-lg group tracking-tight"
        >
          <TypewriterLogo />
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`relative px-4 py-2 font-mono text-xs transition-colors duration-300 ${
                  isActive ? 'text-indigo-400' : 'text-neutral-400 hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-4 right-4 h-[2px] bg-indigo-500"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center space-x-2">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg bg-neutral-900/60 border border-neutral-800 text-neutral-400 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-neutral-950 border-b border-neutral-900 px-6 py-4 space-y-2 overflow-hidden shadow-2xl"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`w-full text-left py-3 px-4 rounded-lg font-mono text-xs flex items-center justify-between ${
                  activeSection === item.id
                    ? 'bg-neutral-900 text-indigo-400 font-semibold'
                    : 'text-neutral-400 hover:bg-neutral-900/40 hover:text-white'
                }`}
              >
                <span>{item.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
