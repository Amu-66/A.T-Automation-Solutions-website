import PageHero from "../components/PageHero";
import Pricing from "../components/Pricing";
import SectionDivider from "../components/SectionDivider";
import CTABand from "../components/CTABand";

export default function PricingPage() {
  return (
    <>
      <PageHero
        tag="INFRASTRUCTURE"
        title="Transparent pricing."
        highlight="No surprises."
        intro="Once-off builds and monthly retainers, priced so you know exactly what you're investing before we write a single line of automation."
      />
      <SectionDivider />
      <Pricing />
      <SectionDivider />
      <CTABand
        title="Need something custom?"
        highlight="Let's quote it."
        text="Bigger scope, bulk design work or a multi-system build — send us the brief and we'll price it properly."
      />
    </>
  );
}
