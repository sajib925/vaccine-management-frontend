import React from 'react'
import Campaigns from '@/components/Campaign'
import Footer from '@/components/footer'
import Navbar from '@/components/Navbar'
import HeroCampaign from '@/components/HeroCampaign'

const Campaign = () => {
  return (
    <>
    <Navbar />
    <main>
      <HeroCampaign  />
      <Campaigns />
    </main>
    <Footer />
  </>
  )
}

export default Campaign