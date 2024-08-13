import ContactForm from '@/components/Contact'
import Footer from '@/components/footer'
import HeroAll from '@/components/HeroAll'
import Navbar from '@/components/Navbar'
import React from 'react'

const Contact = () => {
  return (
    <>
    <Navbar />
    <main>
      <HeroAll />
      <ContactForm />
    </main>
    <Footer />
  </>
  )
}

export default Contact