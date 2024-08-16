"use client";
import axios from "axios";
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { Card } from "./ui/card";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
  AlertDialogOverlay,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { toast } from "sonner";

interface VaccineData {
  name: string;
  schedule: string;
}

interface Vaccine extends VaccineData {
  id: number;
  doctor_username: string;
}

const fetchVaccines = async () => {
  const token = window.localStorage.getItem("authToken");
  if (!token) {
    throw new Error("Authorization token not found");
  }
  const response = await axios.get<Vaccine[]>(
    "https://vaccine-management-backend-7qp2.onrender.com/api/campaign/vaccine/",
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
  return response.data;
};

const postVaccineData = async (data: VaccineData) => {
  const token = window.localStorage.getItem("authToken");
  if (!token) {
    throw new Error("Authorization token not found");
  }
  const response = await axios.post(
    "https://vaccine-management-backend-7qp2.onrender.com/api/campaign/vaccine/",
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    }
  );
  return response.data;
};

const updateVaccineData = async (id: number, data: VaccineData) => {
  const token = window.localStorage.getItem("authToken");
  if (!token) {
    throw new Error("Authorization token not found");
  }
  const response = await axios.put(
    `https://vaccine-management-backend-7qp2.onrender.com/api/campaign/${id}/`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    }
  );
  return response.data;
};

