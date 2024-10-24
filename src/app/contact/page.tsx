import ContactForm from '@/components/Contact'
import Footer from '@/components/footer'
import Navbar from '@/components/Navbar'
import React from 'react'
import HeroContact from "@/components/HeroContact";
import GoogleMap from "@/components/GoogleMap";
import ContactInformation from "@/components/ContactInformation";

const Contact = () => {
  return (
    <>
    <Navbar />
    <main>
       <HeroContact/>
      <GoogleMap />
      <ContactInformation />
      <ContactForm />
    </main>
    <Footer />
  </>
  )
}

export default Contact