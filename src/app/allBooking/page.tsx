import Bookings from "@/components/Booking";
import Footer from "@/components/footer";
import HeroBookingForm from "@/components/HeroBookingForm";
import Navbar from "@/components/Navbar";
import React from "react";

const allBooking = () => {
  return (
    <>
      <Navbar />
      <main>
        <HeroBookingForm />
        <Bookings />
      </main>
      <Footer />
    </>
  );
};

export default allBooking;
