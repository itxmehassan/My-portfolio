import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Lock, Shield, Settings, Save, AlertCircle, CheckCircle, 
  Plus, Trash2, Edit2, Link, FileText, Image, Briefcase, 
  Award, Upload, Copy, ExternalLink, RefreshCw, ChevronRight 
} from 'lucide-react';
import { Project, Skill, Experience } from '../types';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  portfolioData: {
    personalInfo: any;
    projects: Project[];
    skills: Skill[];
    experiences: Experience[];
  };
  onSaveSuccess: (updatedData: any) => void;
}

interface InlineImageUploaderProps {
  onUploadSuccess: (url: string) => void;
  password?: string;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
}

function InlineImageUploader({ onUploadSuccess, password, onSuccess, onError }: InlineImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploading(true);
      
      try {
        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64Data = reader.result as string;
          try {
            const res = await fetch('/api/upload', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                filename: file.name,
                base64Data,
                password: password || ''
              })
            });

            const data = await res.json();
            if (res.ok && data.url) {
              onUploadSuccess(data.url);
              onSuccess(`Uploaded image successfully!`);
              setTimeout(() => onSuccess(''), 3000);
            } else {
              onError(data.error || 'Failed to upload image.');
              setTimeout(() => onError(''), 4000);
            }
          } catch (err) {
            onError('Failed to communicate with upload server.');
            setTimeout(() => onError(''), 4000);
          } finally {
            setUploading(false);
          }
        };
        reader.readAsDataURL(file);
      } catch (err) {
        onError('Error processing file.');
        setTimeout(() => onError(''), 4000);
        setUploading(false);
      }
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="relative shrink-0">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      <button
        type="button"
        disabled={uploading}
        onClick={triggerFileInput}
        title="Upload Image"
        className="px-3.5 py-2.5 bg-neutral-900 border border-neutral-800 hover:border-indigo-500/50 hover:bg-neutral-850 text-neutral-300 hover:text-indigo-400 rounded-xl text-[10px] font-sans font-bold flex items-center justify-center space-x-1.5 transition-all duration-200 cursor-pointer disabled:opacity-50 shrink-0"
      >
        {uploading ? (
          <>
            <RefreshCw className="w-3 h-3 animate-spin text-indigo-400" />
            <span>Uploading...</span>
          </>
        ) : (
          <>
            <Upload className="w-3 h-3" />
            <span>Upload & Set</span>
          </>
        )}
      </button>
    </div>
  );
}

