import Footer from '@/components/footer'
import HeroAll from '@/components/HeroAll'
import Navbar from '@/components/Navbar'
import Vaccines from '@/components/Vaccine'
import React from 'react'

const Vaccine = () => {
  return (
    <>
    <Navbar />
    <main>
      <HeroAll title='Get Protected: Essential Vaccinations for a Healthier Tomorrow' desc={`Have questions or need support? Reach out to our dedicated team for assistance with your inquiries, feedback, or service needs. We're always ready to help.`}  />
      <Vaccines />
    </main>
    <Footer />
  </>
  )
}

export default Vaccine