import CreateBooking from '@/components/BookingForm'
import Campaigns from '@/components/Campaign'
import Footer from '@/components/footer'
import HeroAll from '@/components/HeroAll'
import Navbar from '@/components/Navbar'
import React from 'react'

const Booking = () => {
  return (
    <>
    <Navbar />
    <main>
      <HeroAll />
      <Campaigns />
      <CreateBooking />
    </main>
    <Footer />
  </>
  )
}

export default Booking