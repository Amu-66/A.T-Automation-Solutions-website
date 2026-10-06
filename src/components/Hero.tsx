import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import ParticleNetwork from "./ParticleNetwork";
import Logo from "./Logo";

function BootOverlay({ onDone, skip }: { onDone: () => void; skip: boolean }) {
  const [gridIn, setGridIn] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [exit, setExit] = useState(skip);

  useEffect(() => {
    if (skip) {
      onDone();
      return;
    }
    const t1 = setTimeout(() => setGridIn(true), 50);
    const t2 = setTimeout(() => setShowLogo(true), 400);
    const t3 = setTimeout(() => setExit(true), 1700);
    const t4 = setTimeout(() => onDone(), 2200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onDone, skip]);

  return (
    <AnimatePresence>
      {!exit && (
        <motion.div
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[999] flex items-center justify-center bg-[#03030A] overflow-hidden"
        >
          {/* kept subtle so the black field reads like the brand artwork */}
          <div
            className={`circuit-grid absolute inset-0 transition-opacity duration-[800ms] ${
              gridIn ? "opacity-40" : "opacity-0"
            }`}
          />
          <div className="void-glow absolute inset-0 opacity-50" />

          {/* logo materialises from Z-depth */}
          <div className="relative px-6" style={{ perspective: 1200 }}>
            <AnimatePresence>
              {showLogo && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.82, z: -400, filter: "blur(14px)" }}
                  animate={{ opacity: 1, scale: 1, z: 0, filter: "blur(0px)" }}
                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                  className="relative"
                >
                  <Logo className="w-64 sm:w-[22rem]" />

                  {/* chrome shimmer sweep across the lockup */}
                  <motion.div
                    initial={{ x: "-130%" }}
                    animate={{ x: "130%" }}
                    transition={{ duration: 1.3, delay: 0.7, ease: "easeInOut" }}
                    className="pointer-events-none absolute inset-y-0 w-1/3 skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* boot status + progress rail */}
          <div className="absolute bottom-[16%] flex flex-col items-center gap-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: showLogo ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="font-mono text-[10px] tracking-[0.4em] text-cyan-300"
            >
              INITIALISING SYSTEM
            </motion.div>
            <div className="h-px w-44 overflow-hidden bg-white/10">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: showLogo ? 1 : 0 }}
                transition={{ duration: 1.1, ease: "easeInOut" }}
                className="h-full w-full origin-left bg-gradient-to-r from-plasma to-cyan-400"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function TypedHeadline({ base }: { base: number }) {
  const line = "Automate. Scale. Dominate.";
  const words = line.split(" ");
  let charIndex = 0;

  return (
    <p
      aria-label={line}
      className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.02] tracking-tight text-glacier"
    >
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
                transition={{ duration: 0.5, delay: base + delay, ease: "easeOut" }}
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
    </p>
  );
}

export default function Hero() {
  // the boot sequence is a first-impression moment — play it once per session,
  // not every time the visitor navigates back to the home page.
  const [skipBoot, setSkipBoot] = useState(false);
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    try {
      const seen = sessionStorage.getItem("at-booted") === "1";
      sessionStorage.setItem("at-booted", "1");
      if (seen) setSkipBoot(true);
    } catch {
      /* storage blocked — just play the intro */
    }
  }, []);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // collapse the long boot-synced delays when the intro is skipped
  const t = (d: number) => (skipBoot ? Math.max(d - 1.8, 0.1) : d);

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
      <BootOverlay key={skipBoot ? "skip" : "boot"} skip={skipBoot} onDone={() => setBooted(true)} />

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
          reply_time: instant
        </div>
        <div className="absolute right-[6%] bottom-[18%] font-mono text-xs text-cyan-300">
          node[04] → node[11] synced
        </div>
      </div>

      {/* Foreground content */}
      <motion.div
        key={skipBoot ? "skip" : "boot"}
        style={{ y: headlineY, opacity: fadeOut }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
      >
        <AnimatePresence>
          {booted && (
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: t(1.8), duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-white/5 px-4 py-1.5 font-mono text-xs tracking-widest text-cyan-300"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
              SYSTEM ONLINE — SOUTH AFRICA
            </motion.span>
          )}
        </AnimatePresence>

        <TypedHeadline base={t(2.1)} />

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: t(3.0), duration: 0.7 }}
          className="mt-8 max-w-2xl text-balance text-base sm:text-lg font-normal text-chrome"
        >
          Websites, WhatsApp &amp; workflow automation and Google Ads for South
          African small businesses — built to capture every lead and cut the admin.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: t(3.3), duration: 0.7 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <Link
            to="/contact"
            className="glow-amber-hover group relative overflow-hidden rounded-full px-8 py-4 font-heading text-sm font-semibold tracking-wide text-white transition-shadow duration-300"
            style={{ backgroundColor: "#0047FF" }}
          >
            Book Your Free Audit
          </Link>
          <Link
            to="/services"
            className="rounded-full border border-cyan-400/50 px-8 py-4 font-heading text-sm font-semibold tracking-wide text-cyan-200 transition-colors duration-300 hover:bg-cyan-400/10"
          >
            See What We Build
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: t(3.7), duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[10px] tracking-[0.3em] text-chrome">SCROLL</span>
          <div className="h-8 w-px bg-gradient-to-b from-cyan-400 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
