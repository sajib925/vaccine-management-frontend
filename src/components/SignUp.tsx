"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";
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
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const mutation = useMutation(
    async (formData: FormData) => {
      const response = await axios.post(
        "https://vaccine-management-supebase.vercel.app/api/auth/register/",
        formData
      );
      return response.data;
    },
    {
      onSuccess: () => {
        toast.success("Account created successfully");
        router.push("/signIn");
      },
      onError: (error: AxiosError) => {
        if (error.response?.data) {
          const responseData = error.response.data;
          const errorMessage = Object.values(responseData)
            .flat() 
            .join(' '); 
          toast.error(errorMessage);
        } else {
          toast.error('Something went wrong');
        }
      },
    }
  );

  const onSubmit: SubmitHandler<FormData> = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="max-w-screen-xl w-full mx-auto my-32 lg:my-40 px-5">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
        <Image src={"/image/signup.svg"} width={400} height={600} alt="login" className="w-full" />
        <Card>
          <CardHeader className="pb-1">
            <CardTitle className="text-center">Register</CardTitle>
            <CardContent className="pb-0">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="pb-5 flex flex-col gap-4">
                  <Label>Username:</Label>
                  <Input
                    type="text"
                    {...register("username", { required: "Username is required" })}
                    placeholder="Username"
                  />
                  {errors.username && <p className="text-red-500">{errors.username.message}</p>}
                </div>
                <div className="pb-5 flex flex-col gap-4">
                  <Label>First Name:</Label>
                  <Input
                    type="text"
                    {...register("first_name", { required: "First name is required" })}
                    placeholder="First Name"
                  />
                  {errors.first_name && <p className="text-red-500">{errors.first_name.message}</p>}
                </div>
                <div className="pb-5 flex flex-col gap-4">
                  <Label>Last Name:</Label>
                  <Input
                    type="text"
                    {...register("last_name", { required: "Last name is required" })}
                    placeholder="Last Name"
                  />
                  {errors.last_name && <p className="text-red-500">{errors.last_name.message}</p>}
                </div>
                <div className="pb-5 flex flex-col gap-4">
                  <Label>Email:</Label>
                  <Input
                    type="email"
                    {...register("email", { required: "Email is required" })}
                    placeholder="Email"
                  />
                  {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                </div>
                <div className="pb-5 flex flex-col gap-4">
                  <Label>Password:</Label>
                  <Input
                    type="password"
                    {...register("password", { required: "Password is required" })}
                    placeholder="Password"
                  />
                  {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                </div>
                <div className="pb-5 flex flex-col gap-4">
                  <Label>Confirm Password:</Label>
                  <Input
                    type="password"
                    {...register("confirm_password", { 
                      required: "Please confirm your password", 
                      // validate: (value) => value === watch("password") || "Passwords do not match"
                    })}
                    placeholder="Confirm Password"
                  />
                  {errors.confirm_password && <p className="text-red-500">{errors.confirm_password.message}</p>}
                </div>
                <div className="flex items-center justify-end">
                  <Button type="submit" className="w-full" disabled={mutation.isLoading}>
                    {mutation.isLoading ? "Loading..." : "Register"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </CardHeader>
          <CardFooter className="flex items-center justify-center gap-2 pt-0">
            <p>{`Already have an account?`}</p>
            <Link href="/signIn" className="text-blue-900 font-semibold hover:underline hover:text-black transition-all ease-in-out">Login Now</Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default RegisterForm;
