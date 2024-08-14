import FaqAccordion from "@/components/Accordian";
import Campaigns from "@/components/Campaign";
import Footer from "@/components/footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Review from "@/components/Review";
import { Service } from "@/components/Service";


export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Service />
        <Campaigns />
        <Review />
        <FaqAccordion />
      </main>
      <Footer />
    </>
  );
}
