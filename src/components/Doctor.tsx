// "use client";
// import { useEffect, useState } from "react";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";
// import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
// import { Label } from "./ui/label";
// import { Input } from "./ui/input";
// import { Button } from "./ui/button";

// interface Doctor {
//   mobile_no: string;
// }

// export const Doctor = () => {
//   const router = useRouter();
//   const [formData, setFormData] = useState<Doctor>({
//     mobile_no: "",
//   });
//   const [authToken , setAuthToken] = useState<string>('')
  
//   useEffect(() => {
//       if(window !== undefined){
//           setAuthToken(window.localStorage.getItem("authToken")??'')
//       }
//   },[])


//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };


//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const res = await fetch("https://vaccine-management-backend-7qp2.onrender.com/api/auth/doctor/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         'Authorization': `Token ${authToken}`,
//       },
//       body: JSON.stringify(formData),
//     });

//     if (res.ok) {
//       toast.success("Doctor Account created successfully");
//       router.push("/");
//     } else {
//       const errorData = await res.json();
//       console.error(errorData);
//       toast.error("Error creating Doctor Account");
//     }
//   };

//   return (
//     <div className="max-w-[1000px] w-full mx-auto">
//       <Card>
//         <CardHeader>
//           <CardTitle className="text-center text-xl">Create Doctor Account</CardTitle>
//           <CardContent>
//             <form onSubmit={handleSubmit}>
//               <div className="pb-5 flex flex-col gap-3">
//                 <Label className="text-base">Mobile No.:</Label>
//                 <Input
//                   type="text"
//                   name="mobile_no"
//                   onChange={handleChange}
//                   required
//                   placeholder="Mobile No."
//                 />
//               </div>
//               <div className="flex justify-end">
//                 <Button type="submit" className="w-full">Submit</Button>
//               </div>
//             </form>
//           </CardContent>
//         </CardHeader>
//       </Card>
//     </div>
//   );
// };


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

interface DoctorFormValues {
  mobile_no: string;
}

export const Doctor = () => {
  const { setUserData, setPatient, setDoctor, setServices } = useUserContext();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<DoctorFormValues>({
    defaultValues: {
      mobile_no: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (formData: DoctorFormValues) => {
      const authToken = window.localStorage.getItem("authToken") ?? "";
      const res = await fetch("https://vaccine-management-backend-7qp2.onrender.com/api/auth/doctor/", {
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
    onSuccess: async (token: string) => {
      window.localStorage.setItem("authToken", token);
      toast.success("Patient Account created successfully");
      try {
        const userData = await fetchUserData(token);
        setUserData(userData);

        const [patientsData, doctorsData] = await Promise.all([
          fetchPatientsData(token),
          fetchDoctorsData(token),
        ]);

        const patientData =
          patientsData.find((p) => p.user === userData.id) ?? null;
        const doctorData =
          doctorsData.find((d) => d.user === userData.id) ?? null;
        setPatient(patientData);
        setDoctor(doctorData);
        const service = await fetchServiceData();
        setServices(Array.isArray(service) ? service : [service]);

        if (doctorData?.id || patientData?.id) {
          router.push("/");
        } else {
          router.push("/userType");
        }
      } catch (error) {
        toast.error("Failed to fetch user data");
      }
      router.push("/");
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
                <Button type="submit" className="w-full">Submit</Button>
              </div>
            </form>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
};
