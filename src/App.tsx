import { lazy, Suspense } from "react";
import Hero from "./components/Hero";
import SectionDivider from "./components/SectionDivider";

const Problem = lazy(() => import("./components/Problem"));
const Services = lazy(() => import("./components/Services"));
const Pricing = lazy(() => import("./components/Pricing"));
const Process = lazy(() => import("./components/Process"));
const TechStack = lazy(() => import("./components/TechStack"));
const Counters = lazy(() => import("./components/Counters"));
const Offer = lazy(() => import("./components/Offer"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));

const fallback = <div className="h-40 w-full bg-void" />;

export default function App() {
  return (
    <div className="relative bg-void">
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-10 py-5 backdrop-blur-md bg-void/40 border-b border-white/5">
        <span className="font-display text-sm sm:text-base font-bold tracking-wide text-glacier">
          A.T <span className="text-gradient">AUTOMATION</span> SOLUTIONS
        </span>
        <div className="flex items-center gap-6">
          <a
            href="#pricing"
            className="hidden sm:inline-block font-mono text-xs tracking-widest text-chrome hover:text-cyan-400 transition-colors"
          >
            PRICING
          </a>
          <a
            href="#offer"
            data-cursor="button"
            className="rounded-full border border-cyan-400/50 px-5 py-2 font-mono text-xs tracking-widest text-cyan-300 hover:bg-cyan-400/10 transition-colors"
          >
            BOOK AUDIT
          </a>
        </div>
      </header>

      <main>
        <Hero />
        <SectionDivider />
        <Suspense fallback={fallback}>
          <Problem />
          <SectionDivider />
          <Services />
          <SectionDivider />
          <Pricing />
          <SectionDivider />
          <div id="process">
            <Process />
          </div>
          <TechStack />
          <SectionDivider />
          <div id="numbers">
            <Counters />
          </div>
          <SectionDivider />
          <Offer />
          <SectionDivider />
          <div id="contact">
            <Contact />
          </div>
        </Suspense>
      </main>

      <Suspense fallback={fallback}>
        <Footer />
      </Suspense>

      <div className="noise-overlay fixed inset-0 z-40" />
    </div>
  );
}
