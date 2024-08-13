// "use client"
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';
// import { toast } from 'sonner';
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
// import { Label } from './ui/label';
// import { Input } from './ui/input';
// import { Button } from './ui/button';
// import Image from "next/image";
// import {
//   AlertDialog, AlertDialogAction, AlertDialogCancel,
//   AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger
// } from "@/components/ui/alert-dialog";

// interface UserData {
//   email: string;
//   first_name: string;
//   last_name: string;
// }
// interface Patient {
//     id: number;
//     user: number;
//     mobile_no: string;
//     nid: string;
//     age: string;
//     medical_info: string | null;
// }
// interface UserPass {
//   new_password: string;
//   confirm_password: string;
//   old_password: string;
// }



// const UserProfile: React.FC = () => {
//   const [userData, setUserData] = useState<UserData>({
//     email: '',
//     first_name: '',
//     last_name: '',
//   });
//   const [allPatient, setAllPatient] = useState([])
//   const [allDoctor, setAllDoctor] = useState([])
//   const [doctor, setDoctor] = useState({})
//   const [patient, setPatient] = useState<Patient>({
//     id: 0,                
//     user: 0,              
//     mobile_no: '',       
//     nid: '',              
//     age: '',             
//     medical_info: ''    
// });
//   const [passwordData, setPasswordData] = useState<UserPass>({
//     new_password: '',
//     confirm_password: '',
//     old_password: '',
//   });

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const router = useRouter();
//   console.log(allDoctor)
//   console.log(doctor)

//   useEffect(() => {
//     const token = localStorage.getItem("authToken");
   
//     const fetchUserData = async () => {
//       try {
//         const response = await axios.get('http://127.0.0.1:8000/api/auth/profile/', {
//           headers: {
//             Authorization: `Token ${token}`,
//           },
//         });
//         setUserData(response.data);
//       } catch (error) {
//         setError('Error fetching user data');
//       } finally {
//         setLoading(false);
//       }
//     };
//     const fetchPatientsData = async () => {
//         try {
//           const response = await axios.get('http://127.0.0.1:8000/api/auth/patient/', {
//             headers: {
//               Authorization: `Token ${token}`,
//             },
//           });
//           setAllPatient(response.data);
//         } catch (error) {
//           setError('Error fetching user data');
//         } finally {
//           setLoading(false);
//         }
//       };
//       const fetchDoctorsData = async () => {
//         try {
//           const response = await axios.get('http://127.0.0.1:8000/api/auth/doctor/', {
//             headers: {
//               Authorization: `Token ${token}`,
//             },
//           });
//           setAllDoctor(response.data);
//         } catch (error) {
//           setError('Error fetching user data');
//         } finally {
//           setLoading(false);
//         }
//       };
//     fetchDoctorsData()
//     fetchPatientsData()
//     fetchUserData();
//   }, []);
  
//   useEffect(()=>{

//     if (allPatient.length > 0) {
//         const patientData= allPatient.find((item)=>item.user === userData.id)
//         setPatient(patientData)
//     }
//     if (allDoctor.length > 0) {
//         const doctorData= allDoctor.find((item)=>item.user === userData.id)
//         setDoctor(doctorData)
//     }




//   },[allPatient])

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setUserData({ ...userData, [name]: value });
//   };

//   const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setPasswordData({ ...passwordData, [name]: value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const token = window.localStorage.getItem("authToken");

//     try {
//       const response = await axios.patch('http://127.0.0.1:8000/api/auth/profile/', userData, {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Token ${token}`,
//         },
//       });
//       toast.success('User data updated successfully');
//     } catch (error) {
//       toast.error('Something Went Wrong');
//     }
//   };

//   const updatePasswordSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const token = window.localStorage.getItem("authToken");

//     try {
//       const response = await axios.put('http://127.0.0.1:8000/api/auth/password/', passwordData, {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Token ${token}`,
//         },
//       });
//       toast.success('Password updated successfully');
//     } catch (error) {
//       toast.error('Something Went Wrong');
//     }
//   };

//   const name = `${userData.first_name} ${userData.last_name}`;

//   if (loading) return <p className="text-center text-green-800">Loading...</p>;
//   if (error) return <p className="text-center text-red-600">Error fetching data: {error}</p>;

//   return (
//       <div className="max-w-[600px] w-full mx-auto mt-20 px-5">
//         <h3 className='py-3 mb-5 text-3xl font-bold text-center'>Hello {name}! Welcome to your Profile</h3>

