"use client";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
  AlertDialogOverlay,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { toast } from "sonner";
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

interface BookingFormInput {
  campaign_name: string;
  first_dose_date: string;
  second_dose_date: string;
  vaccine_name: string;
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

const fetchBookings = async (): Promise<Booking[]> => {
  const token = localStorage.getItem("authToken");
  const response = await axios.get<Booking[]>(
    "https://vaccine-management-supebase.vercel.app/api/booking/",
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
  return response.data;
};

const updateBookingData = async ({
  id,
  data,
}: {
  id: number;
  data: BookingFormInput;
}) => {
  const token = localStorage.getItem("authToken");
  const response = await axios.put(
    `https://vaccine-management-supebase.vercel.app/api/booking/${id}/`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    }
  );
  return response.data;
};

const deleteBookingData = async (id: number) => {
  const token = localStorage.getItem("authToken");
  await axios.delete(
    `https://vaccine-management-supebase.vercel.app/api/booking/${id}/`,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
};

const Bookings: React.FC = () => {
  const queryClient = useQueryClient();
  const {
    data: bookings,
    isLoading,
    error,
  } = useQuery("bookings", fetchBookings);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [vaccines, setVaccines] = useState<Vaccine[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const token =
          window.localStorage && window.localStorage.getItem("authToken");
        if (!token) {
          throw new Error("Authorization token not found");
        }

        const res = await axios.get<Campaign[]>(
          "https://vaccine-management-supebase.vercel.app/api/campaign/",
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        setCampaigns(res.data);
      } catch (error: unknown) {
        toast.error("something went wrong");
      } finally {
        setLoading(false);
      }
    };

    const fetchVaccines = async () => {
      try {
        const token =
          window.localStorage && window.localStorage.getItem("authToken");
        if (!token) {
          throw new Error("Authorization token not found");
        }

        const res = await axios.get<Vaccine[]>(
          "https://vaccine-management-supebase.vercel.app/api/campaign/vaccine/",
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        setVaccines(res.data);
      } catch (error: unknown) {
        toast.error("something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
    fetchVaccines();
  }, []);

  const updateMutation = useMutation(updateBookingData, {
    onSuccess: () => {
      queryClient.invalidateQueries("bookings");
      toast.success("Booking updated successfully");
    },
    onError: () => {
      toast.error("Failed to update booking");
    },
  });

  const deleteMutation = useMutation(deleteBookingData, {
    onSuccess: () => {
      queryClient.invalidateQueries("bookings");
      toast.success("Booking deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete booking");
    },
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const { register, handleSubmit, reset } = useForm<BookingFormInput>();

  const handleUpdateBooking = (booking: Booking) => {
    setSelectedBooking(booking);
    reset({
      campaign_name: booking.campaign_name,
      first_dose_date: booking.first_dose_date,
      second_dose_date: booking.second_dose_date,
      vaccine_name: booking.vaccine_name,
    });
    setModalOpen(true);
  };

  const onSubmit: SubmitHandler<BookingFormInput> = (data) => {
    if (selectedBooking) {
      updateMutation.mutate({ id: selectedBooking.id, data });
      setModalOpen(false);
      setSelectedBooking(null);
    }
  };

  if (isLoading)
    return <p className="text-center text-green-800">Loading...</p>;
  if (error)
    return (
      <p className="text-center text-red-800">
        Error: {(error as Error).message}
      </p>
    );

  return (
    <div
      id="bookings"
      className="max-w-screen-xl w-full mx-auto my-[80px] px-5"
    >
      <div className="mb-6 md:mb-10">
        <span className="text-sm text-gray-500 font-medium text-center md:text-start block mb-2">
          BOOKINGS
        </span>
        <h2 className="scroll-m-20 text-center md:text-start justify-center md:justify-between text-3xl font-bold">
          View and manage all your bookings here
        </h2>
      </div>

      <Card className="w-full overflow-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="pl-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Patient Name:
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Campaign Name:
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vaccine Name:
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                First Dose Date:
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Second Dose Date:
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bookings?.map((booking) => (
              <tr key={booking.id}>
                <td className="px-6 text-left py-4 whitespace-nowrap">
                  {`${booking.patient_first_name} ${booking.patient_last_name}`}
                </td>
                <td className="px-6 text-center py-4 whitespace-nowrap">
                  {booking.campaign_name}
                </td>
                <td className="px-6 text-center py-4 whitespace-nowrap">
                  {booking.vaccine_name}
                </td>
                <td className="px-6 text-center py-4 whitespace-nowrap">
                  {booking.first_dose_date}
                </td>
                <td className="px-6 text-center py-4 whitespace-nowrap">
                  {booking.second_dose_date}
                </td>
                <td className="px-6 text-right py-4 whitespace-nowrap">
                  {/* <AlertDialog onOpenChange={setModalOpen} open={modalOpen}>
                    <AlertDialogTrigger asChild>
                      <Button onClick={() => handleUpdateBooking(booking)}>Update</Button>
                    </AlertDialogTrigger>
                    <AlertDialogOverlay />
                    <AlertDialogContent>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="pb-5 flex flex-col gap-3">
                          <Label>Campaign Name:</Label>
                          <Input {...register("campaign_name", { required: true })} placeholder="Campaign Name" />
                        </div>
                        <div className="pb-5 flex flex-col gap-3">
                          <Label>Vaccine Name:</Label>
                          <Input {...register("vaccine_name", { required: true })} placeholder="Vaccine Name" />
                        </div>
                        <div className="pb-5 flex flex-col gap-3">
                          <Label>First Dose Date:</Label>
                          <Input {...register("first_dose_date", { required: true })} placeholder="2024-09-03" />
                        </div>
                        <div className="pb-5 flex flex-col gap-3">
                          <Label>Second Dose Date:</Label>
                          <Input {...register("second_dose_date", { required: true })} placeholder="2024-09-03" />
                        </div>
                        <Button type="submit" className="w-full">
                          Update
                        </Button>
                      </form>
                      <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setSelectedBooking(null)} className="w-full">
                          Cancel
                        </AlertDialogCancel>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog> */}

                  <Button
                    onClick={() => deleteMutation.mutate(booking.id)}
                    className=""
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default Bookings;

// "use client";
// import React, { useEffect, useState } from "react";
// import { useForm, SubmitHandler } from "react-hook-form";
// import { useQuery, useMutation, useQueryClient } from "react-query";
// import axios from "axios";
// import {
//   AlertDialog,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogFooter,
//   AlertDialogTrigger,
//   AlertDialogOverlay,
// } from "./ui/alert-dialog";
// import { Button } from "./ui/button";
// import { Label } from "./ui/label";
// import { Input } from "./ui/input";
// import { toast } from "sonner";
// import { Card } from "./ui/card";

// interface Booking {
//   id: number;
//   campaign: number;
//   campaign_name: string;
//   created_at: string;
//   updated_at: string;
//   first_dose_date: string;
//   second_dose_date: string;
//   vaccine: number;
//   vaccine_name: string;
//   patient_id: number;
//   patient_first_name: string;
//   patient_last_name: string;
// }

// interface BookingFormInput {
//   campaign: number;
//   vaccine: number;
//   first_dose_date: string;
//   second_dose_date: string;
// }

// interface Campaign {
//   id: number;
//   name: string;
//   description: string;
// }

// interface Vaccine {
//   id: number;
//   name: string;
// }

// const fetchBookings = async (): Promise<Booking[]> => {
//   const token = localStorage.getItem("authToken");
//   const response = await axios.get<Booking[]>(
//     "https://vaccine-management-backend-7qp2.onrender.com/api/booking/",
//     {
//       headers: {
//         Authorization: `Token ${token}`,
//       },
//     }
//   );
//   return response.data;
// };

// const fetchCampaigns = async (): Promise<Campaign[]> => {
//   const token = localStorage.getItem("authToken");
//   const response = await axios.get<Campaign[]>(
//     "https://vaccine-management-backend-7qp2.onrender.com/api/campaign/",
//     {
//       headers: {
//         Authorization: `Token ${token}`,
//       },
//     }
//   );
//   return response.data;
// };

// const fetchVaccines = async (): Promise<Vaccine[]> => {
//   const token = localStorage.getItem("authToken");
//   const response = await axios.get<Vaccine[]>(
//     "https://vaccine-management-backend-7qp2.onrender.com/api/campaign/vaccine/",
//     {
//       headers: {
//         Authorization: `Token ${token}`,
//       },
//     }
//   );
//   return response.data;
// };

// const updateBookingData = async ({
//   id,
//   data,
// }: {
//   id: number;
//   data: BookingFormInput;
// }) => {
//   const token = localStorage.getItem("authToken");
//   const response = await axios.put(
//     `https://vaccine-management-backend-7qp2.onrender.com/api/booking/${id}/`,
//     data,
//     {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Token ${token}`,
//       },
//     }
//   );
//   return response.data;
// };

// const deleteBookingData = async (id: number) => {
//   const token = localStorage.getItem("authToken");
//   await axios.delete(
//     `https://vaccine-management-backend-7qp2.onrender.com/api/booking/${id}/`,
//     {
//       headers: {
//         Authorization: `Token ${token}`,
//       },
//     }
//   );
// };

// const Bookings: React.FC = () => {
//   const queryClient = useQueryClient();
//   const {
//     data: bookings,
//     isLoading: bookingsLoading,
//     error: bookingsError,
//   } = useQuery("bookings", fetchBookings);
//   const {
//     data: campaigns,
//     isLoading: campaignsLoading,
//     error: campaignsError,
//   } = useQuery("campaigns", fetchCampaigns);
//   const {
//     data: vaccines,
//     isLoading: vaccinesLoading,
//     error: vaccinesError,
//   } = useQuery("vaccines", fetchVaccines);

//   const updateMutation = useMutation(updateBookingData, {
//     onSuccess: () => {
//       queryClient.invalidateQueries("bookings");
//       toast.success("Booking updated successfully");
//     },
//     onError: () => {
//       toast.error("Failed to update booking");
//     },
//   });

//   const deleteMutation = useMutation(deleteBookingData, {
//     onSuccess: () => {
//       queryClient.invalidateQueries("bookings");
//       toast.success("Booking deleted successfully");
//     },
//     onError: () => {
//       toast.error("Failed to delete booking");
//     },
//   });

//   const [modalOpen, setModalOpen] = useState(false);
//   const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

//   const { register, handleSubmit, reset, setValue } =
//     useForm<BookingFormInput>();

//   const handleUpdateBooking = (booking: Booking) => {
//     setSelectedBooking(booking);
//     reset({
//       campaign: booking.campaign,
//       vaccine: booking.vaccine,
//       first_dose_date: booking.first_dose_date,
//       second_dose_date: booking.second_dose_date,
//     });
//     setModalOpen(true);
//   };

//   const onSubmit: SubmitHandler<BookingFormInput> = (data) => {
//     if (selectedBooking) {
//       updateMutation.mutate({ id: selectedBooking.id, data });
//       setModalOpen(false);
//       setSelectedBooking(null);
//     }
//   };

//   if (bookingsLoading || campaignsLoading || vaccinesLoading)
//     return <p className="text-center text-green-800">Loading...</p>;
//   if (bookingsError || campaignsError || vaccinesError)
//     return (
//       <p className="text-center text-red-800">
//         {/* Error: {(bookingsError || campaignsError || vaccinesError) as Error} */}
//       </p>
//     );

//   return (
//     <div
//       id="bookings"
//       className="max-w-screen-xl w-full mx-auto my-[80px] px-5"
//     >
//       <div className="flex items-center justify-between pb-4 border-b my-6">
//         <h2 className="scroll-m-20 pb-2 text-3xl font-bold tracking-tight first:mt-0">
//           All Bookings
//         </h2>
//       </div>

//       <Card className="w-full overflow-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead>
//             <tr>
//               <th className="pl-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Patient Name:
//               </th>
//               <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Campaign Name:
//               </th>
//               <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Vaccine Name:
//               </th>
//               <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 First Dose Date:
//               </th>
//               <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Second Dose Date:
//               </th>
//               <th className="pr-20 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">

//             {bookings?.map((booking) => (
//               <tr key={booking.id}>
//                 <td className="px-6 text-left py-4 whitespace-nowrap">
//                   {`${booking.patient_first_name} ${booking.patient_last_name}`}
//                 </td>
//                 <td className="px-6 text-center py-4 whitespace-nowrap">
//                   {booking.campaign_name}
//                 </td>
//                 <td className="px-6 text-center py-4 whitespace-nowrap">
//                   {booking.vaccine_name}
//                 </td>
//                 <td className="px-6 text-center py-4 whitespace-nowrap">
//                   {booking.first_dose_date}
//                 </td>
//                 <td className="px-6 text-center py-4 whitespace-nowrap">
//                   {booking.second_dose_date}
//                 </td>
//                 <td className="px-6 text-right py-4 whitespace-nowrap flex items-center">
//                   {/* <AlertDialog onOpenChange={setModalOpen} open={modalOpen}>
//                     <AlertDialogTrigger asChild>
//                       <Button onClick={() => handleUpdateBooking(booking)}>
//                         Update
//                       </Button>
//                     </AlertDialogTrigger>
//                     <AlertDialogOverlay />
//                     <AlertDialogContent>
//                       <form onSubmit={handleSubmit(onSubmit)}>
//                         <div className="pb-5 flex flex-col gap-3">
//                           <Label className="">Campaign Name:</Label>
//                           <select
//                             {...register("campaign", { required: true })}
//                             className="w-full p-2 border border-gray-400"
//                           >
//                             <option value="">Select a Campaign</option>
//                             {campaigns?.map((campaign) => (
//                               <option key={campaign.id} value={campaign.name}>
//                                 {campaign.name}
//                               </option>
//                             ))}
//                           </select>
//                           </div>
//                           <div className="pb-5 flex flex-col gap-3">
//                           <Label className="">Vaccine Name:</Label>
//                           <select
//                             {...register("vaccine", { required: true })}
//                             className="w-full p-2 border border-gray-400"
//                           >
//                             <option value="">Select a Vaccine</option>
//                             {vaccines?.map((vaccine) => (
//                               <option key={vaccine.id} value={vaccine.name}>
//                                 {vaccine.name}
//                               </option>
//                             ))}
//                           </select>
//                         </div>
//                         <div className="pb-5 flex flex-col gap-3">
//                           <Label>First Dose Date:</Label>
//                           <Input
//                             {...register("first_dose_date", { required: true })}
//                             placeholder="2024-09-03"
//                           />
//                         </div>
//                         <div className="pb-5 flex flex-col gap-3">
//                           <Label>Second Dose Date:</Label>
//                           <Input
//                             {...register("second_dose_date", {
//                               required: true,
//                             })}
//                             placeholder="2024-09-03"
//                           />
//                         </div>
//                         <Button type="submit" className="w-full">
//                           Update
//                         </Button>
//                       </form>
//                       <AlertDialogFooter>
//                         <AlertDialogCancel
//                           onClick={() => setSelectedBooking(null)}
//                           className="w-full"
//                         >
//                           Cancel
//                         </AlertDialogCancel>
//                       </AlertDialogFooter>
//                     </AlertDialogContent>
//                   </AlertDialog> */}

//                   <Button
//                     onClick={() => deleteMutation.mutate(booking.id)}
//                     className=""
//                   >
//                     Delete
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </Card>
//     </div>
//   );
// };

// export default Bookings;
