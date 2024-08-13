import Footer from '@/components/footer'
import Navbar from '@/components/Navbar'
import { UserType } from '@/components/UserType'
import React from 'react'

const userType = () => {
  return (
    <div>
      <Navbar />
        <UserType />
        <Footer />
    </div>
  )
}

export default userType