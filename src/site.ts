// ─────────────────────────────────────────────────────────────
// Site-wide settings. Change SITE_URL here once your own domain
// (e.g. https://atautomationsolutions.co.za) is live — canonical
// links, the sitemap, social previews and schema all follow it.
// ─────────────────────────────────────────────────────────────
export const SITE_URL = "https://www.atautomationsolutions.co.za";

export const BUSINESS_NAME = "A.T Automation Solutions";
export const WHATSAPP_NUMBER = "27693367393"; // international format, no +
export const WHATSAPP_DISPLAY = "069 336 7393";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
export const EMAIL = "amuthandolwethu@gmail.com";

// Optional: paste a Make.com / n8n webhook URL here and every audit
// request from the contact form is also POSTed to it as JSON.
// Leave empty to rely on WhatsApp only.
export const FORM_WEBHOOK_URL = "";

export interface PageMeta {
  path: string;
  title: string;
  description: string;
  priority: number;
}

// Titles ≈ 50–65 chars, descriptions ≈ 140–158 chars.
export const PAGES: PageMeta[] = [
  {
    path: "/",
    title: "Websites, WhatsApp Automation & Ads for SA SMEs | A.T Automation",
    description:
      "Websites, WhatsApp and workflow automation, Google Ads and social media for South African small businesses. Transparent pricing. Book a free audit.",
    priority: 1.0,
  },
  {
    path: "/services",
    title: "Automation, Web Design, Google Ads & Design | A.T Automation",
    description:
      "AI and WhatsApp automation (Make.com, n8n), website development, lead generation, social media, Google and Meta Ads, and graphic design for SA businesses.",
    priority: 0.9,
  },
  {
    path: "/pricing",
    title: "Pricing — Websites R5,500, Automations R1,500 | A.T Automation",
    description:
      "Transparent rand pricing. Websites from R5,500, automations from R1,500, social media from R1,500/mo and ads management at R2,500/mo. No hidden fees.",
    priority: 0.9,
  },
  {
    path: "/process",
    title: "How We Work: Audit, Build, Hand Over | A.T Automation Solutions",
    description:
      "A simple three-step process: we map where your business loses time, build the system, then hand it over tested and documented. Step one is a free audit.",
    priority: 0.6,
  },
  {
    path: "/results",
    title: "What You Get Working With Us | A.T Automation Solutions",
    description:
      "No inflated stats. Fixed rand pricing, the founder building your system, a reply to every enquiry within 24 hours and live demos you can click before you pay.",
    priority: 0.6,
  },
  {
    path: "/contact",
    title: "Book a Free Automation Audit | A.T Automation Solutions",
    description:
      "Tell us where your business is losing time and leads. WhatsApp 069 336 7393 or book a free audit. Serving Gauteng, Western Cape, Mpumalanga and all of SA.",
    priority: 0.8,
  },
  {
    path: "/privacy-policy",
    title: "Privacy Policy | A.T Automation Solutions",
    description:
      "How A.T Automation Solutions collects, uses and protects your personal information in line with POPIA.",
    priority: 0.2,
  },
  {
    path: "/terms-of-service",
    title: "Terms of Service | A.T Automation Solutions",
    description:
      "The terms that apply to quotations, projects, retainers and design work delivered by A.T Automation Solutions.",
    priority: 0.2,
  },
];

export const NOT_FOUND_META = {
  title: "Page Not Found | A.T Automation Solutions",
  description: "This page doesn't exist. Head back to A.T Automation Solutions.",
};

export function waLink(text: string) {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(text)}`;
}
