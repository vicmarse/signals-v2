import type { ReactNode } from "react";

type ScreenHeaderProps = {
  eyebrow: string;
  title: string;
  action?: ReactNode;
};

export function ScreenHeader({ eyebrow, title, action }: ScreenHeaderProps) {
  return (
    <header className="flex items-start justify-between gap-4 px-1">
      <div>
        <p className="text-xs uppercase tracking-[0.28em] text-[#9f8297]">{eyebrow}</p>
        <h1 className="mt-2 max-w-[13rem] text-4xl font-semibold leading-[0.95] text-[#453657]">
          {title}
        </h1>
      </div>
      {action}
    </header>
  );
}
