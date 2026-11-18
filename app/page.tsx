import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import TeaserSection from "@/components/TeaserSection";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TeaserSection />
        {/* TODO: Benefits · HowItWorks · Hyperlocal · Download · Footer */}
      </main>
    </>
  );
}
