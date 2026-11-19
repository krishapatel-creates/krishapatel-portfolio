import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowUpRight,
  Award,
  Box,
  Camera,
  Check,
  Code2,
  Command,
  Copy,
  Cpu,
  Eye,
  FileText,
  GraduationCap,
  Link2,
  Mail,
  MapPin,
  PenTool,
  Phone,
  RotateCcw,
  Send,
  ShieldCheck,
  Sparkles,
  Terminal,
  Wrench,
  X,
} from 'lucide-react';
import {
  CERTIFICATIONS_DATA,
  CertificationItem,
  EDUCATION_DATA,
  EXPERIENCE_DATA,
  PROCESS_STEPS,
  PROFILE_DATA,
  PROJECTS_DATA,
  ProjectItem,
  SKILLS_DATA,
} from './data/portfolioData';
import { ProjectInteractiveVisual } from './components/ProjectInteractiveVisual';
import { CircularStamp } from './components/CircularStamp';
import { ResumeModal } from './components/ResumeModal';
import { CertificateModal } from './components/CertificateModal';
import { ProjectModal } from './components/ProjectModal';
import { ContactModal } from './components/ContactModal';
import { CredentialVaultCard } from './components/CredentialVaultCard';
import { CommandPaletteModal } from './components/CommandPaletteModal';
import { QuickSummaryModal } from './components/QuickSummaryModal';

const HERO_CALLOUTS = [
  { label: 'ece undergrad', position: 'top-14 left-4 sm:left-16 md:left-28', arrow: 'M 10 24 Q 44 10 78 26' },
  { label: 'solidworks cad', position: 'top-14 right-4 sm:right-16 md:right-28', arrow: 'M 78 24 Q 44 10 10 26' },
  { label: 'arduino & c', position: 'top-1/2 -translate-y-4 left-2 sm:left-10 md:left-20', arrow: 'M 8 18 Q 42 4 76 16' },
  { label: 'ai foundations', position: 'top-1/2 -translate-y-4 right-2 sm:right-10 md:right-20', arrow: 'M 76 18 Q 42 4 8 16' },
  { label: 'social strategy', position: 'bottom-12 left-8 sm:left-24 md:left-36', arrow: 'M 10 8 Q 44 26 78 10' },
];

const IMPACT_METRICS = [
  { stat: 'TOP 100', label: 'Teams · Smart India Hackathon 2026 Preliminary (Team RuptureX)' },
  { stat: '52ND', label: 'Rank secured in first competitive hackathon' },
  { stat: '5 CERTS', label: 'Verified credentials across CAD, AI Foundations & PMI Leadership' },
  { stat: '10 HRS', label: 'SOLIDWORKS 2024 Essential Training applied to Quadcopter 3D' },
];

