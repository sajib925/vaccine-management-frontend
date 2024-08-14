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
            Welcome to vaccination management
          </h1>
          <p className="leading-7 mt-4 lg:mt-6">
            {`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`}
          </p>
          {!authToken && (
            <div className="flex items-center flex-wrap gap-x-3 mt-4">
              <Link href={"/signIn"} className="py-2 w-full md:w-auto md:px-8 font-semibold rounded-sm bg-slate-900 border border-slate-900 text-white hover:text-slate-900 hover:bg-white transition-all ease-in-out cursor-pointer">Sign In</Link>
              <Link href={"/signUp"} className="py-2 w-full md:w-auto md:px-8 font-semibold rounded-sm bg-slate-900 border border-slate-900 text-white hover:text-slate-900 hover:bg-white transition-all ease-in-out cursor-pointer">Sign Up</Link>
            </div>
          )}
          {
            userData.id ?
              (!patient?.id && !doctor?.id) && (
                  <Link href="/userType" className="py-2 w-full md:w-auto md:px-8 font-semibold rounded-sm bg-slate-900 border border-slate-900 text-white hover:text-slate-900 hover:bg-white transition-all ease-in-out cursor-pointer">Become a Doctor or Patient</Link>
              ): ""
          }
          
        </div>
      </div>
    </div>
  );
}

export default Hero;
