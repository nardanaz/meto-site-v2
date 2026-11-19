import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import TeaserSection from "@/components/TeaserSection";
import BenefitsSection from "@/components/BenefitsSection";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TeaserSection />
        <BenefitsSection />
        {/* TODO: HowItWorks · Hyperlocal · Download · Footer */}
      </main>
    </>
  );
}
