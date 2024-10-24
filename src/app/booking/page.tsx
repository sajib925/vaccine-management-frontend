import CreateBooking from '@/components/BookingForm'
import Campaigns from '@/components/Campaign'
import Footer from '@/components/footer'
import HeroBooking from '@/components/HeroBooking'
import Navbar from '@/components/Navbar'
import Review from '@/components/Review'
import React from 'react'

const Booking = () => {
  return (
    <>
    <Navbar />
    <main>
      <HeroBooking />
      <Campaigns />
      <CreateBooking />
      <Review />
    </main>
    <Footer />
  </>
  )
}

export default Booking