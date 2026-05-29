"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";

type ScreenShellProps = {
  children: ReactNode;
  screenKey: string;
};

export function ScreenShell({ children, screenKey }: ScreenShellProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={screenKey}
        initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -10, filter: "blur(8px)" }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        className="min-h-[calc(100vh-7.5rem)] px-5 pb-28 pt-7"
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}
