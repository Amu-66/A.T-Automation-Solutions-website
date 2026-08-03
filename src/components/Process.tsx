import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Audit",
    desc: "We map your current process end-to-end — every bottleneck, every manual task, every leak in the pipeline.",
  },
  {
    num: "02",
    title: "Build",
    desc: "We engineer your automation system using the right tools for your business — no bloated software, no guesswork.",
  },
  {
    num: "03",
    title: "Deploy & Scale",
    desc: "We hand you a working machine — tested, documented, and ready to scale with your business.",
  },
];

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 40%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={ref} className="relative bg-void py-28 sm:py-36 px-6 overflow-hidden">
      <div className="circuit-grid-faint absolute inset-0" />
      <div className="void-glow absolute inset-0" />

      <div className="relative mx-auto max-w-3xl text-center">
        <span className="font-mono text-xs tracking-[0.3em] text-cyan-400">HOW IT WORKS</span>
        <h2 className="mt-4 font-display text-4xl sm:text-5xl font-bold text-glacier">
          Three steps to a self-running business.
        </h2>
      </div>

      <div className="relative mx-auto mt-20 max-w-2xl">
        <div className="absolute left-6 top-0 bottom-0 w-px bg-white/10 sm:left-1/2" />
        <motion.div
          style={{ height: lineHeight }}
          className="absolute left-6 top-0 w-px bg-gradient-to-b from-cyan-400 to-plasma shadow-[0_0_12px_rgba(0,245,255,0.8)] sm:left-1/2"
        />

        <div className="space-y-20">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, z: -80, y: 40 }}
              whileInView={{ opacity: 1, z: 0, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className={`relative flex items-start gap-6 pl-16 sm:pl-0 ${
                i % 2 === 0 ? "sm:flex-row sm:pr-[52%]" : "sm:flex-row-reverse sm:pl-[52%] sm:text-right"
              }`}
            >
              <div className="absolute left-6 top-1 -translate-x-1/2 sm:left-1/2 flex h-4 w-4 items-center justify-center">
                <span className="h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_16px_rgba(0,245,255,0.9)]" />
              </div>
              <div className="glass-card rounded-2xl p-7">
                <span className="font-mono text-sm text-amber-400">{step.num}</span>
                <h3 className="mt-2 font-display text-2xl font-bold text-glacier">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-chrome">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
