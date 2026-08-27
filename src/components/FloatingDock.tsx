import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Home, LayoutGrid, Sparkles } from "lucide-react";
import { getDockPrimaryTools, getAllTools } from "../lib/navigation";
import { ToolsLauncherModal } from "./ToolsLauncherModal";

export const FloatingDock: React.FC = () => {
  const [isToolsModalOpen, setIsToolsModalOpen] = useState(false);
  const location = useLocation();
  const primaryTools = getDockPrimaryTools();
  const allTools = getAllTools();

  // Check if current page is one of the secondary tools (not in primary tools list and not Home)
  const isPrimaryActive = primaryTools.some(
    (t) => location.pathname === t.path || (t.path === "/parchment-transcript" && location.pathname === "/parchment")
  );
  const isHomeActive = location.pathname === "/";
  const isSecondaryToolActive = !isPrimaryActive && !isHomeActive && allTools.some((t) => location.pathname.startsWith(t.path));

  return (
    <>
      <nav 
        className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-[calc(100%-1.25rem)] sm:max-w-xl px-1"
        aria-label="Bottom Quick Navigation"
      >
        <div className="glass-pill p-1 sm:p-1.5 rounded-full flex items-center justify-between gap-0.5 sm:gap-1 shadow-2xl border border-black/10 bg-white/90 backdrop-blur-xl">
          {/* Home Link */}
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex-1 min-w-0 flex flex-col items-center justify-center py-1.5 sm:py-2 px-1 sm:px-2.5 rounded-full transition-all duration-200 relative group select-none ${
                isActive
                  ? "bg-[#ff4d00] text-white thermal-glow font-bold scale-[1.02]"
                  : "text-neutral-600 hover:text-neutral-900 hover:bg-black/5 font-medium"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Home className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${isActive ? "text-white" : ""}`} />
                <span className="text-[10px] sm:text-[11px] font-mono tracking-tight mt-0.5 leading-none whitespace-nowrap truncate max-w-full">
                  Home
                </span>
              </>
            )}
          </NavLink>

          {/* Primary Tool Links */}
          {primaryTools.map((tool) => {
            const Icon = tool.icon;
            const isMatch = location.pathname === tool.path || (tool.path === "/parchment-transcript" && location.pathname === "/parchment");

            return (
              <NavLink
                key={tool.id}
                to={tool.path}
                className={({ isActive }) =>
                  `flex-1 min-w-0 flex flex-col items-center justify-center py-1.5 sm:py-2 px-1 sm:px-2.5 rounded-full transition-all duration-200 relative group select-none ${
                    isActive || isMatch
                      ? "bg-[#ff4d00] text-white thermal-glow font-bold scale-[1.02]"
                      : "text-neutral-600 hover:text-neutral-900 hover:bg-black/5 font-medium"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${isActive || isMatch ? "text-white" : ""}`} />
                    <span className="text-[10px] sm:text-[11px] font-mono tracking-tight mt-0.5 leading-none whitespace-nowrap truncate max-w-full">
                      {tool.shortName}
                    </span>
                  </>
                )}
              </NavLink>
            );
          })}

          {/* All Tools / More Launcher Button */}
          <button
            type="button"
            onClick={() => setIsToolsModalOpen(true)}
            className={`flex-1 min-w-0 flex flex-col items-center justify-center py-1.5 sm:py-2 px-1 sm:px-2.5 rounded-full transition-all duration-200 relative group cursor-pointer select-none ${
              isSecondaryToolActive
                ? "bg-[#ff4d00] text-white thermal-glow font-bold scale-[1.02]"
                : "text-neutral-600 hover:text-neutral-900 hover:bg-black/5 font-medium"
            }`}
            aria-label="Open all tools and engines"
            title="Explore all linguistic and academic tools"
          >
            <div className="relative">
              <LayoutGrid className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${isSecondaryToolActive ? "text-white" : ""}`} />
              {/* Badge indicator */}
              <span className="absolute -top-1 -right-1.5 w-2 h-2 rounded-full bg-amber-500 animate-pulse ring-2 ring-white" />
            </div>
            <span className="text-[10px] sm:text-[11px] font-mono tracking-tight mt-0.5 leading-none whitespace-nowrap truncate max-w-full">
              {isSecondaryToolActive ? "Tools" : "More"}
            </span>
          </button>
        </div>
      </nav>

      {/* Full Tools Drawer Modal */}
      <ToolsLauncherModal
        isOpen={isToolsModalOpen}
        onClose={() => setIsToolsModalOpen(false)}
      />
    </>
  );
};
