import axios from 'axios';

export interface UserData {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

export interface Patient {
  id: number;
  user: number;
  mobile_no: string;
  nid: string;
  age: string;
  medical_info: string | null;
}

export interface Doctor {
  id: number;
  user: number;
  mobile_no: string;
}

type VaccineService = {
  id: number;
  name: string;
  description: string;
  image: string;
};
const API_URL = 'https://vaccine-management-backend-7qp2.onrender.com/api';

export const fetchServiceData = async () => {
  const response = await axios.get<VaccineService>(`${API_URL}/service/`);
  return response.data;
};

export const fetchUserData = async (token: string | null) => {
  const response = await axios.get<UserData>(`${API_URL}/auth/profile/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return response.data;
};

export const fetchPatientsData = async (token: string | null) => {
  const response = await axios.get<Patient[]>(`${API_URL}/auth/patient/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return response.data;
};

export const fetchDoctorsData = async (token: string | null) => {
  const response = await axios.get<Doctor[]>(`${API_URL}/auth/doctor/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return response.data;
};

export const logoutUser = async (token: string | null) => {
  const response = await fetch(`${API_URL}/auth/logout/`, {
    method: 'POST',
    headers: {
      'Authorization': `Token ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return response;
};
