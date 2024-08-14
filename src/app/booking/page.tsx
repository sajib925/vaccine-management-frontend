import CreateBooking from '@/components/BookingForm'
import Campaigns from '@/components/Campaign'
import Footer from '@/components/footer'
import HeroAll from '@/components/HeroAll'
import Navbar from '@/components/Navbar'
import Review from '@/components/Review'
import React from 'react'

const Booking = () => {
  return (
    <>
    <Navbar />
    <main>
      <HeroAll title='Book Your Stay: Secure Luxury Experiences in Stunning Destinations' desc='Effortlessly reserve your dream getaway with our seamless booking process. Explore top-tier accommodations and enjoy unforgettable moments in extraordinary locations worldwide.' />
      <Campaigns />
      <CreateBooking />
      <Review />
    </main>
    <Footer />
  </>
  )
}

export default Booking