//         <Card>
//           <div className="relative h-[150px] w-full rounded-t-sm bg-primary">
//             <Image
//                 className="absolute left-[50%] top-[0%] -translate-x-[50%] transform rounded-full"
//                 src={"/image/profile-picture.png"}
//                 alt={"avatar"}
//                 width={250}
//                 height={250}
//             />
//           </div>
//           <CardHeader className="px-0 pb-0 pt-20 text-center text-2xl font-bold">{name}</CardHeader>
//           <CardHeader className="px-0 pb-0 pt-3 text-center text-2xl font-bold">{userData.email}</CardHeader>
//           <CardDescription className="pt-2 text-center text-2xl font-semibold">{patient?.id && "Patient"}</CardDescription>
//           <CardDescription className="pt-2 text-center text-2xl font-semibold">{doctor?.id && "Doctor"}</CardDescription>
//           <CardFooter className="flex items-center justify-center gap-4 pt-4">
//             <AlertDialog>
//               <AlertDialogTrigger><Button>Update Profile</Button></AlertDialogTrigger>
//               <AlertDialogContent>
//                 <AlertDialogHeader>
//                   <AlertDialogTitle>Update Your Profile</AlertDialogTitle>
//                 </AlertDialogHeader>
//                 <form onSubmit={handleSubmit}>
//                   <div className="pb-5">
//                     <Label className="mb-4">Email:</Label>
//                     <Input
//                         type="email"
//                         id="email"
//                         name="email"
//                         value={userData.email}
//                         onChange={handleChange}
//                         required
//                     />
//                   </div>
//                   <div className="pb-5">
//                     <Label className="mb-4">First Name:</Label>
//                     <Input
//                         id="first_name"
//                         name="first_name"
//                         type="text"
//                         value={userData.first_name}
//                         onChange={handleChange}
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <Label className="mb-4">Last Name:</Label>
//                     <Input
//                         id="last_name"
//                         name="last_name"
//                         type="text"
//                         value={userData.last_name}
//                         onChange={handleChange}
//                     />
//                   </div>
//                   <Button type="submit">Update Profile</Button>
//                 </form>
//                 <AlertDialogFooter>
//                   <AlertDialogCancel>Cancel</AlertDialogCancel>
//                 </AlertDialogFooter>
//               </AlertDialogContent>
//             </AlertDialog>
//             <AlertDialog>
//               <AlertDialogTrigger><Button>Update Password</Button></AlertDialogTrigger>
//               <AlertDialogContent>
//                 <AlertDialogHeader>
//                   <AlertDialogTitle>Update Your Password</AlertDialogTitle>
//                 </AlertDialogHeader>
//                 <form onSubmit={updatePasswordSubmit}>
//                   <div className="pb-5">
//                     <Label className="mb-4">New Password:</Label>
//                     <Input
//                         type="password"
//                         id="new_password"
//                         name="new_password"
//                         value={passwordData.new_password}
//                         onChange={handlePasswordChange}
//                         placeholder="New Password"
//                         required
//                     />
//                   </div>
//                   <div className="pb-5">
//                     <Label className="mb-4">Confirm New Password:</Label>
//                     <Input
//                         type="password"
//                         id="confirm_password"
//                         name="confirm_password"
//                         value={passwordData.confirm_password}
//                         onChange={handlePasswordChange}
//                         placeholder="Confirm New Password"
//                         required
//                     />
//                   </div>
//                   <div className="pb-5">
//                     <Label className="mb-4">Confirm New Password:</Label>
//                     <Input
//                         type="password"
//                         id="old_password"
//                         name="old_password"
//                         value={passwordData.old_password}
//                         onChange={handlePasswordChange}
//                         placeholder="Confirm New Password"
//                         required
//                     />
//                   </div>
//                   <Button type="submit">Update Password</Button>
//                 </form>
//                 <AlertDialogFooter>
//                   <AlertDialogCancel>Cancel</AlertDialogCancel>
//                 </AlertDialogFooter>
//               </AlertDialogContent>
//             </AlertDialog>
//           </CardFooter>
//         </Card>
//       </div>
//   );
// };

// export default UserProfile;




