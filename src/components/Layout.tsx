import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
import { LogoMark } from "./Logo";
import { MessageCircle } from "lucide-react";
import { waLink } from "../site";

const nav = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Pricing", to: "/pricing" },
  { label: "Process", to: "/process" },
  { label: "Results", to: "/results" },
  { label: "Contact", to: "/contact" },
];

const legalNav = [
  { label: "Privacy", to: "/privacy-policy" },
  { label: "Terms", to: "/terms-of-service" },
];

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return null;
}

export default function Layout() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative bg-void">
      <ScrollToTop />

      <header
        className={`fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-300 ${
          scrolled
            ? "border-white/10 bg-void/85 backdrop-blur-md"
            : "border-transparent bg-void/40 backdrop-blur-sm"
        }`}
      >
        {/* row 1 — brand + primary CTA */}
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 pt-3.5 pb-2.5 lg:py-4">
          <Link to="/" className="flex shrink-0 items-center gap-3">
            <LogoMark className="h-9 w-auto" idSuffix="hdr" />
            <span className="font-display text-sm font-bold tracking-wide text-glacier">
              A.T <span className="text-gradient">AUTOMATION</span>
            </span>
          </Link>

          {/* page names — inline on large screens */}
          <nav className="hidden lg:flex items-center gap-1">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `relative rounded-full px-3.5 py-2 font-mono text-[11px] tracking-widest transition-colors ${
                    isActive
                      ? "text-cyan-400"
                      : "text-chrome hover:text-glacier"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <span className="absolute inset-0 rounded-full border border-cyan-400/40 bg-cyan-400/10" />
                    )}
                    <span className="relative">{item.label.toUpperCase()}</span>
                  </>
                )}
              </NavLink>
            ))}

            {/* divider before the legal group */}
            <span className="mx-2 h-4 w-px bg-white/15" />

            {legalNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `relative rounded-full px-3 py-2 font-mono text-[10px] tracking-widest transition-colors ${
                    isActive
                      ? "text-cyan-400"
                      : "text-chrome/60 hover:text-glacier"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <span className="absolute inset-0 rounded-full border border-cyan-400/40 bg-cyan-400/10" />
                    )}
                    <span className="relative">{item.label.toUpperCase()}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <Link
            to="/contact"
            className="shrink-0 rounded-full px-4 sm:px-5 py-2 font-mono text-[10px] sm:text-[11px] tracking-widest text-white transition-shadow hover:shadow-[0_0_22px_rgba(255,149,0,0.5)]"
            style={{ backgroundColor: "#0047FF" }}
          >
            BOOK AUDIT
          </Link>
        </div>

        {/* row 2 — page names as a scrollable strip on small screens */}
        <div className="lg:hidden border-t border-white/5">
          <nav className="no-scrollbar mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-4 py-2">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `shrink-0 rounded-full border px-4 py-2 font-mono text-[10px] tracking-widest transition-colors ${
                    isActive
                      ? "border-cyan-400/50 bg-cyan-400/10 text-cyan-400"
                      : "border-white/10 text-chrome hover:text-glacier"
                  }`
                }
              >
                {item.label.toUpperCase()}
              </NavLink>
            ))}

            {/* divider before the legal group */}
            <span className="mx-1.5 h-4 w-px shrink-0 bg-white/15" />

            {legalNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `shrink-0 rounded-full border px-4 py-2 font-mono text-[10px] tracking-widest transition-colors ${
                    isActive
                      ? "border-cyan-400/50 bg-cyan-400/10 text-cyan-400"
                      : "border-white/10 text-chrome/60 hover:text-glacier"
                  }`
                }
              >
                {item.label.toUpperCase()}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <Footer />

      <div className="noise-overlay fixed inset-0 z-40" />

      {/* always-visible WhatsApp shortcut — the fastest path from visitor to lead */}
      <a
        href={waLink("Hi Amukelani, I found you on your website and I'd like to chat about my business.")}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 font-heading text-sm font-semibold text-[#03030A] shadow-[0_8px_30px_rgba(37,211,102,0.35)] transition-transform hover:scale-105"
      >
        <MessageCircle size={20} />
        <span className="hidden sm:inline">WhatsApp us</span>
      </a>
    </div>
  );
}
