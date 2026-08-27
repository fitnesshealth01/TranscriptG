import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { X, Search, Sparkles, ArrowRight, Layers, ExternalLink } from "lucide-react";
import { TOOLS_REGISTRY, ToolItem, getToolsByCategory } from "../lib/navigation";

interface ToolsLauncherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ToolsLauncherModal: React.FC<ToolsLauncherModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Focus search input when opened & lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    } else {
      document.body.style.overflow = "";
      setSearchQuery("");
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredTools = TOOLS_REGISTRY.filter((tool) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      tool.name.toLowerCase().includes(q) ||
      tool.shortName.toLowerCase().includes(q) ||
      tool.description.toLowerCase().includes(q) ||
      tool.category.toLowerCase().includes(q) ||
      tool.keywords.some((k) => k.toLowerCase().includes(q))
    );
  });

  const categories = getToolsByCategory();

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal / Bottom Sheet */}
      <div
        className="relative z-10 w-full sm:max-w-2xl bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-black/10 overflow-hidden flex flex-col max-h-[88vh] sm:max-h-[85vh] animate-in slide-in-from-bottom-6 duration-300"
        role="dialog"
        aria-modal="true"
      >
        {/* Handle for mobile swipe hint */}
        <div className="sm:hidden w-12 h-1.5 bg-neutral-300 rounded-full mx-auto mt-3 mb-1" />

        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-black/5 flex items-center justify-between gap-4 bg-[#faf9f6]/80 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#ff4d00]/10 flex items-center justify-center text-[#ff4d00]">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-[#0d0f12] tracking-tight">
                Linguistic & Academic Suite
              </h2>
              <p className="text-xs text-neutral-500 font-mono">
                {TOOLS_REGISTRY.length} Specialized Engines Available
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-black/5 text-neutral-500 hover:text-neutral-900 transition-colors"
            aria-label="Close tools menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 sm:px-6 sm:py-3 bg-neutral-50 border-b border-black/5">
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tools (e.g., GPA, transcribe, SRT, summarize)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-black/10 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#ff4d00] focus:border-transparent font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-neutral-400 hover:text-neutral-700"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Tools List */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {filteredTools.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <p className="text-sm font-mono text-neutral-500">
                No matching engines found for "{searchQuery}"
              </p>
              <button
                onClick={() => setSearchQuery("")}
                className="text-xs font-mono text-[#ff4d00] font-bold hover:underline"
              >
                View all available engines
              </button>
            </div>
          ) : searchQuery ? (
            /* Search Results Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} currentPath={location.pathname} onClose={onClose} />
              ))}
            </div>
          ) : (
            /* Categorized Views */
            Object.entries(categories).map(([category, items]) => (
              <div key={category} className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono uppercase tracking-[0.18em] font-bold text-neutral-400">
                    {category}
                  </span>
                  <div className="h-px flex-1 bg-black/5" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {items.map((tool) => (
                    <ToolCard key={tool.id} tool={tool} currentPath={location.pathname} onClose={onClose} />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer / Fast Links */}
        <div className="p-4 border-t border-black/5 bg-[#faf9f6] flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-1.5 text-neutral-500">
            <Sparkles className="w-3.5 h-3.5 text-[#ff4d00]" />
            <span>Zero login, zero data retention</span>
          </div>
          <Link
            to="/"
            onClick={onClose}
            className="text-[#ff4d00] font-bold hover:underline flex items-center gap-1"
          >
            Overview <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
};

const ToolCard: React.FC<{
  tool: ToolItem;
  currentPath: string;
  onClose: () => void;
}> = ({ tool, currentPath, onClose }) => {
  const Icon = tool.icon;
  const isActive = currentPath === tool.path || (tool.path === "/parchment-transcript" && currentPath === "/parchment");

  return (
    <Link
      to={tool.path}
      onClick={onClose}
      className={`p-3.5 rounded-2xl border transition-all duration-200 flex items-start gap-3 group relative ${
        isActive
          ? "bg-orange-50/80 border-[#ff4d00] shadow-sm"
          : "bg-white hover:bg-neutral-50/80 border-black/8 hover:border-black/20"
      }`}
    >
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${tool.accentBg} ${tool.accentText}`}
      >
        <Icon className="w-5 h-5" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5">
          <h3 className="text-sm font-bold text-[#0d0f12] truncate group-hover:text-[#ff4d00] transition-colors">
            {tool.name}
          </h3>
          {tool.badge && (
            <span
              className={`px-1.5 py-0.2 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider shrink-0 ${
                tool.badgeType === "red"
                  ? "bg-red-100 text-red-700"
                  : tool.badgeType === "amber"
                  ? "bg-amber-100 text-amber-800"
                  : tool.badgeType === "purple"
                  ? "bg-purple-100 text-purple-800"
                  : tool.badgeType === "cyan"
                  ? "bg-cyan-100 text-cyan-800"
                  : "bg-orange-100 text-[#ff4d00]"
              }`}
            >
              {tool.badge}
            </span>
          )}
        </div>
        <p className="text-xs text-neutral-500 leading-snug line-clamp-2">
          {tool.description}
        </p>
      </div>

      {isActive && (
        <span className="w-2 h-2 rounded-full bg-[#ff4d00] shrink-0 mt-1.5 animate-pulse" />
      )}
    </Link>
  );
};
