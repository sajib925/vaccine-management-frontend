"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
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
import { Pagination } from "swiper/modules";
import { useUserContext } from "@/context/userContext";

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

const postReviewData = async (data: ReviewData) => {
  try {
    const token =
      window.localStorage && window.localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Authorization token not found");
    }
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
  } catch (error) {
    console.error("Error posting review data:", error);
    throw error;
  }
};

const Review = () => {
  const { patient, userData, campaigns } = useUserContext();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [modalClose, setModalClose] = useState(false);
  const [formData, setFormData] = useState<ReviewData>({
    campaign: 0,
    campaign_name: "",
    comment: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const selectedCampaign = campaigns.find(
        (campaign) => campaign.name === formData.campaign_name
      );
      if (selectedCampaign) {
        const reviewData = { ...formData, campaign: selectedCampaign.id };
        const response = await postReviewData(reviewData);
        setModalClose(false);
        toast.success("Review created successfully");
      } else {
        throw new Error("Selected campaign not found");
      }
    } catch (error) {
      toast.error("Error creating review");
    }
  };

  useEffect(() => {
    const token =
      window.localStorage && window.localStorage.getItem("authToken");
    const fetchReviews = async () => {
      try {
        const res = await axios.get<Review[]>(
          "https://vaccine-management-backend-7qp2.onrender.com/api/review/",
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        setReviews(res.data);
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
  }, []);
  return (
    <>
      {userData.id ? (
        <div className="max-w-screen-xl w-full mx-auto px-5 mt-10 lg:mb-20 mb-10">
          {/* Create Review */}

          <div className="flex items-center justify-between gap-4 mb-10 ">
            <h2 className="scroll-m-20  text-3xl font-bold">
              Insightful Feedback from Our Patient
            </h2>
            {patient ? (
              <AlertDialog onOpenChange={setModalClose} open={modalClose}>
                <AlertDialogTrigger asChild>
                  <span className="py-2 w-full md:w-auto md:px-8 font-semibold rounded-sm bg-slate-900 border border-slate-900 text-white hover:text-slate-900 hover:bg-white transition-all ease-in-out cursor-pointer">Review</span>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <form onSubmit={handleSubmit}>
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
                      <Label className="">Review:</Label>
                      <Textarea
                        name="comment"
                        value={formData.comment}
                        onChange={handleChange}
                        required
                        placeholder="Review"
                      />
                    </div>
                    <Button type="submit" className="w-full">Submit</Button>
                  </form>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="w-full">Cancel</AlertDialogCancel>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ) : (
              ""
            )}
          </div>

          {/* Review Show */}

          <Swiper
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
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {reviews.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="bg-gray-200 rounded-lg p-8 text-center full">
                  <p className="font-bold uppercase">{`${item.patient_first_name} ${item.patient_last_name}`}</p>
                  <p className="pt-2 text-center text-2xl font-semibold">
                    {item.campaign_name}
                  </p>
                  <p className="text-xl font-light italic text-gray-700">
                    {item.comment}
                  </p>
                  <div className="flex items-center justify-center space-x-2 mt-4">
                    <svg
                      className="text-yellow-500 w-4 h-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      stroke="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg
                      className="text-yellow-500 w-4 h-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      stroke="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg
                      className="text-yellow-500 w-4 h-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      stroke="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Review;
