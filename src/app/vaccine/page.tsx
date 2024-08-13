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
      <HeroAll />
      <Vaccines />
    </main>
    <Footer />
  </>
  )
}

export default Vaccine