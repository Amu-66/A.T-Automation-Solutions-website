import LegalPage, { type LegalSection } from "../components/LegalPage";

const sections: LegalSection[] = [
  {
    heading: "Who we are",
    body: [
      "A.T Automation Solutions (Pty) Ltd (registration number 2026/767809/07, \"we\", \"us\", \"our\") is a registered South African company and digital automation agency based in Mpumalanga, South Africa, serving clients nationally. We build AI automation systems, workflow automation, websites, lead generation systems, social media and ads management, and professional graphic design.",
      "This policy explains what personal information we collect, why we collect it, how we use and protect it, and the rights you have over it. It is written to align with the Protection of Personal Information Act, 2013 (POPIA).",
    ],
  },
  {
    heading: "Information we collect",
    body: ["We only collect information that we genuinely need in order to respond to you and deliver our services."],
    bullets: [
      "Information you give us directly — your name, email address, phone or WhatsApp number, business name and size, the challenge you select on our booking form, your design brief, and anything else you choose to send us.",
      "Client project information — data, credentials, files and system access you provide so that we can build, test and deploy your automation, website or design work.",
      "Technical information — basic device, browser and usage data collected automatically when you visit this website, used to keep the site secure and working properly.",
    ],
  },
  {
    heading: "How we use your information",
    body: ["We process your personal information for clearly defined purposes only."],
    bullets: [
      "To respond to your enquiry and prepare your free audit or quotation.",
      "To design, build, deploy, maintain and support the systems you engage us for.",
      "To communicate with you about your project, including updates, questions and handover documentation.",
      "To issue invoices, quotations and keep accurate financial records.",
      "To improve our own services, website and internal processes.",
    ],
  },
  {
    heading: "Legal basis for processing",
    body: [
      "We process your information where you have given consent, where processing is necessary to perform a contract with you, where we have a legitimate business interest that does not override your rights, or where we are required to do so by South African law.",
      "You may withdraw consent at any time. Where processing is necessary to deliver a service you have contracted us for, withdrawing consent may mean we can no longer provide that service.",
    ],
  },
  {
    heading: "Third-party tools and processors",
    body: [
      "We build on established platforms, and in the course of delivering your project your information may be processed by them. These include automation and integration platforms such as Make.com, n8n and Zapier; AI providers such as OpenAI and Arena AI; data and outreach tools such as Apollo.io; productivity tools such as Google Workspace; and advertising platforms such as Meta Ads.",
      "We only share what is necessary for the tool to perform its function. We do not sell your personal information to anyone, and we do not share it for unrelated third-party marketing.",
    ],
  },
  {
    heading: "Client credentials and system access",
    body: [
      "Where you grant us access to your accounts, inboxes, CRMs or advertising platforms in order to build your systems, we treat those credentials as strictly confidential.",
      "Access is used solely for the agreed scope of work. On request, or on completion of a project where ongoing maintenance has not been arranged, we will return or remove our access.",
    ],
  },
  {
    heading: "How long we keep information",
    body: [
      "We keep enquiry information for as long as needed to respond to you and for a reasonable period afterwards in case you return to us.",
      "Client project records, invoices and quotations are retained for as long as required to meet our legal, tax and accounting obligations in South Africa. When information is no longer needed, we delete or de-identify it.",
    ],
  },
  {
    heading: "How we protect information",
    body: [
      "We apply reasonable technical and organisational measures to protect personal information against loss, unauthorised access, and misuse. These include restricted access, secure credential handling, and use of reputable platforms that maintain their own security standards.",
      "No system connected to the internet can be guaranteed completely secure. If a breach occurs that poses a real risk to your rights, we will notify you and the Information Regulator as required by POPIA.",
    ],
  },
  {
    heading: "Your rights",
    body: ["Under POPIA you have meaningful control over your personal information."],
    bullets: [
      "Request confirmation of whether we hold personal information about you, and request a copy of it.",
      "Request that we correct or update information that is inaccurate, misleading or outdated.",
      "Request that we delete information we no longer have grounds to keep.",
      "Object to processing in certain circumstances, and withdraw consent where consent is the basis for processing.",
      "Lodge a complaint with the Information Regulator of South Africa.",
    ],
  },
  {
    heading: "Cookies",
    body: [
      "This website uses only what is necessary for the site to function and to understand basic usage. We do not use cookies to build advertising profiles of visitors. You can block or delete cookies in your browser settings, though some parts of the site may then behave unexpectedly.",
    ],
  },
  {
    heading: "Changes to this policy",
    body: [
      "We may update this policy as our services, tools or legal obligations change. The current version will always be published on this page with the date it was last updated. Continued use of our website or services after an update means you accept the revised policy.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      tag="LEGAL // PRIVACY"
      title="Privacy"
      highlight="Policy."
      intro="How A.T Automation Solutions collects, uses and protects your information — written plainly, and aligned with POPIA."
      updated="2025"
      sections={sections}
    />
  );
}
