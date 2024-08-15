"use client";
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import axios from 'axios';
import { Card, CardHeader, CardTitle } from './ui/card';
import { Label } from '@radix-ui/react-label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


interface BookingData {
  campaign: number;
  vaccine: number;
  campaign_name: string;
  vaccine_name: string;
  first_dose_date: string;
}

interface Campaign {
  id: number;
  name: string;
  description: string;
}

interface Vaccine {
  id: number;
  name: string;
}

const postBookingData = async (data: BookingData) => {
  try {
    const token = window.localStorage && window.localStorage.getItem('authToken');
    console.log(token);
    
    if (!token) {
      throw new Error('Authorization token not found');
    }
    const response = await axios.post('https://vaccine-management-backend-7qp2.onrender.com/api/booking/', {
      campaign: data.campaign,
      vaccine: data.vaccine,
      first_dose_date: data.first_dose_date,
    }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error posting booking data:', error);
    throw error;
  }
};

const CreateBooking: React.FC = () => {
  const [formData, setFormData] = useState<BookingData>({
    campaign: 0,
    vaccine: 0,
    campaign_name: '',
    vaccine_name: '',
    first_dose_date: '',
  });

  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [vaccines, setVaccines] = useState<Vaccine[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const token = window.localStorage && window.localStorage.getItem('authToken');
        if (!token) {
          throw new Error('Authorization token not found');
        }

        const res = await axios.get<Campaign[]>('https://vaccine-management-backend-7qp2.onrender.com/api/campaign/', {
          headers: {
            "Authorization": `Token ${token}`,
          },
        });
        setCampaigns(res.data);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          setError(error.message);
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    const fetchVaccines = async () => {
      try {
        const token = window.localStorage && window.localStorage.getItem('authToken');
        if (!token) {
          throw new Error('Authorization token not found');
        }

        const res = await axios.get<Vaccine[]>('https://vaccine-management-backend-7qp2.onrender.com/api/campaign/vaccine/', {
          headers: {
            "Authorization": `Token ${token}`,
          },
        });
        setVaccines(res.data);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          setError(error.message);
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
    fetchVaccines();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const selectedCampaign = campaigns.find(campaign => campaign.name === formData.campaign_name);
      const selectedVaccine = vaccines.find(vaccine => vaccine.name === formData.vaccine_name);

      if (selectedCampaign && selectedVaccine) {
        const response = await postBookingData({
          ...formData,
          campaign: selectedCampaign.id,
          vaccine: selectedVaccine.id,
        });
        toast.success('Booking created successfully');
        router.push('/');
      } else {
        toast.error('Please select valid campaign and vaccine');
      }
    } catch (error) {
      toast.error('you are not patient! so, you can not book');
    }
  };

  if (loading) return <p className="text-center text-green-800">Loading...</p>;
  if (error) return <p className="text-center text-red-600">Error fetching data: {error}</p>;

  return (
    <div className='max-w-screen-xl w-full mx-auto my-10 lg:my-20 px-5' id="bookings">
      <h2 className="lg:text-3xl text-2xl font-bold mb-4 lg:mb-6">Booking your campaign</h2>
      <Card>
        <CardHeader>
          <CardTitle>Booking</CardTitle>
        </CardHeader>
            <form onSubmit={handleSubmit} className='p-4'>
              <div className="pb-5 flex flex-col gap-3">
                <Label className="">Campaign Name:</Label>
                <select
                  name="campaign_name"
                  value={formData.campaign_name}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-400"
                >
                  <option value="">Select a Campaign</option>
                  {campaigns.map((campaign) => (
                    <option key={campaign.id} value={campaign.name}>
                      {campaign.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="pb-5 flex flex-col gap-3">
                <Label className="">Vaccine Name:</Label>
                <select
                  name="vaccine_name"
                  value={formData.vaccine_name}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border border-gray-400"
                >
                  <option value="">Select a Vaccine</option>
                  {vaccines.map((vaccine) => (
                    <option key={vaccine.id} value={vaccine.name}>
                      {vaccine.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="pb-5 flex flex-col gap-3">
                <Label className="">First Dose Date:</Label>
                <Input
                  type="date"
                  name="first_dose_date"
                  value={formData.first_dose_date}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex items-center justify-end">
                <button type="submit" className='py-2 px-6 font-semibold rounded-sm bg-slate-900 border border-slate-900 text-white hover:text-slate-900 hover:bg-white transition-all ease-in-out cursor-pointer'>Booking</button>
              </div>
            </form>
        
      </Card>
    </div>
  );
};

export default CreateBooking;


