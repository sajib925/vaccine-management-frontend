import FaqAccordion from "@/components/Accordian";
import Campaigns from "@/components/Campaign";
import Footer from "@/components/footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Review from "@/components/Review";
import { Service } from "@/components/Service";
import HeroSection from "@/components/HeroSlider";
import HeroSlider from "@/components/HeroSlider";
import CTASection from "@/components/CTASection";


export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/*<Hero />*/}
          <HeroSlider />
        <Service />
        <Campaigns />
        <Review />
        <FaqAccordion />
          <CTASection />
      </main>
      <Footer />
    </>
  );
}
