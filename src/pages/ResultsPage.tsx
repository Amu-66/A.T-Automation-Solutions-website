import PageHero from "../components/PageHero";
import Counters from "../components/Counters";
import SectionDivider from "../components/SectionDivider";
import CTABand from "../components/CTABand";

export default function ResultsPage() {
  return (
    <>
      <PageHero
        tag="WHAT YOU GET"
        title="Honest numbers,"
        highlight="not hype."
        intro="We're a founder-led agency, so you won't find inflated stats here. Here's what we commit to instead — fixed rand pricing, fast replies, and live demos you can click before you pay a cent."
      />
      <SectionDivider />
      <Counters />
      <SectionDivider />
      <CTABand
        title="Ready to move your numbers?"
        highlight="Let's build."
        text="Every system we deploy is measured against hours saved, leads captured and revenue returned."
      />
    </>
  );
}
