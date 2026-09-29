import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PageHero from "./PageHero";

export interface LegalSection {
  heading: string;
  body: string[];
  bullets?: string[];
}

interface LegalPageProps {
  tag: string;
  title: string;
  highlight: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
}

export default function LegalPage({
  tag,
  title,
  highlight,
  intro,
  updated,
  sections,
}: LegalPageProps) {
  return (
    <>
      <PageHero tag={tag} title={title} highlight={highlight} intro={intro} />

      <section className="relative overflow-hidden bg-indigo-deep px-6 py-20 sm:py-24">
        <div className="circuit-grid absolute inset-0 opacity-25" />
        <div className="void-glow absolute inset-0 opacity-60" />

        <div className="relative mx-auto max-w-3xl">
          <div className="glass-card rounded-2xl px-6 py-5 font-mono text-[11px] tracking-wide text-chrome">
            LAST UPDATED: <span className="text-cyan-400">{updated}</span>
          </div>

          <div className="mt-10 space-y-10">
            {sections.map((section, i) => (
              <motion.div
                key={section.heading}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: Math.min(i * 0.04, 0.3) }}
              >
                <h2 className="font-display text-xl sm:text-2xl font-bold text-glacier">
                  <span className="mr-3 font-mono text-sm text-cyan-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {section.heading}
                </h2>

                <div className="mt-4 space-y-4 border-l border-white/10 pl-5">
                  {section.body.map((para, j) => (
                    <p key={j} className="text-sm leading-relaxed text-chrome">
                      {para}
                    </p>
                  ))}

                  {section.bullets && (
                    <ul className="space-y-2.5 pt-1">
                      {section.bullets.map((b) => (
                        <li key={b} className="flex gap-3 text-sm leading-relaxed text-chrome">
                          <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* contact footer block */}
          <div className="glass-card mt-14 rounded-2xl p-8">
            <span className="font-mono text-[11px] tracking-widest text-cyan-400">QUESTIONS?</span>
            <h3 className="mt-3 font-display text-xl font-bold text-glacier">
              Talk to A.T Automation Solutions
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-chrome">
              If anything on this page is unclear, or you want to exercise your rights over your
              information, reach out and we'll respond within a reasonable period.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="mailto:amuthandolwethu@gmail.com"
                className="rounded-full border border-cyan-400/40 px-5 py-2.5 font-mono text-[11px] tracking-wide text-cyan-300 transition-colors hover:bg-cyan-400/10"
              >
                amuthandolwethu@gmail.com
              </a>
              <a
                href="https://wa.me/27693367393"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-amber-400/40 px-5 py-2.5 font-mono text-[11px] tracking-wide text-amber-400 transition-colors hover:bg-amber-400/10"
              >
                WhatsApp 069 336 7393
              </a>
              <Link
                to="/contact"
                className="rounded-full border border-white/15 px-5 py-2.5 font-mono text-[11px] tracking-wide text-chrome transition-colors hover:text-glacier"
              >
                Contact page
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
