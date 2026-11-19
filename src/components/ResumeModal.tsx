import React, { useEffect } from 'react';
import { X, Printer, Download } from 'lucide-react';
import {
  PROFILE_DATA,
  EDUCATION_DATA,
  EXPERIENCE_DATA,
  PROJECTS_DATA,
  CERTIFICATIONS_DATA,
} from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-8 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#121216] border border-white/15 rounded-2xl shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 bg-[#18181E] border-b border-white/10">
          <div>
            <h2 id="resume-modal-title" className="text-base font-semibold text-[#F5F2EB]">
              Curriculum Vitae — {PROFILE_DATA.fullName}
            </h2>
            <p className="text-xs text-[#9E9AA0]">
              Extracted directly from attached resume & verified credentials
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg bg-white/10 hover:bg-white/15 text-[#F5F2EB] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Sheet</span>
            </button>
            <a
              href={PROFILE_DATA.resumePdfUrl}
              download="Krisha_Patel_Resume.pdf"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg bg-[#C81E3A] hover:bg-[#A6172F] text-white transition-colors whitespace-nowrap shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Original PDF</span>
            </a>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close resume modal"
              className="p-2 rounded-lg text-[#9E9AA0] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable White Paper Sheet */}
        <div className="max-h-[76vh] overflow-y-auto p-4 md:p-8 bg-[#0E0E12]">
          <div
            id="printable-resume-sheet"
            className="bg-white text-[#141416] rounded-lg p-6 md:p-10 max-w-3xl mx-auto shadow-lg text-sm leading-relaxed"
          >
            {/* Header */}
            <div className="text-center border-b border-neutral-300 pb-5 mb-6">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900">
                KRISHA PATEL
              </h1>
              <p className="text-xs md:text-sm text-neutral-600 mt-1.5">
                {PROFILE_DATA.location} · {PROFILE_DATA.phone} · {PROFILE_DATA.email}
              </p>
              <p className="text-xs text-neutral-600 mt-0.5 font-mono-data">
                {PROFILE_DATA.linkedinDisplay}
              </p>
            </div>

            {/* Summary */}
            <section className="mb-6">
              <h2 className="text-xs font-bold tracking-wider text-neutral-900 border-b border-neutral-200 pb-1 mb-2">
                SUMMARY
              </h2>
              <p className="text-neutral-700 text-xs md:text-sm">{PROFILE_DATA.summary}</p>
            </section>

            {/* Education */}
            <section className="mb-6">
              <h2 className="text-xs font-bold tracking-wider text-neutral-900 border-b border-neutral-200 pb-1 mb-2.5">
                EDUCATION
              </h2>
              <div className="space-y-2">
                {EDUCATION_DATA.map((edu) => (
                  <div key={edu.degree} className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 text-xs md:text-sm">
                    <div>
                      <span className="font-semibold text-neutral-900">{edu.degree}</span>
                      <span className="text-neutral-600"> — {edu.institution}, {edu.location}</span>
                    </div>
                    <span className="font-mono-data text-xs text-neutral-600 shrink-0">
                      {edu.period}{edu.detail ? ` · ${edu.detail}` : ''}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Skills */}
            <section className="mb-6">
              <h2 className="text-xs font-bold tracking-wider text-neutral-900 border-b border-neutral-200 pb-1 mb-2">
                SKILLS & LANGUAGES
              </h2>
              <div className="space-y-1 text-xs md:text-sm text-neutral-700">
                <p>
                  <strong className="text-neutral-900">Technical Skills:</strong> C Programming, Arduino, Basic Electronics, Canva, AI Tools, SOLIDWORKS 2024
                </p>
                <p>
                  <strong className="text-neutral-900">Soft Skills:</strong> Teamwork, Creativity, Communication, Problem-Solving, Leadership, Content Strategy, Social Media Marketing Management, Content Management
                </p>
                <p>
                  <strong className="text-neutral-900">Languages:</strong> {PROFILE_DATA.languages.join(', ')}
                </p>
              </div>
            </section>

            {/* Projects */}
            <section className="mb-6">
              <h2 className="text-xs font-bold tracking-wider text-neutral-900 border-b border-neutral-200 pb-1 mb-2.5">
                PROJECTS & ACADEMIC WORK
              </h2>
              <ul className="space-y-2 text-xs md:text-sm text-neutral-700 list-disc pl-4">
                {PROJECTS_DATA.map((proj) => (
                  <li key={proj.id}>
                    <strong className="text-neutral-900">{proj.title}:</strong> {proj.summary}
                  </li>
                ))}
              </ul>
            </section>

            {/* Experience */}
            <section className="mb-6">
              <h2 className="text-xs font-bold tracking-wider text-neutral-900 border-b border-neutral-200 pb-1 mb-2.5">
                EXPERIENCE
              </h2>
              {EXPERIENCE_DATA.map((exp) => (
                <div key={exp.organization}>
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between text-xs md:text-sm">
                    <p className="font-semibold text-neutral-900">
                      {exp.role} — {exp.organization}, {exp.location}
                    </p>
                    <p className="font-mono-data text-xs text-neutral-600">{exp.period}</p>
                  </div>
                  <ul className="mt-1.5 space-y-1 text-xs md:text-sm text-neutral-700 list-disc pl-4">
                    {exp.highlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>

            {/* Accomplishments & Verified Credentials */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <section>
                <h2 className="text-xs font-bold tracking-wider text-neutral-900 border-b border-neutral-200 pb-1 mb-2">
                  ACCOMPLISHMENTS & ACTIVITIES
                </h2>
                <ul className="space-y-1 text-xs text-neutral-700 list-disc pl-4">
                  {PROFILE_DATA.accomplishments.map((acc) => (
                    <li key={acc}>{acc}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-xs font-bold tracking-wider text-neutral-900 border-b border-neutral-200 pb-1 mb-2">
                  VERIFIED CERTIFICATIONS
                </h2>
                <ul className="space-y-1 text-xs text-neutral-700 list-disc pl-4">
                  {CERTIFICATIONS_DATA.map((cert) => (
                    <li key={cert.id}>
                      <strong className="text-neutral-900">{cert.title}</strong> ({cert.date})
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
