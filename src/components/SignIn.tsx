"use client";
import { useForm } from "react-hook-form";
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
import Image from "next/image";

import { useMutation } from "react-query";
import { fetchDoctorsData, fetchPatientsData, fetchServiceData, fetchUserData } from "@/logic/apiService";

interface FormData {
  username: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const { setUserData, setPatient, setDoctor, setServices } = useUserContext();
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const loginMutation = useMutation(
    async (formData: FormData) => {
      const res = await axios.post('https://vaccine-management-backend-7qp2.onrender.com/api/auth/login/', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return res.data.token;
    },
    {
      onSuccess: async (token) => {
        window.localStorage.setItem('authToken', token);
        toast.success('Login successfully');

        try {
          const userData = await fetchUserData(token);
          setUserData(userData);

          const [patientsData, doctorsData] = await Promise.all([
            fetchPatientsData(token),
            fetchDoctorsData(token),
          ]);

          const patientData = patientsData.find(p => p.user === userData.id) ?? null;
          const doctorData = doctorsData.find(d => d.user === userData.id) ?? null;
          setPatient(patientData);
          setDoctor(doctorData);
          const service = await fetchServiceData()
          setServices(Array.isArray(service) ? service : [service]);

          if (doctorData?.id || patientData?.id) {
            router.push('/');
          } else {
            router.push('/userType');
          }
        } catch (error) {
          toast.error('Failed to fetch user data');
        }
      },
      onError: () => {
        toast.error('Something went wrong');
      },
    }
  );

  const onSubmit = (formData: FormData) => {
    loginMutation.mutate(formData);
  };

  return (
    <div className="max-w-screen-xl w-full mx-auto my-10 lg:my-20 px-5">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-y-4 gap-x-20">
        <Image src={"/image/login.svg"} width={400} height={300} alt="login" />
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Login</CardTitle>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="pb-5 flex flex-col gap-3">
                  <Label>Username:</Label>
                  <Input
                    type="text"
                    {...register("username", { required: "Username is required" })}
                    placeholder="Username"
                  />
                  {errors.username && <p className="text-red-500">{errors.username.message}</p>}
                </div>
                <div className="pb-5 flex flex-col gap-3">
                  <Label>Password:</Label>
                  <Input
                    type="password"
                    {...register("password", { required: "Password is required" })}
                    placeholder="Password"
                  />
                  {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                </div>
                <Button type="submit" className="w-full">Login</Button>
              </form>
            </CardContent>
          </CardHeader>
          <CardFooter className="flex items-center justify-center gap-2">
            <p className="">{`Don't have an account?`}</p>
            <Link href="/signUp" className="text-blue-900 font-semibold hover:underline hover:text-black transition-all ease-in-out cursor-pointer">Register Now</Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;