const deleteVaccineData = async (id: number) => {
  const token = window.localStorage.getItem("authToken");
  if (!token) {
    throw new Error("Authorization token not found");
  }
  await axios.delete(
    `https://vaccine-management-backend-7qp2.onrender.com/api/campaign/${id}/`,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
};

const Vaccines: React.FC = () => {
  const queryClient = useQueryClient();
  const {
    data: vaccines = [],
    isLoading,
    isError,
    error,
  } = useQuery("vaccines", fetchVaccines);

  const { register, handleSubmit, setValue, reset } = useForm<VaccineData>();
  const [updatingVaccine, setUpdatingVaccine] = useState<Vaccine | null>(null);
  const [modalCloseAdd, setModalCloseAdd] = useState(false);
  const [modalClose, setModalClose] = useState(false);

  const addVaccineMutation = useMutation(postVaccineData, {
    onSuccess: () => {
      queryClient.invalidateQueries("vaccines");
      toast.success("Vaccine created successfully");
      setModalCloseAdd(false);
      reset();
    },
    onError: (error: any) => {
      if (axios.isAxiosError(error) && error.response) {
        const responseData = error.response.data;
        const errorMessage = Object.values(responseData).flat().join(" ");
        toast.error(errorMessage);
      } else {
        toast.error("Something went wrong");
      }
    },
  });

  const updateVaccineMutation = useMutation(
    (data: { id: number; vaccineData: VaccineData }) =>
      updateVaccineData(data.id, data.vaccineData),
    {
      onSuccess: () => {
        queryClient.refetchQueries("vaccines");
        toast.success("Vaccine updated successfully");
        setModalClose(false);
        reset();
        setUpdatingVaccine(null);
      },
      onError: (error: any) => {
        if (axios.isAxiosError(error) && error.response) {
          const responseData = error.response.data;
          const errorMessage = Object.values(responseData).flat().join(" ");
          toast.error(errorMessage);
        } else {
          toast.error("Something went wrong");
        }
      },
    }
  );
  
  const deleteVaccineMutation = useMutation(deleteVaccineData, {
    onSuccess: () => {
      queryClient.invalidateQueries("vaccines");
      toast.success("Vaccine deleted successfully");
    },
    onError: (error: any) => {
      if (axios.isAxiosError(error) && error.response) {
        const responseData = error.response.data;
        const errorMessage = Object.values(responseData).flat().join(" ");
        toast.error(errorMessage);
      } else {
        toast.error("Something went wrong");
      }
    },
  });

  const onSubmit: SubmitHandler<VaccineData> = (data) => {
    addVaccineMutation.mutate(data);
  };

  const handleUpdate = (vaccine: Vaccine) => {
    setValue("name", vaccine.name);
    setValue("schedule", vaccine.schedule);
    setUpdatingVaccine(vaccine);
    setModalClose(true);
  };

  const onSubmitUpdate: SubmitHandler<VaccineData> = (data) => {
    if (updatingVaccine) {
      updateVaccineMutation.mutate({
        id: updatingVaccine.id,
        vaccineData: data,
      });
    }
  };

  if (isLoading)
    return <p className="text-center text-green-800">Loading...</p>;
  if (isError)
    return (
      <p className="text-center text-red-600">
        Error fetching data:{" "}
        {error instanceof Error ? error.message : "Unknown error"}
      </p>
    );

  return (
    <div
      id="vaccines"
      className="max-w-screen-xl w-full mx-auto my-[80px] px-5"
    >
      <div className="flex items-center justify-center md:justify-between flex-wrap pb-4 gap-3 my-6">
        <div className="">
          <span className="text-sm text-gray-500 font-medium text-center md:text-start block mb-2">
            VACCINES
          </span>
          <h2 className="scroll-m-20 text-center md:text-start justify-center md:justify-between text-3xl font-bold">
            Explore All Available Vaccines
          </h2>
        </div>
        <AlertDialog onOpenChange={setModalCloseAdd} open={modalCloseAdd}>
          <AlertDialogTrigger asChild>
            <span className="text-center py-3 w-full md:w-auto md:px-8 font-semibold rounded-sm bg-slate-900 border border-slate-900 text-white hover:text-slate-900 hover:bg-white transition-all ease-in-out cursor-pointer">
              Add Vaccine
            </span>
          </AlertDialogTrigger>
          <AlertDialogOverlay />
          <AlertDialogContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="pb-5 flex flex-col gap-3">
                <Label>Add Vaccine:</Label>
                <Input
                  {...register("name", { required: true })}
                  placeholder="Vaccine Name"
                />
              </div>
              <div className="pb-5 flex flex-col gap-3">
                <Label>Add Schedule:</Label>
                <Input
                  {...register("schedule", { required: true })}
                  placeholder="2024-09-03"
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={addVaccineMutation.isLoading}
              >
                {addVaccineMutation.isLoading ? "Adding.." : "Add"}
              </Button>
            </form>
            <AlertDialogFooter>
              <AlertDialogCancel className="w-full">Cancel</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <Card className="w-full overflow-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="pl-10 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Schedule
              </th>
              <th className="pr-20 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {vaccines.map((vaccine) => (
              <tr key={vaccine.id}>
                <td className="px-6 text-left py-4 whitespace-nowrap">
                  {vaccine.name}
                </td>
                <td className="px-6 text-center py-4 whitespace-nowrap">
                  {vaccine.schedule}
                </td>
                <td className="px-6 text-right py-4 whitespace-nowrap flex justify-end gap-2">
                  <AlertDialog onOpenChange={setModalClose} open={modalClose}>
                    <AlertDialogTrigger asChild>
                      <Button onClick={() => handleUpdate(vaccine)}>
                        Update
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogOverlay />
                    <AlertDialogContent>
                      <form onSubmit={handleSubmit(onSubmitUpdate)}>
                        <div className="pb-5 flex flex-col gap-3">
                          <Label>Update Vaccine:</Label>
                          <Input
                            {...register("name", { required: true })}
                            placeholder="Vaccine Name"
                            defaultValue={vaccine.name}
                          />
                        </div>
                        <div className="pb-5 flex flex-col gap-3">
                          <Label>Update Schedule:</Label>
                          <Input
                            {...register("schedule", { required: true })}
                            placeholder="2024-09-03"
                            defaultValue={vaccine.schedule}
                          />
                        </div>
                        <Button
                          type="submit"
                          className="w-full"
                          disabled={updateVaccineMutation.isLoading}
                        >
                          {updateVaccineMutation.isLoading
                            ? "Updating"
                            : "Update"}
                        </Button>
                      </form>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="w-full">
                          Cancel
                        </AlertDialogCancel>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  <Button
                    onClick={() => deleteVaccineMutation.mutate(vaccine.id)}
                    className="bg-red-500 hover:bg-red-700"
                  >
                    {deleteVaccineMutation.isLoading ? "Deleting" : "Delete"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default Vaccines;
