"use client";
import { useUserContext } from "@/context/userContext";
import Image from "next/image";



export const Service = () => {

  const {services} = useUserContext()

  return (
    <div className="py-10 lg:py-20 px-5">
      <div className="mx-auto w-full max-w-screen-xl">
        <div className="mb-6 md:mb-10">
            <span className="text-sm text-gray-500 font-medium text-center md:text-start block mb-2">
              SERVICES
            </span>
            <h2 className="scroll-m-20 text-center md:text-start justify-center md:justify-between text-3xl font-bold">
              Explore Our Range of Essential Services
            </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((item, idx) => (
            <div className="rounded overflow-hidden shadow-lg mx-auto w-full flex flex-col h-full" key={idx}>
              <Image
                className="w-full md:h-[250px]"
                src={item.image}
                alt={item.name}
                width={350}
                height={250}
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{item.name}</div>
                <p className="text-gray-600 text-base">
                 {item.description}
                </p>
              </div>
              <div className="px-6 py-4 mt-auto flex items-center flex-wrap gap-2">
                <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-600">
                  #Codiv19
                </span>
                <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-600 ">
                  #Spanishflu
                </span>
                <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-600">
                  #BlackDeath
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


