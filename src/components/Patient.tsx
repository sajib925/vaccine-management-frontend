// "use client";
// import { useEffect, useState } from "react";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "./ui/card";
// import { Label } from "./ui/label";
// import { Input } from "./ui/input";
// import { Button } from "./ui/button";
// import { Textarea } from "./ui/textarea";

// interface Patient {
//   mobile_no: string;
//   nid: string;
//   age: string;
//   medical_info: string;
// }

// export const Patient = () => {
//   const router = useRouter();
//   const [formData, setFormData] = useState<Patient>({
//     mobile_no: "",
//     nid: "",
//     age: "",
//     medical_info: "",
//   });
//   const [authToken , setAuthToken] = useState<string>('')

//   useEffect(() => {
//       if(window !== undefined){
//           setAuthToken(window.localStorage.getItem("authToken")??'')
//       }
//   },[])

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const res = await fetch("https://vaccine-management-backend-7qp2.onrender.com/api/auth/patient/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         'Authorization': `Token ${authToken}`,
//       },
//       body: JSON.stringify(formData),
//     });

//     if (res.ok) {
//       toast.success("Patient Account created successfully");
//       router.push("/");
//     } else {
//       const errorData = await res.json();
//       console.error(errorData);
//       toast.error("Error creating Patient Account");
//     }
//   };

//   return (
//     <div className="max-w-[1000px] w-full mx-auto">
//       <Card>
//         <CardHeader>
//           <CardTitle className="text-center text-xl">Create Patient Account</CardTitle>
//           <CardContent>
//             <form onSubmit={handleSubmit}>
//               <div className="pb-5 flex flex-col gap-3">
//                 <Label className="text-base">Age:</Label>
//                 <Input
//                   type="text"
//                   name="age"
//                   onChange={handleChange}
//                   required
//                   placeholder="Age"
//                 />
//               </div>
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
//               <div className="pb-5 flex flex-col gap-3">
//                 <Label className="text-base">NID:</Label>
//                 <Input
//                   type="text"
//                   name="nid"
//                   onChange={handleChange}
//                   required
//                   placeholder="NID"
//                 />
//               </div>
//               <div className="pb-5 flex flex-col gap-3">
//                 <Label className="text-base">Mobile No.:</Label>
//                 <Input
//                   type="text"
//                   name="last_name"
//                   onChange={handleChange}
//                   required
//                   placeholder="Mobile No."
//                 />
//               </div>
//               <div className="pb-5 flex flex-col gap-3">
//                 <Label className="text-base">Medical Info:</Label>
//                 <Textarea
//                   name="medical_info"
//                   onChange={handleChange}
//                   required
//                   placeholder="Medical Info"
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
// }

"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import {
  fetchDoctorsData,
  fetchPatientsData,
  fetchServiceData,
  fetchUserData,
} from "@/logic/apiService";
import { useUserContext } from "@/context/userContext";

interface PatientFormValues {
  mobile_no: string;
  nid: string;
  age: string;
  medical_info: string;
}



export const Patient = () => {
  const { setUserData, setPatient, setDoctor, setServices } = useUserContext();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PatientFormValues>({
    defaultValues: {
      mobile_no: "",
      nid: "",
      age: "",
      medical_info: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (formData: PatientFormValues) => {
      const authToken = window.localStorage.getItem("authToken") ?? "";
      const res = await fetch(
        "https://vaccine-management-backend-7qp2.onrender.com/api/auth/patient/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${authToken}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || "Error creating Patient Account");
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
      toast.error(error.message || "Error creating Patient Account");
    },
  });

  const onSubmit: SubmitHandler<PatientFormValues> = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="max-w-[1000px] w-full mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-xl">
            Create Patient Account
          </CardTitle>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="pb-5 flex flex-col gap-3">
                <Label className="text-base">Age:</Label>
                <Input
                  type="text"
                  {...register("age", { required: "Age is required" })}
                  placeholder="Age"
                />
                {errors.age && <span>{errors.age.message}</span>}
              </div>
              <div className="pb-5 flex flex-col gap-3">
                <Label className="text-base">Mobile No.:</Label>
                <Input
                  type="text"
                  {...register("mobile_no", {
                    required: "Mobile No. is required",
                  })}
                  placeholder="Mobile No."
                />
                {errors.mobile_no && <span>{errors.mobile_no.message}</span>}
              </div>
              <div className="pb-5 flex flex-col gap-3">
                <Label className="text-base">NID:</Label>
                <Input
                  type="text"
                  {...register("nid", { required: "NID is required" })}
                  placeholder="NID"
                />
                {errors.nid && <span>{errors.nid.message}</span>}
              </div>
              <div className="pb-5 flex flex-col gap-3">
                <Label className="text-base">Medical Info:</Label>
                <Textarea
                  {...register("medical_info", {
                    required: "Medical Info is required",
                  })}
                  placeholder="Medical Info"
                />
                {errors.medical_info && (
                  <span>{errors.medical_info.message}</span>
                )}
              </div>
              <div className="flex justify-end">
                <Button type="submit" className="w-full">
                  Submit
                </Button>
              </div>
            </form>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
};
