import React from "react";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
  badge?: string;
  children?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  eyebrow,
  title,
  description,
  badge,
  children,
}) => {
  return (
    <div className="relative pt-12 pb-12 overflow-hidden bg-grid-pattern border-b border-black/5">
      {/* Background radial accent gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#ff4d00]/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
        <div className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-white/85 border border-black/10 shadow-sm mb-4 max-w-full">
          <span className="w-2 h-2 rounded-full bg-[#ff4d00] animate-pulse shrink-0" />
          <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.15em] sm:tracking-[0.2em] text-neutral-700 font-bold">
            {eyebrow}
          </span>
          {badge && (
            <span className="ml-1 px-2 py-0.5 rounded-full bg-[#00d9ff]/15 text-[#0088a8] text-[9px] sm:text-[10px] font-mono font-bold shrink-0">
              {badge}
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#0d0f12] tracking-[-0.03em] sm:tracking-[-0.04em] leading-[1.1] sm:leading-[1.08] max-w-4xl mx-auto mb-4 break-words">
          {title}
        </h1>

        <p className="text-base sm:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed px-2 sm:px-0">
          {description}
        </p>

        {children && <div className="mt-6">{children}</div>}
      </div>
    </div>
  );
};
