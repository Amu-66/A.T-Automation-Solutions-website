import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import ParticleNetwork from "./ParticleNetwork";

const LOGO_LETTERS = "A.T AUTOMATION".split("");

function BootOverlay({ onDone }: { onDone: () => void }) {
  const [gridIn, setGridIn] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setGridIn(true), 50);
    const t2 = setTimeout(() => setShowLogo(true), 800);
    const t3 = setTimeout(() => setExit(true), 2200);
    const t4 = setTimeout(() => onDone(), 2700);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onDone]);

  return (
    <AnimatePresence>
      {!exit && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[999] flex items-center justify-center bg-[#03030A] overflow-hidden"
        >
          <div
            className={`circuit-grid absolute inset-0 transition-opacity duration-[800ms] ${
              gridIn ? "opacity-100" : "opacity-0"
            }`}
          />
          <div className="void-glow absolute inset-0" />
          <div className="relative flex flex-wrap justify-center gap-x-3 px-6" style={{ perspective: 1000 }}>
            {showLogo &&
              LOGO_LETTERS.map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{
                    opacity: 0,
                    z: -400,
                    x: (Math.random() - 0.5) * 200,
                    y: (Math.random() - 0.5) * 200,
                  }}
                  animate={{ opacity: 1, z: 0, x: 0, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.035, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display text-3xl sm:text-5xl font-bold text-glacier tracking-tight"
                  style={{ color: letter === " " ? "transparent" : "#F0F4FF" }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
          </div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: showLogo ? 1 : 0 }}
            transition={{ duration: 1.2, delay: 0.6 }}
            className="absolute bottom-[38%] h-px w-40 bg-cyan-400 origin-center"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function TypedHeadline() {
  const line = "Automate. Scale. Dominate.";
  const words = line.split(" ");
  let charIndex = 0;

  return (
    <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.02] tracking-tight text-glacier">
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap mr-4">
          {word.split("").map((char) => {
            const delay = 0.05 * charIndex;
            charIndex += 1;
            return (
              <motion.span
                key={charIndex}
                initial={{ opacity: 0, y: 30, rotateX: -60 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.5, delay: 2.7 + delay, ease: "easeOut" }}
                className={
                  word.includes("Dominate")
                    ? "inline-block text-gradient"
                    : "inline-block"
                }
              >
                {char}
              </motion.span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}

export default function Hero() {
  const [booted, setBooted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const gridY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const fadeOut = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const particleOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);

  return (
    <section
      ref={sectionRef}
      data-cursor-zone="hero"
      className="relative h-[100svh] min-h-[720px] w-full overflow-hidden bg-void"
    >
      <BootOverlay onDone={() => setBooted(true)} />

      {/* Layer 0: void glow */}
      <div className="void-glow absolute inset-0" style={{ transform: "translateZ(-120px)" }} />

      {/* Layer 1: circuit grid deepest */}
      <motion.div
        style={{ y: gridY }}
        className="circuit-grid-faint absolute inset-0"
      />

      {/* Layer 2: particle network */}
      <motion.div style={{ opacity: particleOpacity }} className="absolute inset-0">
        <ParticleNetwork className="h-full w-full" />
      </motion.div>

      {/* Scan line */}
      <div className="scan-line" />

      {/* Floating ambient UI fragments */}
      <div className="pointer-events-none absolute inset-0 hidden md:block" style={{ opacity: 0.12 }}>
        <div className="absolute left-[8%] top-[22%] font-mono text-xs text-cyan-300 rotate-[-4deg]">
          workflow_status: <span className="text-amber-400">active</span>
        </div>
        <div className="absolute right-[10%] top-[30%] font-mono text-xs text-cyan-300">
          leads_captured += 1
        </div>
        <div className="absolute left-[14%] bottom-[24%] font-mono text-xs text-cyan-300">
          conversion_rate: 38.2%
        </div>
        <div className="absolute right-[6%] bottom-[18%] font-mono text-xs text-cyan-300">
          node[04] → node[11] synced
        </div>
      </div>

      {/* Foreground content */}
      <motion.div
        style={{ y: headlineY, opacity: fadeOut }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
      >
        <AnimatePresence>
          {booted && (
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.4, duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-white/5 px-4 py-1.5 font-mono text-xs tracking-widest text-cyan-300"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
              SYSTEM ONLINE — SOUTH AFRICA
            </motion.span>
          )}
        </AnimatePresence>

        <TypedHeadline />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.6, duration: 0.7 }}
          className="mt-8 max-w-2xl text-balance text-base sm:text-lg text-chrome"
        >
          AI-powered systems that replace manual work and multiply results —
          built for South African businesses ready to grow.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.9, duration: 0.7 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <a
            href="#offer"
            data-cursor="button"
            className="glow-amber-hover group relative overflow-hidden rounded-full bg-plasma px-8 py-4 font-heading text-sm font-semibold tracking-wide text-white transition-shadow duration-300"
            style={{ backgroundColor: "#0047FF" }}
          >
            Book Your Free Audit
          </a>
          <a
            href="#services"
            data-cursor="button"
            className="rounded-full border border-cyan-400/50 px-8 py-4 font-heading text-sm font-semibold tracking-wide text-cyan-200 transition-colors duration-300 hover:bg-cyan-400/10"
          >
            See What We Build
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.3, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[10px] tracking-[0.3em] text-chrome">SCROLL</span>
          <div className="h-8 w-px bg-gradient-to-b from-cyan-400 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
