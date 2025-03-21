"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import Menubar from "@/components/Menubar";

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
  <div className="h-[50vh] bg-[#FAF6E3] rounded-[1rem] p-5 w-full max-w-[1200px] flex flex-col items-center justify-center">  
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
        className="bg-[#233876] text-white px-6 py-2 rounded-md uppercase font-medium"
      >
        LOGIN
      </button>
    </form>
  </div>
</div>
</div>
  );
}
{/* ยังไมเสด */}
