import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="relative flex min-h-[80svh] items-center justify-center overflow-hidden bg-void px-6 pt-32 pb-20">
      <div className="circuit-grid-faint absolute inset-0" />
      <div className="void-glow absolute inset-0" />
      <div className="scan-line" />

      <div className="relative text-center">
        <span className="font-mono text-xs tracking-[0.3em] text-cyan-400">ERROR // 404</span>
        <h1 className="mt-5 font-display text-6xl sm:text-8xl font-bold text-glacier">
          Route <span className="text-gradient">not found.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-md text-chrome">
          This process doesn't exist. Let's route you back to something that runs.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="glow-amber-hover rounded-full px-8 py-4 font-heading text-sm font-semibold text-white"
            style={{ backgroundColor: "#0047FF" }}
          >
            Back to Home
          </Link>
          <Link
            to="/contact"
            className="rounded-full border border-cyan-400/50 px-8 py-4 font-heading text-sm font-semibold text-cyan-200 transition-colors hover:bg-cyan-400/10"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
