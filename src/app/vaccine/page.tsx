import Footer from '@/components/footer'
import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'
import Vaccines from '@/components/Vaccine'
import React from 'react'

const Vaccine = () => {
  return (
    <>
    <Navbar />
    <main>
      <Hero />
      <Vaccines />
    </main>
    <Footer />
  </>
  )
}

export default Vaccine