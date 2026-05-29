"use client";

import { Home, Radio, Sparkles, UsersRound, UserRound } from "lucide-react";

type Tab = "feed" | "signals" | "send" | "people" | "profile";

type BottomNavProps = {
  active: Tab;
  onChange: (tab: Tab) => void;
};

const items = [
  { id: "feed" as const, label: "Home", icon: Home },
  { id: "signals" as const, label: "Signals", icon: Radio },
  { id: "send" as const, label: "Send", icon: Sparkles },
  { id: "people" as const, label: "People", icon: UsersRound },
  { id: "profile" as const, label: "Profile", icon: UserRound },
];

export function BottomNav({ active, onChange }: BottomNavProps) {
  return (
    <nav className="glass-panel nav-shadow mx-auto grid w-full max-w-[24.5rem] grid-cols-5 rounded-[2rem] px-3 py-2">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = active === item.id;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onChange(item.id)}
            aria-label={item.label}
            className={`relative flex h-12 flex-col items-center justify-center gap-0.5 rounded-full text-[0.54rem] transition ${
              isActive
                ? "text-[#3b2b66]"
                : "text-[#8f8192]"
            }`}
          >
            {isActive && (
              <span className="absolute inset-x-2 top-0 h-10 rounded-full bg-white/45 blur-md" />
            )}
            <span
              className={`relative flex items-center justify-center ${
                item.id === "send"
                  ? "h-[3.25rem] w-[3.25rem] -translate-y-2 rounded-full bg-[radial-gradient(circle_at_34%_26%,#fff3dc_0%,#a77fd5_38%,#5b3b99_72%,#33206c_100%)] text-white shadow-[0_14px_34px_rgba(64,42,126,0.42),0_0_28px_rgba(255,222,207,0.88)] ring-1 ring-white/55"
                  : "h-5 w-5"
              }`}
            >
              <Icon size={item.id === "send" ? 24 : 18} strokeWidth={item.id === "send" ? 1.75 : 1.65} />
            </span>
            <span className="relative leading-none tracking-normal">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
