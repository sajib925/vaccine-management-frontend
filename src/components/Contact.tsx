"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "./ui/button";
import Image from "next/image";
import { useMutation } from "react-query";
import { toast } from "sonner";

interface FormInputs {
  name: string;
  phone: string;
  problem: string;
}

const ContactForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const mutation = useMutation(
    async (data: FormInputs) => {
      const response = await fetch(
        "https://vaccine-management-backend-j2ii.onrender.com/api/contact/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      return response.json();
    },
    {
      onSuccess: (result) => {
        toast.success("Message sent successfully!");
        console.log("Success:", result);
      },
      onError: (error) => {
        toast.error("Failed to send message.");
        console.error("Error:", error);
      },
    }
  );

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    mutation.mutate(data);
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-y-4 gap-x-20">
          <Image src={"/image/contact.svg"} width={450} height={300} alt="contact" />
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Your name
              </label>
              <input
                type="text"
                id="name"
                {...register("name", { required: "Name is required" })}
                className={`shadow-sm bg-gray-50 border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light`}
                placeholder="Your name"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Your phone
              </label>
              <input
                type="text"
                id="phone"
                {...register("phone", { required: "Phone number is required" })}
                className={`block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                } shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light`}
                placeholder="Your phone number"
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="problem"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
              >
                Your message
              </label>
              <textarea
                id="problem"
                rows={6}
                {...register("problem", { required: "Message is required" })}
                className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border ${
                  errors.problem ? "border-red-500" : "border-gray-300"
                } focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                placeholder="Leave a comment..."
              ></textarea>
              {errors.problem && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.problem.message}
                </p>
              )}
            </div>
            <div className="flex items-center justify-end">
              <Button type="submit" className="w-full" disabled={mutation.isLoading}>
                {mutation.isLoading ? "Sending..." : "Send message"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
