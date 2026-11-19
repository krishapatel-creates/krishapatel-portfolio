import React, { useEffect, useState } from 'react';
import { X, Send, Copy, Check } from 'lucide-react';
import { PROFILE_DATA } from '../data/portfolioData';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sentNotice, setSentNotice] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailSubject = encodeURIComponent(subject || `Portfolio Inquiry from ${senderName}`);
    const mailBody = encodeURIComponent(
      `Name: ${senderName}\nEmail: ${senderEmail}\n\n${message}`
    );
    window.location.href = `mailto:${PROFILE_DATA.email}?subject=${mailSubject}&body=${mailBody}`;
    setSentNotice(true);
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE_DATA.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      // Fallback ignored if clipboard blocked
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-[#121216] border border-white/15 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-5 bg-[#16161C] border-b border-white/10">
          <div>
            <h2 id="contact-modal-title" className="text-lg font-semibold text-[#F5F2EB]">
              Send Me a Message
            </h2>
            <p className="text-xs text-[#9E9AA0]">
              Direct reachout to {PROFILE_DATA.email}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close message modal"
            className="p-2 rounded-lg text-[#9E9AA0] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="contact-name" className="block text-xs text-[#9E9AA0] mb-1.5">
                Your Name
              </label>
              <input
                id="contact-name"
                type="text"
                required
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="Jane Doe"
                className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-[#0B0B0D] border border-white/15 text-[#F5F2EB] focus:outline-none focus:border-[#C81E3A]"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="block text-xs text-[#9E9AA0] mb-1.5">
                Your Email
              </label>
              <input
                id="contact-email"
                type="email"
                required
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-[#0B0B0D] border border-white/15 text-[#F5F2EB] focus:outline-none focus:border-[#C81E3A]"
              />
            </div>
          </div>

          <div>
            <label htmlFor="contact-subject" className="block text-xs text-[#9E9AA0] mb-1.5">
              Subject
            </label>
            <input
              id="contact-subject"
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Internship opportunity / Project collaboration"
              className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-[#0B0B0D] border border-white/15 text-[#F5F2EB] focus:outline-none focus:border-[#C81E3A]"
            />
          </div>

          <div>
            <label htmlFor="contact-message" className="block text-xs text-[#9E9AA0] mb-1.5">
              Message
            </label>
            <textarea
              id="contact-message"
              rows={4}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Share project details, timeline, or collaboration inquiry..."
              className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-[#0B0B0D] border border-white/15 text-[#F5F2EB] focus:outline-none focus:border-[#C81E3A] resize-none"
            />
          </div>

          {sentNotice && (
            <p className="text-xs text-[#E5E0D8] bg-white/5 border border-white/10 rounded-lg px-3 py-2">
              Mail client opened for {PROFILE_DATA.email}. You can also copy the email address directly below.
            </p>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg bg-white/5 hover:bg-white/10 text-[#F5F2EB] border border-white/10 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#C81E3A]" />
                  <span>Copied Email</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy {PROFILE_DATA.email}</span>
                </>
              )}
            </button>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-lg bg-[#C81E3A] hover:bg-[#A6172F] text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Compose Email</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
