import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarCheck, CheckCircle2, MessageCircle } from "lucide-react";
import { FORM_WEBHOOK_URL, WHATSAPP_DISPLAY, calendlyLink, waLink } from "../site";

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

const pad = (n: number) => String(n).padStart(2, "0");
const toISODate = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

function prettyDate(iso: string) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-ZA", { weekday: "long", day: "numeric", month: "long" });
}

export default function CTAForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    challenge: "",
    business: "",
    company: "",
    date: "",
    time: "",
    name: "",
    email: "",
    phone: "",
    designBrief: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "whatsapp">("idle");
  const [error, setError] = useState("");

  const totalSteps = 3;
  const progress = ((step + 1) / totalSteps) * 100;

  // Earliest day = tomorrow. Only rendered after step 3 is reached, so it
  // never affects the pre-rendered HTML.
  const minDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return toISODate(d);
  }, []);

  const booking = () =>
    calendlyLink({
      name: data.name.trim(),
      email: data.email.trim(),
      company: data.company.trim(),
      challenge: data.challenge,
      date: data.date,
    });

  const select = (key: keyof typeof data, value: string) => {
    setData((d) => ({ ...d, [key]: value }));
    setTimeout(() => setStep((s) => Math.min(s + 1, totalSteps - 1)), 250);
  };

  const summary = () =>
    [
      "Hi Amukelani, I'd like a free audit.",
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Company: ${data.company}`,
      `Preferred time: ${prettyDate(data.date)} at ${data.time}`,
      data.phone ? `WhatsApp: ${data.phone}` : "",
      `Need help with: ${data.challenge}`,
      data.designBrief ? `Design brief: ${data.designBrief}` : "",
      `Business: ${data.business}`,
    ]
      .filter(Boolean)
      .join("\n");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const [y, m, d] = data.date.split("-").map(Number);
    const day = new Date(y, m - 1, d).getDay();
    if (day === 0 || day === 6) {
      setError("Audit calls run Monday to Friday. Please pick a weekday.");
      return;
    }
    const link = booking();

    // No automation connected → hand the request over on WhatsApp.
    if (!FORM_WEBHOOK_URL) {
      window.open(waLink(summary()), "_blank", "noopener");
      setStatus("whatsapp");
      return;
    }

    setStatus("sending");
    const payload = {
      leadId: `AT-${Date.now().toString(36).toUpperCase()}`,
      name: data.name.trim(),
      email: data.email.trim(),
      phone: data.phone.trim(),
      company: data.company.trim(),
      challenge: data.challenge,
      designBrief: data.designBrief.trim(),
      business: data.business,
      date: data.date, // YYYY-MM-DD
      time: data.time, // HH:MM (SAST)
      startISO: `${data.date}T${data.time}:00+02:00`,
      dateLabel: `${prettyDate(data.date)} at ${data.time}`,
      calendlyUrl: link,
      source: "website-audit-form",
      submittedAt: new Date().toISOString(),
    };

    try {
      // Form-encoded + no-cors = a "simple" request Make's webhook always
      // accepts from a browser (no CORS preflight to fail on).
      await fetch(FORM_WEBHOOK_URL, {
        method: "POST",
        mode: "no-cors",
        body: new URLSearchParams(payload),
      });
      setStatus("sent");
      // Send them straight to Calendly while they're still keen.
      if (link) setTimeout(() => window.location.assign(link), 1800);
    } catch {
      window.open(waLink(summary()), "_blank", "noopener");
      setStatus("whatsapp");
    }
  };

  if (status === "sent" || status === "whatsapp") {
    const booked = status === "sent";
    const link = booking();
    return (
      <div className="glass-card mx-auto max-w-lg rounded-2xl p-10 text-center relative overflow-hidden">
        <motion.div
          initial={{ scaleX: 0, opacity: 0.6 }}
          animate={{ scaleX: 1, opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent"
        />
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }}>
          {booked ? (
            <CalendarCheck className="mx-auto text-emerald-400" size={56} />
          ) : (
            <CheckCircle2 className="mx-auto text-emerald-400" size={56} />
          )}
        </motion.div>
        <h3 className="mt-6 font-display text-2xl font-bold text-glacier">
          {booked ? "Got it — now pick your time." : "Almost done — hit send."}
        </h3>
        <p className="mt-2 text-sm text-chrome">
          {booked ? (
            <>
              Opening our calendar on <span className="text-glacier">{prettyDate(data.date)}</span>. Lock in{" "}
              <span className="text-glacier">{data.time}</span> if it's open, or the closest slot. The link
              is also in your inbox at <span className="text-glacier">{data.email}</span>.
            </>
          ) : (
            <>WhatsApp has opened with your request filled in. Press send and you'll hear back within 24 hours.</>
          )}
        </p>
        {booked && link && (
          <a
            href={link}
            className="mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 font-heading text-sm font-semibold text-white"
            style={{ backgroundColor: "#0047FF" }}
          >
            <CalendarCheck size={16} /> Choose a time on Calendly
          </a>
        )}
        <a
          href={waLink(summary())}
          target="_blank"
          rel="noreferrer"
          className="mt-4 mx-2 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-heading text-sm font-semibold text-[#03030A]"
        >
          <MessageCircle size={16} /> {booked ? "Questions? WhatsApp us" : `Send on WhatsApp (${WHATSAPP_DISPLAY})`}
        </a>
      </div>
    );
  }

  const input =
    "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-glacier placeholder:text-chrome/60 outline-none focus:border-cyan-400 [color-scheme:dark]";

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
            <h3 className="mt-2 font-display text-xl font-bold text-glacier">When suits you?</h3>
            <p className="mt-1 text-xs text-chrome">Pick any weekday and time (South African time). We'll confirm it on our calendar next.</p>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div>
                <label className="block font-mono text-[11px] tracking-wide text-chrome">DATE</label>
                <input
                  type="date"
                  required
                  min={minDate}
                  value={data.date}
                  onChange={(e) => setData((d) => ({ ...d, date: e.target.value }))}
                  className={`mt-2 ${input}`}
                />
              </div>
              <div>
                <label className="block font-mono text-[11px] tracking-wide text-chrome">TIME</label>
                <input
                  type="time"
                  required
                  step={900}
                  value={data.time}
                  onChange={(e) => setData((d) => ({ ...d, time: e.target.value }))}
                  className={`mt-2 ${input}`}
                />
              </div>
            </div>

            {data.challenge === "Need professional graphic design" && (
              <div className="mt-5">
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

            <div className="mt-5 grid gap-3">
              <input
                required
                placeholder="Your name"
                autoComplete="name"
                value={data.name}
                onChange={(e) => setData((d) => ({ ...d, name: e.target.value }))}
                className={input}
              />
              <input
                required
                placeholder="Company / business name"
                autoComplete="organization"
                value={data.company}
                onChange={(e) => setData((d) => ({ ...d, company: e.target.value }))}
                className={input}
              />
              <input
                required
                type="email"
                placeholder="Email (for your confirmation)"
                autoComplete="email"
                value={data.email}
                onChange={(e) => setData((d) => ({ ...d, email: e.target.value }))}
                className={input}
              />
              <input
                type="tel"
                placeholder="WhatsApp number (optional)"
                autoComplete="tel"
                value={data.phone}
                onChange={(e) => setData((d) => ({ ...d, phone: e.target.value }))}
                className={input}
              />
            </div>

            {error && <p className="mt-4 text-sm text-amber-400">{error}</p>}

            <button
              type="submit"
              data-cursor="button"
              disabled={status === "sending"}
              className="glow-amber-hover mt-6 w-full rounded-xl bg-plasma py-3.5 font-heading text-sm font-semibold text-white disabled:opacity-40"
              style={{ backgroundColor: "#0047FF" }}
            >
              {status === "sending" ? "Sending…" : "Book My Free Audit →"}
            </button>
            <p className="mt-3 text-center font-mono text-[10px] tracking-wide text-chrome/70">
              Free 15-minute call on Google Meet · no obligation
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
