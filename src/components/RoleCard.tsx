// src/components/RoleCard.tsx
import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { KineticTextScramble } from '../KineticTextScramble';
import { MagneticWrapper } from '../MagneticWrapper';

export type RoleItem = {
  category: string;
  title: string;
  availability: string;
  subtitle: string;
  mission: string;
  specific: string;
  responsibilities: string[];
  deliverables: string;
  tools: string;
};

interface RoleCardProps {
  role: RoleItem;
  isOpen: boolean;
  onSelect: (role: RoleItem) => void;
  onApply: (e: React.MouseEvent, role: RoleItem) => void;
}

export const RoleCard: React.FC<RoleCardProps> = ({ role, isOpen, onSelect, onApply }) => {
  return (
    <MagneticWrapper strength={0.15} className="w-full">
      <div
        className="group relative flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-elevate-dark/70 p-6 backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:border-elevate-orange/40 md:p-8"
      >
        <div>
          <div className="mb-4 flex items-center justify-between">
            <span className="text-[10px] font-bold tracking-widest text-elevate-paper/40 uppercase">
              {role.category}
            </span>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-0.5 text-[10px] font-bold tracking-wider uppercase ${
                isOpen
                  ? 'bg-elevate-orange/20 text-elevate-orange border border-elevate-orange/30'
                  : 'bg-white/10 text-elevate-paper/40 border border-white/10'
              }`}
            >
              {isOpen ? <CheckCircle2 className="size-3" /> : <XCircle className="size-3" />}
              <span>{isOpen ? `${role.availability} OPEN` : 'FILLED'}</span>
            </span>
          </div>
          <h3 className="mb-2 text-xl font-black leading-tight text-white uppercase transition-colors">
            <KineticTextScramble text={role.title} />
          </h3>
          <p className="mb-4 text-xs font-semibold tracking-wider text-elevate-paper/40 uppercase">
            {role.subtitle}
          </p>
          <p className="mb-6 text-xs leading-relaxed text-elevate-paper/60 line-clamp-3">
            {role.mission}
          </p>
        </div>
        <div className="border-t border-white/[0.08] pt-4 flex items-center justify-between">
          <button
            onClick={() => onSelect(role)}
            className="flex items-center gap-1 text-xs font-bold text-white hover:text-elevate-orange transition-colors"
          >
            <span>View Role Specs</span>
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </button>
          {isOpen ? (
            <a
              href={"https://docs.google.com/forms/d/e/1FAIpQLScqxx28fgb_BWTp7JI1jj2l1ENkjteCSt3CyvlMlBeeOTW50Q/viewform?usp=pp_url&entry.1791197897=" + encodeURIComponent(role.title)}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-elevate-orange px-4 py-1.5 text-xs font-bold text-white transition-transform hover:scale-105"
            >
              Apply
            </a>
          ) : (
            <button
              onClick={(e) => onApply(e, role)}
              className="rounded-full border border-white/10 px-4 py-1.5 text-xs font-bold text-elevate-paper/40 cursor-not-allowed"
            >
              Filled
            </button>
          )}
        </div>
      </div>
    </MagneticWrapper>
  );
};
