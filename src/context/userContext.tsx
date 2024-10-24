"use client";
import { useContext, useState, createContext } from "react";

interface Patient {
  id: number;
  user: number;
  image: string;
  mobile_no: string;
  nid: string;
  age: string;
  medical_info: string | null;
}

interface Doctor {
  id: number;
  user: number;
  image: string;
  mobile_no: string;
}

interface UserData {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

type VaccineService = {
  id: number;
  name: string;
  description: string;
  image: string;
};
interface Campaign {
  id: number;
  name: string;
  image: string;
  description: string;
}
interface Review {
  id: number;
  patient_first_name: string;
  patient_last_name: string;
  patient_username: string;
  campaign_name: string;
  comment: string;
}

type ContextProps ={
  userData: UserData;
  patient: Patient| null;
  doctor: Doctor | null;
  allPatient: Patient[];
  allDoctor: Doctor[];
  services: VaccineService[];
  campaigns: Campaign[];
  review: Review[];
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  setPatient: React.Dispatch<React.SetStateAction<Patient | null>>;
  setDoctor: React.Dispatch<React.SetStateAction<Doctor | null>>;
  setAllPatient: React.Dispatch<React.SetStateAction<Patient[]>>;
  setAllDoctor: React.Dispatch<React.SetStateAction<Doctor[]>>;
  setServices: React.Dispatch<React.SetStateAction<VaccineService[]>>;
  setCampaigns:React.Dispatch<React.SetStateAction<Campaign[]>>;
  setReview:React.Dispatch<React.SetStateAction<Review[]>>;
}

const UserContext = createContext<ContextProps | undefined>(undefined);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};

const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<UserData>({
    id: 0,
    email: '',
    first_name: '',
    last_name: '',
  });
  const [patient, setPatient] = useState<Patient | null>(null);
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [allPatient, setAllPatient] = useState<Patient[]>([]);
  const [allDoctor, setAllDoctor] = useState<Doctor[]>([]);
  const [services, setServices] = useState<VaccineService[]>([]);
  const [campaigns, setCampaigns] = useState<VaccineService[]>([]);
  const [review, setReview] = useState<Review[]>([]);

  return (
    <UserContext.Provider value={{ userData, setUserData, patient, doctor, allPatient, allDoctor, services, campaigns, review, setPatient, setDoctor, setAllPatient, setAllDoctor, setServices, setCampaigns, setReview }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider };


