import { Share2, MessageCircle, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { LEGAL_NAME, REG_NO } from "../site";

import { EMAIL as EMAIL_ADDRESS, SITE_URL, WHATSAPP_DISPLAY, WHATSAPP_URL } from "../site";

const WHATSAPP = WHATSAPP_URL;
const EMAIL = `mailto:${EMAIL_ADDRESS}`;

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Pricing", to: "/pricing" },
  { label: "Process", to: "/process" },
  { label: "Results", to: "/results" },
  { label: "Contact", to: "/contact" },
];

const legalLinks = [
  { label: "Privacy Policy", to: "/privacy-policy" },
  { label: "Terms of Service", to: "/terms-of-service" },
];

const socials = [
  { Icon: Share2, href: SITE_URL, label: "Share our website", external: true },
  { Icon: MessageCircle, href: WHATSAPP, label: `WhatsApp ${WHATSAPP_DISPLAY}`, external: true },
  { Icon: Mail, href: EMAIL, label: `Email ${EMAIL_ADDRESS}`, external: false },
];

export default function Footer() {
  return (
    <footer className="relative bg-void pt-16 pb-10 px-6 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_rgba(0,245,255,0.8)]" />
      <div className="circuit-grid-faint absolute inset-0 opacity-30" />

      <div className="relative mx-auto max-w-6xl flex flex-col items-center text-center">
        <Logo className="w-44 sm:w-52" />

        <nav className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="font-mono text-xs tracking-widest text-chrome hover:text-cyan-400 transition-colors"
            >
              {l.label.toUpperCase()}
            </Link>
          ))}
        </nav>

        <div className="mt-8 flex gap-5">
          {socials.map(({ Icon, href, label, external }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              title={label}
              {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-chrome transition-all hover:border-plasma hover:text-plasma hover:shadow-[0_0_20px_rgba(0,71,255,0.5)]"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>

        <div className="mt-10 h-px w-full max-w-md bg-white/10" />

        <nav className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2">
          {legalLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="font-mono text-[11px] tracking-wide text-chrome/70 hover:text-cyan-400 transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <p className="mt-4 font-mono text-[11px] text-chrome/70">
          © 2026 {LEGAL_NAME}. Secunda, Mpumalanga · Serving Gauteng, Western Cape &amp; all of South Africa.
        </p>
        <p className="mt-2 inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/5 px-3 py-1 font-mono text-[11px] text-chrome/80">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" aria-hidden="true" />
          Registered company · CIPC Reg. No. {REG_NO}
        </p>
      </div>
    </footer>
  );
}
