"use client";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
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
import Link from "next/link";

interface FormData {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
}

const RegisterForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://vaccine-management-backend-7qp2.onrender.com/api/auth/register/",
        formData
      );
      toast.success("Account created successfully");
      router.push("/signIn");
    } catch (error: any) {
      if (error.response && error.response.data) {
        toast.error('Something went wrong');
      } 
    }
  };

  return (
    <div className="max-w-[1000px] w-full mx-auto mt-20 px-5">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Register</CardTitle>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="pb-5 flex flex-col gap-4">
                <Label className="mb-4">Username:</Label>
                <Input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  placeholder="Username"
                />
              </div>
              <div className="pb-5 flex flex-col gap-4">
                <Label className="mb-4">First Name:</Label>
                <Input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                  placeholder="First Name"
                />
              </div>
              <div className="pb-5 flex flex-col gap-4">
                <Label className="mb-4">Last Name:</Label>
                <Input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                  placeholder="Last Name"
                />
              </div>
              <div className="pb-5 flex flex-col gap-4">
                <Label className="mb-4">Email:</Label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Email"
                />
              </div>
              <div className="pb-5 flex flex-col gap-4">
                <Label className="mb-4">Password:</Label>
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Password"
                />
              </div>
              <div className="pb-5 flex flex-col gap-4">
                <Label className="pb-4">Confirm Password:</Label>
                <Input
                  type="password"
                  name="confirm_password"
                  value={formData.confirm_password}
                  onChange={handleChange}
                  required
                  placeholder="Confirm Password"
                />
              </div>
              <div className="flex items-center justify-end">
                <Button type="submit">Register</Button>
              </div>
             
            </form>
          </CardContent>
        </CardHeader>
        <CardFooter>
          <p className="mr-2">Already have an account</p>
          <Button asChild>
            <Link href="/signIn">Login</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegisterForm;
