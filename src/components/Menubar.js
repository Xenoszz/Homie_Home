import React, { useState, useEffect } from 'react';
import { Afacad } from "next/font/google";
import Image from "next/image";
import Logo from "/public/Group 40.png";
import { useRouter } from "next/router";
import { LogOut } from 'lucide-react';

const afacadFont = Afacad({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-afacad",
});

export default function Menubar({ 
  onLoginModalToggle, 
  onSignupModalToggle
}) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    setIsLoggedIn(!!token);
    setUsername(storedUsername || '');
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setUsername('');
    router.push('/Home');
  };

  const handleProtectedRoute = (route) => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push(route);
    } else {
      if (onLoginModalToggle) onLoginModalToggle(true);
    }
  };

  return (
    <div className={`${afacadFont.variable} font-afacad p-4`}>
      <div className="flex justify-between">
        <button onClick={() => router.push("/Home")} className="w-[10%] h-[10%]">
          <Image src={Logo} alt="Logo" />
        </button>
        <div className="flex justify-end w-[50%]">
          <div className="bg-[#2A3663] flex justify-around m-2 w-[70%] rounded-[10px]">
            <button onClick={() => handleProtectedRoute("/Organize")} className="flex items-center justify-center font-bold text-[24pt] w-[60%] transition-all duration-500 ease-in-out hover:bg-[#131b38] hover:rounded-l-[1rem]">
              <h1 className="text text-white">Organize</h1>
            </button>
            <button onClick={() => handleProtectedRoute("/Todolist")} className="flex items-center justify-center font-bold text-[24pt] w-[60%] transition-all duration-500 ease-in-out hover:bg-[#131b38]">
              <h1 className="text text-white">To-do List</h1>
            </button>
            <button onClick={() => handleProtectedRoute("/Ideas")} className="flex items-center justify-center font-bold text-[24pt] w-[60%] transition-all duration-500 ease-in-out hover:bg-[#131b38] hover:rounded-r-[1rem]">
              <h1 className="text text-white">Ideas</h1>
            </button>
          </div>
          {/* ปุ่ม Login/Sign Up หรือ User */}
          {isLoggedIn ? (
            <div className="flex justify-around items-center m-2 max-w-[30%] bg-[#B59F78] rounded-[10px]">
              <div className="flex items-center w-full justify-between px-4">
                <div className="flex items-center">
                  <span className="text-white font-bold text-[20pt] mr-4">{username}</span>
                </div>
                <button onClick={handleLogout} className="text-white font-bold">
                  <LogOut />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-around items-center m-2 w-[30%] bg-[#B59F78] rounded-[10px]">
              <button 
                onClick={() => onLoginModalToggle && onLoginModalToggle(true)} 
                className="font-bold text-[24pt] text-white"
              >
                Login
              </button>
              <button 
                onClick={() => onSignupModalToggle && onSignupModalToggle(true)} 
                className="font-bold text-[24pt] text-white ml-4"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}