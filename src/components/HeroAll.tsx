import React from 'react';

type HeroText = {
  title: string;
  desc: string;
};

const HeroAll: React.FC<HeroText> = (props) => {
  return (
    <section className="relative mb-10 lg:mb-20 py-16 lg:py-24 px-4 bg-gray-100 bg-[url('/image/cover.jpg')] bg-cover bg-center bg-no-repeat">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative container mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-white">{props.title}</h1>
          <p className="text-lg mb-6 text-white">{props.desc}</p>
        </div>
      </div>
    </section>
  );
};

export default HeroAll;
