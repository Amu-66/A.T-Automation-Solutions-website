import PageHero from "../components/PageHero";
import Offer from "../components/Offer";
import Contact from "../components/Contact";
import SectionDivider from "../components/SectionDivider";

export default function ContactPage() {
  return (
    <>
      <PageHero
        tag="CONNECT"
        title="Let's build"
        highlight="your system."
        intro="Tell us where your business is losing time. We'll come back with a clear, costed plan to automate it."
      />
      <SectionDivider />
      <Offer />
      <SectionDivider />
      <Contact />
    </>
  );
}
