import PageHero from "../components/PageHero";
import Process from "../components/Process";
import SectionDivider from "../components/SectionDivider";
import CTABand from "../components/CTABand";

export default function ProcessPage() {
  return (
    <>
      <PageHero
        tag="HOW IT WORKS"
        title="From manual mess to"
        highlight="a working machine."
        intro="No jargon, no endless discovery calls. Three deliberate steps that take you from mapping the problem to running a system that works without you."
      />
      <SectionDivider />
      <Process />
      <SectionDivider />
      <CTABand
        title="Step one is free."
        highlight="Start there."
        text="The audit costs you nothing and gives you a clear map of every process worth automating in your business."
      />
    </>
  );
}
