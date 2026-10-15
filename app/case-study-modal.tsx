"use client";

import { useEffect, useRef } from "react";
import type { Project } from "./portfolio-data";

interface CaseStudyModalProps {
  project: Project;
  labels: {
    close: string;
    detailTitle: string;
    ipNote: string;
  };
  onClose: () => void;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export default function CaseStudyModal({ project, labels, onClose }: CaseStudyModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Simpan elemen yang sedang fokus agar bisa dikembalikan saat modal ditutup
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      // Focus trap sederhana: Tab berputar di dalam dialog
      if (event.key === "Tab" && dialogRef.current) {
        const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [onClose]);

  const lines = (project.detail ?? "").split("\n").filter((line) => line.trim() !== "");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-study-title"
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className="p-8 sm:p-10 max-h-[80vh] overflow-y-auto">
          <div className="flex justify-between items-start gap-4 mb-6">
            <div className="flex gap-2 flex-wrap">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-lg border border-emerald-100"
                >
                  {tag}
                </span>
              ))}
            </div>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label={labels.close}
              className="shrink-0 text-stone-400 hover:text-stone-800 bg-stone-100 p-2 rounded-full transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <h3 id="case-study-title" className="text-2xl sm:text-3xl font-black text-stone-800 mb-4 leading-tight">
            {project.title}
          </h3>
          <p className="text-lg text-stone-600 font-medium mb-6 leading-relaxed border-l-4 border-emerald-500 pl-4">
            {project.desc}
          </p>

          <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200">
            <h4 className="text-sm font-bold text-stone-800 uppercase tracking-widest mb-3 flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {labels.detailTitle}
            </h4>

            <div className="text-sm text-stone-600 leading-relaxed space-y-2">
              {lines.map((line, index) => {
                const trimmed = line.trim();
                const isBullet = trimmed.startsWith("•");
                const text = trimmed.replace(/^•\s*/, "");

                return isBullet ? (
                  <p
                    key={index}
                    className="pl-5 relative before:content-[''] before:absolute before:left-1 before:top-2 before:w-1.5 before:h-1.5 before:bg-emerald-500 before:rounded-full"
                  >
                    {text}
                  </p>
                ) : (
                  <p key={index} className="font-bold text-stone-800 mt-4 mb-2">
                    {text}
                  </p>
                );
              })}
            </div>

            <p className="mt-6 pt-4 border-t border-stone-200 text-xs font-semibold text-stone-400 italic">
              {labels.ipNote}
            </p>
          </div>
        </div>

        <div className="bg-stone-50 px-8 py-5 border-t border-stone-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 bg-stone-800 text-white text-sm font-bold rounded-xl hover:bg-stone-700 transition-colors"
          >
            {labels.close}
          </button>
        </div>
      </div>
    </div>
  );
}
