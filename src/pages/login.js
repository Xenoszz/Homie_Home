"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from "next/navigation";
import Menubar from "@/components/Menubar";

export default function Login({ onClose, onSwitchToRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

      const data = await res.json();
      if (res.ok) {
        // setIsModalOpen(true); 
        const token = data.token; 
        console.log('Received token:', token);
        localStorage.setItem('token', token);
        window.location.reload();
        onClose();
        
        // await handleSendOtp(); 
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      console.log(error);
      setError("An error occurred during login.");
    }
  };

  // const handleSendOtp = async () => {
  //   try {
  //     const response = await fetch("http://localhost:8000/send-otp", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ email }),
  //     });
  //     const data = await response.json();
  //     setMessage(data.message || "OTP sent successfully.");
  //     setIsOtpSent(true);
  //   } catch (error) {
  //   console.log(error);
  //     setMessage("Error sending OTP.");
  //   }
  // };

  // const handleVerifyOtp = async () => {
  //   try {
  //     const response = await fetch("http://localhost:8000/verify-otp", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ email, otp, password }),
  //     });
  //     const data = await response.json();
  //     if (response.ok) {
  //       setMessage(data.message || "OTP verified successfully.");
  //       const token = data.token;
  //       console.log("Received token:", token);
  //       localStorage.setItem("token", token);
  //       setTimeout(() => {
  //           setIsModalOpen(false); 
  //         }, 2000);
  //         setTimeout(() => {
  //           router.push("/home"); 
  //         }, 2000);
        
  //     } else {
  //       setMessage(data.message || "Error verifying OTP."); 
  //     }
  //   } catch (error) {
  //     setMessage("Error verifying OTP.");
  //   }
  // };

  return (
    <div className="h-full w-full">
      <div className="flex items-center justify-center">
        <div className="bg-[#FAF6E3] rounded-[1rem] p-5 w-full flex flex-col items-center justify-center">  
          {/* Login heading */}
          <h1 className="text-3xl font-bold mb-8">Login</h1>
          <form onSubmit={handleSubmit} className="w-full max-w-[1000px] flex flex-col items-center">
            <input
              type="text"
              placeholder="UserName"
              className="w-full border border-gray-300 rounded-md p-3 mb-4"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            
            <input
              type="password"
              placeholder="Password"
              className="w-full border border-gray-300 rounded-md p-3 mb-6"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            
            <button
              type="submit"
              className="bg-[#233876] text-white px-6 py-2 rounded-md uppercase font-medium w-full"
            >
              LOGIN
            </button>

            <div className="mt-4 text-center">
              <span className="text-gray-600">Don't have an account? </span>      
              <button 
                type="button"
                onClick={onSwitchToRegister}
                className="text-[#233876] font-bold hover:underline"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
{/* ยังไมเสด */}
