import { motion } from "framer-motion";

interface PageHeroProps {
  tag: string;
  title: string;
  highlight?: string;
  intro?: string;
}

export default function PageHero({ tag, title, highlight, intro }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-void px-6 pt-40 pb-20 sm:pt-48 sm:pb-24">
      <div className="circuit-grid-faint absolute inset-0" />
      <div className="void-glow absolute inset-0" />
      <div className="scan-line" />

      <div className="relative mx-auto max-w-4xl text-center">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-mono text-xs tracking-[0.3em] text-cyan-400"
        >
          {tag}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 26, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
          className="mt-5 font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight text-glacier"
        >
          {title}{" "}
          {highlight && <span className="text-gradient">{highlight}</span>}
        </motion.h1>

        {intro && (
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-balance text-chrome"
          >
            {intro}
          </motion.p>
        )}
      </div>
    </section>
  );
}
