import React from 'react'
import Campaigns from '@/components/Campaign'
import Footer from '@/components/footer'
import Navbar from '@/components/Navbar'
import HeroAll from '@/components/HeroAll'

const Campaign = () => {
  return (
    <>
    <Navbar />
    <main>
      <HeroAll />
      <Campaigns />
    </main>
    <Footer />
  </>
  )
}

export default Campaign