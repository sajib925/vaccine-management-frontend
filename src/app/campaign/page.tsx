import React from 'react'
import Campaigns from '@/components/Campaign'
import Footer from '@/components/footer'
import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'
import Vaccines from '@/components/Vaccine'

const Campaign = () => {
  return (
    <>
    <Navbar />
    <main>
      <Hero />
      <Campaigns />
    </main>
    <Footer />
  </>
  )
}

export default Campaign