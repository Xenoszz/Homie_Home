"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import Menubar from "@/components/Menubar";
import { useRouter } from 'next/navigation';

export default function Login({ onClose, onSwitchToRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


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
