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
      <HeroAll title={`Connect with Us: We're Here to Assist You Anytime`} desc={`Have questions or need support? Reach out to our dedicated team for assistance with your inquiries, feedback, or service needs. We're always ready to help.`} />
      <ContactForm />
    </main>
    <Footer />
  </>
  )
}

export default Contact