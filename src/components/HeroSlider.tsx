"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-fade";

import { EffectFade, Autoplay } from "swiper/modules";
import Link from "next/link";
import { useUserContext } from "@/context/userContext";

const HeroSlider = () => {
    const { patient, doctor, userData } = useUserContext();
    const [authToken, setAuthToken] = useState<string>("");

    useEffect(() => {
        if (typeof window !== "undefined") {
            setAuthToken(window.localStorage.getItem("authToken") ?? "");
        }
    }, []);

    return (
        <div>
            <Swiper
                spaceBetween={30}
                effect={"fade"}
                navigation={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                modules={[EffectFade, Autoplay]}
                className="mySwiper h-screen w-full relative"
            >
                <SwiperSlide>
                    <div className="bg-[url('/image/bg-4.jpg')] bg-no-repeat bg-cover h-screen">
                        {/* Left-side overlay */}
                        <div className="absolute w-full lg:w-[80%] inset-0 bg-gradient-to-r from-white to-transparent"></div>

                        <div className="mx-auto w-full max-w-screen-xl px-5 flex items-center justify-start h-full relative z-10">
                            <div className="max-w-[800px] w-full lg:-mt-20">
                                <h1 className="text-[#111] text-2xl md:text-4xl font-extrabold tracking-tight lg:text-7xl">
                                    Stay Safe with Easy Vaccination
                                </h1>
                                <p className="leading-7 mt-4 lg:mt-6 text-[#1c1c1c] max-w-[580px]">
                                    {`Book vaccines, get campaign details, and manage your appointments with ease. Your health journey is simplified with our comprehensive vaccination platform.`}
                                </p>
                                <div className="flex items-center justify-start gap-4 mt-4">
                                {!authToken && (
                                    <div className="flex items-center flex-wrap gap-x-3">
                                        <Link href={"/signIn"}
                                              className="py-3 w-full md:w-auto md:px-8 font-semibold rounded-sm bg-[#091c47] text-white hover:bg-[#0057b8] transition-all ease-in-out cursor-pointer text-center">
                                            Get Vaccine
                                        </Link>
                                    </div>
                                )}
                                {
                                    userData.id ?
                                        (!patient?.id && !doctor?.id) && (
                                            <div className="flex items-center flex-wrap gap-x-3">
                                                <Link href="/userType"
                                                      className="py-3 w-full md:w-auto md:px-8 font-semibold rounded-sm bg-[#091c47] text-white hover:bg-[#0057b8] transition-all ease-in-out cursor-pointer text-center">Become
                                                    a Doctor or Patient</Link>
                                            </div>
                                        ) : ""
                                }
                                    <Link href="/contact"
                                          className="py-3 w-full md:w-auto md:px-8 font-semibold rounded-sm bg-[#0057b8] text-white hover:bg-[#091c47] transition-all ease-in-out cursor-pointer text-center">
                                        Contact Us</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="bg-[url('/image/bg-3.jpg')] bg-no-repeat  h-screen">
                        {/* Left-side overlay */}
                        <div className="absolute w-full lg:w-[80%] inset-0 bg-gradient-to-r from-white to-transparent"></div>

                        <div className="mx-auto w-full max-w-screen-xl px-5 flex items-center justify-start h-full relative z-10">
                            <div className="max-w-[780px] w-full lg:-mt-20">
                                <h1 className="text-[#111] text-2xl md:text-4xl font-extrabold tracking-tight lg:text-7xl">
                                    Your Vaccination Journey Made Simple
                                </h1>
                                <p className="leading-7 mt-4 lg:mt-6 text-[#1c1c1c] max-w-[580px]">
                                    {`Book vaccines, get campaign details, and manage your appointments with ease. Your health journey is simplified with our comprehensive vaccination platform.`}
                                </p>
                                <div className="flex items-center justify-start gap-4 mt-4">
                                    {!authToken && (
                                        <div className="flex items-center flex-wrap gap-x-3">
                                            <Link href={"/signIn"}
                                                  className="py-3 w-full md:w-auto md:px-8 font-semibold rounded-sm bg-[#091c47] text-white hover:bg-[#0057b8] transition-all ease-in-out cursor-pointer text-center">
                                                Get Vaccine
                                            </Link>
                                        </div>
                                    )}
                                    {
                                        userData.id ?
                                            (!patient?.id && !doctor?.id) && (
                                                <div className="flex items-center flex-wrap gap-x-3">
                                                    <Link href="/userType"
                                                          className="py-3 w-full md:w-auto md:px-8 font-semibold rounded-sm bg-[#091c47] text-white hover:bg-[#0057b8] transition-all ease-in-out cursor-pointer text-center">Become
                                                        a Doctor or Patient</Link>
                                                </div>
                                            ) : ""
                                    }
                                    <Link href="/contact"
                                          className="py-3 w-full md:w-auto md:px-8 font-semibold rounded-sm bg-[#0057b8] text-white hover:bg-[#091c47] transition-all ease-in-out cursor-pointer text-center">
                                        Contact Us</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="bg-[url('/image/bg-5.jpg')] bg-no-repeat bg-cover  h-screen">
                        {/* Left-side overlay */}
                        <div className="absolute w-full lg:w-[80%] inset-0 bg-gradient-to-r from-white to-transparent"></div>

                        <div className="mx-auto w-full max-w-screen-xl px-5 flex items-center justify-start h-full relative z-10">
                            <div className="max-w-[780px] w-full lg:-mt-20">
                                <h1 className="text-[#111] text-2xl md:text-4xl font-extrabold tracking-tight lg:text-7xl">
                                    Book Vaccines, Join Health Campaigns
                                </h1>
                                <p className="leading-7 mt-4 lg:mt-6 text-[#1c1c1c] max-w-[580px]">
                                    {`Book vaccines, get campaign details, and manage your appointments with ease. Your health journey is simplified with our comprehensive vaccination platform.`}
                                </p>
                                <div className="flex items-center justify-start gap-4 mt-4">
                                    {!authToken && (
                                        <div className="flex items-center flex-wrap gap-x-3">
                                            <Link href={"/signIn"}
                                                  className="py-3 w-full md:w-auto md:px-8 font-semibold rounded-sm bg-[#091c47] text-white hover:bg-[#0057b8] transition-all ease-in-out cursor-pointer text-center">
                                                Get Vaccine
                                            </Link>
                                        </div>
                                    )}
                                    {
                                        userData.id ?
                                            (!patient?.id && !doctor?.id) && (
                                                <div className="flex items-center flex-wrap gap-x-3">
                                                    <Link href="/userType"
                                                          className="py-3 w-full md:w-auto md:px-8 font-semibold rounded-sm bg-[#091c47] text-white hover:bg-[#0057b8] transition-all ease-in-out cursor-pointer text-center">Become
                                                        a Doctor or Patient</Link>
                                                </div>
                                            ) : ""
                                    }
                                    <Link href="/contact"
                                          className="py-3 w-full md:w-auto md:px-8 font-semibold rounded-sm bg-[#0057b8] text-white hover:bg-[#091c47] transition-all ease-in-out cursor-pointer text-center">
                                        Contact Us</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default HeroSlider;
