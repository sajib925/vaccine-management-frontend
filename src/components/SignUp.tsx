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
import Image from "next/image";

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
    <div className="max-w-screen-xl w-full mx-auto my-10 lg:my-20 px-5">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
      <Image src={"/image/signup.svg"} width={400} height={600} alt="login" />
      <Card>
        <CardHeader className="pb-1">
          <CardTitle className="text-center">Register</CardTitle>
          <CardContent className="pb-0">
            <form onSubmit={handleSubmit}>
              <div className="pb-5 flex flex-col gap-4">
                <Label className="">Username:</Label>
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
                <Label className="">First Name:</Label>
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
                <Label className="">Last Name:</Label>
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
                <Label className="">Email:</Label>
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
                <Label className="">Password:</Label>
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
                <Label className="">Confirm Password:</Label>
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
                <Button type="submit" className="w-full">Register</Button>
              </div>
             
            </form>
          </CardContent>
        </CardHeader>
        <CardFooter className="flex items-center justify-center gap-2 pt-0">
          <p className="">{`Already have an account?`}</p>
            <Link href="/signIn" className="text-blue-900 font-semibold hover:underline hover:text-black transition-all ease-in-out">Login Now</Link>
        </CardFooter>
      </Card>
    </div>
    </div>
  );
};

export default RegisterForm;
