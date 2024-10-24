import React from 'react';
import Link from "next/link";

const CTASection = () => {

    return (
        <div className="bg-gradient-to-r from-[#6626d9] via-[#a91079] to-[#091c47] py-20 px-6">
            <div className="container mx-auto text-center">
                <h2 className="text-4xl font-bold text-white mb-6">Get Vaccinated for a Healthier Tomorrow</h2>
                <p className="text-lg text-white mb-12">
                    Don’t wait! Book your vaccination appointment and protect your health today.
                </p>
                <Link
                    href={"/contact"}
                    className="bg-white text-[#a91079] hover:bg-[#a91079] hover:text-white py-3 px-8 rounded-full text-lg font-semibold transition duration-300 hover:shadow-lg"
                >
                    Get Started
                </Link>
            </div>
        </div>
    );
};

export default CTASection;
