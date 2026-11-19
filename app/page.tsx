import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import TeaserSection from "@/components/TeaserSection";
import BenefitsSection from "@/components/BenefitsSection";
import HowItWorksSection from "@/components/HowItWorksSection";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TeaserSection />
        <BenefitsSection />
        <HowItWorksSection />
        {/* TODO: Hyperlocal · Download · Footer */}
      </main>
    </>
  );
}
