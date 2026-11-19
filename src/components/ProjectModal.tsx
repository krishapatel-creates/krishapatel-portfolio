import React, { useEffect, useState } from 'react';
import { X, Link2, ExternalLink, Check, Terminal } from 'lucide-react';
import { ProjectItem } from '../data/portfolioData';
import { ProjectInteractiveVisual } from './ProjectInteractiveVisual';

interface ProjectModalProps {
  project: ProjectItem | null;
  customUrl?: string;
  onSaveUrl: (projectId: string, url: string) => void;
  onSelectSkill: (skillName: string) => void;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  customUrl,
  onSaveUrl,
  onSelectSkill,
  onClose,
}) => {
  const [editingLink, setEditingLink] = useState(false);
  const [urlInput, setUrlInput] = useState(customUrl ?? '');

  useEffect(() => {
    setUrlInput(customUrl ?? '');
    setEditingLink(false);
  }, [project, customUrl]);

  useEffect(() => {
    if (!project) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [project, onClose]);

  if (!project) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveUrl(project.id, urlInput.trim());
    setEditingLink(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl h-full bg-[#121216] border-l border-white/15 shadow-2xl overflow-y-auto flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 px-6 py-5 bg-[#16161C]/95 backdrop-blur-md border-b border-white/10">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#9E9AA0]">
              <span className="font-mono-data text-[#C81E3A]">{project.index}</span>
              <span aria-hidden="true">·</span>
              <span>Case Study Sandbox</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#E5E0D8]">{project.status}</span>
            </div>
            <h2 id="project-modal-title" className="text-xl sm:text-2xl font-semibold text-[#F5F2EB]">
              {project.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close case study drawer"
            className="p-2 rounded-lg text-[#9E9AA0] hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-6 flex-1">
          {/* Interactive Sandbox Widget */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono-data text-[#9E9AA0]">
              <Terminal className="w-3.5 h-3.5 text-[#C81E3A]" />
              <span>Interactive Concept Demo &amp; Live Simulation</span>
            </div>
            <ProjectInteractiveVisual project={project} />
          </div>

          {/* Problem -> Architecture -> Outcome Breakdown */}
          <div className="grid grid-cols-1 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-[#0D0D11] border border-white/10">
              <p className="text-xs font-mono-data text-[#C81E3A] mb-1">01. Problem Framing</p>
              <p className="text-sm text-[#C8C4BC] leading-relaxed">{project.problem}</p>
            </div>
            <div className="p-4 rounded-xl bg-[#0D0D11] border border-white/10">
              <p className="text-xs font-mono-data text-[#C81E3A] mb-1">02. System Architecture</p>
              <p className="text-sm text-[#C8C4BC] leading-relaxed">{project.architecture}</p>
            </div>
            <div className="p-4 rounded-xl bg-[#0D0D11] border border-white/10">
              <p className="text-xs font-mono-data text-[#C81E3A] mb-1">03. Outcome &amp; Progress</p>
              <p className="text-sm text-[#C8C4BC] leading-relaxed">{project.outcome}</p>
            </div>
          </div>

          {/* Technical Implementation Details */}
          <div className="space-y-2.5">
            <h3 className="text-sm font-semibold text-[#F5F2EB]">Technical Notes</h3>
            <ul className="space-y-2">
              {project.technicalDetails.map((detail) => (
                <li key={detail} className="text-sm text-[#9E9AA0] flex items-start gap-2.5">
                  <span className="text-[#C81E3A] font-mono-data text-xs mt-1">—</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Cross-Linked Clickable Skills */}
          <div className="space-y-2 pt-2">
            <p className="text-xs text-[#9E9AA0]">
              Click a skill to highlight its applications across the portfolio:
            </p>
            <div className="flex flex-wrap gap-2">
              {project.linkedSkills.map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => {
                    onSelectSkill(skill);
                    onClose();
                  }}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg bg-white/5 hover:bg-[#C81E3A] text-[#F5F2EB] border border-white/10 hover:border-[#C81E3A] transition-colors cursor-pointer"
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          {/* Repository Link / [Add Link] Footer */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
            <div className="text-xs text-[#9E9AA0]">
              <span className="text-[#F5F2EB] font-medium mr-2">Tools:</span>
              {project.tools.join(' · ')}
            </div>

            {editingLink ? (
              <form onSubmit={handleSave} className="flex items-center gap-2 w-full sm:w-auto">
                <input
                  type="url"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://github.com/..."
                  className="px-3 py-1.5 text-xs bg-[#0B0B0D] border border-white/20 rounded-md text-[#F5F2EB] focus:outline-none focus:border-[#C81E3A] flex-1 sm:w-56"
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md bg-[#C81E3A] hover:bg-[#A6172F] text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Save</span>
                </button>
              </form>
            ) : customUrl ? (
              <div className="flex items-center gap-2">
                <a
                  href={customUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-white/10 hover:bg-white/15 text-[#F5F2EB] transition-colors whitespace-nowrap shrink-0"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#C81E3A]" />
                  <span>Open Repository</span>
                </a>
                <button
                  type="button"
                  onClick={() => setEditingLink(true)}
                  className="text-xs text-[#9E9AA0] hover:text-white underline cursor-pointer"
                >
                  Edit
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setEditingLink(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-[#F5F2EB] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Link2 className="w-3.5 h-3.5 text-[#C81E3A]" />
                <span>[Add Link]</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
