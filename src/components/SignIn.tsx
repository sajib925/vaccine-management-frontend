"use client";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "./ui/button";
import Link from "next/link";
import { useUserContext } from "@/context/userContext";

interface FormData {
  username: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const { doctor, patient } = useUserContext();
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const res = await axios.post(
        "https://vaccine-management-backend-7qp2.onrender.com/api/auth/login/",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.token) {
        window.localStorage.setItem("authToken", res.data.token);
        toast.success("Login successfully");

        if (doctor?.id || patient?.id) {
          router.push("/");
        } else {
          router.push("/userType");
        }
      } else {
        toast.error("Something Went Wrong");
      }
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };

  return (
    <div className="max-w-[600px] w-full mx-auto mt-20 px-5">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Login</CardTitle>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="pb-5 flex flex-col gap-3">
                <Label>Username:</Label>
                <Input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  placeholder="Username"
                />
              </div>
              <div className="pb-5 flex flex-col gap-3">
                <Label>Password:</Label>
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Password"
                />
              </div>
              <div className="flex items-center justify-end">
                <Button type="submit">Login</Button>
              </div>
            </form>
          </CardContent>
        </CardHeader>
        <CardFooter>
          <p className="mr-2">Account not created yet</p>
          <Button asChild>
            <Link href="/signUp">Sign Up</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginForm;
