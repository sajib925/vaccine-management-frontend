import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import Link from "next/link";
import { Patient } from "./Patient";
import { Doctor } from "./Doctor";

export const UserType = () => {
  return (
    <div className="max-w-[600px] w-full mx-auto mt-10 px-5">
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
  );
};
