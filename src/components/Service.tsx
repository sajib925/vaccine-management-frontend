"use client";
import { useUserContext } from "@/context/userContext";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

// type VaccineService = {
//   id: number;
//   name: string;
//   description: string;
//   image: string;
// };

export const Service = () => {

  const {services} = useUserContext()
//   const [vaccines, setVaccines] = useState<VaccineService[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
// console.log(services);
  

//   useEffect(() => {
//     const fetchVaccines = async () => {
//       try {
//         const res = await axios.get<VaccineService[]>(
//           "https://vaccine-management-backend-7qp2.onrender.com/api/service/"
//         );
//         setVaccines(res.data);
//       } catch (error: unknown) {
//         if (axios.isAxiosError(error)) {
//           setError(error.message);
//         } else {
//           setError("An unexpected error occurred");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchVaccines();
//   }, []);
  return (
    <div className="py-10 lg:py-20">
      <div className="mx-auto w-full max-w-screen-xl">
        <h2 className="text-2xl font-semibold pb-8 px-5">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((item, idx) => (
            <div className="max-w-sm rounded overflow-hidden shadow-lg mx-auto" key={idx}>
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
              <div className="px-6 py-4">
                <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-600 mr-2">
                  #Codiv19
                </span>
                <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-600 mr-2">
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
