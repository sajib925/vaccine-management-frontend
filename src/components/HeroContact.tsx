import React from 'react';
import Link from "next/link";
import {IoIosHome} from "react-icons/io";



const HeroContact = () => {
    return (
        <section className={`relative mb-10 lg:mb-20 pt-52 lg:py-44 px-4 bg-gray-100 bg-[url('/image/contact.jpg')] bg-cover bg-top bg-no-repeat`}>
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative max-w-screen-xl w-full mx-auto">
                <div className="lg:max-w-[520px] w-full py-12 lg:py-24 lg:px-16 rounded-lg bg-white max-lg:flex flex-col items-center">
                    <h1 className="text-4xl lg:text-7xl font-bold mb-4 text-[#111]">Contact Us</h1>
                    <div className='flex items-center gap-4'>
                        <Link href="/" className="flex items-center gap-2 text-[#0057b8] text-base lg:text-lg font-semibold">
                            <IoIosHome />
                            <span>Home</span>
                        </Link>
                        <span className="text-[#111] text-base lg:text-lg">/</span>
                        <p className="text-[#111] text-base lg:text-lg">Contact</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroContact;