export default function AdminPanel({ isOpen, onClose, portfolioData, onSaveSuccess }: AdminPanelProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'about' | 'skills' | 'projects' | 'experience' | 'images' | 'security'>('about');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // Passcode settings state
  const [currentPasscode, setCurrentPasscode] = useState('');
  const [newPasscode, setNewPasscode] = useState('');
  const [confirmPasscode, setConfirmPasscode] = useState('');
  const [isPasscodeDefault, setIsPasscodeDefault] = useState(true);
  const [passcodeUpdateError, setPasscodeUpdateError] = useState('');
  const [passcodeUpdateSuccess, setPasscodeUpdateSuccess] = useState('');

  // Temporary local state for editing
  const [localInfo, setLocalInfo] = useState<any>({});
  const [localSkills, setLocalSkills] = useState<Skill[]>([]);
  const [localProjects, setLocalProjects] = useState<Project[]>([]);
  const [localExperiences, setLocalExperiences] = useState<Experience[]>([]);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  
  // File upload state
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadSuccessUrl, setUploadSuccessUrl] = useState('');

  // Fetch passcode status
  const checkPasscodeStatus = async () => {
    try {
      const res = await fetch('/api/passcode/status');
      const data = await res.json();
      setIsPasscodeDefault(data.isDefault);
    } catch (err) {
      console.error('Failed to load passcode status:', err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      checkPasscodeStatus();
    }
  }, [isAuthenticated]);

  // Synchronize with parent portfolioData when authenticated or data changes
  useEffect(() => {
    if (portfolioData) {
      setLocalInfo({ ...portfolioData.personalInfo });
      setLocalSkills([...portfolioData.skills]);
      setLocalProjects([...portfolioData.projects]);
      setLocalExperiences([...portfolioData.experiences]);
    }
  }, [portfolioData, isAuthenticated]);

  // Load uploaded images from backend
  const fetchUploadedImages = async () => {
    try {
      const res = await fetch('/api/uploads');
      const data = await res.json();
      if (data.images) {
        setUploadedImages(data.images);
      }
    } catch (err) {
      console.error('Failed to load uploaded images:', err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchUploadedImages();
    }
  }, [isAuthenticated]);

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await fetch('/api/passcode/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
        setErrorMsg('');
      } else {
        setErrorMsg(data.error || 'Invalid credentials. Please try again.');
      }
    } catch (err) {
      setErrorMsg('Failed to connect to authorization service.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePasscode = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasscodeUpdateError('');
    setPasscodeUpdateSuccess('');

    if (newPasscode !== confirmPasscode) {
      setPasscodeUpdateError('New passcodes do not match.');
      return;
    }

    if (newPasscode.trim().length < 4) {
      setPasscodeUpdateError('New passcode must be at least 4 characters long.');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch('/api/passcode/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: currentPasscode,
          newPassword: newPasscode
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setPasscodeUpdateSuccess('Passcode updated successfully! Subsequent requests will use the updated passcode.');
        setCurrentPasscode('');
        setNewPasscode('');
        setConfirmPasscode('');
        setPassword(newPasscode); // sync current session passcode
        checkPasscodeStatus();
      } else {
        setPasscodeUpdateError(data.error || 'Failed to update passcode.');
      }
    } catch (err) {
      setPasscodeUpdateError('Network error updating passcode.');
    } finally {
      setLoading(false);
    }
  };

  // Image Upload Handler (Base64)
  const handleImageUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile) return;

    setUploadingImage(true);
    setUploadSuccessUrl('');
    setErrorMsg('');

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Data = reader.result as string;
        try {
          const res = await fetch('/api/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              filename: uploadFile.name,
              base64Data,
              password
            })
          });

          const data = await res.json();
          if (res.ok && data.url) {
            setUploadSuccessUrl(data.url);
            setSuccessMsg('Image uploaded successfully!');
            fetchUploadedImages();
            setUploadFile(null);
            
            // Auto hide success msg after 4s
            setTimeout(() => setSuccessMsg(''), 4000);
          } else {
            setErrorMsg(data.error || 'Failed to upload image.');
          }
        } catch (err) {
          setErrorMsg('Failed to communicate with upload server.');
        } finally {
          setUploadingImage(false);
        }
      };

      reader.readAsDataURL(uploadFile);
    } catch (err) {
      setErrorMsg('Error processing file.');
      setUploadingImage(false);
    }
  };

  // Global Save Handler
  const handleSaveAll = async () => {
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    const updatedPortfolio = {
      personalInfo: localInfo,
      projects: localProjects,
      skills: localSkills,
      experiences: localExperiences
    };

    try {
      const res = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password,
          portfolioData: updatedPortfolio
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMsg('All portfolio configurations updated successfully!');
        onSaveSuccess(updatedPortfolio);
        setTimeout(() => setSuccessMsg(''), 4000);
      } else {
        setErrorMsg(data.error || 'Failed to save changes.');
      }
    } catch (err) {
      setErrorMsg('Failed to sync changes with server database.');
    } finally {
      setLoading(false);
    }
  };

  // SKILLS ACTIONS
  const handleAddSkill = () => {
    const newSkill: Skill = {
      name: 'New Skill',
      category: 'frontend',
      proficiency: 80,
      yearsOfExperience: 1
    };
    setLocalSkills([...localSkills, newSkill]);
  };

  const handleUpdateSkill = (index: number, key: keyof Skill, value: any) => {
    const updated = [...localSkills];
    updated[index] = { ...updated[index], [key]: value };
    setLocalSkills(updated);
  };

  const handleDeleteSkill = (index: number) => {
    setLocalSkills(localSkills.filter((_, idx) => idx !== index));
  };

  // EXPERIENCES ACTIONS
  const handleAddExperience = () => {
    const newExp: Experience = {
      id: `exp_${Date.now()}`,
      role: 'Software Engineer',
      company: 'New Company',
      period: '2026 - Present',
      location: 'Remote',
      description: ['Accomplished custom features.', 'Collaborated on frontend design patterns.'],
      skillsUsed: ['React', 'TypeScript']
    };
    setLocalExperiences([...localExperiences, newExp]);
  };

  const handleUpdateExperience = (index: number, key: keyof Experience, value: any) => {
    const updated = [...localExperiences];
    updated[index] = { ...updated[index], [key]: value };
    setLocalExperiences(updated);
  };

  const handleDeleteExperience = (index: number) => {
    setLocalExperiences(localExperiences.filter((_, idx) => idx !== index));
  };

  // PROJECTS ACTIONS
  const handleAddProject = () => {
    const newProj: Project = {
      id: `proj_${Date.now()}`,
      title: 'New Dynamic Project',
      subtitle: 'SaaS Solution',
      description: 'A beautiful solution designed for scalable architectures.',
      longDescription: 'Extended information outlining metrics, design values, and structural guidelines.',
      category: 'Full-Stack',
      tags: ['React', 'Express'],
      githubUrl: 'https://github.com/hassanmehdi',
      liveUrl: 'https://hassanmehdi.dev',
      features: ['Modular widget dashboards', 'Fast loading state updates'],
      metrics: [
        { label: 'Speed Score', value: '99/100' },
        { label: 'Database Calls', value: 'optimized' }
      ],
      imageUrl: '',
      bgImageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'
    };
    setLocalProjects([...localProjects, newProj]);
  };

  const handleUpdateProject = (index: number, key: keyof Project, value: any) => {
    const updated = [...localProjects];
    updated[index] = { ...updated[index], [key]: value };
    setLocalProjects(updated);
  };

  const handleDeleteProject = (index: number) => {
    setLocalProjects(localProjects.filter((_, idx) => idx !== index));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/98 backdrop-blur-md flex flex-col">
      {/* Admin Navbar */}
      <header className="border-b border-neutral-900 bg-neutral-900/60 px-6 py-4 sticky top-0 backdrop-blur z-20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
              <Shield className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h1 className="text-base font-sans font-extrabold text-white tracking-tight flex items-center space-x-2">
                <span>Hassan Mehdi Workspace</span>
                <span className="text-[10px] font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded uppercase">
                  Admin Panel
                </span>
              </h1>
              <p className="text-[10px] text-neutral-500 font-mono">AUTHORIZED SYSTEMS ONLY</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated && (
              <button
                onClick={handleSaveAll}
                disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-sans text-xs font-bold px-4 py-2 rounded-xl flex items-center space-x-1.5 transition-all duration-200 active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{loading ? 'Saving...' : 'Save Changes'}</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 hover:bg-neutral-900 text-neutral-400 hover:text-white rounded-xl border border-neutral-850 hover:border-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Area */}
      <div className="flex-1 flex flex-col justify-center max-w-7xl w-full mx-auto p-6">
        <AnimatePresence mode="wait">
          {!isAuthenticated ? (
            /* Login Gate */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-md w-full mx-auto bg-neutral-900/40 border border-neutral-850 rounded-3xl p-8 space-y-6 shadow-2xl relative"
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-indigo-400" />
                </div>
                <h2 className="text-xl font-sans font-extrabold text-white">Admin Portal Login</h2>
                <p className="text-xs text-neutral-400 max-w-xs font-sans">
                  Provide your administrator credentials to manage your developer portfolio.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-neutral-400 font-bold uppercase tracking-wider block">
                    Username / Email
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter admin username"
                    required
                    className="w-full bg-neutral-950 border border-neutral-850 hover:border-neutral-800 focus:border-indigo-500 text-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none transition-all duration-200"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-neutral-400 font-bold uppercase tracking-wider block">
                    Developer Passcode
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full bg-neutral-950 border border-neutral-850 hover:border-neutral-800 focus:border-indigo-500 text-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none transition-all duration-200 font-mono"
                  />
                </div>

                {errorMsg && (
                  <div className="flex items-start space-x-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-sans text-xs font-bold py-3.5 rounded-xl flex items-center justify-center space-x-2 transition-all duration-300 active:scale-95 cursor-pointer disabled:opacity-50"
                >
                  <span>{loading ? 'Verifying...' : 'Authorize & Enter'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          ) : (
            /* Admin Panel Dashboard */
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start h-full"
            >
              {/* Left sidebar navigation */}
              <div className="lg:col-span-3 flex flex-col space-y-2 bg-neutral-900/30 border border-neutral-850 rounded-2xl p-4">
                <span className="text-[9px] font-mono font-bold tracking-widest text-neutral-500 uppercase px-3 py-1">
                  MANAGEMENT SECTIONS
                </span>
                
                <button
                  onClick={() => setActiveTab('about')}
                  className={`w-full text-left px-4 py-3 rounded-xl flex items-center space-x-2.5 text-xs font-sans font-bold transition-all ${
                    activeTab === 'about' 
                      ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' 
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-900/50 border border-transparent'
                  }`}
                >
                  <Settings className="w-4 h-4 shrink-0" />
                  <span>About & Profile</span>
                </button>

                <button
                  onClick={() => setActiveTab('skills')}
                  className={`w-full text-left px-4 py-3 rounded-xl flex items-center space-x-2.5 text-xs font-sans font-bold transition-all ${
                    activeTab === 'skills' 
                      ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' 
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-900/50 border border-transparent'
                  }`}
                >
                  <Award className="w-4 h-4 shrink-0" />
                  <span>Manage Skills</span>
                </button>

                <button
                  onClick={() => setActiveTab('projects')}
                  className={`w-full text-left px-4 py-3 rounded-xl flex items-center space-x-2.5 text-xs font-sans font-bold transition-all ${
                    activeTab === 'projects' 
                      ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' 
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-900/50 border border-transparent'
                  }`}
                >
                  <FileText className="w-4 h-4 shrink-0" />
                  <span>Manage Projects</span>
                </button>

                <button
                  onClick={() => setActiveTab('experience')}
                  className={`w-full text-left px-4 py-3 rounded-xl flex items-center space-x-2.5 text-xs font-sans font-bold transition-all ${
                    activeTab === 'experience' 
                      ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' 
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-900/50 border border-transparent'
                  }`}
                >
                  <Briefcase className="w-4 h-4 shrink-0" />
                  <span>Manage Experience</span>
                </button>

                <button
                  onClick={() => setActiveTab('images')}
                  className={`w-full text-left px-4 py-3 rounded-xl flex items-center space-x-2.5 text-xs font-sans font-bold transition-all ${
                    activeTab === 'images' 
                      ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' 
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-900/50 border border-transparent'
                  }`}
                >
                  <Image className="w-4 h-4 shrink-0" />
                  <span>Manage Images</span>
                </button>

                <button
                  onClick={() => setActiveTab('security')}
                  className={`w-full text-left px-4 py-3 rounded-xl flex items-center space-x-2.5 text-xs font-sans font-bold transition-all ${
                    activeTab === 'security' 
                      ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' 
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-900/50 border border-transparent'
                  }`}
                >
                  <Lock className="w-4 h-4 shrink-0" />
                  <span>Passcode Security</span>
                </button>

                <div className="pt-4 border-t border-neutral-900 mt-2 space-y-2">
                  <div className="bg-neutral-950/60 p-3 rounded-xl border border-neutral-900 font-mono text-[9px] text-neutral-500 space-y-1">
                    <span className="text-neutral-400 block font-bold">DATABASE STATUS:</span>
                    <span className="text-emerald-400 flex items-center space-x-1">
                      <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse inline-block mr-1" />
                      LOCAL DATA PERSISTED
                    </span>
                    <span className={`flex items-center mt-1 ${isPasscodeDefault ? 'text-amber-400' : 'text-emerald-400'}`}>
                      <span className={`w-1 h-1 rounded-full ${isPasscodeDefault ? 'bg-amber-500' : 'bg-emerald-500'} inline-block mr-1`} />
                      PASSCODE: {isPasscodeDefault ? 'DEFAULT (INSECURE)' : 'SECURED'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Main Tab Panels Content */}
              <div className="lg:col-span-9 space-y-6">
                
                {/* Global Feedback Notifications */}
                {successMsg && (
                  <div className="flex items-start space-x-2 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400 text-xs">
                    <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{successMsg}</span>
                  </div>
                )}
                {errorMsg && (
                  <div className="flex items-start space-x-2 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-xs">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* About (Personal Info) Tab */}
                {activeTab === 'about' && (
                  <div className="bg-neutral-900/40 border border-neutral-850 rounded-2xl p-6 md:p-8 space-y-6">
                    <div className="border-b border-neutral-850 pb-4">
                      <h2 className="text-xl font-sans font-extrabold text-white">About & Profile Settings</h2>
                      <p className="text-xs text-neutral-400">Edit the primary developer profile details displayed on home sections.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono text-neutral-400 font-bold uppercase">Name</label>
                        <input
                          type="text"
                          value={localInfo.name || ''}
                          onChange={(e) => setLocalInfo({ ...localInfo, name: e.target.value })}
                          className="w-full bg-neutral-950 border border-neutral-850 focus:border-indigo-500 text-neutral-200 rounded-xl px-4 py-3 text-xs focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono text-neutral-400 font-bold uppercase">Professional Title</label>
                        <input
                          type="text"
                          value={localInfo.title || ''}
                          onChange={(e) => setLocalInfo({ ...localInfo, title: e.target.value })}
                          className="w-full bg-neutral-950 border border-neutral-850 focus:border-indigo-500 text-neutral-200 rounded-xl px-4 py-3 text-xs focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono text-neutral-400 font-bold uppercase">Email Address</label>
                        <input
                          type="email"
                          value={localInfo.email || ''}
                          onChange={(e) => setLocalInfo({ ...localInfo, email: e.target.value })}
                          className="w-full bg-neutral-950 border border-neutral-850 focus:border-indigo-500 text-neutral-200 rounded-xl px-4 py-3 text-xs focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono text-neutral-400 font-bold uppercase">Location / Region</label>
                        <input
                          type="text"
                          value={localInfo.location || ''}
                          onChange={(e) => setLocalInfo({ ...localInfo, location: e.target.value })}
                          className="w-full bg-neutral-950 border border-neutral-850 focus:border-indigo-500 text-neutral-200 rounded-xl px-4 py-3 text-xs focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono text-neutral-400 font-bold uppercase">Availability / Contract Status</label>
                        <input
                          type="text"
                          value={localInfo.availability || ''}
                          onChange={(e) => setLocalInfo({ ...localInfo, availability: e.target.value })}
                          className="w-full bg-neutral-950 border border-neutral-850 focus:border-indigo-500 text-neutral-200 rounded-xl px-4 py-3 text-xs focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono text-neutral-400 font-bold uppercase">GitHub Profile URL</label>
                        <input
                          type="text"
                          value={localInfo.github || ''}
                          onChange={(e) => setLocalInfo({ ...localInfo, github: e.target.value })}
                          className="w-full bg-neutral-950 border border-neutral-850 focus:border-indigo-500 text-neutral-200 rounded-xl px-4 py-3 text-xs focus:outline-none font-mono"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono text-neutral-400 font-bold uppercase">LinkedIn Profile URL</label>
                        <input
                          type="text"
                          value={localInfo.linkedin || ''}
                          onChange={(e) => setLocalInfo({ ...localInfo, linkedin: e.target.value })}
                          className="w-full bg-neutral-950 border border-neutral-850 focus:border-indigo-500 text-neutral-200 rounded-xl px-4 py-3 text-xs focus:outline-none font-mono"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono text-neutral-400 font-bold uppercase">Twitter/X Profile URL</label>
                        <input
                          type="text"
                          value={localInfo.twitter || ''}
                          onChange={(e) => setLocalInfo({ ...localInfo, twitter: e.target.value })}
                          className="w-full bg-neutral-950 border border-neutral-850 focus:border-indigo-500 text-neutral-200 rounded-xl px-4 py-3 text-xs focus:outline-none font-mono"
                        />
                      </div>

                      <div className="space-y-1.5 md:col-span-2">
                        <label className="text-[10px] font-mono text-neutral-400 font-bold uppercase">Main Avatar Image URL</label>
                        <div className="flex space-x-3 items-center">
                          <input
                            type="text"
                            value={localInfo.avatarUrl || ''}
                            onChange={(e) => setLocalInfo({ ...localInfo, avatarUrl: e.target.value })}
                            className="flex-1 bg-neutral-950 border border-neutral-850 focus:border-indigo-500 text-neutral-200 rounded-xl px-4 py-3 text-xs focus:outline-none font-mono"
                          />
                          <InlineImageUploader 
                            onUploadSuccess={(url) => setLocalInfo({ ...localInfo, avatarUrl: url })}
                            password={password}
                            onSuccess={setSuccessMsg}
                            onError={setErrorMsg}
                          />
                          {localInfo.avatarUrl && (
                            <img src={localInfo.avatarUrl} alt="Avatar Preview" className="w-10 h-10 rounded-full border border-neutral-800 object-cover shrink-0" />
                          )}
                        </div>
                      </div>

                      <div className="space-y-1.5 md:col-span-2">
                        <label className="text-[10px] font-mono text-neutral-400 font-bold uppercase">About Polaroid Image URL</label>
                        <div className="flex space-x-3 items-center">
                          <input
                            type="text"
                            value={localInfo.polaroidUrl || ''}
                            onChange={(e) => setLocalInfo({ ...localInfo, polaroidUrl: e.target.value })}
                            className="flex-1 bg-neutral-950 border border-neutral-850 focus:border-indigo-500 text-neutral-200 rounded-xl px-4 py-3 text-xs focus:outline-none font-mono"
                          />
                          <InlineImageUploader 
                            onUploadSuccess={(url) => setLocalInfo({ ...localInfo, polaroidUrl: url })}
                            password={password}
                            onSuccess={setSuccessMsg}
                            onError={setErrorMsg}
                          />
                          {localInfo.polaroidUrl && (
                            <img src={localInfo.polaroidUrl} alt="Polaroid Preview" className="w-10 h-12 rounded border border-neutral-800 object-cover shrink-0" />
                          )}
                        </div>
                      </div>

                      <div className="space-y-1.5 md:col-span-2">
                        <label className="text-[10px] font-mono text-neutral-400 font-bold uppercase">Biography & Description</label>
                        <textarea
                          rows={4}
                          value={localInfo.bio || ''}
                          onChange={(e) => setLocalInfo({ ...localInfo, bio: e.target.value })}
                          className="w-full bg-neutral-950 border border-neutral-850 focus:border-indigo-500 text-neutral-200 rounded-xl px-4 py-3 text-xs focus:outline-none font-sans leading-relaxed"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Skills Tab */}
                {activeTab === 'skills' && (
                  <div className="bg-neutral-900/40 border border-neutral-850 rounded-2xl p-6 md:p-8 space-y-6">
                    <div className="flex items-center justify-between border-b border-neutral-850 pb-4">
                      <div>
                        <h2 className="text-xl font-sans font-extrabold text-white">Manage Technical Skills</h2>
                        <p className="text-xs text-neutral-400 font-sans">Add, delete, or modify proficiencies and experience parameters.</p>
                      </div>
                      <button
                        onClick={handleAddSkill}
                        className="bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 border border-indigo-500/20 px-4 py-2 rounded-xl text-xs font-bold font-sans flex items-center space-x-1 cursor-pointer transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Skill</span>
                      </button>
                    </div>

                    <div className="space-y-4">
                      {localSkills.map((skill, idx) => (
                        <div 
                          key={idx} 
                          className="bg-neutral-950/40 border border-neutral-900 p-4 rounded-xl grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
                        >
                          <div className="md:col-span-4 space-y-1">
                            <label className="text-[9px] font-mono text-neutral-500 font-bold block uppercase">Skill Name</label>
                            <input
                              type="text"
                              value={skill.name}
                              onChange={(e) => handleUpdateSkill(idx, 'name', e.target.value)}
                              className="w-full bg-neutral-950 border border-neutral-850 text-neutral-200 rounded-lg px-3 py-2 text-xs focus:outline-none"
                            />
                          </div>

                          <div className="md:col-span-3 space-y-1">
                            <label className="text-[9px] font-mono text-neutral-500 font-bold block uppercase">Category</label>
                            <select
                              value={skill.category}
                              onChange={(e) => handleUpdateSkill(idx, 'category', e.target.value)}
                              className="w-full bg-neutral-950 border border-neutral-850 text-neutral-200 rounded-lg px-3 py-2 text-xs focus:outline-none cursor-pointer"
                            >
                              <option value="frontend">Frontend</option>
                              <option value="backend">Backend</option>
                              <option value="database">Database</option>
                              <option value="tools">Tools & DevOps</option>
                            </select>
                          </div>

                          <div className="md:col-span-2 space-y-1">
                            <label className="text-[9px] font-mono text-neutral-500 font-bold block uppercase">Proficiency ({skill.proficiency}%)</label>
                            <input
                              type="range"
                              min="1"
                              max="100"
                              value={skill.proficiency}
                              onChange={(e) => handleUpdateSkill(idx, 'proficiency', parseInt(e.target.value))}
                              className="w-full accent-indigo-500 cursor-pointer h-1 bg-neutral-800 rounded-lg appearance-none mt-3"
                            />
                          </div>

                          <div className="md:col-span-2 space-y-1">
                            <label className="text-[9px] font-mono text-neutral-500 font-bold block uppercase">Years</label>
                            <input
                              type="number"
                              min="0"
                              max="50"
                              value={skill.yearsOfExperience}
                              onChange={(e) => handleUpdateSkill(idx, 'yearsOfExperience', parseInt(e.target.value) || 0)}
                              className="w-full bg-neutral-950 border border-neutral-850 text-neutral-200 rounded-lg px-3 py-2 text-xs focus:outline-none font-mono"
                            />
                          </div>

                          <div className="md:col-span-1 flex justify-end pt-3 md:pt-0">
                            <button
                              onClick={() => handleDeleteSkill(idx)}
                              className="p-2 hover:bg-red-500/10 text-neutral-500 hover:text-red-400 rounded-lg transition-colors border border-transparent hover:border-red-500/20 cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}

                      {localSkills.length === 0 && (
                        <p className="text-center text-xs text-neutral-500 py-6 font-sans">No skills registered yet. Click "Add Skill" to start.</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Experience Tab */}
                {activeTab === 'experience' && (
                  <div className="bg-neutral-900/40 border border-neutral-850 rounded-2xl p-6 md:p-8 space-y-6">
                    <div className="flex items-center justify-between border-b border-neutral-850 pb-4">
                      <div>
                        <h2 className="text-xl font-sans font-extrabold text-white">Manage Work Experiences</h2>
                        <p className="text-xs text-neutral-400 font-sans">Update career milestones, companies, dates, and technology details.</p>
                      </div>
                      <button
                        onClick={handleAddExperience}
                        className="bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 border border-indigo-500/20 px-4 py-2 rounded-xl text-xs font-bold font-sans flex items-center space-x-1 cursor-pointer transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Experience</span>
                      </button>
                    </div>

                    <div className="space-y-6">
                      {localExperiences.map((exp, idx) => (
                        <div 
                          key={exp.id || idx} 
                          className="bg-neutral-950/40 border border-neutral-900 p-5 rounded-2xl space-y-4"
                        >
                          <div className="flex items-center justify-between border-b border-neutral-900 pb-2">
                            <span className="text-[10px] font-mono text-indigo-400 font-extrabold">POSITION RECORD #{idx + 1}</span>
                            <button
                              onClick={() => handleDeleteExperience(idx)}
                              className="text-neutral-500 hover:text-red-400 text-xs flex items-center space-x-1 cursor-pointer hover:bg-red-500/5 px-2 py-1 rounded"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Remove</span>
                            </button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-[9px] font-mono text-neutral-400 uppercase font-bold">Role Title</label>
                              <input
                                type="text"
                                value={exp.role}
                                onChange={(e) => handleUpdateExperience(idx, 'role', e.target.value)}
                                className="w-full bg-neutral-950 border border-neutral-850 text-neutral-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="text-[9px] font-mono text-neutral-400 uppercase font-bold">Company / Employer</label>
                              <input
                                type="text"
                                value={exp.company}
                                onChange={(e) => handleUpdateExperience(idx, 'company', e.target.value)}
                                className="w-full bg-neutral-950 border border-neutral-850 text-neutral-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="text-[9px] font-mono text-neutral-400 uppercase font-bold">Time Period</label>
                              <input
                                type="text"
                                value={exp.period}
                                onChange={(e) => handleUpdateExperience(idx, 'period', e.target.value)}
                                placeholder="e.g. 2026 - Present"
                                className="w-full bg-neutral-950 border border-neutral-850 text-neutral-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none font-mono"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="text-[9px] font-mono text-neutral-400 uppercase font-bold">Location</label>
                              <input
                                type="text"
                                value={exp.location}
                                onChange={(e) => handleUpdateExperience(idx, 'location', e.target.value)}
                                placeholder="e.g. Lahore, Pakistan"
                                className="w-full bg-neutral-950 border border-neutral-850 text-neutral-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none"
                              />
                            </div>

                            <div className="space-y-1 md:col-span-2">
                              <label className="text-[9px] font-mono text-neutral-400 uppercase font-bold">Skills Used (Comma separated)</label>
                              <input
                                type="text"
                                value={exp.skillsUsed.join(', ')}
                                onChange={(e) => handleUpdateExperience(idx, 'skillsUsed', e.target.value.split(',').map(s => s.trim()))}
                                className="w-full bg-neutral-950 border border-neutral-850 text-neutral-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none font-mono"
                              />
                            </div>

                            <div className="space-y-1 md:col-span-2">
                              <label className="text-[9px] font-mono text-neutral-400 uppercase font-bold">
                                Description Bullets (One per line)
                              </label>
                              <textarea
                                rows={3}
                                value={exp.description.join('\n')}
                                onChange={(e) => handleUpdateExperience(idx, 'description', e.target.value.split('\n').filter(l => l.trim() !== ''))}
                                placeholder="Accomplished key task."
                                className="w-full bg-neutral-950 border border-neutral-850 text-neutral-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none font-sans leading-relaxed"
                              />
                            </div>
                          </div>
                        </div>
                      ))}

                      {localExperiences.length === 0 && (
                        <p className="text-center text-xs text-neutral-500 py-6 font-sans">No experiences recorded. Click "Add Experience".</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Projects Tab */}
                {activeTab === 'projects' && (
                  <div className="bg-neutral-900/40 border border-neutral-850 rounded-2xl p-6 md:p-8 space-y-6">
                    <div className="flex items-center justify-between border-b border-neutral-850 pb-4">
                      <div>
                        <h2 className="text-xl font-sans font-extrabold text-white">Manage Showcased Projects</h2>
                        <p className="text-xs text-neutral-400 font-sans">Manage custom portfolio items, tags, descriptions, and mockups.</p>
                      </div>
                      <button
                        onClick={handleAddProject}
                        className="bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 border border-indigo-500/20 px-4 py-2 rounded-xl text-xs font-bold font-sans flex items-center space-x-1 cursor-pointer transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Project</span>
                      </button>
                    </div>

                    <div className="space-y-8">
                      {localProjects.map((proj, idx) => (
                        <div 
                          key={proj.id || idx} 
                          className="bg-neutral-950/40 border border-neutral-900 p-6 rounded-2xl space-y-5"
                        >
                          <div className="flex items-center justify-between border-b border-neutral-900 pb-3">
                            <div className="flex items-center space-x-2">
                              <span className="text-[10px] font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded-md uppercase font-bold">
                                {proj.category || 'PROJECT'}
                              </span>
                              <h3 className="text-sm font-sans font-bold text-white">{proj.title}</h3>
                            </div>
                            <button
                              onClick={() => handleDeleteProject(idx)}
                              className="text-neutral-500 hover:text-red-400 text-xs flex items-center space-x-1 cursor-pointer hover:bg-red-500/5 px-2 py-1 rounded transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Delete Project</span>
                            </button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-[9px] font-mono text-neutral-400 uppercase font-bold">Project Title</label>
                              <input
                                type="text"
                                value={proj.title}
                                onChange={(e) => handleUpdateProject(idx, 'title', e.target.value)}
                                className="w-full bg-neutral-950 border border-neutral-850 text-neutral-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="text-[9px] font-mono text-neutral-400 uppercase font-bold">Subtitle</label>
                              <input
                                type="text"
                                value={proj.subtitle}
                                onChange={(e) => handleUpdateProject(idx, 'subtitle', e.target.value)}
                                className="w-full bg-neutral-950 border border-neutral-850 text-neutral-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="text-[9px] font-mono text-neutral-400 uppercase font-bold">Project Identifier (ID)</label>
                              <input
                                type="text"
                                value={proj.id}
                                onChange={(e) => handleUpdateProject(idx, 'id', e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ''))}
                                className="w-full bg-neutral-950 border border-neutral-850 text-neutral-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none font-mono"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="text-[9px] font-mono text-neutral-400 uppercase font-bold">Category</label>
                              <select
                                value={proj.category}
                                onChange={(e) => handleUpdateProject(idx, 'category', e.target.value)}
                                className="w-full bg-neutral-950 border border-neutral-850 text-neutral-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none cursor-pointer"
                              >
                                <option value="Full-Stack">Full-Stack</option>
                                <option value="Frontend">Frontend</option>
                                <option value="Cloud/DevOps">Cloud/DevOps</option>
                              </select>
                            </div>

                            <div className="space-y-1 md:col-span-2">
                              <label className="text-[9px] font-mono text-neutral-400 uppercase font-bold">Tags / Technologies (Comma separated)</label>
                              <input
                                type="text"
                                value={proj.tags.join(', ')}
                                onChange={(e) => handleUpdateProject(idx, 'tags', e.target.value.split(',').map(t => t.trim()))}
                                className="w-full bg-neutral-950 border border-neutral-850 text-neutral-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none font-mono"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="text-[9px] font-mono text-neutral-400 uppercase font-bold">GitHub Repository URL</label>
                              <input
                                type="text"
                                value={proj.githubUrl}
                                onChange={(e) => handleUpdateProject(idx, 'githubUrl', e.target.value)}
                                className="w-full bg-neutral-950 border border-neutral-850 text-neutral-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none font-mono"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="text-[9px] font-mono text-neutral-400 uppercase font-bold">Live Demo URL</label>
                              <input
                                type="text"
                                value={proj.liveUrl}
                                onChange={(e) => handleUpdateProject(idx, 'liveUrl', e.target.value)}
                                className="w-full bg-neutral-950 border border-neutral-850 text-neutral-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none font-mono"
                              />
                            </div>

                            <div className="space-y-1 md:col-span-2">
                              <label className="text-[9px] font-mono text-neutral-400 uppercase font-bold">Display Image (Primary Mockup URL)</label>
                              <div className="flex space-x-3 items-center">
                                <input
                                  type="text"
                                  value={proj.imageUrl || ''}
                                  onChange={(e) => handleUpdateProject(idx, 'imageUrl', e.target.value)}
                                  placeholder="Leave blank for dynamic mock component"
                                  className="flex-1 bg-neutral-950 border border-neutral-850 text-neutral-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none font-mono"
                                />
                                <InlineImageUploader 
                                  onUploadSuccess={(url) => handleUpdateProject(idx, 'imageUrl', url)}
                                  password={password}
                                  onSuccess={setSuccessMsg}
                                  onError={setErrorMsg}
                                />
                                {proj.imageUrl && (
                                  <img src={proj.imageUrl} alt="Primary" className="w-10 h-10 border border-neutral-800 object-cover shrink-0 rounded" />
                                )}
                              </div>
                            </div>

                            <div className="space-y-1 md:col-span-2">
                              <label className="text-[9px] font-mono text-neutral-400 uppercase font-bold">Detailed Background / Hover Image URL</label>
                              <div className="flex space-x-3 items-center">
                                <input
                                  type="text"
                                  value={proj.bgImageUrl || ''}
                                  onChange={(e) => handleUpdateProject(idx, 'bgImageUrl', e.target.value)}
                                  className="flex-1 bg-neutral-950 border border-neutral-850 text-neutral-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none font-mono"
                                />
                                <InlineImageUploader 
                                  onUploadSuccess={(url) => handleUpdateProject(idx, 'bgImageUrl', url)}
                                  password={password}
                                  onSuccess={setSuccessMsg}
                                  onError={setErrorMsg}
                                />
                                {proj.bgImageUrl && (
                                  <img src={proj.bgImageUrl} alt="Background" className="w-10 h-10 border border-neutral-800 object-cover shrink-0 rounded" />
                                )}
                              </div>
                            </div>

                            <div className="space-y-1 md:col-span-2">
                              <label className="text-[9px] font-mono text-neutral-400 uppercase font-bold">Brief Description</label>
                              <input
                                type="text"
                                value={proj.description}
                                onChange={(e) => handleUpdateProject(idx, 'description', e.target.value)}
                                className="w-full bg-neutral-950 border border-neutral-850 text-neutral-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none font-sans"
                              />
                            </div>

                            <div className="space-y-1 md:col-span-2">
                              <label className="text-[9px] font-mono text-neutral-400 uppercase font-bold">Long Technical Description</label>
                              <textarea
                                rows={3}
                                value={proj.longDescription || ''}
                                onChange={(e) => handleUpdateProject(idx, 'longDescription', e.target.value)}
                                className="w-full bg-neutral-950 border border-neutral-850 text-neutral-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none font-sans leading-relaxed"
                              />
                            </div>

                            <div className="space-y-1 md:col-span-2">
                              <label className="text-[9px] font-mono text-neutral-400 uppercase font-bold">Features list (One per line)</label>
                              <textarea
                                rows={2}
                                value={proj.features.join('\n')}
                                onChange={(e) => handleUpdateProject(idx, 'features', e.target.value.split('\n').filter(l => l.trim() !== ''))}
                                className="w-full bg-neutral-950 border border-neutral-850 text-neutral-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none font-sans leading-relaxed"
                              />
                            </div>
                          </div>
                        </div>
                      ))}

                      {localProjects.length === 0 && (
                        <p className="text-center text-xs text-neutral-500 py-6 font-sans">No projects available. Click "Add Project".</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Images Upload / Gallery Tab */}
                {activeTab === 'images' && (
                  <div className="bg-neutral-900/40 border border-neutral-850 rounded-2xl p-6 md:p-8 space-y-8">
                    <div className="border-b border-neutral-850 pb-4">
                      <h2 className="text-xl font-sans font-extrabold text-white">Dynamic Image Manager</h2>
                      <p className="text-xs text-neutral-400">Upload new layout mockups, background assets, or professional portrait pictures directly to server storage.</p>
                    </div>

                    {/* Drag and Drop File Upload form */}
                    <div className="bg-neutral-950/60 p-6 rounded-2xl border border-neutral-900">
                      <form onSubmit={handleImageUpload} className="space-y-4">
                        <span className="text-[10px] font-mono font-bold tracking-wider text-indigo-400 block uppercase">UPLOAD LOCAL IMAGE FILE</span>
                        
                        <div className="border border-dashed border-neutral-800 hover:border-indigo-500/50 rounded-xl p-8 flex flex-col items-center justify-center space-y-3 cursor-pointer relative bg-neutral-950/20 transition-all duration-200 group">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                setUploadFile(e.target.files[0]);
                              }
                            }}
                            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                          />
                          <Upload className="w-8 h-8 text-neutral-500 group-hover:text-indigo-400 transition-colors" />
                          <div className="text-center">
                            <p className="text-xs font-sans font-bold text-neutral-300">
                              {uploadFile ? uploadFile.name : 'Click or Drag & Drop image here'}
                            </p>
                            <p className="text-[10px] text-neutral-500 font-mono mt-0.5">JPEG, PNG, WEBP, GIF, SVG up to 8MB</p>
                          </div>
                        </div>

                        {uploadFile && (
                          <div className="flex justify-end space-x-3 pt-2">
                            <button
                              type="button"
                              onClick={() => setUploadFile(null)}
                              className="px-4 py-2 bg-neutral-900 text-neutral-300 rounded-xl text-xs font-sans font-bold hover:bg-neutral-800 cursor-pointer"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              disabled={uploadingImage}
                              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-sans font-bold flex items-center space-x-1.5 transition-all cursor-pointer"
                            >
                              <span>{uploadingImage ? 'Uploading...' : 'Confirm Upload'}</span>
                            </button>
                          </div>
                        )}

                        {uploadSuccessUrl && (
                          <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-900 space-y-2 mt-4 font-mono text-[10px] text-neutral-400">
                            <span className="text-emerald-400 font-bold block">UPLOAD COMPLETED SUCCESSFULLY:</span>
                            <div className="flex items-center space-x-2">
                              <input 
                                type="text" 
                                readOnly 
                                value={uploadSuccessUrl} 
                                className="flex-1 bg-neutral-900 border border-neutral-800 text-neutral-200 px-3 py-2 rounded text-[10px]"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  navigator.clipboard.writeText(uploadSuccessUrl);
                                  setSuccessMsg('URL copied to clipboard!');
                                  setTimeout(() => setSuccessMsg(''), 3000);
                                }}
                                className="p-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded border border-neutral-750 cursor-pointer"
                                title="Copy URL"
                              >
                                <Copy className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <span className="text-[9px] text-neutral-500 block">Copy this URL to paste into any About Portrait or Project background asset URL field!</span>
                          </div>
                        )}
                      </form>
                    </div>

                    {/* Media Gallery / List uploaded files */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold tracking-wider text-neutral-400 uppercase">SERVER MEDIA FILE STORAGE ({uploadedImages.length})</span>
                        <button
                          onClick={fetchUploadedImages}
                          className="text-neutral-500 hover:text-white flex items-center space-x-1 font-mono text-[9px] cursor-pointer"
                        >
                          <RefreshCw className="w-3 h-3" />
                          <span>REFRESH</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {uploadedImages.map((imgUrl, index) => (
                          <div 
                            key={index} 
                            className="bg-neutral-950 border border-neutral-900 rounded-xl overflow-hidden group relative flex flex-col justify-between"
                          >
                            <div className="aspect-video relative overflow-hidden bg-neutral-900">
                              <img src={imgUrl} alt="Uploaded" className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                                <button
                                  onClick={() => {
                                    navigator.clipboard.writeText(imgUrl);
                                    setSuccessMsg('URL copied to clipboard!');
                                    setTimeout(() => setSuccessMsg(''), 3000);
                                  }}
                                  className="p-1.5 bg-neutral-800 text-white rounded hover:bg-indigo-600 transition-colors cursor-pointer"
                                  title="Copy URL Path"
                                >
                                  <Copy className="w-3.5 h-3.5" />
                                </button>
                                <a 
                                  href={imgUrl} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="p-1.5 bg-neutral-800 text-white rounded hover:bg-neutral-700 transition-colors"
                                  title="View Original"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                              </div>
                            </div>
                            <div className="p-2 border-t border-neutral-900">
                              <p className="text-[8px] font-mono text-neutral-400 truncate" title={imgUrl}>
                                {imgUrl.split('/').pop()}
                              </p>
                            </div>
                          </div>
                        ))}

                        {uploadedImages.length === 0 && (
                          <div className="col-span-full py-8 text-center text-xs text-neutral-500 font-sans border border-dashed border-neutral-850 rounded-xl bg-neutral-950/20">
                            No files uploaded yet. Add images above to build your media storage.
                          </div>
                        )}
                      </div>
                    </div>

                  </div>
                )}

                {activeTab === 'security' && (
                  <div className="bg-neutral-900/40 border border-neutral-850 rounded-2xl p-6 md:p-8 space-y-8 animate-fade-in">
                    <div className="border-b border-neutral-850 pb-4">
                      <h2 className="text-xl font-sans font-extrabold text-white">Passcode Security</h2>
                      <p className="text-xs text-neutral-400">Secure your portfolio configuration endpoints. Update the developer passcode required to enter this admin panel.</p>
                    </div>

                    {isPasscodeDefault && (
                      <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 flex items-start space-x-3 text-amber-400 text-xs">
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        <div className="space-y-1">
                          <p className="font-sans font-bold">Default Passcode is Currently Active</p>
                          <p className="text-neutral-400 font-sans leading-relaxed">
                            Your workspace is currently using the default passcode <code className="font-mono bg-amber-500/10 px-1 py-0.5 rounded text-amber-400 text-[11px]">AMAFHHas786.</code>. We highly recommend creating a new, strong personal passcode to prevent unauthorized modifications to your portfolio.
                          </p>
                        </div>
                      </div>
                    )}

                    <form onSubmit={handleUpdatePasscode} className="space-y-6 max-w-md bg-neutral-950/40 border border-neutral-900 p-6 rounded-2xl">
                      <span className="text-[10px] font-mono font-bold tracking-wider text-indigo-400 block uppercase">UPDATE DEVELOPER PASSCODE</span>

                      <div className="space-y-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono text-neutral-400 font-bold uppercase tracking-wider block font-sans">Current Passcode</label>
                          <input
                            type="password"
                            value={currentPasscode}
                            onChange={(e) => setCurrentPasscode(e.target.value)}
                            placeholder="••••••••"
                            required
                            className="w-full bg-neutral-950 border border-neutral-850 focus:border-indigo-500 text-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none transition font-mono"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono text-neutral-400 font-bold uppercase tracking-wider block font-sans">New Passcode</label>
                          <input
                            type="password"
                            value={newPasscode}
                            onChange={(e) => setNewPasscode(e.target.value)}
                            placeholder="••••••••"
                            required
                            className="w-full bg-neutral-950 border border-neutral-850 focus:border-indigo-500 text-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none transition font-mono"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono text-neutral-400 font-bold uppercase tracking-wider block font-sans">Confirm New Passcode</label>
                          <input
                            type="password"
                            value={confirmPasscode}
                            onChange={(e) => setConfirmPasscode(e.target.value)}
                            placeholder="••••••••"
                            required
                            className="w-full bg-neutral-950 border border-neutral-850 focus:border-indigo-500 text-neutral-200 rounded-xl px-4 py-3 text-sm focus:outline-none transition font-mono"
                          />
                        </div>
                      </div>

                      {passcodeUpdateError && (
                        <div className="flex items-start space-x-2 p-3.5 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs font-sans">
                          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                          <span>{passcodeUpdateError}</span>
                        </div>
                      )}

                      {passcodeUpdateSuccess && (
                        <div className="flex items-start space-x-2 p-3.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-xs font-sans">
                          <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
                          <span>{passcodeUpdateSuccess}</span>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-sans text-xs font-bold py-3 rounded-xl flex items-center justify-center space-x-2 transition cursor-pointer disabled:opacity-50"
                      >
                        <span>Update Passcode</span>
                        <Lock className="w-4 h-4" />
                      </button>
                    </form>
                  </div>
                )}

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
