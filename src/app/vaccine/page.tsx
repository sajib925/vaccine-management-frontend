import Footer from '@/components/footer'
import HeroAll from '@/components/HeroAll'
import Navbar from '@/components/Navbar'
import Vaccines from '@/components/Vaccine'
import React from 'react'
import HeroVaccine from "@/components/HeroVaccine";

const Vaccine = () => {
  return (
    <>
    <Navbar />
    <main>
      <HeroVaccine />
      <Vaccines />
    </main>
    <Footer />
  </>
  )
}

export default Vaccine