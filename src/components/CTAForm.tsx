import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const challenges = [
  "Missed leads & slow follow-up",
  "Too much manual admin",
  "Inconsistent social media",
  "Ads not converting",
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
  const [data, setData] = useState({ challenge: "", business: "", time: "", name: "", contact: "" });
  const [submitted, setSubmitted] = useState(false);

  const totalSteps = 3;
  const progress = ((step + 1) / totalSteps) * 100;

  const select = (key: keyof typeof data, value: string) => {
    setData((d) => ({ ...d, [key]: value }));
    setTimeout(() => setStep((s) => Math.min(s + 1, totalSteps - 1)), 250);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
        <h3 className="mt-6 font-display text-2xl font-bold text-glacier">System Confirmed.</h3>
        <p className="mt-2 text-sm text-chrome">
          Your audit request has been received. Expect a message from A.T Automation Solutions within 24 hours.
        </p>
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
            <h3 className="mt-2 font-display text-xl font-bold text-glacier">What's your biggest challenge?</h3>
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
              Submit Request
            </button>
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
