"use client";

import { motion } from "framer-motion";

type SignalOrbProps = {
  size?: "sm" | "md" | "lg";
  active?: boolean;
};

const sizes = {
  sm: "h-12 w-12",
  md: "h-24 w-24",
  lg: "h-40 w-40",
};

export function SignalOrb({ size = "md", active = false }: SignalOrbProps) {
  return (
    <motion.div
      aria-hidden="true"
      animate={{
        scale: active ? [1, 1.06, 1] : [1, 1.025, 1],
        opacity: [0.86, 1, 0.86],
      }}
      transition={{ duration: active ? 2.4 : 4.2, repeat: Infinity, ease: "easeInOut" }}
      className={`${sizes[size]} soft-ring breathing-glow rounded-full bg-[radial-gradient(circle_at_35%_30%,#fff_0%,#ffe3ef_28%,#cfccff_62%,#ffcae2_100%)]`}
    />
  );
}
