import FaqAccordion from "@/components/Accordian";
import Footer from "@/components/footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import { Service } from "@/components/Service";


export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Service />
        <FaqAccordion />
      </main>
      <Footer />
    </>
  );
}
