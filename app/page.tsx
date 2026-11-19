import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import TeaserSection from "@/components/TeaserSection";
import BenefitsSection from "@/components/BenefitsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import HyperlocalSection from "@/components/HyperlocalSection";
import DownloadSection from "@/components/DownloadSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TeaserSection />
        <BenefitsSection />
        <HowItWorksSection />
        <HyperlocalSection />
        <DownloadSection />
      </main>
      <Footer />
    </>
  );
}
