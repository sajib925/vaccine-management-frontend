"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/context/userContext";
import axios from "axios";
import Image from "next/image";
import { fetchServiceData } from "@/logic/apiService";

interface UserData {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

interface Patient {
  id: number;
  user: number;
  mobile_no: string;
  nid: string;
  age: string;
  medical_info: string | null;
}

interface Doctor {
  id: number;
  user: number;
  mobile_no: string;
}

interface Campaign {
  id: number;
  name: string;
  image: string;
  description: string;
}

interface Review {
  id: number;
  patient_first_name: string;
  patient_last_name: string;
  patient_username: string;
  campaign_name: string;
  comment: string;
}

const Navbar = () => {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const {
    patient,
    doctor,
    allDoctor,
    userData,
    campaigns,
    setUserData,
    allPatient,
    setAllPatient,
    setAllDoctor,
    setPatient,
    setDoctor,
    setServices,
    setCampaigns,
    setReview
  } = useUserContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [authToken, setAuthToken] = useState<string>("");
  useEffect(() => {
    if (window !== undefined) {
      setAuthToken(window.localStorage.getItem("authToken") ?? "");
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    const fetchUserData = async () => {
      try {
        const response = await axios.get<UserData>(
          "https://vaccine-management-supebase.vercel.app/api/auth/profile/",
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        setUserData(response.data);
      } catch (error) {
        setError("Error fetching user data");
      } finally {
        setLoading(false);
      }
    };

    const fetchPatientsData = async () => {
      try {
        const response = await axios.get<Patient[]>(
          "https://vaccine-management-supebase.vercel.app/api/auth/patient/",
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        setAllPatient(response.data);
      } catch (error) {
        setError("Error fetching patient data");
      } finally {
        setLoading(false);
      }
    };

    const fetchDoctorsData = async () => {
      try {
        const response = await axios.get<Doctor[]>(
          "https://vaccine-management-supebase.vercel.app/api/auth/doctor/",
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        setAllDoctor(response.data);
      } catch (error) {
        setError("Error fetching doctor data");
      } finally {
        setLoading(false);
      }
    };
    const serviceDataFetch = async () => {
      const service = await fetchServiceData();
      setServices(Array.isArray(service) ? service : [service]);
    };
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
    const fetchReviews = async () => {
      try {
        const res = await axios.get<Review[]>(
          "https://vaccine-management-supebase.vercel.app/api/review/"
        );
        setReview(res.data);
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
    fetchReviews();
    fetchCampaigns();
    serviceDataFetch();
    fetchDoctorsData();
    fetchPatientsData();
    fetchUserData();
  }, []);

  useEffect(() => {
    if (allPatient.length > 0) {
      const patientData =
        allPatient.find((item) => item.user === userData.id) ?? null;
      setPatient(patientData);
    }
    if (allDoctor.length > 0) {
      const doctorData =
        allDoctor.find((item) => item.user === userData.id) ?? null;
      setDoctor(doctorData);
    }
  }, [allPatient, allDoctor, userData.id, setPatient, setDoctor]);

  

  const handleLogout = async () => {
    try {
      const authToken = window.localStorage.getItem("authToken");
      const res = await fetch(
        "https://vaccine-management-supebase.vercel.app/api/auth/logout/",
        {
          method: "POST",
          headers: {
            Authorization: `Token ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      if (res.ok) {
        window.localStorage.removeItem("authToken");
        setUserData({email:'', first_name:"" ,id:0,last_name:""})
        setAllPatient([]); 
        setAllDoctor([]); 
        setPatient(null); 
        setDoctor(null); 
  
        toast.success("Logout successfully");
        router.push("/signIn");
      } else {
        const errorData = await res.json();  
        toast.error(`Error: ${errorData.detail}`);
      }
    } catch (error) {
      console.error("Logout failed", error);
      toast.error("Something went wrong");
    }
  };
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-[#F8FAFC] border-gray-200 dark:bg-gray-900 w-full sticky top-0 left-0 z-50 border-b ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <Image src={"/image/logo.webp"} width={50} height={30} alt="logo" />
        </Link>
        <button
          onClick={toggleMobileMenu}
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded={isMobileMenuOpen ? "true" : "false"}
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={
                isMobileMenuOpen
                  ? "M1 1l15 12M1 13L16 1"
                  : "M1 1h15M1 7h15M1 13h15"
              }
            />
          </svg>
        </button>
        <div
          className={`w-full lg:block lg:w-auto ${
            isMobileMenuOpen ? "block" : "hidden"
          }`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 lg:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 lg:flex-row lg:items-center lg:space-x-8 rtl:space-x-reverse lg:mt-0 lg:border-0  dark:bg-gray-800 lg:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                href="/"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            {doctor?.id && (
              <>
                <li>
                  <Link
                    href="vaccine"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
                    aria-current="page"
                  >
                    Vaccines
                  </Link>
                </li>
                <li>
                  <Link
                    href="campaign"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
                  >
                    Campaign
                  </Link>
                </li>
              </>
            )}

            {patient?.id && (
              <>
                <li>
                  <Link
                    href="booking"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
                  >
                    Booking
                  </Link>
                </li>
                <li>
                  <Link
                    href="allBooking"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
                  >
                    Booking List
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link
                href="contact"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
              >
                Contact Us
              </Link>
            </li>

            {authToken ? (
              <>
                <span
                  onClick={handleLogout}
                  className="cursor-pointer py-2 px-4 font-semibold rounded-sm bg-slate-900 border border-slate-900 text-white hover:text-slate-900 hover:bg-white transition-all ease-in-out mb-3 lg:mb-0 text-center"
                >
                  Logout
                </span>

                <Link
                  href={"/profile"}
                  className="py-2 px-4 font-semibold rounded-sm bg-slate-900 border border-slate-900 text-white hover:text-slate-900 hover:bg-white transition-all ease-in-out cursor-pointer text-center"
                >
                  Profile
                </Link>
              </>
            ) : (
              <>
                <Link
                  href={"/signIn"}
                  className="py-2 px-4 font-semibold rounded-sm bg-slate-900 border border-slate-900 text-white hover:text-slate-900 hover:bg-white transition-all ease-in-out cursor-pointer mb-3 lg:mb-0 text-center"
                >
                  Sign In
                </Link>
                <Link
                  href={"/signUp"}
                  className="py-2 px-4 font-semibold rounded-sm bg-slate-900 border border-slate-900 text-white hover:text-slate-900 hover:bg-white transition-all ease-in-out cursor-pointer text-center"
                >
                  Sign Up
                </Link>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
