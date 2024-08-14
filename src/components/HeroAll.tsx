import Image from 'next/image';
import React from 'react';

const HeroAll = () => {
  return (
    <section className="relative py-8 px-4 bg-gray-100 bg-[url('/image/cover.jpg')] bg-cover bg-center bg-no-repeat">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative container mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-white">Every home is a destination</h1>
          <p className="text-lg mb-6 text-white">
            {`The best of Luxury Retreats is now Flowbite Luxe—offering the world's most extraordinary homes with the highest standard of service.`}
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroAll;
