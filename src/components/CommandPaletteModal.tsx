import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Search,
  X,
  Eye,
  Sparkles,
  FileText,
  FolderGit2,
  ShieldCheck,
  Wrench,
  Compass,
} from 'lucide-react';
import {
  CERTIFICATIONS_DATA,
  CertificationItem,
  PROJECTS_DATA,
  ProjectItem,
  SKILLS_DATA,
} from '../data/portfolioData';

interface CommandItem {
  id: string;
  group: 'Actions' | 'Navigation' | 'Projects' | 'Skills' | 'Credentials';
  title: string;
  subtitle: string;
  onExecute: () => void;
}

interface CommandPaletteModalProps {
  isOpen: boolean;
  xrayMode: boolean;
  onClose: () => void;
  onToggleXray: () => void;
  onOpenQuickSummary: () => void;
  onOpenResume: () => void;
  onOpenContact: () => void;
  onJumpToSection: (id: string) => void;
  onSelectProject: (project: ProjectItem) => void;
  onSelectSkill: (skillName: string) => void;
  onSelectCert: (cert: CertificationItem) => void;
}

export const CommandPaletteModal: React.FC<CommandPaletteModalProps> = ({
  isOpen,
  xrayMode,
  onClose,
  onToggleXray,
  onOpenQuickSummary,
  onOpenResume,
  onOpenContact,
  onJumpToSection,
  onSelectProject,
  onSelectSkill,
  onSelectCert,
}) => {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setActiveIndex(0);
      window.setTimeout(() => inputRef.current?.focus(), 20);
    }
  }, [isOpen]);

  const commands: CommandItem[] = useMemo(() => {
    const baseActions: CommandItem[] = [
      {
        id: 'action-summary',
        group: 'Actions',
        title: 'Professor Quick-Summary Mode (30-Second Pitch)',
        subtitle: 'Synthesized academic, CAD, embedded hardware & leadership overview',
        onExecute: () => {
          onClose();
          onOpenQuickSummary();
        },
      },
      {
        id: 'action-xray',
        group: 'Actions',
        title: xrayMode ? "Disable Professor's X-Ray Mode" : "Enable Professor's X-Ray Mode",
        subtitle: 'Toggle architectural blueprints, DOM telemetry & How-I-Built-This annotations',
        onExecute: () => {
          onToggleXray();
          onClose();
        },
      },
      {
        id: 'action-resume',
        group: 'Actions',
        title: 'Open Printable Resume View',
        subtitle: 'View formatted curriculum vitae, print sheet, or download PDF',
        onExecute: () => {
          onClose();
          onOpenResume();
        },
      },
      {
        id: 'action-contact',
        group: 'Actions',
        title: 'Send Message to Krisha Patel',
        subtitle: 'Compose direct inquiry to krishakp1412@gmail.com',
        onExecute: () => {
          onClose();
          onOpenContact();
        },
      },
    ];

    const navItems: CommandItem[] = [
      { id: 'nav-about', group: 'Navigation', title: 'Jump to About & Education', subtitle: 'B.Tech ECE at Karnavati University · Process 01–05', onExecute: () => { onClose(); onJumpToSection('about'); } },
      { id: 'nav-projects', group: 'Navigation', title: 'Jump to Projects & Sandboxes', subtitle: 'SOLIDWORKS Quadcopter, Arduino & AI Concepts', onExecute: () => { onClose(); onJumpToSection('projects'); } },
      { id: 'nav-experience', group: 'Navigation', title: 'Jump to Experience', subtitle: 'Social Media Manager — Paaji Ki Kaksha', onExecute: () => { onClose(); onJumpToSection('experience'); } },
      { id: 'nav-skills', group: 'Navigation', title: 'Jump to Skills Matrix', subtitle: 'Filter & cross-highlight technical & creative skills', onExecute: () => { onClose(); onJumpToSection('skills'); } },
      { id: 'nav-credentials', group: 'Navigation', title: 'Jump to Credential Vault', subtitle: '5 interactive 3D flip certificates', onExecute: () => { onClose(); onJumpToSection('credentials'); } },
    ];

    const projectItems: CommandItem[] = PROJECTS_DATA.map((p) => ({
      id: `proj-${p.id}`,
      group: 'Projects',
      title: `${p.index}. ${p.title}`,
      subtitle: `${p.status} · ${p.tools.join(' · ')}`,
      onExecute: () => {
        onClose();
        onSelectProject(p);
      },
    }));

    const skillItems: CommandItem[] = SKILLS_DATA.map((s) => ({
      id: `skill-${s.name}`,
      group: 'Skills',
      title: `Highlight Skill: ${s.name}`,
      subtitle: `${s.category} · ${s.sourceNote}`,
      onExecute: () => {
        onClose();
        onSelectSkill(s.name);
        onJumpToSection('skills');
      },
    }));

    const certItems: CommandItem[] = CERTIFICATIONS_DATA.map((c) => ({
      id: `cert-${c.id}`,
      group: 'Credentials',
      title: c.title,
      subtitle: `${c.issuer} · ${c.date}`,
      onExecute: () => {
        onClose();
        onSelectCert(c);
      },
    }));

    return [...baseActions, ...projectItems, ...skillItems, ...certItems, ...navItems];
  }, [
    xrayMode,
    onClose,
    onToggleXray,
    onOpenQuickSummary,
    onOpenResume,
    onOpenContact,
    onJumpToSection,
    onSelectProject,
    onSelectSkill,
    onSelectCert,
  ]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands.slice(0, 12);
    return commands.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.group.toLowerCase().includes(q)
    );
  }, [commands, query]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((i) => (filtered.length ? (i + 1) % filtered.length : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((i) =>
          filtered.length ? (i - 1 + filtered.length) % filtered.length : 0
        );
      } else if (e.key === 'Enter' && filtered[activeIndex]) {
        e.preventDefault();
        filtered[activeIndex].onExecute();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, filtered, activeIndex, onClose]);

  if (!isOpen) return null;

  const getGroupIcon = (group: CommandItem['group'], id: string) => {
    if (id === 'action-xray') return <Eye className="w-4 h-4 text-sky-400 shrink-0" />;
    if (id === 'action-summary') return <Sparkles className="w-4 h-4 text-[#C81E3A] shrink-0" />;
    if (id === 'action-resume') return <FileText className="w-4 h-4 text-[#C81E3A] shrink-0" />;
    if (group === 'Projects') return <FolderGit2 className="w-4 h-4 text-[#C81E3A] shrink-0" />;
    if (group === 'Skills') return <Wrench className="w-4 h-4 text-[#C81E3A] shrink-0" />;
    if (group === 'Credentials') return <ShieldCheck className="w-4 h-4 text-[#C81E3A] shrink-0" />;
    return <Compass className="w-4 h-4 text-[#9E9AA0] shrink-0" />;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 backdrop-blur-sm pt-16 sm:pt-24 px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-[#121216] border border-white/15 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10 bg-[#16161C]">
          <Search className="w-4 h-4 text-[#9E9AA0] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a skill (SOLIDWORKS, Arduino), project, certificate, or action..."
            className="w-full bg-transparent text-sm text-[#F5F2EB] placeholder:text-[#7E7A82] focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close command palette"
            className="p-1.5 rounded-md text-[#9E9AA0] hover:text-white hover:bg-white/10 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-[56vh] overflow-y-auto divide-y divide-white/5 p-2">
          {filtered.length === 0 ? (
            <div className="py-10 text-center text-sm text-[#9E9AA0]">
              No matching skills, projects, or actions for &quot;{query}&quot;.
            </div>
          ) : (
            filtered.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={item.onExecute}
                onMouseEnter={() => setActiveIndex(idx)}
                className={`w-full text-left px-3.5 py-3 rounded-xl flex items-center justify-between gap-4 transition-colors cursor-pointer ${
                  idx === activeIndex ? 'bg-white/10' : 'hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  {getGroupIcon(item.group, item.id)}
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-[#F5F2EB] truncate">{item.title}</p>
                    <p className="text-xs text-[#9E9AA0] truncate">{item.subtitle}</p>
                  </div>
                </div>
                <span className="font-mono-data text-[11px] text-[#9E9AA0] shrink-0">
                  {item.group}
                </span>
              </button>
            ))
          )}
        </div>

        <div className="flex items-center justify-between px-4 py-2.5 bg-[#16161C] border-t border-white/10 text-[11px] font-mono-data text-[#9E9AA0]">
          <span>↑↓ Navigate · Enter Execute · Esc Close</span>
          <span>Ctrl+K / Cmd+K</span>
        </div>
      </div>
    </div>
  );
};
