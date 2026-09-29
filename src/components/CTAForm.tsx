import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { FORM_WEBHOOK_URL, WHATSAPP_DISPLAY, waLink } from "../site";

const challenges = [
  "Missed leads & slow follow-up",
  "Too much manual admin",
  "Inconsistent social media",
  "Ads not converting",
  "No website / outdated website",
  "Need professional graphic design",
];

const businessTypes = [
  "Solo / Freelancer",
  "Small Team (2–10)",
  "Growing Business (11–50)",
  "Established Company (50+)",
];

const contactTimes = ["Morning", "Afternoon", "Evening", "Anytime"];

export default function CTAForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    challenge: "",
    business: "",
    time: "",
    name: "",
    contact: "",
    designBrief: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const totalSteps = 3;
  const progress = ((step + 1) / totalSteps) * 100;

  const select = (key: keyof typeof data, value: string) => {
    setData((d) => ({ ...d, [key]: value }));
    setTimeout(() => setStep((s) => Math.min(s + 1, totalSteps - 1)), 250);
  };

  const summary = () =>
    [
      "Hi Amukelani, I'd like a free audit.",
      `Name: ${data.name}`,
      `Contact: ${data.contact}`,
      `Need help with: ${data.challenge}`,
      data.designBrief ? `Design brief: ${data.designBrief}` : "",
      `Business: ${data.business}`,
      `Best time to reach me: ${data.time}`,
    ]
      .filter(Boolean)
      .join("\n");

  // Previously the form only showed a success screen and the lead went nowhere.
  // Now it opens WhatsApp with the request pre-filled (and optionally posts it
  // to a Make.com / n8n webhook set in src/site.ts).
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = summary();
    window.open(waLink(text), "_blank", "noopener");
    if (FORM_WEBHOOK_URL) {
      fetch(FORM_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: "website-audit-form", submittedAt: new Date().toISOString() }),
      }).catch(() => {});
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="glass-card mx-auto max-w-lg rounded-2xl p-10 text-center relative overflow-hidden">
        <motion.div
          initial={{ scaleX: 0, opacity: 0.6 }}
          animate={{ scaleX: 1, opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent"
        />
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }}>
          <CheckCircle2 className="mx-auto text-emerald-400" size={56} />
        </motion.div>
        <h3 className="mt-6 font-display text-2xl font-bold text-glacier">Almost done — hit send.</h3>
        <p className="mt-2 text-sm text-chrome">
          WhatsApp has opened with your request filled in. Press send and you'll hear back
          within 24 hours. If it didn't open, use the button below.
        </p>
        <a
          href={waLink(summary())}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-heading text-sm font-semibold text-[#03030A]"
        >
          <MessageCircle size={16} /> Send on WhatsApp ({WHATSAPP_DISPLAY})
        </a>
      </div>
    );
  }

  return (
    <div className="glass-card mx-auto max-w-lg rounded-2xl p-8 sm:p-10">
      <div className="mb-8 h-1 w-full overflow-hidden rounded-full bg-white/10">
        <motion.div
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4 }}
          className="h-full bg-gradient-to-r from-plasma to-cyan-400"
        />
      </div>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="step0"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.4 }}
          >
            <span className="font-mono text-xs text-cyan-400">STEP 01 / 03</span>
            <h3 className="mt-2 font-display text-xl font-bold text-glacier">
              What do you need help with?
            </h3>
            <div className="mt-6 grid gap-3">
              {challenges.map((c) => (
                <button
                  key={c}
                  data-cursor="button"
                  onClick={() => select("challenge", c)}
                  className={`rounded-xl border px-5 py-3 text-left text-sm transition-colors ${
                    data.challenge === c
                      ? "border-cyan-400 bg-cyan-400/10 text-glacier"
                      : "border-white/10 text-chrome hover:border-cyan-400/40 hover:text-glacier"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.4 }}
          >
            <span className="font-mono text-xs text-cyan-400">STEP 02 / 03</span>
            <h3 className="mt-2 font-display text-xl font-bold text-glacier">Business type & size</h3>
            <div className="mt-6 grid gap-3">
              {businessTypes.map((b) => (
                <button
                  key={b}
                  data-cursor="button"
                  onClick={() => select("business", b)}
                  className={`rounded-xl border px-5 py-3 text-left text-sm transition-colors ${
                    data.business === b
                      ? "border-cyan-400 bg-cyan-400/10 text-glacier"
                      : "border-white/10 text-chrome hover:border-cyan-400/40 hover:text-glacier"
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.form
            key="step2"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.4 }}
          >
            <span className="font-mono text-xs text-cyan-400">STEP 03 / 03</span>
            <h3 className="mt-2 font-display text-xl font-bold text-glacier">Preferred contact time</h3>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {contactTimes.map((t) => (
                <button
                  type="button"
                  key={t}
                  data-cursor="button"
                  onClick={() => setData((d) => ({ ...d, time: t }))}
                  className={`rounded-xl border px-4 py-3 text-sm transition-colors ${
                    data.time === t
                      ? "border-cyan-400 bg-cyan-400/10 text-glacier"
                      : "border-white/10 text-chrome hover:border-cyan-400/40 hover:text-glacier"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {data.challenge === "Need professional graphic design" && (
              <div className="mt-6">
                <label className="font-mono text-[11px] tracking-wide text-amber-400">
                  WHAT DO YOU NEED DESIGNED?
                </label>
                <input
                  placeholder="e.g. logo, business profile, invoices, flyers…"
                  value={data.designBrief}
                  onChange={(e) => setData((d) => ({ ...d, designBrief: e.target.value }))}
                  className="mt-2 w-full rounded-xl border border-amber-400/30 bg-amber-400/[0.04] px-4 py-3 text-sm text-glacier placeholder:text-chrome/60 outline-none focus:border-amber-400"
                />
              </div>
            )}

            <div className="mt-6 grid gap-3">
              <input
                required
                placeholder="Your name"
                value={data.name}
                onChange={(e) => setData((d) => ({ ...d, name: e.target.value }))}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-glacier placeholder:text-chrome/60 outline-none focus:border-cyan-400"
              />
              <input
                required
                placeholder="Email or WhatsApp number"
                value={data.contact}
                onChange={(e) => setData((d) => ({ ...d, contact: e.target.value }))}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-glacier placeholder:text-chrome/60 outline-none focus:border-cyan-400"
              />
            </div>

            <button
              type="submit"
              data-cursor="button"
              disabled={!data.time}
              className="glow-amber-hover mt-6 w-full rounded-xl bg-plasma py-3.5 font-heading text-sm font-semibold text-white disabled:opacity-40"
              style={{ backgroundColor: "#0047FF" }}
            >
              Send My Audit Request
            </button>
            <p className="mt-3 text-center font-mono text-[10px] tracking-wide text-chrome/70">
              Opens WhatsApp with your answers filled in.
            </p>
          </motion.form>
        )}
      </AnimatePresence>

      {step > 0 && (
        <button
          onClick={() => setStep((s) => Math.max(s - 1, 0))}
          className="mt-6 font-mono text-xs text-chrome hover:text-cyan-400"
        >
          ← back
        </button>
      )}
    </div>
  );
}
