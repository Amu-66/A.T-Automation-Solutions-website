import { useState } from "react";

const tools = [
  { name: "Make.com", desc: "Visual workflow automation across every app you use." },
  { name: "n8n", desc: "Self-hosted automation for complex, custom logic." },
  { name: "OpenAI", desc: "AI reasoning engine behind our automation agents." },
  { name: "Apollo.io", desc: "Lead sourcing and verified contact data at scale." },
  { name: "Zapier", desc: "Fast, reliable integrations between core business apps." },
  { name: "Google Workspace", desc: "Docs, sheets and mail — fully automated." },
  { name: "Meta Ads", desc: "Precision ad targeting and campaign automation." },
  { name: "React", desc: "The framework we build every high-performance website on." },
  { name: "Arena AI", desc: "AI-assisted website builds and agent orchestration." },
];

export default function TechStack() {
  const [hovered, setHovered] = useState<string | null>(null);
  const loop = [...tools, ...tools];

  return (
    <section className="relative bg-void py-24 overflow-hidden">
      <div className="circuit-grid-faint absolute inset-0 opacity-50" />
      <div className="relative mx-auto max-w-3xl text-center px-6">
        <span className="font-mono text-xs tracking-[0.3em] text-cyan-400">THE STACK</span>
        <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold text-glacier">
          Tools we operate at expert level.
        </h2>
      </div>

      <div className="relative mt-16">
        <div className="absolute inset-x-0 bottom-0 h-16 bg-plasma/10 blur-2xl" />
        <div className="overflow-hidden">
          <div className="marquee-track flex w-max gap-4 px-4">
            {loop.map((tool, i) => (
              <div
                key={`${tool.name}-${i}`}
                onMouseEnter={() => setHovered(`${tool.name}-${i}`)}
                onMouseLeave={() => setHovered(null)}
                className="relative flex h-24 w-52 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] font-heading text-lg font-semibold text-chrome transition-colors hover:border-cyan-400/50 hover:text-glacier"
              >
                {tool.name}
                {hovered === `${tool.name}-${i}` && (
                  <div className="absolute -top-16 left-1/2 w-56 -translate-x-1/2 rounded-lg border border-cyan-400/30 bg-[#0D0D2B] p-3 font-mono text-[11px] text-chrome shadow-xl z-20">
                    {tool.desc}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
