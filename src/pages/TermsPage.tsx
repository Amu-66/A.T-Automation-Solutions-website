import LegalPage, { type LegalSection } from "../components/LegalPage";

const sections: LegalSection[] = [
  {
    heading: "Agreement",
    body: [
      "These Terms of Service govern the relationship between A.T Automation Solutions (\"we\", \"us\", \"our\") and you, the client, when you engage us for any service or use this website.",
      "By requesting a quotation, accepting a proposal, paying a deposit, or instructing us to begin work, you accept these terms. Where a signed proposal or written scope of work conflicts with these terms, that document takes precedence for that project.",
    ],
  },
  {
    heading: "Our services",
    body: ["We provide the following service lines, each scoped and quoted per project or per month."],
    bullets: [
      "AI automation systems and custom AI agents.",
      "Workflow automation built on Make.com, n8n and Zapier.",
      "Website development, built primarily with React and Arena AI.",
      "Lead generation systems and pipelines.",
      "Social media management and ads campaign management.",
      "Professional graphic design, covering marketing material and corporate documentation. Design and artwork only — printing is not included.",
      "Ongoing maintenance and system support.",
    ],
  },
  {
    heading: "Quotations and pricing",
    body: [
      "Published prices are indicative starting points for standard scopes. Final pricing is confirmed in writing in your quotation or proposal before work begins.",
      "Once-off builds such as automation systems, websites and design work are quoted as a fixed fee for the agreed scope. Monthly services such as social media management, ads management and maintenance are billed as recurring retainers.",
      "Advertising spend is separate from our management fee and is paid by you directly to the relevant platform. Third-party subscriptions, hosting, domains and paid tools required by your build are your responsibility unless we state otherwise in writing.",
    ],
  },
  {
    heading: "Payment terms",
    body: [
      "Unless agreed otherwise, once-off projects require a deposit before work commences, with the balance due on completion and before final handover or deployment to your live environment.",
      "Monthly retainers are billed in advance for the month ahead. Where an invoice remains unpaid, we may suspend work, pause active campaigns, or withhold handover of deliverables until the account is settled.",
    ],
  },
  {
    heading: "Your responsibilities",
    body: ["We can only build fast and build well if we have what we need from you."],
    bullets: [
      "Provide accurate information, brand assets, content and access to the accounts and platforms required for your project.",
      "Nominate a single point of contact who can approve work and answer questions.",
      "Respond to review requests and approvals within a reasonable time so that timelines hold.",
      "Ensure you have the legal right to any content, imagery, data or lists you supply to us.",
      "Maintain your own subscriptions to third-party platforms your system depends on.",
    ],
  },
  {
    heading: "Timelines and delays",
    body: [
      "Estimated timelines are given in good faith based on the agreed scope. They assume timely feedback, approvals and access from your side.",
      "Delays caused by outstanding information, late approvals, unpaid invoices, or changes requested mid-project will shift the delivery date accordingly. We are not liable for missed deadlines arising from these causes or from third-party platform outages.",
    ],
  },
  {
    heading: "Revisions and scope changes",
    body: [
      "Each project includes a reasonable number of revision rounds within the agreed scope, as set out in your quotation. Design work typically includes revisions to refine an approved concept.",
      "Requests that materially change direction, add new features, or fall outside the original brief constitute new scope. We will quote these separately before proceeding — we will never add cost without your written approval.",
    ],
  },
  {
    heading: "Intellectual property",
    body: [
      "You retain ownership of all content, data, trademarks and brand assets you supply to us.",
      "On full payment, ownership of the final deliverables produced specifically for you — including design artwork, website code and automation configurations — transfers to you.",
      "We retain ownership of our underlying methods, reusable frameworks, templates and internal tooling. Nothing in these terms transfers rights in third-party software, which remains subject to its own licence.",
      "Unless you ask us in writing not to, we may reference your project and display non-confidential work in our portfolio and marketing.",
    ],
  },
  {
    heading: "Third-party platforms",
    body: [
      "Our systems are built on platforms we do not own or control, including Make.com, n8n, Zapier, OpenAI, Arena AI, Apollo.io, Google Workspace and Meta Ads.",
      "Those platforms may change their pricing, features, rate limits or terms, or experience downtime. We are not responsible for their availability or for changes that affect a delivered system. Where a platform change breaks your automation, we will quote remedial work unless you hold an active maintenance retainer.",
    ],
  },
  {
    heading: "Results and performance",
    body: [
      "We are results-obsessed, but we do not guarantee specific commercial outcomes. Figures we publish reflect past work and are not a promise of future performance.",
      "Advertising, lead generation and social media results depend on your market, offer, pricing, budget and sales follow-up — factors that sit largely outside our control.",
    ],
  },
  {
    heading: "Confidentiality",
    body: [
      "Both parties agree to keep confidential any non-public business, technical or commercial information disclosed in the course of the engagement, and to use it only for the purpose of delivering or receiving the services.",
      "Credentials and system access you grant us are treated as strictly confidential and used solely within the agreed scope.",
    ],
  },
  {
    heading: "Limitation of liability",
    body: [
      "To the maximum extent permitted by South African law, our total liability arising out of or in connection with any engagement is limited to the total fees you paid us for the specific service giving rise to the claim.",
      "We are not liable for indirect or consequential loss, including loss of profit, revenue, business opportunity or data. Nothing in these terms excludes liability that cannot lawfully be excluded, including under the Consumer Protection Act where it applies.",
    ],
  },
  {
    heading: "Cancellation and termination",
    body: [
      "You may cancel a once-off project at any time in writing. Deposits are non-refundable, and work completed up to the cancellation date is payable on a pro-rata basis.",
      "Monthly retainers may be cancelled by either party with 30 days written notice. Fees for the current billing month remain payable.",
      "We may terminate an engagement immediately where invoices remain unpaid, where required access or information is not provided, or where we are asked to act unlawfully or unethically.",
    ],
  },
  {
    heading: "Governing law",
    body: [
      "These terms are governed by the laws of the Republic of South Africa, and the South African courts have jurisdiction over any dispute.",
      "Before pursuing formal proceedings, both parties agree to attempt to resolve any dispute in good faith through direct discussion.",
    ],
  },
  {
    heading: "Changes to these terms",
    body: [
      "We may update these terms from time to time. The current version is always published on this page with the date it was last updated. Projects already underway continue under the terms in force when they were accepted.",
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      tag="LEGAL // TERMS"
      title="Terms of"
      highlight="Service."
      intro="The terms that govern how we work together — scope, payment, ownership and responsibilities, stated clearly."
      updated="2025"
      sections={sections}
    />
  );
}
