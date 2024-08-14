"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
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

const postVaccineData = async (data: VaccineData) => {
    
    
  try {
    const token = window.localStorage && window.localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Authorization token not found");
    }
    
    const response = await axios.post(
      "https://vaccine-management-backend-7qp2.onrender.com/api/campaign/vaccine/",
      data,
      {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Token ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error posting vaccine data:", error);
    throw error;
  }
};

const updateVaccineData = async (id: number, data: VaccineData) => {
  try {
    const token =
      window.localStorage && window.localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Authorization token not found");
    }
    const response = await axios.put(
      `https://vaccine-management-backend-7qp2.onrender.com/api/campaign/${id}/`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Token ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating vaccine data:", error);
    throw error;
  }
};

const deleteVaccineData = async (id: number) => {
  try {
    const token =
      window.localStorage && window.localStorage.getItem("authToken");
    if (!token) {
      throw new Error("Authorization token not found");
    }
    await axios.delete(
      `https://vaccine-management-backend-7qp2.onrender.com/api/campaign/${id}/`,
      {
        headers: {
          'Authorization': `Token ${token}`,
        },
      }
    );
  } catch (error) {
    console.error("Error deleting vaccine data:", error);
    throw error;
  }
};

const Vaccines: React.FC = () => {
  const [vaccines, setVaccines] = useState<Vaccine[]>([]);
  const [modalClose, setModalClose] = useState(false)
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [formVaccine, setFormVaccine] = useState<VaccineData>({
    name: "",
    schedule: "",
  });

  const [updatingVaccine, setUpdatingVaccine] = useState<Vaccine | null>(null);
  
  useEffect(() => {
    const fetchVaccines = async () => {
      try {
        const token = window.localStorage && window.localStorage.getItem("authToken");
      
        
        const res = await axios.get<Vaccine[]>(
          "https://vaccine-management-backend-7qp2.onrender.com/api/campaign/vaccine/",
          {
            headers: {
              'Authorization': `Token ${token}`,
            },
          }
        );
        setVaccines(res.data);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchVaccines();
  }, []);

  const handleChangeVaccine = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormVaccine({ ...formVaccine, [name]: value });
  };

  const handleSubmitVaccine = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await postVaccineData(formVaccine);
      setVaccines([...vaccines, response]);
      setModalClose(false)
      toast.success("Vaccine created successfully");
    } catch (error) {
        toast.error("You are not doctor! So, you can not create and update vaccine");
    }
  };

  const handleDeleteVaccine = async (id: number) => {
    try {
      await deleteVaccineData(id);
      setVaccines(vaccines.filter((vaccine) => vaccine.id !== id));
      toast.success("Vaccine deleted successfully");
    } catch (error) {
        toast.error("You are not doctor! So, you can not delete vaccine");
    }
  };

  const handleUpdateVaccine = (vaccine: Vaccine) => {
    setFormVaccine({ name: vaccine.name, schedule: vaccine.schedule });
    setUpdatingVaccine(vaccine);
  };

  const handleSubmitUpdateVaccine = async (e: React.FormEvent) => {
    e.preventDefault();
    if (updatingVaccine) {
      try {
        const updatedVaccine = await updateVaccineData(
          updatingVaccine.id,
          formVaccine
        );
        setVaccines(
          vaccines.map((vaccine) =>
            vaccine.id === updatingVaccine.id ? updatedVaccine : vaccine
          )
        );
        toast.success("Vaccine updated successfully");
        setModalClose(false)
        setUpdatingVaccine(null);
      } catch (error) {
        toast.error("You are not doctor! So, you can not update and delete vaccine");
      }
    }
  };

  if (loading) return <p className="text-center text-green-800">Loading...</p>;
//   if (error) return <p className="text-center text-red-600">Error fetching data: {error}</p>;

  return (
    <div id="vaccines" className="max-w-[1200px] w-full mx-auto my-[80px] px-5">
      
      <div className="flex items-center justify-between pb-4 border-b my-6">
        <h2 className="scroll-m-20 pb-2 text-3xl font-bold tracking-tight first:mt-0">
            All Vaccines
        </h2>
        <AlertDialog onOpenChange={setModalClose} open={modalClose}>
          <AlertDialogTrigger asChild>
            <Button>Add Vaccine</Button>
            
          </AlertDialogTrigger>
          <AlertDialogOverlay />
          <AlertDialogContent>
            <form onSubmit={handleSubmitVaccine}>
              <div className="pb-5">
                <Label className="mb-3">Add Vaccine:</Label>
                <Input
                  name="name"
                  onChange={handleChangeVaccine}
                  required
                  placeholder="Vaccine Name"
                />
                </div>
                <div className="pb-5">
                <Label className="mb-3">Add Schedule:</Label>
                <Input
                  name="schedule"
                  onChange={handleChangeVaccine}
                  required
                  placeholder="Vaccine Schedule"
                />
              </div>
              <Button type="submit">Add</Button>
            </form>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
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
                <td className="px-6 text-left py-4 whitespace-nowrap">{vaccine.name}</td>
                <td className="px-6 text-center py-4 whitespace-nowrap">
                  {vaccine.schedule}
                </td>
                <td className="px-6 text-right py-4 whitespace-nowrap">
                  <AlertDialog onOpenChange={setModalClose} open={modalClose}>
                    <AlertDialogTrigger asChild>
                      <Button onClick={() => handleUpdateVaccine(vaccine)}>
                        Update
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogOverlay />
                    <AlertDialogContent>
                      <form onSubmit={handleSubmitUpdateVaccine}>
                        <div className="pb-5">
                          <Label className="pb-4">Update Vaccine:</Label>
                          <Input
                            name="name"
                            value={formVaccine.name}
                            onChange={handleChangeVaccine}
                            required
                            placeholder="Vaccine Name"
                          />
                          <Label className="pb-4">Update Schedule:</Label>
                          <Input
                            name="schedule"
                            value={formVaccine.schedule}
                            onChange={handleChangeVaccine}
                            required
                            placeholder="Vaccine Schedule"
                          />
                        </div>
                        <Button type="submit">Update</Button>
                      </form>
                      <AlertDialogFooter>
                        <AlertDialogCancel
                          onClick={() => setUpdatingVaccine(null)}
                        >
                          Cancel
                        </AlertDialogCancel>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  <Button
                    onClick={() => handleDeleteVaccine(vaccine.id)}
                    className="ml-2"
                  >
                    Delete
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
