import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const lines = [
  {
    tag: "LINE_01 // AUTOMATION",
    title: "Automation",
    tiers: [
      { name: "Starter", price: "R1,500" },
      { name: "Growth", price: "R3,500 – R7,000" },
      { name: "Enterprise", price: "R9,500+" },
    ],
    note: "Once-off build. Mapped, engineered, documented and handed over.",
  },
  {
    tag: "LINE_02 // WEBSITES",
    title: "Websites",
    tiers: [
      { name: "Starter", price: "R5,500" },
      { name: "Business", price: "R8,000" },
      { name: "Premium", price: "R9,500" },
    ],
    note: "Once-off build. Hosting and domain quoted separately.",
  },
  {
    tag: "LINE_03 // SOCIAL",
    title: "Social Media Management",
    tiers: [
      { name: "Starter", price: "R1,500/mo" },
      { name: "Growth", price: "R3,500/mo" },
      { name: "Scale", price: "R5,500/mo" },
    ],
    note: "Monthly retainer. Content, scheduling and reporting included.",
  },
  {
    tag: "LINE_04 // ADS",
    title: "Ads Management",
    tiers: [{ name: "Flat Rate", price: "R2,500/mo" }],
    note: "Monthly retainer. Ad spend billed separately by platform.",
  },
  {
    tag: "LINE_05 // MAINTENANCE",
    title: "Maintenance",
    tiers: [{ name: "Flat Rate", price: "R1,200/mo" }],
    note: "Ongoing system upkeep, monitoring and support.",
  },
];

const designItems = [
  "Posters & Flyers",
  "Logos",
  "Invitations",
  "Business Cards",
  "Banners",
  "Social Media Posts",
  "Stickers",
  "Thank You Cards",
  "Business Profiles",
  "Key Holder Designs",
  "Invoices",
  "Quotations",
  "Business Plans",
  "Business Proposals",
  "Corporate Documents",
];

function PricingCard({ line, index }: { line: (typeof lines)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -8, y: px * 8 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, z: -80 }}
      whileInView={{ opacity: 1, y: 0, z: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="preserve-3d h-full"
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
            ? `${-tilt.y * 1.2}px ${-tilt.x * 1.2}px 34px rgba(0,71,255,0.3)`
            : "0 8px 24px rgba(0,0,0,0.4)",
        }}
        className="glass-card relative flex h-full flex-col overflow-hidden rounded-2xl p-7"
      >
        {hover && (
          <motion.div
            initial={{ top: "-20%" }}
            animate={{ top: "120%" }}
            transition={{ duration: 0.7, ease: "linear" }}
            className="pointer-events-none absolute left-0 right-0 h-1/3 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent"
          />
        )}
        <span className="font-mono text-[11px] tracking-widest text-cyan-400">{line.tag}</span>
        <h3 className="mt-3 font-display text-xl font-bold text-glacier">{line.title}</h3>

        <div className="mt-5 flex-1 space-y-3">
          {line.tiers.map((tier) => (
            <div
              key={tier.name}
              className="flex items-center justify-between border-t border-white/10 pt-3 first:border-t-0 first:pt-0"
            >
              <span className="font-heading text-sm text-chrome">{tier.name}</span>
              <span className="font-mono text-sm font-semibold text-glacier">{tier.price}</span>
            </div>
          ))}
        </div>

        <p className="mt-6 font-mono text-[11px] leading-relaxed text-chrome/70">{line.note}</p>
      </div>
    </motion.div>
  );
}

function DesignCard() {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -6, y: px * 6 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, z: -100 }}
      whileInView={{ opacity: 1, y: 0, z: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
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
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: "transform 0.15s ease-out",
          boxShadow: hover
            ? `${-tilt.y}px ${-tilt.x}px 50px rgba(255,149,0,0.25)`
            : "0 8px 30px rgba(0,0,0,0.4)",
        }}
        className="glass-card relative overflow-hidden rounded-2xl border-amber-400/30 p-8 sm:p-10"
      >
        {hover && (
          <motion.div
            initial={{ top: "-20%" }}
            animate={{ top: "120%" }}
            transition={{ duration: 0.8, ease: "linear" }}
            className="pointer-events-none absolute left-0 right-0 h-1/3 bg-gradient-to-b from-transparent via-amber-400/15 to-transparent"
          />
        )}

        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-[11px] tracking-widest text-cyan-400">LINE_06 // GRAPHIC DESIGN</span>
          <span className="rounded-full border border-amber-400/50 bg-amber-400/10 px-2.5 py-0.5 font-mono text-[10px] tracking-widest text-amber-400">
            NEW
          </span>
        </div>

        <h3 className="mt-4 font-display text-2xl sm:text-3xl font-bold text-glacier">
          Professional Graphic Design
        </h3>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-chrome">
          Sharp, brand-consistent design and artwork — built for print or digital use.
          From marketing material to full corporate documentation, if you can brief it,
          we can design it. Design and artwork only; printing is not included.
        </p>

        <div className="mt-8 flex flex-wrap gap-2.5">
          {designItems.map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 font-mono text-[11px] tracking-wide text-chrome"
            >
              {item}
            </span>
          ))}
          <span className="rounded-full border border-amber-400/40 bg-amber-400/10 px-4 py-2 font-mono text-[11px] tracking-wide text-amber-400">
            + anything you need
          </span>
        </div>

        <div className="mt-9 grid gap-4 border-t border-white/10 pt-7 sm:grid-cols-3">
          <div>
            <div className="font-mono text-2xl font-bold text-glacier">R90 – R180</div>
            <div className="mt-1 font-mono text-[11px] text-chrome/70">Standard design pieces</div>
          </div>
          <div>
            <div className="font-mono text-2xl font-bold text-glacier">R150</div>
            <div className="mt-1 font-mono text-[11px] text-chrome/70">Flat rate — logo design</div>
          </div>
          <div>
            <div className="font-mono text-2xl font-bold text-amber-400">Custom Quoted</div>
            <div className="mt-1 font-mono text-[11px] text-chrome/70">Business profiles & bulk sets</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Pricing() {
  return (
    <section id="pricing" className="relative bg-indigo-deep py-28 sm:py-36 px-6 overflow-hidden">
      <div className="circuit-grid absolute inset-0 opacity-40" />
      <div className="void-glow absolute inset-0" />

      <div className="relative mx-auto max-w-3xl text-center">
        <span className="font-mono text-xs tracking-[0.3em] text-cyan-400">INFRASTRUCTURE</span>
        <h2 className="mt-4 font-display text-4xl sm:text-5xl font-bold text-glacier">
          Six service lines.{" "}
          <span className="text-gradient">One infrastructure.</span>
        </h2>
        <p className="mt-5 text-chrome">
          Transparent pricing, built to scale with your business — from once-off systems
          to ongoing monthly operations.
        </p>
      </div>

      <div className="relative mx-auto mt-16 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {lines.map((line, i) => (
          <PricingCard key={line.title} line={line} index={i} />
        ))}
      </div>

      <div className="relative mx-auto mt-6 max-w-6xl">
        <DesignCard />
      </div>

      <div className="relative mx-auto mt-14 max-w-6xl text-center">
        <Link
          to="/contact"
          className="glow-amber-hover inline-block rounded-full px-8 py-4 font-heading text-sm font-semibold tracking-wide text-white transition-shadow duration-300"
          style={{ backgroundColor: "#0047FF" }}
        >
          Get a Custom Quote
        </Link>
      </div>
    </section>
  );
}
