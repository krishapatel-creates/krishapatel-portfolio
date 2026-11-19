import React, { useEffect } from 'react';
import { X, FileText, Send, Award, Cpu, GraduationCap, ShieldCheck } from 'lucide-react';
import { PROFILE_DATA } from '../data/portfolioData';

interface QuickSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
  onOpenContact: () => void;
}

export const QuickSummaryModal: React.FC<QuickSummaryModalProps> = ({
  isOpen,
  onClose,
  onOpenResume,
  onOpenContact,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quick-summary-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#121216] border border-white/15 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 px-6 py-5 bg-[#16161C] border-b border-white/10">
          <div>
            <p className="text-xs font-mono-data text-[#C81E3A] mb-1">
              30-Second Executive Brief · Professor &amp; Recruiter View
            </p>
            <h2 id="quick-summary-title" className="text-xl font-semibold text-[#F5F2EB]">
              {PROFILE_DATA.fullName} — Technical &amp; Academic Snapshot
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close quick summary"
            className="p-2 rounded-lg text-[#9E9AA0] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <p className="text-sm text-[#C8C4BC] leading-relaxed">
            {PROFILE_DATA.summary}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#0D0D11] border border-white/10 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#F5F2EB]">
                <GraduationCap className="w-4 h-4 text-[#C81E3A]" />
                <span>Academic Standing</span>
              </div>
              <p className="text-xs text-[#9E9AA0] leading-relaxed">
                B.Tech ECE, Karnavati University (Expected 2030) · Class XII 69% (Kenalily School) · Class X 88% (Kalorex Future School).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0D0D11] border border-white/10 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#F5F2EB]">
                <Cpu className="w-4 h-4 text-[#C81E3A]" />
                <span>CAD &amp; Embedded Craft</span>
              </div>
              <p className="text-xs text-[#9E9AA0] leading-relaxed">
                Active Quadcopter 3D assembly in SOLIDWORKS 2024, Arduino digital/servo control in C, Iron-Conveyor Belt AI, and Study-Helper Desk.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0D0D11] border border-white/10 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#F5F2EB]">
                <Award className="w-4 h-4 text-[#C81E3A]" />
                <span>Hackathons &amp; Leadership</span>
              </div>
              <p className="text-xs text-[#9E9AA0] leading-relaxed">
                Top 100 Teams (Team RuptureX, SIH 2026 Preliminary) · 52nd Rank (First Hackathon) · IIT Bombay Techfest Workshop · Social Media Manager at Paaji Ki Kaksha.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0D0D11] border border-white/10 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#F5F2EB]">
                <ShieldCheck className="w-4 h-4 text-[#C81E3A]" />
                <span>Verified Training</span>
              </div>
              <p className="text-xs text-[#9E9AA0] leading-relaxed">
                5 documented certificates across SOLIDWORKS 2024 (10h), AI Foundations (LinkedIn Learning &amp; Jio Institute), and PMI Leadership through Feedback.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
            <p className="text-xs font-mono-data text-[#9E9AA0]">
              Languages: {PROFILE_DATA.languages.join(' · ')}
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenResume();
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-white/10 hover:bg-white/15 text-[#F5F2EB] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Resume View</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenContact();
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-[#C81E3A] hover:bg-[#A6172F] text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Contact Krisha</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
