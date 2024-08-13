


"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";


interface Patient {
  mobile_no: string;
  nid: string;
  age: string;
  medical_info: string;
}

export const Patient = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<Patient>({
    mobile_no: "",
    nid: "",
    age: "",
    medical_info: "",
  });
  const [authToken , setAuthToken] = useState<string>('')
  
  useEffect(() => {
      if(window !== undefined){
          setAuthToken(window.localStorage.getItem("authToken")??'')
      }
  },[])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("https://vaccine-management-backend-7qp2.onrender.com/api/auth/patient/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Token ${authToken}`,
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      toast.success("Patient Account created successfully");
      router.push("/");
    } else {
      const errorData = await res.json();
      console.error(errorData);
      toast.error("Error creating Patient Account");
    }
  };



  return (
    <div className="max-w-[1000px] w-full mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-xl">Create Patient Account</CardTitle>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="pb-5 flex flex-col gap-3">
                <Label className="text-base">Age:</Label>
                <Input
                  type="text"
                  name="age"
                  onChange={handleChange}
                  required
                  placeholder="Age"
                />
              </div>
              <div className="pb-5 flex flex-col gap-3">
                <Label className="text-base">Mobile No.:</Label>
                <Input
                  type="text"
                  name="mobile_no"
                  onChange={handleChange}
                  required
                  placeholder="Mobile No."
                />
              </div>
              <div className="pb-5 flex flex-col gap-3">
                <Label className="text-base">NID:</Label>
                <Input
                  type="text"
                  name="nid"
                  onChange={handleChange}
                  required
                  placeholder="NID"
                />
              </div>
              <div className="pb-5 flex flex-col gap-3">
                <Label className="text-base">Mobile No.:</Label>
                <Input
                  type="text"
                  name="last_name"
                  onChange={handleChange}
                  required
                  placeholder="Mobile No."
                />
              </div>
              <div className="pb-5 flex flex-col gap-3">
                <Label className="text-base">Medical Info:</Label>
                <Textarea
                  name="medical_info"
                  onChange={handleChange}
                  required
                  placeholder="Medical Info"
                />
              </div>
              <div className="flex justify-end">
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
}
