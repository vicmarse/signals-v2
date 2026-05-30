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
    <nav className="bottom-nav-shell pointer-events-auto mx-auto grid w-full max-w-[23.25rem] grid-cols-5">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = active === item.id;
        const isSend = item.id === "send";

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onChange(item.id)}
            aria-label={item.label}
            aria-current={isActive ? "page" : undefined}
            className={`bottom-nav-item ${isSend ? "bottom-nav-send" : ""} ${isActive && !isSend ? "bottom-nav-active" : ""}`}
          >
            <span className={isSend ? "bottom-nav-send-orb" : "bottom-nav-icon"}>
              <Icon size={isSend ? 35 : 19} strokeWidth={isSend ? 1.75 : isActive ? 2.15 : 1.65} />
            </span>
            <span className="bottom-nav-label">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
