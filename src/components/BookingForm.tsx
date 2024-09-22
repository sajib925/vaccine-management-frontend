"use client";
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';
import { useQuery, useMutation } from 'react-query';
import axios from 'axios';
import { Card, CardHeader, CardTitle } from './ui/card';
import { Label } from '@radix-ui/react-label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

// Define TypeScript interfaces
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

// Fetch campaigns and vaccines using React Query
const fetchCampaigns = async () => {
  const token = window.localStorage.getItem('authToken');
  if (!token) {
    throw new Error('Authorization token not found');
  }
  const res = await axios.get<Campaign[]>('https://vaccine-management-backend-j2ii.onrender.com/api/campaign/', {
    headers: { Authorization: `Token ${token}` },
  });
  return res.data;
};

const fetchVaccines = async () => {
  const token = window.localStorage.getItem('authToken');
  if (!token) {
    throw new Error('Authorization token not found');
  }
  const res = await axios.get<Vaccine[]>('https://vaccine-management-backend-j2ii.onrender.com/api/campaign/vaccine/', {
    headers: { Authorization: `Token ${token}` },
  });
  return res.data;
};

// Post booking data
const postBookingData = async (data: BookingData) => {
  const token = window.localStorage.getItem('authToken');
  if (!token) {
    throw new Error('Authorization token not found');
  }
  const response = await axios.post('https://vaccine-management-backend-j2ii.onrender.com/api/booking/', {
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
};

const CreateBooking: React.FC = () => {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<BookingData>();
  const router = useRouter();

  // Fetch data with React Query
  const { data: campaigns, isLoading: campaignsLoading, isError: campaignsError } = useQuery('campaigns', fetchCampaigns);
  const { data: vaccines, isLoading: vaccinesLoading, isError: vaccinesError } = useQuery('vaccines', fetchVaccines);

  // Mutation for posting booking data
  const { mutate: createBooking, isLoading: bookingLoading, isError: bookingError } = useMutation(postBookingData, {
    onSuccess: () => {
      toast.success('Booking created successfully');
      router.push('/');
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        const responseData = error.response.data;
        const errorMessage = Object.values(responseData)
          .flat() 
          .join(' '); 
        toast.error(errorMessage);
      } else {
        toast.error('Something went wrong');
      }
    }
  });

  const onSubmit: SubmitHandler<BookingData> = async (data) => {
    const selectedCampaign = campaigns?.find(campaign => campaign.name === data.campaign_name);
    const selectedVaccine = vaccines?.find(vaccine => vaccine.name === data.vaccine_name);

    if (selectedCampaign && selectedVaccine) {
      createBooking({
        ...data,
        campaign: selectedCampaign.id,
        vaccine: selectedVaccine.id,
      });
    } else {
      toast.error('Please select valid campaign and vaccine');
    }
  };

  if (campaignsLoading || vaccinesLoading) return <p className="text-center text-green-800">Loading...</p>;
  if (campaignsError || vaccinesError) return <p className="text-center text-red-600">Error fetching data</p>;

  return (
    <div className='max-w-screen-xl w-full mx-auto my-10 lg:my-20 px-5' id="bookings">
      <div className="mb-6 md:mb-10">
        <span className="text-sm text-gray-500 font-medium text-center md:text-start block mb-2">
          BOOKINGS
        </span>
        <h2 className="scroll-m-20 text-center md:text-start justify-center md:justify-between text-3xl font-bold">
          Schedule Your Campaign Appointment
        </h2>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Booking</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)} className='p-4'>
          <div className="pb-5 flex flex-col gap-3">
            <Label className="">Campaign Name:</Label>
            <select
              {...register('campaign_name', { required: 'Campaign is required' })}
              className="w-full p-2 border border-gray-400"
            >
              <option value="">Select a Campaign</option>
              {campaigns?.map((campaign) => (
                <option key={campaign.id} value={campaign.name}>
                  {campaign.name}
                </option>
              ))}
            </select>
            {errors.campaign_name && <p className="text-red-500 text-xs">{errors.campaign_name.message}</p>}
          </div>
          <div className="pb-5 flex flex-col gap-3">
            <Label className="">Vaccine Name:</Label>
            <select
              {...register('vaccine_name', { required: 'Vaccine is required' })}
              className="w-full p-2 border border-gray-400"
            >
              <option value="">Select a Vaccine</option>
              {vaccines?.map((vaccine) => (
                <option key={vaccine.id} value={vaccine.name}>
                  {vaccine.name}
                </option>
              ))}
            </select>
            {errors.vaccine_name && <p className="text-red-500 text-xs">{errors.vaccine_name.message}</p>}
          </div>
          <div className="pb-5 flex flex-col gap-3">
            <Label className="">First Dose Date:</Label>
            <Input
              type="date"
              {...register('first_dose_date', { required: 'First dose date is required' })}
              className="w-full"
            />
            {errors.first_dose_date && <p className="text-red-500 text-xs">{errors.first_dose_date.message}</p>}
          </div>
          <div className="flex items-center justify-end">
            <Button type="submit" className='py-2 px-6 font-semibold rounded-sm bg-slate-900 border border-slate-900 text-white hover:text-slate-900 hover:bg-white transition-all ease-in-out'>
              {bookingLoading ? 'Booking...' : 'Book Now'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CreateBooking;
