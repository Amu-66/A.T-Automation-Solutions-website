// Build step 3 of 3 — turns the React app into real HTML pages.
// For every route it writes dist/<route>/index.html containing the fully
// rendered page plus its own <title>, description, canonical, Open Graph,
// Twitter and schema.org tags. Also writes sitemap.xml, robots.txt and 404.html.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssrEntry = path.join(root, "dist-ssr", "entry-server.js");

const { render, PAGES, NOT_FOUND_META, SITE_URL, BUSINESS_NAME, WHATSAPP_NUMBER, EMAIL, LEGAL_NAME, REG_NO } =
  await import(pathToFileURL(ssrEntry).href);

const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");
const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const ogImage = `${SITE_URL}/og-image.png`;

const businessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#business`,
  name: BUSINESS_NAME,
  legalName: LEGAL_NAME,
  identifier: { "@type": "PropertyValue", propertyID: "CIPC company registration number", value: REG_NO },
  url: `${SITE_URL}/`,
  image: ogImage,
  logo: `${SITE_URL}/logo.png`,
  description:
    "Websites, WhatsApp and workflow automation, Google Ads, social media management and graphic design for South African small businesses.",
  telephone: `+${WHATSAPP_NUMBER}`,
  email: EMAIL,
  priceRange: "R1,500 – R9,500+",
  currenciesAccepted: "ZAR",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Secunda",
    addressRegion: "Mpumalanga",
    addressCountry: "ZA",
  },
  areaServed: [
    { "@type": "AdministrativeArea", name: "Gauteng" },
    { "@type": "AdministrativeArea", name: "Western Cape" },
    { "@type": "AdministrativeArea", name: "Mpumalanga" },
    { "@type": "Country", name: "South Africa" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services",
    itemListElement: [
      ["Workflow & AI Automation", "1500"],
      ["Website Development", "5500"],
      ["Social Media Management", "1500"],
      ["Google & Meta Ads Management", "2500"],
      ["Graphic Design", "90"],
    ].map(([name, price]) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name },
      priceSpecification: { "@type": "PriceSpecification", minPrice: price, priceCurrency: "ZAR" },
    })),
  },
};

function headTags({ title, description, url, noindex = false, schema = [] }) {
  const tags = [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
    noindex
      ? `<meta name="robots" content="noindex" />`
      : `<link rel="canonical" href="${esc(url)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(BUSINESS_NAME)}" />`,
    `<meta property="og:locale" content="en_ZA" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
    `<meta property="og:image" content="${esc(ogImage)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(BUSINESS_NAME)} — automation, websites and ads for SA businesses" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(description)}" />`,
    `<meta name="twitter:image" content="${esc(ogImage)}" />`,
    ...schema.map(
      (s) => `<script type="application/ld+json">${JSON.stringify(s).replace(/</g, "\\u003c")}</script>`
    ),
  ];
  return tags.join("\n    ");
}

function buildPage(route, meta, opts = {}) {
  const url = route === "/" ? `${SITE_URL}/` : `${SITE_URL}${route}`;
  const appHtml = render(route);
  const crumbs =
    route === "/"
      ? []
      : [
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
              { "@type": "ListItem", position: 2, name: meta.title.split(" | ")[0], item: url },
            ],
          },
        ];
  const schema = opts.noindex ? [] : [businessSchema, ...crumbs];
  return template
    .replace(/<!--head-start-->[\s\S]*?<!--head-end-->/, headTags({ ...meta, url, schema, ...opts }))
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
}

for (const page of PAGES) {
  const html = buildPage(page.path, page);
  const outDir = page.path === "/" ? dist : path.join(dist, page.path);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "index.html"), html);
  console.log(`prerendered ${page.path}`);
}

fs.writeFileSync(path.join(dist, "404.html"), buildPage("/404", NOT_FOUND_META, { noindex: true }));

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PAGES.map(
  (p) =>
    `  <url><loc>${SITE_URL}${p.path === "/" ? "/" : p.path}</loc><lastmod>${today}</lastmod><priority>${p.priority.toFixed(1)}</priority></url>`
).join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(dist, "sitemap.xml"), sitemap);
fs.writeFileSync(
  path.join(dist, "robots.txt"),
  `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`
);
fs.rmSync(path.join(root, "dist-ssr"), { recursive: true, force: true });
console.log("sitemap.xml, robots.txt, 404.html written");
