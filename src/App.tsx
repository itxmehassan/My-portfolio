import { useState, useEffect } from 'react';
import { Lock } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import AdminPanel from './components/AdminPanel';
import { PERSONAL_INFO, PROJECTS, SKILLS, EXPERIENCES } from './data';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [portfolioData, setPortfolioData] = useState({
    personalInfo: PERSONAL_INFO,
    projects: PROJECTS,
    skills: SKILLS,
    experiences: EXPERIENCES,
  });
  const [adminOpen, setAdminOpen] = useState(false);

  // Load portfolio database from server
  useEffect(() => {
    fetch('/api/portfolio')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load portfolio database.');
        return res.json();
      })
      .then((data) => {
        if (data && data.personalInfo) {
          setPortfolioData(data);
        }
      })
      .catch((err) => {
        console.error('Fell back to static data:', err);
      });
  }, []);

  const handleSaveSuccess = (updatedData: any) => {
    setPortfolioData(updatedData);
  };

  // Monitor scrolling to highlight correct nav link
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'contact'];
      const scrollPos = window.scrollY + 200; // Offset for better highlighting trigger

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll handler
  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  return (
    <div className="bg-neutral-950 min-h-screen text-neutral-100 flex flex-col font-sans select-none antialiased">
      {/* Background radial atmosphere overlay */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-500/5 blur-[120px]" />
      </div>

      {/* Navigation header */}
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Main Sections */}
      <main className="flex-1 w-full z-10">
        <Hero
          personalInfo={portfolioData.personalInfo}
          onExploreProjects={() => handleNavigate('projects')}
          onContact={() => handleNavigate('contact')}
        />
        <About personalInfo={portfolioData.personalInfo} />
        <Skills skills={portfolioData.skills} />
        <Projects projects={portfolioData.projects} />
        <Experience experiences={portfolioData.experiences} />
        <Contact />
      </main>

      {/* Footer */}
      <footer className="bg-neutral-950 border-t border-neutral-900 py-12 z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} Hassan Mehdi. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <button
              onClick={() => setAdminOpen(true)}
              title="Admin Panel"
              className="hover:text-indigo-400 text-neutral-400 cursor-pointer transition-colors border border-neutral-850 hover:border-neutral-800 bg-neutral-900/40 p-2 rounded-lg flex items-center justify-center shrink-0"
              aria-label="Admin Panel"
            >
              <Lock className="w-4 h-4" />
            </button>
            <span className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span>System: ONLINE</span>
            </span>
            <span>Built with React + Express</span>
          </div>
        </div>
      </footer>

      {/* Admin Panel Overlap View */}
      <AdminPanel 
        isOpen={adminOpen} 
        onClose={() => setAdminOpen(false)} 
        portfolioData={portfolioData}
        onSaveSuccess={handleSaveSuccess}
      />
    </div>
  );
}
