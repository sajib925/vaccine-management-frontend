"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "./ui/button";
import Image from "next/image";
import { useMutation } from "react-query";
import { toast } from "sonner";

interface FormInputs {
  name: string;
  email: string;
  subject: string;
  problem: string;
  phone: string;
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
        "https://vaccine-management-supebase.vercel.app/api/contact/",
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
    <section className="">
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-xl w-full">

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 py-12 px-4 md:px-8 lg:px-24 rounded-lg bg-gray-200">
          <h2 className="text-2xl font-bold">Send Message</h2>
          <div className="flex items-center flex-col lg:flex-row gap-3">
            <div className="w-full">
              <label
                  className="block mb-2 text-base font-medium text-gray-900 dark:text-gray-300"
              >
                Your name
              </label>
              <input
                  type="text"
                  id="name"
                  {...register("name", {required: "Name is required"})}
                  className={`shadow-sm p-3 bg-gray-50 border ${
                      errors.name ? "border-red-500" : "border-gray-300"
                  } text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700`}
                  placeholder="Your name"
              />
              {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
              )}
            </div>
            <div className="w-full">
              <label
                  className="block mb-2 text-base font-medium text-gray-900 dark:text-gray-300"
              >
                Your Email
              </label>
              <input
                  type="text"
                  id="email"
                  {...register("email", {required: "email is required"})}
                  className={`block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border ${
                      errors.email ? "border-red-500" : "border-gray-300"
                  } shadow-sm focus:ring-primary-500 focus:border-primary-500`}
                  placeholder="Your Email"
              />
              {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
              )}
            </div>
          </div>
          <div className="flex items-center flex-col lg:flex-row gap-3">
            <div className="w-full">
              <label
                  className="block mb-2 text-base font-medium text-gray-900 dark:text-gray-300"
              >
                Your phone
              </label>
              <input
                  type="text"
                  id="phone"
                  {...register("phone", {required: "Phone number is required"})}
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
            <div className="w-full">
              <label
                  className="block mb-2 text-base font-medium text-gray-900 dark:text-gray-300"
              >
                Subject
              </label>
              <input
                  type="text"
                  id="name"
                  {...register("subject", {required: "Subject is required"})}
                  className={`shadow-sm p-3 bg-gray-50 border ${
                      errors.subject ? "border-red-500" : "border-gray-300"
                  } text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full`}
                  placeholder="Subject"
              />
              {errors.subject && (
                  <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>
              )}
            </div>

          </div>
          <div className="sm:col-span-2">
            <label
                htmlFor="problem"
                className="block mb-2 text-base font-medium text-gray-900 dark:text-gray-400"
            >
              Your message
            </label>
            <textarea
                id="problem"
                rows={6}
                {...register("problem", {required: "Message is required"})}
                className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border ${
                    errors.problem ? "border-red-500" : "border-gray-300"
                } focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600`}
                placeholder="Leave a comment..."
            ></textarea>
            {errors.problem && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.problem.message}
                </p>
            )}
          </div>
          <div className="flex items-center justify-end">
            <Button type="submit" className="w-full py-6" disabled={mutation.isLoading}>
              {mutation.isLoading ? "Sending..." : "Send message"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
