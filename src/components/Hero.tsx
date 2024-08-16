"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useUserContext } from "@/context/userContext";

function Hero() {
  const { patient, doctor, userData } = useUserContext();
  const [authToken, setAuthToken] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setAuthToken(window.localStorage.getItem("authToken") ?? "");
    }
  }, []);

  return (
    <div className="mx-auto w-full max-w-screen-xl px-5">
      <div className="flex items-center justify-between flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-[50%]">
          <Image
            src={"/image/hero.jpg"}
            alt="banner image"
            width={700}
            height={400}
            className="w-full"
          />
        </div>
        <div className="w-full lg:w-[50%]">
          <h1 className="scroll-m-20 text-2xl md:text-4xl font-extrabold tracking-tight lg:text-5xl">
            Efficient Vaccination Management with Secure Patient Records
          </h1>
          <p className="leading-7 mt-4 lg:mt-6">
            {`A streamlined vaccination management platform enabling efficient vaccine scheduling, patient registration, and dose tracking, with easy access to campaigns, secure patient records, and user-friendly interfaces.`}
          </p>
          {!authToken && (
            <div className="flex items-center flex-wrap gap-x-3 mt-4">
              <Link href={"/signIn"} className="py-3 w-full md:w-auto md:px-8 font-semibold rounded-sm bg-slate-900 border border-slate-900 text-white hover:text-slate-900 hover:bg-white transition-all ease-in-out cursor-pointer text-center">
                Get Vaccine
              </Link>
            </div>
          )}
          {
            userData.id ?
              (!patient?.id && !doctor?.id) && (
                <div className="flex items-center flex-wrap gap-x-3 mt-4">
                  <Link href="/userType" className="py-3 w-full md:w-auto md:px-8 font-semibold rounded-sm bg-slate-900 border border-slate-900 text-white hover:text-slate-900 hover:bg-white transition-all ease-in-out cursor-pointer text-center">Become a Doctor or Patient</Link>
                </div>
              ): ""
          }
          
        </div>
      </div>
    </div>
  );
}

export default Hero;
