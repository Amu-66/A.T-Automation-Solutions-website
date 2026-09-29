import { useRef, useState } from "react";
import { motion } from "framer-motion";

const services = [
  {
    tag: "SYS_01 // AI AUTOMATION",
    title: "AI Automation Systems",
    desc: "Custom AI agents that qualify leads, answer enquiries and run your back office while you sleep.",
    tools: "OpenAI · Arena AI · Custom LLM Agents",
  },
  {
    tag: "SYS_02 // WORKFLOW",
    title: "Workflow Automation",
    desc: "We connect every tool you own into one self-running machine — no manual handoffs, no dropped tasks.",
    tools: "Make.com · n8n · Zapier",
  },
  {
    tag: "SYS_03 // WEB",
    title: "Website Development",
    desc: "High-performance websites engineered to convert visitors into booked calls — built for speed and scale.",
    tools: "React · Arena AI",
  },
  {
    tag: "SYS_04 // LEADGEN",
    title: "Lead Generation Systems",
    desc: "Automated pipelines that source, verify and deliver qualified leads directly into your CRM daily.",
    tools: "Apollo.io · Google Workspace",
  },
  {
    tag: "SYS_05 // SOCIAL",
    title: "Social Media Management",
    desc: "Content systems and scheduling automation that keep your brand consistent without the manual grind.",
    tools: "Meta Business Suite · Automation Pipelines",
  },
  {
    tag: "SYS_06 // ADS",
    title: "Ads Campaign Management",
    desc: "Data-driven ad campaigns engineered for cost-per-lead efficiency and continuous optimisation.",
    tools: "Meta Ads · Google Ads",
  },
];

function ServiceCard({ service, index }: { service: (typeof services)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);
  const isOdd = index % 2 === 0;

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -14, y: px * 14 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, rotateY: 8, z: -100 }}
      whileInView={{ opacity: 1, rotateY: 0, z: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: isOdd ? -6 : 6 }}
      className="preserve-3d"
    >
      <div
        ref={ref}
        data-cursor="scan"
        onMouseMove={handleMove}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => {
          setHover(false);
          setTilt({ x: 0, y: 0 });
        }}
        style={{
          transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: "transform 0.15s ease-out",
          boxShadow: hover
            ? `${-tilt.y * 1.5}px ${-tilt.x * 1.5}px 40px rgba(0,71,255,0.35)`
            : "0 8px 24px rgba(0,0,0,0.4)",
        }}
        className="glass-card relative h-full overflow-hidden rounded-2xl p-7"
      >
        {hover && (
          <motion.div
            initial={{ top: "-20%" }}
            animate={{ top: "120%" }}
            transition={{ duration: 0.7, ease: "linear" }}
            className="pointer-events-none absolute left-0 right-0 h-1/3 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent"
          />
        )}
        <span className="font-mono text-[11px] tracking-widest text-cyan-400">{service.tag}</span>
        <h3 className="mt-4 font-display text-xl font-bold text-glacier">{service.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-chrome">{service.desc}</p>
        <div className="mt-6 border-t border-white/10 pt-4 font-mono text-[11px] text-chrome/80">
          {service.tools}
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative bg-indigo-deep py-28 sm:py-36 px-6 overflow-hidden">
      <div className="circuit-grid absolute inset-0 opacity-40" />
      <div className="void-glow absolute inset-0" />

      <div className="relative mx-auto max-w-3xl text-center">
        <span className="font-mono text-xs tracking-[0.3em] text-cyan-400">WHAT WE BUILD</span>
        <h2 className="mt-4 font-display text-4xl sm:text-5xl font-bold text-glacier">
          Six systems. One outcome —{" "}
          <span className="text-gradient">growth on autopilot.</span>
        </h2>
      </div>

      <div className="relative mx-auto mt-16 grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <ServiceCard key={s.title} service={s} index={i} />
        ))}
      </div>
    </section>
  );
}
