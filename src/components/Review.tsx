"use client";
import axios from "axios";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { useUserContext } from "@/context/userContext";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Define interfaces
interface Review {
  id: number;
  patient_first_name: string;
  patient_last_name: string;
  patient_username: string;
  campaign_name: string;
  comment: string;
}

interface ReviewData {
  campaign: number;
  campaign_name: string;
  comment: string;
}

// API functions
const fetchReviews = async (): Promise<Review[]> => {
  const response = await axios.get<Review[]>(
    "https://vaccine-management-backend-7qp2.onrender.com/api/review/"
  );
  return response.data;
};

const postReviewData = async (data: ReviewData): Promise<Review> => {
  const token = window.localStorage.getItem("authToken");
  if (!token) {
    throw new Error("Authorization token not found");
  }

  try {
    const response = await axios.post(
      "https://vaccine-management-backend-7qp2.onrender.com/api/review/",
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

const Review = () => {
  const { patient, campaigns } = useUserContext();
  const queryClient = useQueryClient();
  const [modalClose, setModalClose] = useState(false);

  const { data: reviews, isLoading, isError, error } = useQuery("reviews", fetchReviews);

  const mutation = useMutation(postReviewData, {
    onSuccess: () => {
      queryClient.invalidateQueries("reviews");
      setModalClose(false);
      toast.success("Review created successfully");
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        const responseData = error.response.data;
        const errorMessage = Object.values(responseData)
          .flat()
          .join(" ");
        toast.error(errorMessage);
      } else {
        toast.error("Something went wrong");
      }
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ReviewData>();

  const onSubmit: SubmitHandler<ReviewData> = async (formData) => {
    const selectedCampaign = campaigns.find(
      (campaign) => campaign.name === formData.campaign_name
    );
    if (selectedCampaign) {
      const reviewData = { ...formData, campaign: selectedCampaign.id };
      mutation.mutate(reviewData);
      reset();
    } else {
      toast.error("Selected campaign not found");
    }
  };

  return (
    <>
      <div className="max-w-screen-xl w-full mx-auto px-5 mt-10 lg:mb-20 mb-10">
        {/* Create Review */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-6 md:mb-10">
          <div>
            <span className="text-sm text-gray-500 font-medium text-center md:text-start block mb-2">
              TESTIMONIAL
            </span>
            <h2 className="scroll-m-20 text-center justify-center md:justify-between text-3xl font-bold">
              Insightful Feedback from Our Patient
            </h2>
          </div>

          {patient && (
            <AlertDialog  onOpenChange={setModalClose} open={modalClose}>
              <AlertDialogTrigger asChild>
                <span className="text-center py-3 w-full md:w-auto md:px-8 font-semibold rounded-sm bg-slate-900 border border-slate-900 text-white hover:text-slate-900 hover:bg-white transition-all ease-in-out cursor-pointer">
                  Review
                </span>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="pb-5 flex flex-col gap-3">
                    <Label>Campaign Name:</Label>
                    <select
                      {...register("campaign_name", { required: true })}
                      className="w-full p-2 border border-gray-400"
                    >
                      <option value="">Select a Campaign</option>
                      {campaigns.map((campaign) => (
                        <option key={campaign.id} value={campaign.name}>
                          {campaign.name}
                        </option>
                      ))}
                    </select>
                    {errors.campaign_name && (
                      <span className="text-red-500">
                        Campaign name is required
                      </span>
                    )}
                  </div>
                  <div className="pb-5 flex flex-col gap-3">
                    <Label>Review:</Label>
                    <Textarea
                      {...register("comment", { required: true })}
                      placeholder="Review"
                    />
                    {errors.comment && (
                      <span className="text-red-500">Review is required</span>
                    )}
                  </div>
                  <Button type="submit" className="w-full" disabled={mutation.isLoading}>
                    {mutation.isLoading ? "Creating...": "Create Review"}
                  </Button>
                </form>
                <AlertDialogFooter>
                  <AlertDialogCancel className="w-full">
                    Cancel
                  </AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>

        {/* Slider Wrapper */}
        <Swiper
          spaceBetween={30}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          pagination={{ clickable: true }}
          modules={[Autoplay, Pagination]}
          className="mySwiper"
        >
          {reviews?.map((item) => (
            <SwiperSlide
              key={item.id}
              className="!h-auto mr-3 md:mx-0 overflow-hidden"
            >
              <div className="h-full flex flex-col group bg-white border border-solid border-gray-300 rounded-xl p-6 transition-all duration-500 w-full mx-auto hover:border-indigo-600 hover:shadow-sm">
                <div>
                  <div className="flex items-center justify-start space-x-2 pb-4">
                    {[...Array(5)].map((_, index) => (
                      <svg
                        key={index}
                        className="text-yellow-500 w-4 h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        stroke="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <h3 className="text-xl font-semibold">{item.campaign_name}</h3>
                </div>
                <div className="pt-4">
                  <p className="text-gray-700 text-base break-words">
                    {item.comment}
                  </p>
                </div>
                <div className="pt-4 flex items-center justify-between mt-auto">
                  <p className="text-gray-500 text-sm">
                    {item.patient_first_name} {item.patient_last_name}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Review;
