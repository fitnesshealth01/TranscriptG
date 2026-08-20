import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Mic, FileText, Cpu } from "lucide-react";

export const FloatingDock: React.FC = () => {
  const navItems = [
    { to: "/", label: "Home", icon: Home },
    { to: "/transcribe", label: "Transcribe", icon: Mic },
    { to: "/convert", label: "Convert", icon: FileText },
    { to: "/process", label: "Process", icon: Cpu },
  ];

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-md w-[calc(100%-2rem)]">
      <div className="glass-pill p-1.5 rounded-full flex items-center justify-between gap-1 shadow-2xl border border-black/10">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `flex-1 flex flex-col items-center justify-center py-2 px-3 rounded-full transition-all duration-300 relative group ${
                  isActive
                    ? "bg-[#ff4d00] text-white thermal-glow font-bold scale-[1.03]"
                    : "text-neutral-600 hover:text-neutral-900 hover:bg-black/5 font-medium"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? "text-white" : ""}`} />
                  <span className="text-[11px] font-mono tracking-tight mt-0.5 leading-none">
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
