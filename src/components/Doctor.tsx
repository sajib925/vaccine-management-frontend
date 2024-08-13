"use client";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface Doctor {
  mobile_no: string;
}

export const Doctor = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<Doctor>({
    mobile_no: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const token = window.localStorage && window.localStorage.getItem("authToken");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("http://127.0.0.1:8000/api/auth/doctor/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Token ${token}`,
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      toast.success("Doctor Account created successfully");
      router.push("/");
    } else {
      const errorData = await res.json();
      console.error(errorData);
      toast.error("Error creating Doctor Account");
    }
  };

  return (
    <div className="max-w-[1000px] w-full mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-xl">Create Doctor Account</CardTitle>
          <CardContent>
            <form onSubmit={handleSubmit}>
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
              <div className="flex justify-end">
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
};
