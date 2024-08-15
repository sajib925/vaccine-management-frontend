import Bookings from '@/components/Booking'
import Footer from '@/components/footer'
import Navbar from '@/components/Navbar'
import UserProfile from '@/components/Profile'
import React from 'react'

const Profile = () => {
  return (
    <>
    <Navbar />
    <main>
      <UserProfile />
    </main>
    <Footer />
  </>
  )
}

export default Profile