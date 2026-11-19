import React, { useState } from 'react';
import { ArrowUpRight, RotateCw, ShieldCheck, FileCheck2 } from 'lucide-react';
import { CertificationItem } from '../data/portfolioData';

interface CredentialVaultCardProps {
  cert: CertificationItem;
  isHighlighted: boolean;
  isDimmed: boolean;
  onInspectDocument: (cert: CertificationItem) => void;
}

export const CredentialVaultCard: React.FC<CredentialVaultCardProps> = ({
  cert,
  isHighlighted,
  isDimmed,
  onInspectDocument,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [tiltStyle, setTiltStyle] = useState<{ rotateX: number; rotateY: number }>({
    rotateX: 0,
    rotateY: 0,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width;
    const yPct = (e.clientY - rect.top) / rect.height;

    const rotateY = (xPct - 0.5) * 9;
    const rotateX = (0.5 - yPct) * 9;
    setTiltStyle({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setTiltStyle({ rotateX: 0, rotateY: 0 });
  };

  return (
    <div
      className={`perspective-1200 min-h-[290px] transition-opacity duration-200 ${
        isDimmed ? 'opacity-35' : 'opacity-100'
      }`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        onClick={() => setIsFlipped((prev) => !prev)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsFlipped((prev) => !prev);
          }
        }}
        aria-pressed={isFlipped}
        aria-label={`${cert.title} — click to flip credential card`}
        className="relative w-full h-full min-h-[290px] preserve-3d cursor-pointer transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          transform: `rotateX(${tiltStyle.rotateX}deg) rotateY(${
            isFlipped ? 180 + tiltStyle.rotateY : tiltStyle.rotateY
          }deg)`,
        }}
      >
        {/* FRONT FACE (Crisp White Card on Off-White Slide) */}
        <div
          className={`absolute inset-0 backface-hidden p-5 rounded-xl bg-white border flex flex-col justify-between gap-3 shadow-[0_10px_24px_rgba(21,51,88,0.08)] ${
            isHighlighted
              ? 'border-[#153358] ring-2 ring-[#153358]'
              : 'border-[#D9DDE3] hover:border-[#153358]'
          }`}
        >
          <div className="space-y-2.5">
            <div className="flex items-center justify-between gap-2 text-[11px] font-medium text-[#3A434E]">
              <span className="inline-flex items-center gap-1.5 text-[#153358]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{cert.category}</span>
              </span>
              <span className="font-mono-data">{cert.date.split(' at ')[0]}</span>
            </div>

            <h3 className="font-oswald text-lg uppercase tracking-tight font-bold text-[#153358] leading-snug">
              {cert.title}
            </h3>

            <p className="text-xs text-[#3A434E] leading-relaxed">{cert.issuer}</p>

            {cert.teamOrHighlight && (
              <p className="text-xs font-medium text-[#153358] bg-[#EEF2F7] border border-[#D0DAE6] rounded-md px-2.5 py-1.5">
                {cert.teamOrHighlight}
              </p>
            )}
          </div>

          <div className="space-y-2 pt-3 border-t border-[#E6E8EC]">
            <p className="text-[11px] text-[#3A434E]">{cert.skillsCovered.join(' · ')}</p>
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono-data text-[10px] text-[#64748B] truncate max-w-[155px]">
                ID: {cert.certificateId}
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide text-[#153358] whitespace-nowrap shrink-0">
                <RotateCw className="w-3 h-3" />
                <span>Flip</span>
              </span>
            </div>
          </div>
        </div>

        {/* BACK FACE (Deep Navy #153358) */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 p-5 rounded-xl bg-[#153358] border border-[#2E5280] text-white flex flex-col justify-between gap-3 shadow-xl">
          <div className="space-y-2.5 overflow-y-auto pr-1">
            <div className="flex items-center justify-between gap-2 text-[10px] uppercase tracking-[0.12em] font-mono-data text-[#D0DAE6]">
              <span>Verified Syllabus</span>
              <RotateCw className="w-3.5 h-3.5" />
            </div>

            <ul className="space-y-1.5">
              {cert.courseworkHighlights.map((line) => (
                <li key={line} className="text-xs text-[#D0DAE6] flex items-start gap-2 leading-relaxed">
                  <span className="text-white font-mono-data shrink-0">—</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>

            <div className="pt-2 border-t border-[#2E5280] space-y-1 text-[11px] text-[#D0DAE6]">
              <p>
                <span className="text-white font-medium">Authority:</span> {cert.signatory}
              </p>
              {cert.durationOrHours && (
                <p className="font-mono-data">Credit: {cert.durationOrHours}</p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 pt-2.5 border-t border-[#2E5280]">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onInspectDocument(cert);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] uppercase tracking-[0.08em] font-semibold bg-white text-[#153358] hover:bg-[#F4F4F2] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <FileCheck2 className="w-3.5 h-3.5" />
              <span>Open Original</span>
            </button>

            <span className="inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.08em] text-[#D0DAE6]">
              <span>Front</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
