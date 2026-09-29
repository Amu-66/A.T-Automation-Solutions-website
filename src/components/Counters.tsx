import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

// Honest, verifiable numbers only — swap in real client results as you get them
// (e.g. { value: 12, prefix: "", suffix: "", label: "Businesses Automated" }).
const stats = [
  { value: 1500, prefix: "R", suffix: "", label: "Automations From (Once-Off)" },
  { value: 5500, prefix: "R", suffix: "", label: "Websites From (Once-Off)" },
  { value: 24, prefix: "", suffix: "h", label: "Reply to Every Enquiry" },
  { value: 1, prefix: "", suffix: "", label: "Founder Builds Your System — No Hand-Offs" },
];

function Counter({ value, prefix, suffix }: { value: number; prefix: string; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(eased * value));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {prefix}
      {String(display).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      {suffix}
    </span>
  );
}

export default function Counters() {
  return (
    <section className="relative bg-void py-32 sm:py-44 px-6 overflow-hidden">
      <div className="circuit-grid absolute inset-0 opacity-30" />
      <div className="void-glow absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-plasma/5 to-transparent" />

      <div className="relative mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <span className="font-mono text-xs tracking-[0.3em] text-cyan-400">WHAT YOU GET</span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold text-glacier">
            Straight numbers. <span className="text-gradient">No hype.</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="font-display text-4xl sm:text-6xl font-bold text-cyan-300">
                <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
              </div>
              <div className="mx-auto mt-3 h-0.5 w-10 bg-amber-400" />
              <p className="mt-3 font-mono text-[11px] sm:text-xs tracking-wide text-chrome">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
