"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useUserContext } from "@/context/userContext";

interface Campaign {
  id: number;
  name: string;
  image: string;
  description: string;
}

const Campaigns: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { patient, userData, campaigns, setCampaigns } = useUserContext();

  useEffect(() => {
    const token =
      window.localStorage && window.localStorage.getItem("authToken");
    const fetchCampaigns = async () => {
      try {
        const res = await axios.get<Campaign[]>(
          "https://vaccine-management-supebase.vercel.app/api/campaign/"
        );
        setCampaigns(res.data);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  if (loading) return <p className="text-center text-green-800">Loading...</p>;

  return (
    <div
      id="campaign"
      className="max-w-screen-xl w-full mx-auto mb-10 lg:mb-20 px-5"
    >
      <div className="mb-6 md:mb-10">
        <span className="text-sm text-gray-500 font-medium text-center md:text-start block mb-2">
          CAMPAIGNS
        </span>
        <h2 className="scroll-m-20 text-center md:text-start justify-center md:justify-between text-3xl font-bold">
          Join Our Life-Saving Vaccine Campaigns
        </h2>
      </div>

      {/* Show Campaigns */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((item) => (
          <div
            className="relative flex max-w-[24rem] flex-col overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-md"
            key={item.id}
          >
            <div className="relative m-0 overflow-hidden text-gray-700 bg-transparent rounded-none shadow-none bg-clip-border">
              <img src={item.image} alt="UI/UX review check" />
            </div>
            <div className="p-6">
              <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                {item.name}
              </h4>
              <p className="block mt-3 font-sans text-xl antialiased font-normal leading-relaxed text-gray-700">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Campaigns;
