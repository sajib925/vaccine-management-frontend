import Image from 'next/image';
import React from 'react';

const HeroAll = () => {
  return (
    <div className="mx-auto w-full max-w-screen-xl">
      <div className="relative w-full">
        <Image
          src="/image/v.jpg"
          alt="banner image"
          width={1200}
          height={400}
          className="w-full"
        />
        {/* <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full bg-white bg-opacity-50"></div> */}
        {/* <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
          Welcome to vaccination management
        </h1> */}
      </div>
    </div>
  );
};

export default HeroAll;