export default function App() {
  // Interactive Profile Photo preview state
  const [customPhoto, setCustomPhoto] = useState<string | null>(null);
  const photoInputRef = useRef<HTMLInputElement | null>(null);

  // Professor / Inspector Mode & Live Telemetry
  const [inspectorMode, setInspectorMode] = useState(false);
  const [telemetry, setTelemetry] = useState({ fps: 60, domNodes: 0, viewport: '1440×900' });

  // Active Skill Cross-Highlighter
  const [activeSkillTrace, setActiveSkillTrace] = useState<string | null>(null);
  const [featuredProjectId, setFeaturedProjectId] = useState<string>(PROJECTS_DATA[0].id);

  // Modals & Drawers
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isQuickSummaryOpen, setIsQuickSummaryOpen] = useState(false);
  const [selectedCert, setSelectedCert] = useState<CertificationItem | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Editable [Add Link] slots
  const [projectUrls, setProjectUrls] = useState<Record<string, string>>({});
  const [socialLinks, setSocialLinks] = useState<Record<string, string>>({
    GitHub: PROFILE_DATA.githubUrl,
  });
  const [editingSocialKey, setEditingSocialKey] = useState<string | null>(null);
  const [socialDraft, setSocialDraft] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Cmd/Ctrl + K shortcut
  useEffect(() => {
    const handleGlobalKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalKey);
    return () => window.removeEventListener('keydown', handleGlobalKey);
  }, []);

  // Live DOM & FPS Telemetry when Inspector Mode is ON
  useEffect(() => {
    if (!inspectorMode) return;
    let frameCount = 0;
    let lastTime = performance.now();
    let rafId = 0;

    const updateSnapshot = (fpsValue: number) => {
      setTelemetry({
        fps: fpsValue,
        domNodes: document.querySelectorAll('*').length,
        viewport: `${window.innerWidth}×${window.innerHeight}`,
      });
    };

    updateSnapshot(60);

    const loop = (now: number) => {
      frameCount += 1;
      const elapsed = now - lastTime;
      if (elapsed >= 600) {
        updateSnapshot(Math.min(120, Math.round((frameCount * 1000) / elapsed)));
        frameCount = 0;
        lastTime = now;
      }
      rafId = window.requestAnimationFrame(loop);
    };

    rafId = window.requestAnimationFrame(loop);
    return () => window.cancelAnimationFrame(rafId);
  }, [inspectorMode]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setCustomPhoto(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const scrollToSection = (id: string) => {
    const aliasMap: Record<string, string> = {
      about: 'slide-2',
      education: 'slide-3',
      skills: 'slide-4',
      credentials: 'slide-4',
      projects: 'slide-5',
      experience: 'slide-8',
      contact: 'slide-10',
    };
    const targetId = aliasMap[id] ?? id;
    const el = document.getElementById(targetId);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleToggleSkillTrace = (skillName: string) => {
    setActiveSkillTrace((prev) => (prev === skillName ? null : skillName));
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE_DATA.email);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      // Clipboard fallback ignored
    }
  };

  const handleSaveSocial = (key: string, e: React.FormEvent) => {
    e.preventDefault();
    if (socialDraft.trim()) {
      setSocialLinks((prev) => ({ ...prev, [key]: socialDraft.trim() }));
    }
    setEditingSocialKey(null);
    setSocialDraft('');
  };

  const featuredProject =
    PROJECTS_DATA.find((p) => p.id === featuredProjectId) ?? PROJECTS_DATA[0];

  const getSkillCodeAndIcon = (name: string) => {
    if (name.includes('SOLIDWORKS')) return { code: 'SW', icon: <Box className="w-4 h-4" /> };
    if (name.includes('Arduino')) return { code: 'ARD', icon: <Cpu className="w-4 h-4" /> };
    if (name.includes('C Programming')) return { code: 'C', icon: <Code2 className="w-4 h-4" /> };
    if (name.includes('Electronics')) return { code: 'ECE', icon: <Terminal className="w-4 h-4" /> };
    if (name.includes('Canva')) return { code: 'CNV', icon: <PenTool className="w-4 h-4" /> };
    if (name.includes('AI')) return { code: 'AI', icon: <Sparkles className="w-4 h-4" /> };
    if (name.includes('Leadership')) return { code: 'LDR', icon: <Award className="w-4 h-4" /> };
    return { code: 'STR', icon: <Wrench className="w-4 h-4" /> };
  };

  const tracedMatchesCount = activeSkillTrace
    ? PROJECTS_DATA.filter((p) => p.linkedSkills.includes(activeSkillTrace)).length +
      EXPERIENCE_DATA.filter((e) => e.linkedSkills.includes(activeSkillTrace)).length +
      CERTIFICATIONS_DATA.filter((c) => c.linkedSkills.includes(activeSkillTrace)).length
    : 0;

  return (
    <div className="min-h-screen bg-[#153358] text-white">
      {/* FLOATING TOP UTILITY BAR */}
      <header className="sticky top-0 z-40 px-4 sm:px-6 pt-3 pb-2 pointer-events-none">
        <div className="max-w-6xl mx-auto pointer-events-auto rounded-full bg-[#0E2440]/92 backdrop-blur-md border border-[#2E5280] px-5 py-2.5 flex items-center justify-between gap-4 shadow-xl">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#slide-1"
            className="font-oswald text-base sm:text-lg font-bold tracking-tight uppercase text-white whitespace-nowrap shrink-0"
          >
            Krisha Patel
          </a>

          {/* Zone 2: Concise Quick-Jump Links */}
          <nav className="hidden lg:flex items-center gap-5 text-xs font-medium text-[#D0DAE6]">
            <a href="#slide-2" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
              About
            </a>
            <a href="#slide-3" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
              Education
            </a>
            <a href="#slide-4" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
              Skills &amp; Certs
            </a>
            <a href="#slide-5" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
              Projects
            </a>
            <a href="#slide-8" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
              Experience
            </a>
          </nav>

          {/* Zone 3: Interactive Controls */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setIsCommandOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium rounded-full bg-[#153358] hover:bg-[#1D4475] border border-[#2E5280] text-[#D0DAE6] hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Command className="w-3 h-3" />
              <span>Cmd+K</span>
            </button>

            <button
              type="button"
              role="switch"
              aria-checked={inspectorMode}
              onClick={() => setInspectorMode((prev) => !prev)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide rounded-full border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                inspectorMode
                  ? 'bg-white text-[#153358] border-white'
                  : 'bg-[#153358] text-[#D0DAE6] border-[#2E5280] hover:border-white hover:text-white'
              }`}
            >
              <Eye className="w-3 h-3" />
              <span className="hidden sm:inline">Inspector Mode</span>
              <span className="sm:hidden">X-Ray</span>
            </button>

            <button
              type="button"
              onClick={() => setIsResumeOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wide rounded-full bg-white text-[#153358] hover:bg-[#F4F4F2] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <FileText className="w-3 h-3" />
              <span>Resume</span>
            </button>
          </div>
        </div>
      </header>

      {/* Inspector Telemetry Strip (only when Inspector Mode is ON) */}
      {inspectorMode && (
        <div className="sticky top-[62px] z-30 bg-[#0B1B30]/95 backdrop-blur-md border-y border-[#3B6496] px-6 py-2">
          <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4 text-[11px] font-mono-data text-[#D0DAE6]">
            <span>PROFESSOR INSPECTOR ACTIVE · 10-SLIDE NAVY (#153358) / OFF-WHITE (#F4F4F2) DECK</span>
            <div className="flex flex-wrap items-center gap-4">
              <span>FPS: {telemetry.fps}</span>
              <span>DOM NODES: {telemetry.domNodes}</span>
              <span>VIEWPORT: {telemetry.viewport}</span>
            </div>
          </div>
        </div>
      )}

      {/* Skill Cross-Highlighter Active Banner */}
      {activeSkillTrace && (
        <div className="sticky top-[62px] z-30 bg-[#0E2440]/95 backdrop-blur-md border-y border-white/25 px-6 py-2">
          <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="font-mono-data text-white">
              SKILL HIGHLIGHTER: &quot;{activeSkillTrace}&quot; ({tracedMatchesCount} matching items across slides)
            </span>
            <button
              type="button"
              onClick={() => setActiveSkillTrace(null)}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white text-[#153358] font-semibold text-xs cursor-pointer"
            >
              <X className="w-3 h-3" />
              <span>Clear</span>
            </button>
          </div>
        </div>
      )}

      <main>
        {/* =====================================================================
            SLIDE 1 — HERO BANNER (#153358 Navy)
        ====================================================================== */}
        <section
          id="slide-1"
          className={`relative bg-[#153358] text-white pt-6 pb-16 sm:pt-10 sm:pb-24 px-6 overflow-hidden ${
            inspectorMode ? 'inspector-grid-dark' : ''
          }`}
        >
          {/* 4 Corner Sticker Badges */}
          <div className="max-w-6xl mx-auto relative">
            {/* Top-Left Sticker: Arduino / Firmware */}
            <div className="hidden md:flex sticker-badge absolute top-2 left-0 w-20 h-20 rounded-2xl bg-white text-[#153358] border-2 border-white shadow-[0_12px_28px_rgba(0,0,0,0.22)] flex-col items-center justify-center -rotate-12 p-2">
              <Cpu className="w-7 h-7" />
              <span className="font-oswald text-[10px] font-bold uppercase mt-1">ARDUINO</span>
            </div>

            {/* Top-Right Sticker: SOLIDWORKS 3D CAD */}
            <div className="hidden md:flex sticker-badge absolute top-2 right-0 w-20 h-20 rounded-2xl bg-white text-[#153358] border-2 border-white shadow-[0_12px_28px_rgba(0,0,0,0.22)] flex-col items-center justify-center rotate-12 p-2">
              <Box className="w-7 h-7" />
              <span className="font-oswald text-[10px] font-bold uppercase mt-1">3D CAD</span>
            </div>

            {/* Bottom-Left Sticker: C & Electronics */}
            <div className="hidden md:flex sticker-badge absolute bottom-2 left-4 w-20 h-20 rounded-full bg-white text-[#153358] border-2 border-white shadow-[0_12px_28px_rgba(0,0,0,0.22)] flex-col items-center justify-center -rotate-6 p-2">
              <Code2 className="w-6 h-6" />
              <span className="font-oswald text-[10px] font-bold uppercase mt-1">C / ECE</span>
            </div>

            {/* Bottom-Right Sticker: SIH 2026 Top 100 */}
            <div className="hidden md:flex sticker-badge absolute bottom-2 right-4 w-20 h-20 rounded-2xl bg-white text-[#153358] border-2 border-white shadow-[0_12px_28px_rgba(0,0,0,0.22)] flex-col items-center justify-center rotate-6 p-2">
              <Award className="w-6 h-6" />
              <span className="font-oswald text-[10px] font-bold uppercase mt-1 text-center leading-tight">SIH TOP 100</span>
            </div>

            {/* Arched White "Portfolio" SVG Title curving over portrait */}
            <div className="flex flex-col items-center justify-center relative pt-2">
              <svg
                viewBox="0 0 800 185"
                className="w-full max-w-[680px] h-auto overflow-visible -mb-10 sm:-mb-14 pointer-events-none select-none"
                aria-label="Portfolio"
              >
                <defs>
                  <path id="hero-arch-curve" d="M 70,175 Q 400,25 730,175" />
                </defs>
                <text
                  fill="#FFFFFF"
                  className="font-fraunces font-bold"
                  fontSize="112"
                  textAnchor="middle"
                >
                  <textPath href="#hero-arch-curve" startOffset="50%">
                    Portfolio
                  </textPath>
                </text>
              </svg>

              {/* Center Portrait (#profile-photo) + Radiating Callouts */}
              <div className="relative w-full max-w-4xl flex items-center justify-center py-4">
                {/* Radiating Skill Callouts on Desktop */}
                {HERO_CALLOUTS.map((callout) => (
                  <div
                    key={callout.label}
                    className={`hidden md:flex flex-col items-center gap-1 absolute ${callout.position} pointer-events-none`}
                  >
                    <span className="text-xs font-medium tracking-wide text-[#D0DAE6] bg-[#0E2440]/80 border border-[#2E5280] px-3 py-1 rounded-full">
                      {callout.label}
                    </span>
                    <svg viewBox="0 0 88 32" className="w-16 h-6 text-[#D0DAE6]/70" fill="none">
                      <path d={callout.arrow} stroke="currentColor" strokeWidth="1.3" strokeDasharray="3 3" />
                    </svg>
                  </div>
                ))}

                {/* Centered Portrait Cutout Frame */}
                <div className="relative z-10 w-64 h-80 sm:w-72 sm:h-96 rounded-t-full rounded-b-3xl bg-white p-2 shadow-[0_18px_42px_rgba(0,0,0,0.32)] group">
                  <div className="w-full h-full rounded-t-full rounded-b-2xl overflow-hidden bg-[#0E2440] relative">
                    <img
                      id="profile-photo"
                      src={customPhoto ?? PROFILE_DATA.photoUrl}
                      alt="Krisha Patel portrait"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-[50%_32%] scale-[1.18] transition-transform duration-300 group-hover:scale-[1.24]"
                    />

                    {/* Bottom Name Banner */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#153358] via-[#153358]/80 to-transparent pt-10 pb-3 px-4 text-center">
                      <p className="font-oswald text-xl uppercase tracking-wide text-white">
                        {PROFILE_DATA.fullName}
                      </p>
                      <p className="text-[11px] text-[#D0DAE6]">
                        B.Tech ECE · Karnavati University
                      </p>
                    </div>

                    {/* On-hover photo upload preview */}
                    <div className="absolute top-4 inset-x-0 flex justify-center gap-2 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                      <button
                        type="button"
                        onClick={() => photoInputRef.current?.click()}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold rounded-full bg-white text-[#153358] shadow-lg cursor-pointer"
                      >
                        <Camera className="w-3.5 h-3.5" />
                        <span>Upload Photo</span>
                      </button>
                      {customPhoto && (
                        <button
                          type="button"
                          onClick={() => setCustomPhoto(null)}
                          aria-label="Reset photo"
                          className="p-1.5 rounded-full bg-[#153358] text-white shadow-lg cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <input
                  ref={photoInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  aria-label="Upload custom profile photo preview"
                />
              </div>

              {/* Mobile Callout Summary + Hero Actions */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsQuickSummaryOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#153358] font-semibold text-xs uppercase tracking-wider hover:bg-[#F4F4F2] transition-colors cursor-pointer shadow-lg"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>30s Professor Summary</span>
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection('slide-5')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0E2440] border border-[#2E5280] text-white font-semibold text-xs uppercase tracking-wider hover:border-white transition-colors cursor-pointer"
                >
                  <span>Explore Projects</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {inspectorMode && (
              <p className="mt-6 text-center font-mono-data text-[11px] text-[#D0DAE6]">
                INSPECTOR NOTE: SVG textPath arch + centered cutout polaroid frame + 4 CSS-rotated sticker badges.
              </p>
            )}
          </div>
        </section>

        {/* =====================================================================
            SLIDE 2 — ABOUT ME (#F4F4F2 Off-White)
        ====================================================================== */}
        <section
          id="slide-2"
          className={`relative bg-[#F4F4F2] text-[#153358] py-20 px-6 overflow-hidden ${
            inspectorMode ? 'inspector-grid-light' : ''
          }`}
        >
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
            {/* Left Column: Tilted Polaroid Card + Rotating Stamp */}
            <div className="lg:col-span-5 flex items-center justify-center relative py-4">
              <CircularStamp
                variant="on-light"
                className="w-56 h-56 absolute -top-6 -left-4 opacity-60"
              />

              <div className="polaroid-frame relative z-10 p-4 pb-8 w-72 sm:w-80 -rotate-3 hover:rotate-0">
                <div className="w-full aspect-[4/4] overflow-hidden bg-[#153358]">
                  <img
                    src={customPhoto ?? PROFILE_DATA.photoUrl}
                    alt="Krisha Patel workspace portrait"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-[50%_30%] scale-125"
                  />
                </div>
                <div className="pt-4 flex items-center justify-between text-xs text-[#3A434E]">
                  <span className="font-fraunces font-semibold text-base text-[#153358]">
                    Krisha Patel
                  </span>
                  <span className="font-mono-data">{PROFILE_DATA.location}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Bold Navy "About me" Header + 2 Engaging Paragraphs */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="font-oswald text-4xl sm:text-5xl font-bold uppercase tracking-[-0.01em] leading-[1.02] text-[#153358]">
                About me
              </h2>

              <div className="space-y-4 text-[15px] text-[#3A434E] leading-[1.6]">
                <p>{PROFILE_DATA.summary}</p>
                <p>
                  Beyond core circuit prototyping in Arduino and C programming, I actively apply 3D parametric modeling in SOLIDWORKS to real engineering builds such as a multi-rotor Quadcopter airframe, and bring clear multi-channel communication from my experience as Social Media Manager at Paaji Ki Kaksha. I speak {PROFILE_DATA.languages.join(', ')}.
                </p>
              </div>

              <div className="pt-4 border-t border-[#D8DCE3] grid grid-cols-1 sm:grid-cols-3 gap-4">
                {PROCESS_STEPS.slice(0, 3).map((step) => (
                  <div key={step.step}>
                    <p className="font-oswald text-lg font-bold text-[#153358]">
                      {step.step}. {step.title}
                    </p>
                    <p className="text-xs text-[#3A434E] mt-1 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            SLIDE 3 — EDUCATION BACKGROUND (#153358 Navy)
        ====================================================================== */}
        <section
          id="slide-3"
          className={`relative bg-[#153358] text-white py-20 px-6 overflow-hidden ${
            inspectorMode ? 'inspector-grid-dark' : ''
          }`}
        >
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative">
            {/* Left Column: Stacked Headline + Tilted Polaroid */}
            <div className="lg:col-span-4 space-y-8">
              <h2 className="font-oswald text-4xl sm:text-5xl font-bold uppercase tracking-[-0.01em] leading-[1.02] text-white">
                Education
                <br />
                Background
              </h2>

              <div className="polaroid-frame p-3.5 pb-6 w-64 -rotate-[5deg] hover:rotate-0 text-[#153358]">
                <div className="bg-[#0E2440] text-white p-5 aspect-[4/3] flex flex-col justify-between">
                  <GraduationCap className="w-8 h-8 text-white" />
                  <div>
                    <p className="font-oswald text-lg uppercase">Karnavati University</p>
                    <p className="text-xs text-[#D0DAE6] mt-0.5">
                      B.Tech Electronics &amp; Communication Engineering
                    </p>
                  </div>
                </div>
                <p className="pt-3 font-mono-data text-xs font-semibold text-[#153358]">
                  GANDHINAGAR · EXPECTED 2030
                </p>
              </div>
            </div>

            {/* Center Column: Overlapping Polaroid Card */}
            <div className="lg:col-span-3 flex justify-center">
              <div className="polaroid-frame p-3.5 pb-6 w-64 rotate-3 hover:rotate-0 text-[#153358]">
                <div className="bg-[#F4F4F2] border border-[#D8DCE3] p-5 aspect-[4/3] flex flex-col justify-between">
                  <Award className="w-8 h-8 text-[#153358]" />
                  <div>
                    <p className="font-oswald text-lg uppercase text-[#153358]">
                      Campus Milestones
                    </p>
                    <p className="text-xs text-[#3A434E] mt-1">
                      SIH 2026 Top 100 · IIT Bombay Techfest Workshop · Cultural Club
                    </p>
                  </div>
                </div>
                <p className="pt-3 font-mono-data text-xs font-semibold text-[#153358]">
                  ACTIVE COHORT 2026
                </p>
              </div>
            </div>

            {/* Right Column: Clean Vertical Timeline */}
            <div className="lg:col-span-5 space-y-6 border-l border-white/25 pl-6 sm:pl-8">
              {EDUCATION_DATA.map((edu) => (
                <div key={edu.degree} className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[31px] sm:-left-[39px] top-2 w-3 h-3 rounded-full bg-white border-2 border-[#153358]"
                  />
                  <p className="font-oswald text-2xl sm:text-3xl font-semibold text-white">
                    {edu.period}
                  </p>
                  <h3 className="text-base font-semibold text-white mt-1">{edu.degree}</h3>
                  <p className="text-sm text-[#D0DAE6] mt-0.5">
                    {edu.institution}, {edu.location}
                    {edu.detail ? ` — ${edu.detail}` : ''}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================================
            SLIDE 4 — SKILLS, TOOLS & VERIFIED CERTIFICATIONS (#F4F4F2 Off-White)
        ====================================================================== */}
        <section
          id="slide-4"
          className={`relative bg-[#F4F4F2] text-[#153358] py-20 px-6 overflow-hidden ${
            inspectorMode ? 'inspector-grid-light' : ''
          }`}
        >
          <div className="max-w-6xl mx-auto space-y-14">
            {/* Top Row: Header + Clickable Tool Icons */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-2">
                  <h2 className="font-oswald text-4xl sm:text-5xl font-bold uppercase tracking-[-0.01em] leading-[1.02] text-[#153358]">
                    Skills &amp; Expertise
                  </h2>
                  <p className="text-[14px] text-[#3A434E]">
                    Click any tool or capability badge below to highlight every project, experience role, and certificate where it was applied across all slides.
                  </p>
                </div>

                {/* Interactive Square Tool & Skill Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {SKILLS_DATA.slice(0, 9).map((skill) => {
                    const { code, icon } = getSkillCodeAndIcon(skill.name);
                    const isActive = activeSkillTrace === skill.name;

                    return (
                      <button
                        key={skill.name}
                        type="button"
                        onClick={() => handleToggleSkillTrace(skill.name)}
                        aria-pressed={isActive}
                        className={`p-3.5 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                          isActive
                            ? 'bg-[#153358] text-white border-[#153358] shadow-lg'
                            : 'bg-white text-[#153358] border-[#D8DCE3] hover:border-[#153358]'
                        }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-lg flex flex-col items-center justify-center shrink-0 font-oswald text-xs font-bold ${
                            isActive
                              ? 'bg-white text-[#153358]'
                              : 'bg-[#153358] text-white'
                          }`}
                        >
                          {icon}
                          <span className="text-[8px] leading-none mt-0.5">{code}</span>
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold leading-tight truncate">{skill.name}</p>
                          <p
                            className={`text-[10px] mt-0.5 truncate ${
                              isActive ? 'text-[#D0DAE6]' : 'text-[#64748B]'
                            }`}
                          >
                            {skill.category}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Capability Pillars + Bottom-Peeking Portrait Frame */}
              <div className="lg:col-span-5 bg-white border border-[#D8DCE3] rounded-2xl p-6 pb-0 overflow-hidden shadow-[0_12px_28px_rgba(21,51,88,0.08)] flex flex-col justify-between">
                <div className="space-y-4">
                  <p className="font-oswald text-xl uppercase font-bold text-[#153358]">
                    Core Engineering &amp; Strategy Pillars
                  </p>
                  <ul className="space-y-2 text-sm text-[#3A434E]">
                    <li>• 3D Mechanical Modeling &amp; Assemblies (SOLIDWORKS 2024)</li>
                    <li>• Embedded Microcontroller Firmware (Arduino &amp; C)</li>
                    <li>• AI Foundations &amp; Applied Automation Concepts</li>
                    <li>• Social Media Marketing &amp; Content Strategy</li>
                  </ul>
                </div>

                <div className="mt-6 flex justify-center">
                  <div className="w-48 h-44 rounded-t-full overflow-hidden border-4 border-[#153358] border-b-0 bg-[#153358]">
                    <img
                      src={customPhoto ?? PROFILE_DATA.photoUrl}
                      alt="Krisha Patel profile accent"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-[50%_30%] scale-125"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Verified Certifications 3D Flip Grid */}
            <div className="pt-8 border-t border-[#D8DCE3] space-y-6">
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <div>
                  <h3 className="font-oswald text-2xl sm:text-3xl font-bold uppercase text-[#153358] flex items-center gap-2">
                    <ShieldCheck className="w-6 h-6" />
                    <span>Verified Certifications ({CERTIFICATIONS_DATA.length})</span>
                  </h3>
                  <p className="text-xs text-[#3A434E] mt-1">
                    Click any card to flip for coursework highlights, or open the original attached document.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {CERTIFICATIONS_DATA.map((cert) => {
                  const matchesTrace =
                    !activeSkillTrace || cert.linkedSkills.includes(activeSkillTrace);

                  return (
                    <CredentialVaultCard
                      key={cert.id}
                      cert={cert}
                      isHighlighted={Boolean(activeSkillTrace && matchesTrace)}
                      isDimmed={Boolean(activeSkillTrace && !matchesTrace)}
                      onInspectDocument={(c) => setSelectedCert(c)}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            SLIDE 5 — PREVIOUS PROJECTS SHOWCASE (#153358 Navy)
        ====================================================================== */}
        <section
          id="slide-5"
          className={`relative bg-[#153358] text-white py-20 px-6 overflow-hidden ${
            inspectorMode ? 'inspector-grid-dark' : ''
          }`}
        >
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            {/* Left Column: Featured Project Details + Oversized "PREVIOUS PROJECTS" */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <span className="font-mono-data text-xs uppercase tracking-wider text-[#D0DAE6]">
                  Selected Spotlight · {featuredProject.index}
                </span>
                <h3 className="font-oswald text-2xl sm:text-3xl font-bold uppercase text-white">
                  {featuredProject.title}
                </h3>
                <p className="text-sm text-[#D0DAE6] leading-relaxed">
                  {featuredProject.summary}
                </p>
                <ul className="space-y-2 text-sm text-[#D0DAE6]">
                  {featuredProject.technicalDetails.map((detail) => (
                    <li key={detail} className="flex items-start gap-2">
                      <span className="text-white font-bold">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedProject(featuredProject)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#153358] font-semibold text-xs uppercase tracking-wider hover:bg-[#F4F4F2] transition-colors cursor-pointer"
                  >
                    <span>Open Case Study Sandbox</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <h2 className="font-oswald text-5xl sm:text-6xl font-bold uppercase tracking-[-0.01em] leading-[0.95] text-white pt-4">
                Previous
                <br />
                Projects
              </h2>
            </div>

            {/* Right Column: Interactive Visual Grid of Project Cards (border-radius: 6px) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PROJECTS_DATA.map((project, idx) => {
                const matchesTrace =
                  !activeSkillTrace || project.linkedSkills.includes(activeSkillTrace);
                const isFirstWide = idx === 0;

                return (
                  <article
                    key={project.id}
                    onMouseEnter={() => setFeaturedProjectId(project.id)}
                    onClick={() => setSelectedProject(project)}
                    className={`rounded-[6px] bg-[#0E2440] border p-4 flex flex-col justify-between gap-3 cursor-pointer transition-all ${
                      isFirstWide ? 'sm:col-span-2' : ''
                    } ${
                      activeSkillTrace && matchesTrace
                        ? 'border-white ring-2 ring-white'
                        : activeSkillTrace && !matchesTrace
                        ? 'opacity-35 border-[#2E5280]'
                        : 'border-[#2E5280] hover:border-white'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <p className="font-mono-data text-[10px] text-[#D0DAE6]">
                          {project.index} · {project.status.toUpperCase()}
                        </p>
                        <h3 className="font-oswald text-lg uppercase font-bold text-white">
                          {project.title}
                        </h3>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-[#D0DAE6] shrink-0" />
                    </div>

                    <div className="h-44">
                      <ProjectInteractiveVisual project={project} compact />
                    </div>

                    <p className="text-[11px] text-[#D0DAE6]">
                      {project.tools.join(' · ')}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* =====================================================================
            SLIDE 6 — PROFILES & IMPACT (#F4F4F2 Off-White)
        ====================================================================== */}
        <section
          id="slide-6"
          className={`relative bg-[#F4F4F2] text-[#153358] py-20 px-6 overflow-hidden ${
            inspectorMode ? 'inspector-grid-light' : ''
          }`}
        >
          <div className="max-w-6xl mx-auto space-y-10">
            <h2 className="font-oswald text-4xl sm:text-5xl font-bold uppercase tracking-[-0.01em] leading-[1.02] text-[#153358]">
              Profiles &amp; Impact
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left/Center: Two Overlapping Realistic Smartphone Mockups */}
              <div className="lg:col-span-7 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-0 relative py-4">
                {/* Smartphone 1: LinkedIn & Engineering Profile */}
                <button
                  type="button"
                  onClick={() => setIsQuickSummaryOpen(true)}
                  className="phone-mockup w-60 h-[410px] bg-[#153358] text-white p-4 flex flex-col justify-between text-left sm:-mr-6 z-10 hover:-translate-y-2 transition-transform cursor-pointer"
                >
                  <div className="space-y-3">
                    <div className="w-16 h-1.5 rounded-full bg-white/25 mx-auto" />
                    <div className="flex items-center gap-3 pt-2">
                      <img
                        src={customPhoto ?? PROFILE_DATA.photoUrl}
                        alt="Krisha Patel avatar"
                        referrerPolicy="no-referrer"
                        className="w-11 h-11 rounded-full object-cover object-[50%_30%] border-2 border-white"
                      />
                      <div>
                        <p className="font-oswald text-sm uppercase font-bold">Krisha Patel</p>
                        <p className="text-[10px] text-[#D0DAE6]">B.Tech ECE · Karnavati Univ.</p>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-[#0E2440] border border-[#2E5280] space-y-1">
                      <p className="font-mono-data text-[10px] text-[#D0DAE6]">ACTIVE CAD BUILD</p>
                      <p className="text-xs font-semibold">Quadcopter 3D Design in SOLIDWORKS</p>
                    </div>

                    <div className="p-3 rounded-xl bg-[#0E2440] border border-[#2E5280] space-y-1">
                      <p className="font-mono-data text-[10px] text-[#D0DAE6]">VERIFIED RECOGNITION</p>
                      <p className="text-xs font-semibold">SIH 2026 Top 100 · Team RuptureX</p>
                    </div>
                  </div>

                  <div className="text-center pt-2 border-t border-[#2E5280]">
                    <span className="text-[11px] font-semibold text-white">
                      Tap for 30s Executive Brief
                    </span>
                  </div>
                </button>

                {/* Smartphone 2: Paaji Ki Kaksha Brand Strategy */}
                <button
                  type="button"
                  onClick={() => scrollToSection('slide-8')}
                  className="phone-mockup w-60 h-[410px] bg-white text-[#153358] p-4 flex flex-col justify-between text-left sm:mt-10 z-20 hover:-translate-y-2 transition-transform cursor-pointer"
                >
                  <div className="space-y-3">
                    <div className="w-16 h-1.5 rounded-full bg-[#153358]/20 mx-auto" />
                    <div className="pt-2">
                      <p className="font-mono-data text-[10px] text-[#3A434E]">MAY – SEP 2026</p>
                      <p className="font-oswald text-lg uppercase font-bold text-[#153358]">
                        Paaji Ki Kaksha
                      </p>
                      <p className="text-xs text-[#3A434E]">Social Media Manager</p>
                    </div>

                    <div className="p-3 rounded-xl bg-[#F4F4F2] border border-[#D8DCE3] space-y-1.5 text-xs text-[#3A434E]">
                      <p>• Multi-channel content planning</p>
                      <p>• Classroom-aligned storytelling</p>
                      <p>• Engagement metrics analysis</p>
                    </div>

                    <div className="p-3 rounded-xl bg-[#153358] text-white space-y-1">
                      <p className="font-mono-data text-[10px] text-[#D0DAE6]">STACK</p>
                      <p className="text-xs font-semibold">Canva · Content Strategy · Analytics</p>
                    </div>
                  </div>

                  <div className="text-center pt-2 border-t border-[#E2E6EC]">
                    <span className="text-[11px] font-semibold text-[#153358]">
                      Tap for Full Experience
                    </span>
                  </div>
                </button>
              </div>

              {/* Right Column: Oversized Navy Stats + Social Icon Buttons */}
              <div className="lg:col-span-5 space-y-8">
                <div className="space-y-5">
                  {IMPACT_METRICS.map((item) => (
                    <div key={item.stat} className="flex items-baseline gap-4 border-b border-[#D8DCE3] pb-3">
                      <span className="font-oswald text-3xl sm:text-4xl font-bold text-[#153358] shrink-0">
                        {item.stat}
                      </span>
                      <p className="text-sm text-[#3A434E] leading-snug">{item.label}</p>
                    </div>
                  ))}
                </div>

                {/* Square Social / Link Icon Buttons */}
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={PROFILE_DATA.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#153358] text-white text-xs font-semibold hover:bg-[#0E2440] transition-colors"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setIsResumeOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white border border-[#153358] text-[#153358] text-xs font-semibold hover:bg-[#EEF2F7] transition-colors cursor-pointer"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Resume PDF</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsContactOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white border border-[#153358] text-[#153358] text-xs font-semibold hover:bg-[#EEF2F7] transition-colors cursor-pointer"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Email</span>
                  </button>

                  {editingSocialKey === 'GitHub' ? (
                    <form
                      onSubmit={(e) => handleSaveSocial('GitHub', e)}
                      className="flex items-center gap-1.5"
                    >
                      <input
                        type="url"
                        value={socialDraft}
                        onChange={(e) => setSocialDraft(e.target.value)}
                        placeholder="https://github.com/..."
                        className="px-3 py-2 text-xs rounded-lg bg-white border border-[#153358] text-[#153358] w-44 focus:outline-none"
                      />
                      <button
                        type="submit"
                        className="px-3 py-2 text-xs rounded-lg bg-[#153358] text-white font-semibold cursor-pointer"
                      >
                        Save
                      </button>
                    </form>
                  ) : socialLinks.GitHub ? (
                    <a
                      href={socialLinks.GitHub}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#153358] text-white text-xs font-semibold"
                    >
                      <Link2 className="w-4 h-4" />
                      <span>GitHub</span>
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingSocialKey('GitHub');
                        setSocialDraft('');
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-white border border-dashed border-[#153358] text-[#153358] text-xs font-semibold cursor-pointer"
                    >
                      <Link2 className="w-4 h-4" />
                      <span>GitHub [Add Link]</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            SLIDE 7 — FEATURED WORK & BRANDS (#153358 Navy)
        ====================================================================== */}
        <section
          id="slide-7"
          className={`relative bg-[#153358] text-white py-20 px-6 overflow-hidden ${
            inspectorMode ? 'inspector-grid-dark' : ''
          }`}
        >
          <div className="max-w-6xl mx-auto space-y-10">
            {/* Top Row: Oversized Headline flanked by White Pill Badges */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <h2 className="font-oswald text-4xl sm:text-6xl font-bold uppercase tracking-[-0.01em] leading-[1.0] text-white">
                Featured Work
              </h2>

              <div className="flex flex-wrap items-center gap-3">
                {['Karnavati University', 'Team RuptureX · SIH 2026', 'Paaji Ki Kaksha'].map(
                  (org) => (
                    <span
                      key={org}
                      className="px-5 py-2 rounded-full bg-white text-[#153358] font-oswald text-sm uppercase font-bold tracking-wide shadow-md"
                    >
                      {org}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Center Showcase: Row of 5 Vertical 9:16 Rounded-Rectangle Preview Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {PROJECTS_DATA.map((project) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  className="group aspect-[9/15] rounded-2xl bg-[#0E2440] border-2 border-white/25 hover:border-white p-4 flex flex-col justify-between text-left transition-all hover:-translate-y-1.5 cursor-pointer"
                >
                  <div className="flex items-center justify-between text-[10px] font-mono-data text-[#D0DAE6]">
                    <span>{project.index}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:text-white" />
                  </div>

                  <div className="space-y-2">
                    <p className="text-[10px] uppercase tracking-wider text-[#D0DAE6]">
                      {project.category}
                    </p>
                    <h3 className="font-oswald text-lg uppercase font-bold text-white leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-xs text-[#D0DAE6] line-clamp-3 leading-relaxed">
                      {project.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#2E5280] text-[10px] font-mono-data text-white">
                    {project.tools[0]}
                  </div>
                </button>
              ))}
            </div>

            {/* Bottom Row: 3 White Organization / Program Pill Badges */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              {['SOLIDWORKS 2024', 'IIT Bombay Techfest', 'Jio Institute AI'].map((item) => (
                <span
                  key={item}
                  className="px-5 py-2 rounded-full bg-white text-[#153358] font-oswald text-xs uppercase font-bold tracking-wider"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================================
            SLIDE 8 — WORKING EXPERIENCE (#F4F4F2 Off-White)
        ====================================================================== */}
        <section
          id="slide-8"
          className={`relative bg-[#F4F4F2] text-[#153358] py-20 px-6 overflow-hidden ${
            inspectorMode ? 'inspector-grid-light' : ''
          }`}
        >
          <div className="max-w-6xl mx-auto space-y-12">
            <h2 className="font-oswald text-4xl sm:text-5xl font-bold uppercase tracking-[-0.01em] leading-[1.02] text-[#153358]">
              Working
              <br />
              Experience
            </h2>

            {/* 3-Column Chronological Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-[#D8DCE3] pt-8">
              {/* Column 1: Paaji Ki Kaksha */}
              <div className="space-y-3">
                <p className="font-oswald text-3xl font-bold text-[#153358]">MAY–SEP 2026</p>
                <h3 className="text-[13px] font-bold uppercase tracking-wider text-[#153358]">
                  SOCIAL MEDIA MANAGER — PAAJI KI KAKSHA, AHMEDABAD
                </h3>
                <p className="text-[14px] text-[#3A434E] leading-[1.6]">
                  Coordinated social media content management across multiple channels to enhance brand visibility. Crafted classroom-aligned captions and stories, managed scheduling calendars, and analyzed audience engagement metrics.
                </p>
              </div>

              {/* Column 2: Smart India Hackathon 2026 */}
              <div className="space-y-3">
                <p className="font-oswald text-3xl font-bold text-[#153358]">SEP 2026</p>
                <h3 className="text-[13px] font-bold uppercase tracking-wider text-[#153358]">
                  TEAM RUPTUREX — SMART INDIA HACKATHON 2026
                </h3>
                <p className="text-[14px] text-[#3A434E] leading-[1.6]">
                  Contributed to Team RuptureX during the Preliminary Smart India Hackathon 2026 held at Karnavati University, Gandhinagar—proudly nominated among the Top 100 Teams representing the university.
                </p>
              </div>

              {/* Column 3: Techfest & Campus Activities */}
              <div className="space-y-3">
                <p className="font-oswald text-3xl font-bold text-[#153358]">2024–2026</p>
                <h3 className="text-[13px] font-bold uppercase tracking-wider text-[#153358]">
                  HACKATHONS, TECHFEST &amp; CULTURAL CLUB
                </h3>
                <p className="text-[14px] text-[#3A434E] leading-[1.6]">
                  Secured 52nd rank in a first hackathon, participated in an IIT Bombay Techfest workshop, and volunteered actively with the Cultural Club while building foundational ECE hardware prototypes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            SLIDE 9 — PASSION PROJECT / CAPSTONE SPOTLIGHT (#153358 Navy)
        ====================================================================== */}
        <section
          id="slide-9"
          className={`relative bg-[#153358] text-white py-20 px-6 overflow-hidden ${
            inspectorMode ? 'inspector-grid-dark' : ''
          }`}
        >
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative">
            <CircularStamp
              variant="on-navy"
              className="w-52 h-52 absolute -bottom-10 -right-4 opacity-70"
            />

            {/* Left Column: PASSION PROJECT Header + Framed Laptop/Widescreen Showcase */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="font-oswald text-4xl sm:text-5xl font-bold uppercase tracking-[-0.01em] leading-[1.02] text-white">
                Passion Project
              </h2>

              {/* Widescreen / Laptop Showcase Card */}
              <div className="rounded-2xl bg-[#0B1B30] border-4 border-white/20 p-4 shadow-2xl">
                <div className="flex items-center gap-1.5 pb-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-white/30" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/30" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/30" />
                  <span className="ml-2 font-mono-data text-[10px] text-[#D0DAE6]">
                    SOLIDWORKS 2024 · ACTIVE CAPSTONE
                  </span>
                </div>
                <ProjectInteractiveVisual project={PROJECTS_DATA[0]} />
              </div>
            </div>

            {/* Right Column: Project Narrative */}
            <div className="lg:col-span-5 space-y-5 relative z-10">
              <h3 className="font-oswald text-2xl uppercase font-bold tracking-wide text-white">
                {PROJECTS_DATA[0].title}
              </h3>
              <p className="text-[15px] text-[#D0DAE6] leading-[1.6]">
                {PROJECTS_DATA[0].problem}
              </p>
              <p className="text-[15px] text-[#D0DAE6] leading-[1.6]">
                {PROJECTS_DATA[0].architecture}
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedProject(PROJECTS_DATA[0])}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#153358] font-semibold text-xs uppercase tracking-wider hover:bg-[#F4F4F2] transition-colors cursor-pointer"
                >
                  <span>Inspect CAD Case Study</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            SLIDE 10 — FOOTER & CONTACT (#F4F4F2 Off-White)
        ====================================================================== */}
        <footer
          id="slide-10"
          className={`relative bg-[#F4F4F2] text-[#153358] py-20 px-6 overflow-hidden ${
            inspectorMode ? 'inspector-grid-light' : ''
          }`}
        >
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            {/* Left/Center: Massive Stacked Bold Navy Headline */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="font-oswald text-4xl sm:text-6xl font-bold uppercase tracking-[-0.01em] leading-[0.98] text-[#153358]">
                Let&apos;s work together
                <br />
                and create
                <br />
                something great!
              </h2>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsContactOpen(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#153358] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#0E2440] transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Me a Message</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsResumeOpen(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-[#153358] text-[#153358] text-xs font-semibold uppercase tracking-wider hover:bg-[#EEF2F7] transition-colors cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Download Formatted Resume</span>
                </button>
              </div>
            </div>

            {/* Bottom-Right Contact Lockup */}
            <div className="lg:col-span-5 space-y-3 text-xs font-semibold uppercase tracking-wider text-[#153358]">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="flex items-center gap-3 py-2 border-b border-[#D8DCE3] w-full text-left hover:opacity-75 transition-opacity cursor-pointer"
              >
                {copiedEmail ? <Check className="w-4 h-4 shrink-0" /> : <Mail className="w-4 h-4 shrink-0" />}
                <span>{copiedEmail ? 'COPIED TO CLIPBOARD' : PROFILE_DATA.email}</span>
              </button>

              <a
                href={`tel:${PROFILE_DATA.phone}`}
                className="flex items-center gap-3 py-2 border-b border-[#D8DCE3] hover:opacity-75 transition-opacity"
              >
                <Phone className="w-4 h-4 shrink-0" />
                <span>+91 {PROFILE_DATA.phone}</span>
              </a>

              <div className="flex items-center gap-3 py-2 border-b border-[#D8DCE3]">
                <MapPin className="w-4 h-4 shrink-0" />
                <span>{PROFILE_DATA.location}</span>
              </div>

              <a
                href={PROFILE_DATA.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 py-2 border-b border-[#D8DCE3] hover:opacity-75 transition-opacity"
              >
                <ArrowUpRight className="w-4 h-4 shrink-0" />
                <span className="truncate">{PROFILE_DATA.linkedinDisplay}</span>
              </a>

              <p className="pt-3 text-[11px] font-normal normal-case tracking-normal text-[#3A434E]">
                © 2026 {PROFILE_DATA.fullName} · Grounded strictly in verified resume &amp; certificate records.
              </p>
            </div>
          </div>
        </footer>
      </main>

      {/* Interactive Modals & Drawers */}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
      <CertificateModal
        certificate={selectedCert}
        onClose={() => setSelectedCert(null)}
      />
      <ProjectModal
        project={selectedProject}
        customUrl={selectedProject ? projectUrls[selectedProject.id] : undefined}
        onSaveUrl={(id, url) =>
          setProjectUrls((prev) => ({ ...prev, [id]: url }))
        }
        onSelectSkill={(skillName) => {
          setActiveSkillTrace(skillName);
          scrollToSection('slide-4');
        }}
        onClose={() => setSelectedProject(null)}
      />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <QuickSummaryModal
        isOpen={isQuickSummaryOpen}
        onClose={() => setIsQuickSummaryOpen(false)}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
      />
      <CommandPaletteModal
        isOpen={isCommandOpen}
        xrayMode={inspectorMode}
        onClose={() => setIsCommandOpen(false)}
        onToggleXray={() => setInspectorMode((prev) => !prev)}
        onOpenQuickSummary={() => setIsQuickSummaryOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
        onJumpToSection={scrollToSection}
        onSelectProject={(proj) => setSelectedProject(proj)}
        onSelectSkill={(skillName) => setActiveSkillTrace(skillName)}
        onSelectCert={(cert) => setSelectedCert(cert)}
      />
    </div>
  );
}
