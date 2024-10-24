"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { fetchDoctorsData, fetchPatientsData, fetchServiceData, fetchUserData } from "@/logic/apiService";
import { useUserContext } from "@/context/userContext";
import Image from "next/image";
import {CameraIcon, UserIcon} from "@/lib/Icons";
import {useCallback, useState} from "react";
import axios from "axios";
import {useDropzone} from "react-dropzone";

interface DoctorFormValues {
  mobile_no: string;
  image: string;
}

export const Doctor = () => {
  const { setUserData, setPatient, setDoctor, setServices } = useUserContext();
  const router = useRouter();
  const { register, setValue,handleSubmit, formState: { errors } } = useForm<DoctorFormValues>({
    defaultValues: {
      mobile_no: "",
      image: ""
    },
  });
  const [imageUrl, setImageUrl] = useState(""); // State to store the uploaded image URL

  // Image upload handler using Dropzone and Cloudinary
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "my_upload_preset");

    axios
        .post("https://api.cloudinary.com/v1_1/dioutvghc/image/upload", formData)
        .then((response) => {
          const uploadedImageUrl = response.data.secure_url;
          setImageUrl(uploadedImageUrl);
          setValue("image", uploadedImageUrl);
          toast.success("Image uploaded successfully");
        })
        .catch((error) => {
          toast.error("Image upload failed");
          console.error("Error uploading image:", error);
        });
  }, [setValue]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });


  const mutation = useMutation({
    mutationFn: async (formData: DoctorFormValues) => {
      const authToken = window.localStorage.getItem("authToken") ?? "";
      const res = await fetch("https://vaccine-management-supebase.vercel.app/api/auth/doctor/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${authToken}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || "Error creating Doctor Account");
      }

      return res.json();
    },
    onSuccess: async () => {
      const token = window.localStorage.getItem("authToken");
      if (!token) {
        toast.error("Auth token not found");
        return;
      }

      toast.success("Doctor Account created successfully");

      try {
        const userData = await fetchUserData(token);
        if (!userData) throw new Error("User data not found");

        setUserData(userData);

        const [patientsData, doctorsData] = await Promise.all([
          fetchPatientsData(token),
          fetchDoctorsData(token),
        ]);

        const patientData =
          patientsData.find((p) => p.user === userData.id) ?? null;
        const doctorData =
          doctorsData.find((d) => d.user === userData.id) ?? null;
        // @ts-ignore
        setPatient(patientData);
        // @ts-ignore
        setDoctor(doctorData);

        const service = await fetchServiceData();
        setServices(Array.isArray(service) ? service : [service]);

        if (doctorData?.id || patientData?.id) {
          router.push("/");
        } else {
          router.push("/userType");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to fetch user data");
        router.push("/error");
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || "Error creating Doctor Account");
    },
  });

  const onSubmit: SubmitHandler<DoctorFormValues> = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="max-w-[1000px] w-full mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-xl">Create Doctor Account</CardTitle>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Image Upload Field */}
              <div className="py-4 flex items-center justify-center gap-3">
                <div {...getRootProps({className: "dropzone w-auto"})}>
                  <input {...getInputProps()} />
                  <div className='inline-flex items-center justify-center cursor-pointer'>
                    <div className="w-auto relative">
                      <div className="overflow-hidden border border-gray-200 rounded-full text-gray-600 w-24 h-24">
                        {
                          imageUrl ? (
                              <Image src={imageUrl} alt="Uploaded Image" className="w-full h-full object-cover" width={80} height={80} />
                          ) : (
                              <UserIcon />
                          )
                        }
                      </div>
                      <div className='absolute top-[50%] -right-2 z-20'>
                        <CameraIcon />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pb-5 flex flex-col gap-3">
                <Label className="text-base">Mobile No.:</Label>
                <Input
                  type="text"
                  {...register("mobile_no", { required: "Mobile No. is required" })}
                  placeholder="Mobile No."
                />
                {errors.mobile_no && <span>{errors.mobile_no.message}</span>}
              </div>
              <div className="flex justify-end">
                <Button type="submit" className="w-full" disabled={mutation.isLoading}>
                  {mutation.isLoading ? "Loading..." : "Create Doctor"}
                </Button>
              </div>
            </form>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
};
