import { motion } from "framer-motion";

const painPoints = [
  {
    stat: "Daily",
    title: "Manual Follow-Ups",
    desc: "Leads go cold while your team copy-pastes the same messages by hand, every single day.",
  },
  {
    stat: "After 5pm",
    title: "Missed Leads",
    desc: "Enquiries land after hours and disappear before anyone replies — revenue lost silently.",
  },
  {
    stat: "Weekly",
    title: "Wasted Hours Weekly",
    desc: "Skilled people trapped doing admin a machine could execute in seconds, flawlessly.",
  },
];

export default function Problem() {
  return (
    <section className="relative bg-void py-28 sm:py-36 px-6 overflow-hidden">
      <div className="circuit-grid-faint absolute inset-0 opacity-60" style={{ transform: "translateZ(-120px)" }} />
      <div className="void-glow absolute inset-0" />

      <div className="relative mx-auto max-w-4xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1 }}
          className="font-serif-italic text-2xl sm:text-3xl md:text-4xl text-glacier leading-relaxed"
        >
          "Most businesses are still doing manually what machines could do in
          seconds."
        </motion.p>
      </div>

      <div className="relative mx-auto mt-20 grid max-w-5xl gap-6 sm:grid-cols-3">
        {painPoints.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, z: -80, scale: 0.92 }}
            whileInView={{ opacity: 1, z: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: i * 0.15 }}
            className="glass-card rounded-2xl p-8 text-left"
          >
            <div className="font-display text-4xl font-bold text-amber-400">{p.stat}</div>
            <h3 className="mt-4 font-heading text-lg font-semibold text-glacier">{p.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-chrome">{p.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
