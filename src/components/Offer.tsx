import { motion } from "framer-motion";
import CTAForm from "./CTAForm";

export default function Offer() {
  return (
    <section
      id="offer"
      className="relative overflow-hidden py-28 sm:py-36 px-6"
      style={{
        background:
          "radial-gradient(ellipse 100% 60% at 50% 0%, rgba(0,71,255,0.35), transparent 60%), #03030A",
      }}
    >
      <div className="circuit-grid-faint absolute inset-0 opacity-40" />

      <div className="relative mx-auto max-w-6xl grid gap-16 lg:grid-cols-2 items-center">
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-glacier"
          >
            Your competitors are automating.{" "}
            <span className="text-gradient">Are you?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mt-6 max-w-md text-chrome"
          >
            Book a free audit and we'll show you exactly where your business
            is bleeding time and money — and the system that fixes it.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <CTAForm />
        </motion.div>
      </div>
    </section>
  );
}
