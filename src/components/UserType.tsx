import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import Link from "next/link";
import { Patient } from "./Patient";
import { Doctor } from "./Doctor";
import Image from "next/image";

export const UserType = () => {
  return (
    <div className="max-w-screen-xl h-screen w-full mx-auto mb-10 mt-20 lg:mt-32 lg:mb-20 px-5">
      <div className="grid items-center grid-cols-1 lg:grid-cols-2 gap-6">
        <Image src={"/image/users.jpg"} width={600} height={500} alt="login" />
    <div className="">
      <h1 className="text-2xl font-semibold pb-3">What type of account do you need?</h1>
      <Tabs defaultValue="patient" className="w-full">
        <TabsList className="flex items-center justify-center">
          <TabsTrigger value="patient">Patient</TabsTrigger>
          <TabsTrigger value="doctor">Doctor</TabsTrigger>
        </TabsList>
        <TabsContent value="patient">
          <Patient />
        </TabsContent>
        <TabsContent value="doctor">
          <Doctor />
        </TabsContent>
        <Button className="w-full my-6" asChild>
          <Link href={"/"} className="w-full">Skip</Link>
        </Button>
      </Tabs>
    </div>
    </div>
    </div>
  );
};
