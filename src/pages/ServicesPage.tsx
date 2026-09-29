import PageHero from "../components/PageHero";
import Services from "../components/Services";
import TechStack from "../components/TechStack";
import SectionDivider from "../components/SectionDivider";
import CTABand from "../components/CTABand";

export default function ServicesPage() {
  return (
    <>
      <PageHero
        tag="WHAT WE BUILD"
        title="Automation, websites & ads that replace"
        highlight="manual work."
        intro="Six service lines engineered to remove bottlenecks, capture every lead and give you back the hours your business is losing to admin."
      />
      <SectionDivider />
      <Services />
      <SectionDivider />
      <TechStack />
      <SectionDivider />
      <CTABand
        title="Not sure which system you need?"
        highlight="We'll map it."
        text="Book a free audit and we'll show you exactly which automation delivers the fastest return for your business."
      />
    </>
  );
}
