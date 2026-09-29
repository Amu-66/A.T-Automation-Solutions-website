import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface CTABandProps {
  title?: string;
  highlight?: string;
  text?: string;
}

export default function CTABand({
  title = "Your competitors are automating.",
  highlight = "Are you?",
  text = "Book a free audit and we'll show you exactly where your business is bleeding time and money — and the system that fixes it.",
}: CTABandProps) {
  return (
    <section
      className="relative overflow-hidden px-6 py-24 sm:py-28"
      style={{
        background:
          "radial-gradient(ellipse 100% 60% at 50% 0%, rgba(0,71,255,0.32), transparent 62%), #03030A",
      }}
    >
      <div className="circuit-grid-faint absolute inset-0 opacity-40" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7 }}
        className="relative mx-auto max-w-3xl text-center"
      >
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-glacier">
          {title} <span className="text-gradient">{highlight}</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-chrome">{text}</p>

        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/contact"
            className="glow-amber-hover rounded-full px-8 py-4 font-heading text-sm font-semibold tracking-wide text-white transition-shadow duration-300"
            style={{ backgroundColor: "#0047FF" }}
          >
            Book Your Free Audit
          </Link>
          <a
            href="https://wa.me/27693367393"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-cyan-400/50 px-8 py-4 font-heading text-sm font-semibold tracking-wide text-cyan-200 transition-colors duration-300 hover:bg-cyan-400/10"
          >
            WhatsApp Us Now
          </a>
        </div>
      </motion.div>
    </section>
  );
}
