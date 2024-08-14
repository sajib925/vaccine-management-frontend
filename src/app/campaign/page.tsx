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
      <HeroAll title='Join the Movement: Support Vital Health Initiatives Today' desc='Take part in our impactful campaigns to promote health and wellness. Contribute to life-changing initiatives that make a difference in communities worldwide.' />
      <Campaigns />
    </main>
    <Footer />
  </>
  )
}

export default Campaign