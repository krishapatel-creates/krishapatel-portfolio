import React, { useEffect } from 'react';
import { X, ExternalLink, Download, ShieldCheck, Calendar, UserCheck } from 'lucide-react';
import { CertificationItem } from '../data/portfolioData';

interface CertificateModalProps {
  certificate: CertificationItem | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  certificate,
  onClose,
}) => {
  useEffect(() => {
    if (!certificate) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [certificate, onClose]);

  if (!certificate) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 md:p-8 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cert-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#121216] border border-white/15 rounded-2xl shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 px-6 py-5 bg-[#16161C] border-b border-white/10">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#9E9AA0]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C81E3A]" />
              <span>{certificate.category}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono-data">{certificate.date}</span>
            </div>
            <h2 id="cert-modal-title" className="text-lg md:text-xl font-semibold text-[#F5F2EB]">
              {certificate.title}
            </h2>
            <p className="text-xs text-[#9E9AA0]">{certificate.issuer}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close certificate preview"
            className="p-2 rounded-lg text-[#9E9AA0] hover:text-white hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6">
          {/* Document Preview */}
          <div className="lg:col-span-7 rounded-xl bg-[#0B0B0D] border border-white/10 overflow-hidden flex flex-col">
            <div className="flex-1 min-h-[320px] md:min-h-[380px] flex items-center justify-center bg-[#09090B]">
              {certificate.fileType === 'image' ? (
                <img
                  src={certificate.fileUrl}
                  alt={certificate.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full max-h-[420px] object-contain p-3"
                />
              ) : (
                <iframe
                  src={`${certificate.fileUrl}#toolbar=0&navpanes=0`}
                  title={certificate.title}
                  className="w-full h-[380px] md:h-[420px] bg-white"
                />
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-[#16161C] border-t border-white/10">
              <span className="text-xs font-mono-data text-[#9E9AA0]">
                Attached Original Document
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={certificate.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-white/10 hover:bg-white/15 text-[#F5F2EB] transition-colors whitespace-nowrap shrink-0"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Tab</span>
                </a>
                <a
                  href={certificate.fileUrl}
                  download
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-[#C81E3A] hover:bg-[#A6172F] text-white transition-colors whitespace-nowrap shrink-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </a>
              </div>
            </div>
          </div>

          {/* Verified Metadata */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              {certificate.teamOrHighlight && (
                <div className="p-4 rounded-xl bg-[#C81E3A]/10 border border-[#C81E3A]/30">
                  <p className="text-xs font-medium text-[#F5F2EB] leading-relaxed">
                    {certificate.teamOrHighlight}
                  </p>
                </div>
              )}

              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-xs text-[#9E9AA0] block mb-0.5">Credential ID</span>
                  <p className="font-mono-data text-xs text-[#F5F2EB] break-all bg-[#0B0B0D] px-3 py-2 rounded-lg border border-white/10">
                    {certificate.certificateId}
                  </p>
                </div>

                <div className="flex items-start gap-2.5 pt-1">
                  <Calendar className="w-4 h-4 text-[#C81E3A] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-[#9E9AA0] block">Issued / Completed</span>
                    <p className="text-xs font-mono-data text-[#F5F2EB]">
                      {certificate.date}
                      {certificate.durationOrHours ? ` · ${certificate.durationOrHours}` : ''}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <UserCheck className="w-4 h-4 text-[#C81E3A] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-[#9E9AA0] block">Signatory / Authority</span>
                    <p className="text-xs text-[#F5F2EB] leading-relaxed">{certificate.signatory}</p>
                  </div>
                </div>

                {certificate.program && (
                  <div className="pt-1">
                    <span className="text-xs text-[#9E9AA0] block">Program Accreditation</span>
                    <p className="text-xs font-mono-data text-[#F5F2EB]">{certificate.program}</p>
                  </div>
                )}

                {certificate.metadataExtra && (
                  <div className="pt-1">
                    <span className="text-xs text-[#9E9AA0] block">Location</span>
                    <p className="text-xs text-[#F5F2EB]">{certificate.metadataExtra}</p>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-white/10">
                <span className="text-xs text-[#9E9AA0] block mb-1.5">Verified Skills Covered</span>
                <p className="text-xs text-[#F5F2EB] leading-relaxed">
                  {certificate.skillsCovered.join(' · ')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