"use client";
import React, {  useState, } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import Image from "next/image";
import {
  AlertDialog, AlertDialogCancel,
  AlertDialogContent, AlertDialogFooter,
  AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { useUserContext } from '@/context/userContext';
// import Bookings from './Booking';



interface UserPass {
  new_password: string;
  confirm_password: string;
  old_password: string;
}


const UserProfile: React.FC = () => {
  const { patient, doctor, userData, setUserData } = useUserContext();
  const [passwordData, setPasswordData] = useState<UserPass>({
    new_password: '',
    confirm_password: '',
    old_password: '',
  });



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = window.localStorage.getItem("authToken");

    try {
      await axios.patch('http://127.0.0.1:8000/api/auth/profile/', userData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      });
      toast.success('User data updated successfully');
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  const updatePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = window.localStorage.getItem("authToken");

    try {
      await axios.put('http://127.0.0.1:8000/api/auth/password/', passwordData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      });
      toast.success('Password updated successfully');
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  const name = `${userData.first_name} ${userData.last_name}`;



  return (
    <div className="max-w-[600px] w-full mx-auto mt-20 px-5">
      <h3 className='py-3 mb-5 text-3xl font-bold text-center'>Hello {name}! Welcome to your Profile</h3>
      <Card>
        <div className="relative h-[150px] w-full rounded-t-sm bg-primary">
          <Image
              className="absolute left-[50%] top-[0%] -translate-x-[50%] transform rounded-full"
              src={"/image/profile-picture.png"}
              alt={"avatar"}
              width={250}
              height={250}
          />
        </div>
        <CardHeader className="px-0 pb-0 pt-20 text-center text-2xl font-bold">{name}</CardHeader>
        <CardHeader className="px-0 pb-0 pt-3 text-center text-2xl font-bold">{userData.email}</CardHeader>
        <CardDescription className="pt-2 text-center text-2xl font-semibold">{patient?.id && "Patient"}</CardDescription>
        <CardDescription className="pt-2 text-center text-2xl font-semibold">{doctor?.id && "Doctor"}</CardDescription>
        <CardFooter className="flex items-center justify-center gap-4 pt-4">
          <AlertDialog>
            <AlertDialogTrigger className='py-2 px-4 font-semibold rounded-sm bg-slate-900 border border-slate-900 text-white hover:text-slate-900 hover:bg-white transition-all ease-in-out'>Update Profile</AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Update Your Profile</AlertDialogTitle>
              </AlertDialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="pb-5">
                  <Label className="mb-4">Email:</Label>
                  <Input
                      type="email"
                      id="email"
                      name="email"
                      value={userData.email}
                      onChange={handleChange}
                      required
                  />
                </div>
                <div className="pb-5">
                  <Label className="mb-4">First Name:</Label>
                  <Input
                      id="first_name"
                      name="first_name"
                      type="text"
                      value={userData.first_name}
                      onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <Label className="mb-4">Last Name:</Label>
                  <Input
                      id="last_name"
                      name="last_name"
                      type="text"
                      value={userData.last_name}
                      onChange={handleChange}
                  />
                </div>
                <Button type="submit">Update Profile</Button>
              </form>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <AlertDialog>
            <AlertDialogTrigger className='py-2 px-4 font-semibold rounded-sm bg-slate-900 border border-slate-900 text-white hover:text-slate-900 hover:bg-white transition-all ease-in-out'>Update Password</AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Update Your Password</AlertDialogTitle>
              </AlertDialogHeader>
              <form onSubmit={updatePasswordSubmit}>
                <div className="pb-5">
                  <Label className="mb-4">New Password:</Label>
                  <Input
                      type="password"
                      id="new_password"
                      name="new_password"
                      value={passwordData.new_password}
                      onChange={handlePasswordChange}
                      placeholder="New Password"
                      required
                  />
                </div>
                <div className="pb-5">
                  <Label className="mb-4">Confirm New Password:</Label>
                  <Input
                      type="password"
                      id="confirm_password"
                      name="confirm_password"
                      value={passwordData.confirm_password}
                      onChange={handlePasswordChange}
                      placeholder="Confirm New Password"
                      required
                  />
                </div>
                <div className="pb-5">
                  <Label className="mb-4">Old Password:</Label>
                  <Input
                      type="password"
                      id="old_password"
                      name="old_password"
                      value={passwordData.old_password}
                      onChange={handlePasswordChange}
                      placeholder="Old Password"
                      required
                  />
                </div>
                <Button type="submit">Update Password</Button>
              </form>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </Card>
      {/* <Bookings /> */}
    </div>
  );
};

export default UserProfile;

