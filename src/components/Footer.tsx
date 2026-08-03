import { Globe, Share2, MessageCircle, Mail } from "lucide-react";

const links = ["Services", "Pricing", "Process", "Numbers", "Contact"];

export default function Footer() {
  return (
    <footer className="relative bg-void pt-16 pb-10 px-6 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_rgba(0,245,255,0.8)]" />
      <div className="circuit-grid-faint absolute inset-0 opacity-30" />

      <div className="relative mx-auto max-w-6xl flex flex-col items-center text-center">
        <div className="font-display text-2xl font-bold text-glacier">
          A.T <span className="text-gradient">AUTOMATION</span> SOLUTIONS
        </div>

        <nav className="mt-8 flex flex-wrap justify-center gap-8">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="font-mono text-xs tracking-widest text-chrome hover:text-cyan-400 transition-colors"
            >
              {l.toUpperCase()}
            </a>
          ))}
        </nav>

        <div className="mt-8 flex gap-5">
          {[Globe, Share2, MessageCircle, Mail].map((Icon, i) => (
            <a
              key={i}
              href="#"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-chrome transition-all hover:border-plasma hover:text-plasma hover:shadow-[0_0_20px_rgba(0,71,255,0.5)]"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>

        <div className="mt-10 h-px w-full max-w-md bg-white/10" />

        <p className="mt-6 font-mono text-[11px] text-chrome/70">
          © {new Date().getFullYear()} A.T Automation Solutions. Secunda, Mpumalanga, South Africa. All systems operational.
        </p>
      </div>
    </footer>
  );
}
