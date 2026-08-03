import { motion } from "framer-motion";
import { Mail, MapPin, MessageCircle } from "lucide-react";

export default function Contact() {
  return (
    <section className="relative bg-void py-28 sm:py-36 px-6 overflow-hidden">
      <div className="circuit-grid-faint absolute inset-0 opacity-40" />
      <div className="void-glow absolute inset-0" />

      <div className="relative mx-auto max-w-6xl grid gap-16 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-mono text-xs tracking-[0.3em] text-cyan-400">CONNECT</span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold text-glacier">
            Let's build your system.
          </h2>

          <div className="mt-10 space-y-6">
            <a
              href="mailto:amuthandolwethu@gmail.com"
              data-cursor="button"
              className="flex items-center gap-4 group"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-cyan-400/40 text-cyan-400 group-hover:bg-cyan-400/10">
                <Mail size={18} />
              </span>
              <div>
                <div className="font-mono text-xs text-chrome">EMAIL</div>
                <div className="text-glacier">amuthandolwethu@gmail.com</div>
              </div>
            </a>

            <a
              href="https://wa.me/27693367393"
              target="_blank"
              rel="noreferrer"
              data-cursor="button"
              className="flex items-center gap-4 group"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-amber-400/40 text-amber-400 group-hover:bg-amber-400/10">
                <MessageCircle size={18} />
              </span>
              <div>
                <div className="font-mono text-xs text-chrome">WHATSAPP</div>
                <div className="text-glacier">069 336 7393</div>
              </div>
            </a>

            <div className="flex items-center gap-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-plasma/40 text-plasma">
                <MapPin size={18} />
              </span>
              <div>
                <div className="font-mono text-xs text-chrome">LOCATION</div>
                <div className="text-glacier">Secunda, Mpumalanga — Serving South Africa Nationally</div>
              </div>
            </div>
          </div>

          <p className="font-serif-italic mt-12 text-xl text-chrome">
            Empowering Growth with AI.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8 }}
          className="glass-card relative flex min-h-[320px] items-center justify-center overflow-hidden rounded-2xl"
        >
          <div className="circuit-grid absolute inset-0 opacity-50" />
          <div className="void-glow absolute inset-0" />
          <div className="relative text-center px-6">
            <div className="mx-auto mb-4 h-14 w-14 rounded-full border border-cyan-400/40 flex items-center justify-center">
              <MapPin className="text-cyan-400" size={26} />
            </div>
            <div className="font-display text-2xl font-bold text-glacier">Secunda, Mpumalanga</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
