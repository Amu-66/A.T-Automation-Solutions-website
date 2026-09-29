import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import SectionDivider from "../components/SectionDivider";

import Problem from "../components/Problem";
import Counters from "../components/Counters";
import CTABand from "../components/CTABand";

const teasers = [
  {
    tag: "SYS_01",
    title: "AI Automation Systems",
    desc: "AI agents that qualify leads and run your back office while you sleep.",
  },
  {
    tag: "SYS_02",
    title: "Workflow Automation",
    desc: "Every tool you own, connected into one self-running machine.",
  },
  {
    tag: "SYS_03",
    title: "Website Development",
    desc: "High-performance sites engineered to convert visitors into booked calls.",
  },
  {
    tag: "SYS_04",
    title: "Lead Generation",
    desc: "Pipelines that source, verify and deliver qualified leads daily.",
  },
  {
    tag: "SYS_05",
    title: "Social & Ads",
    desc: "Consistent content and data-driven campaigns without the manual grind.",
  },
  {
    tag: "SYS_06",
    title: "Graphic Design",
    desc: "Logos, profiles, corporate documents — anything you can brief, we design.",
  },
];

export default function Home() {
  return (
    <>
      <Hero />
      <SectionDivider />

      <>
        <Problem />
        <SectionDivider />

        {/* services teaser */}
        <section className="relative overflow-hidden bg-indigo-deep px-6 py-28 sm:py-32">
          <div className="circuit-grid absolute inset-0 opacity-40" />
          <div className="void-glow absolute inset-0" />

          <div className="relative mx-auto max-w-3xl text-center">
            <span className="font-mono text-xs tracking-[0.3em] text-cyan-400">WHAT WE BUILD</span>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl font-bold text-glacier">
              Six systems. One outcome —{" "}
              <span className="text-gradient">growth on autopilot.</span>
            </h2>
          </div>

          <div className="relative mx-auto mt-14 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {teasers.map((t, i) => (
              <motion.div
                key={t.title}
                initial={{ opacity: 0, y: 34, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.07 }}
                className="glass-card rounded-2xl p-7"
              >
                <span className="font-mono text-[11px] tracking-widest text-cyan-400">{t.tag}</span>
                <h3 className="mt-3 font-display text-lg font-bold text-glacier">{t.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-chrome">{t.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="relative mt-12 text-center">
            <Link
              to="/services"
              className="inline-block rounded-full border border-cyan-400/50 px-8 py-4 font-heading text-sm font-semibold text-cyan-200 transition-colors hover:bg-cyan-400/10"
            >
              Explore All Services
            </Link>
          </div>
        </section>

        <SectionDivider />
        <Counters />
        <SectionDivider />
        <CTABand />
      </>
    </>
  );
}
