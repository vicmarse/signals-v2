import type { CSSProperties } from "react";

type ParticleStyle = CSSProperties & {
  "--delay": string;
  "--duration": string;
  "--x": string;
};

const particles = [
  { left: "8%", size: 4, delay: "-2s", duration: "15s", x: "18px" },
  { left: "17%", size: 7, delay: "-8s", duration: "19s", x: "-22px" },
  { left: "28%", size: 3, delay: "-5s", duration: "13s", x: "12px" },
  { left: "38%", size: 6, delay: "-11s", duration: "21s", x: "-18px" },
  { left: "49%", size: 4, delay: "-1s", duration: "16s", x: "26px" },
  { left: "61%", size: 8, delay: "-7s", duration: "23s", x: "-30px" },
  { left: "72%", size: 3, delay: "-4s", duration: "14s", x: "16px" },
  { left: "84%", size: 5, delay: "-10s", duration: "20s", x: "-20px" },
  { left: "93%", size: 4, delay: "-6s", duration: "18s", x: "14px" },
];

export function FloatingParticles() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((particle, index) => (
        <span
          key={index}
          className="floating-particle absolute bottom-[-2rem] rounded-full bg-white/70 shadow-[0_0_18px_rgba(255,220,244,0.95)]"
          style={{
            left: particle.left,
            width: particle.size,
            height: particle.size,
            "--delay": particle.delay,
            "--duration": particle.duration,
            "--x": particle.x,
          } as ParticleStyle}
        />
      ))}
    </div>
  );
}
