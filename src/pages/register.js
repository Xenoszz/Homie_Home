"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import Menubar from "@/components/Menubar";

export default function Login() {
  const [username, setUsername] = useState('');
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [error, seterror] = useState("");
  const [success, setSuccess] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    // Add login functionality here
    console.log('Login with:', { username, password });
  };

  return (
    <div className="h-[100vh] w-[100vw] border border-yellow-700">
    <Menubar />
      
      {/* Login form container */}
<div className="flex items-center p-20 justify-center  border-yellow-700">
  <div className="h-[70vh] bg-[#FAF6E3] rounded-[1rem] p-5 w-full max-w-[1200px] flex flex-col items-center justify-center">  
          {/* Login heading */}
          <h1 className="text-3xl font-bold mb-8">Register</h1>
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
        type="text"
        placeholder="Firstname"
        className="w-full border border-gray-300 rounded-md p-3 mb-6"
        value={firstname}
        onChange={(e) => setfirstname(e.target.value)}
        required
      />

    <input
        type="text"
        placeholder="LastName"
        className="w-full border border-gray-300 rounded-md p-3 mb-6"
        value={lastname}
        onChange={(e) => setlastname(e.target.value)}
        required
      />


    <input
        type="Email"
        placeholder="Email"
        className="w-full border border-gray-300 rounded-md p-3 mb-6"
        value={email}
        onChange={(e) => setemail(e.target.value)}
        required
      />


    <input
        type="password"
        placeholder="Password"
        className="w-full border border-gray-300 rounded-md p-3 mb-6"
        value={password}
        onChange={(e) => setpassword(e.target.value)}
        required
      />
    <input
        type="password"
        placeholder="ConfirmPassword"
        className="w-full border border-gray-300 rounded-md p-3 mb-6"
        value={confirmpassword}
        onChange={(e) => setconfirmpassword(e.target.value)}
        required
      />
      
      <button
        type="submit"
        className="bg-[#233876] text-white px-6 py-2 rounded-md uppercase font-medium"
      >
        Register
      </button>
    </form>
  </div>
</div>
</div>
  );
}