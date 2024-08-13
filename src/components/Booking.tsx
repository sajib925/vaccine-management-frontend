"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card } from "./ui/card";

interface Booking {
  id: number;
  campaign: number;
  campaign_name: string;
  created_at: string;
  updated_at: string;
  first_dose_date: string;
  second_dose_date: string;
  vaccine: number;
  vaccine_name: string;
  patient_id: number;
  patient_first_name: string;
  patient_last_name: string;
}

const Bookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const fetchBookings = async () => {
      try {
        const res = await axios.get<Booking[]>(
          "https://vaccine-management-backend-7qp2.onrender.com/api/booking/",
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );

        setBookings(res.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

 

  if (loading) return <p className="text-center text-green-800">Loading...</p>;
  if (error) return <p className="text-center text-red-600 py-6">{`You are a doctor. That's why you have no booking`}</p>;

  return (
    <div className="max-w-[600px] w-full mx-auto mt-8 px-5">
      {bookings.length > 0 ? (
        <>
          <h2 className="py-3 mb-3 border-b border-gray-400 text-xl lg:2xl font-semibold text-center">
            Booking List
          </h2>
          {bookings.map((item) => (
            <Card className="mb-4" key={item.id}>
              <div className="p-4 pb-0 mb-4 flex flex-col gap-3">
                <h3>
                  <b>Patient Name:</b> {`${item.patient_first_name} ${item.patient_last_name}`}
                </h3>
                <p>
                  <b>Campaign Name:</b> {item.campaign_name}
                </p>
                <p>
                  <b>Vaccine Name:</b> {item.vaccine_name}
                </p>
                <p>
                  <b>First Dose Date:</b> {item.first_dose_date}
                </p>
                <p>
                  <b>Second Dose Date:</b> {item.second_dose_date}
                </p>
              </div>
            </Card>
          ))}
        </>
      ) : (
        <p className="text-center text-red-600">No Booking yet</p>
      )}
      
    </div>
  );
};

export default Bookings;
