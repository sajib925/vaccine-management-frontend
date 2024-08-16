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
        <HeroBookingForm
          title="Welcome to booking list page"
          desc="Effortlessly reserve your dream getaway with our seamless booking process. Explore top-tier accommodations and enjoy unforgettable moments in extraordinary locations worldwide."
        />
        <Bookings />
      </main>
      <Footer />
    </>
  );
};

export default allBooking;
