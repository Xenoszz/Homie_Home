import React, { useState, useEffect } from 'react';
import { Afacad } from "next/font/google";
import Image from "next/image";
import Logo from "/public/Group 40.png";
import { useRouter } from "next/router";

const afacadFont = Afacad({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-afacad", // ใช้ตัวแปร CSS เพื่อให้ใช้งานกับ Tailwind ได้
});

export default function Menubar({
  onLoginModalToggle,
  onSignupModalToggle
}) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setIsLoggedIn(true);
      setUsername(storedUser);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const enteredUsername = formData.get('username');
    const enteredPassword = formData.get('password');

    if (enteredUsername && enteredPassword) {
      localStorage.setItem("username", enteredUsername);
      setIsLoggedIn(true);
      setUsername(enteredUsername);
      setShowLoginModal(false);

      // Inform parent component about login
      if (onLoginModalToggle) {
        onLoginModalToggle(false);
      }
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const enteredUsername = formData.get('username');
    const enteredPassword = formData.get('password');
    const enteredEmail = formData.get('email');

    if (enteredUsername && enteredPassword && enteredEmail) {
      localStorage.setItem("username", enteredUsername);
      setIsLoggedIn(true);
      setUsername(enteredUsername);
      setShowSignupModal(false);

      // Inform parent component about signup
      if (onSignupModalToggle) {
        onSignupModalToggle(false);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setUsername('');
  };

  const handleProtectedRoute = (route) => {
    if (isLoggedIn) {
      router.push(route);
    } else {
      setShowLoginModal(true);

      // Inform parent component about login modal
      if (onLoginModalToggle) {
        onLoginModalToggle(true);
      }
    }
  };

  const toggleLoginModal = (show) => {
    setShowLoginModal(show);
    if (onLoginModalToggle) {
      onLoginModalToggle(show);
    }
  };

  const toggleSignupModal = (show) => {
    setShowSignupModal(show);
    if (onSignupModalToggle) {
      onSignupModalToggle(show);
    }
  };

  return (
    <div className={`${afacadFont.variable} font-afacad p-4`}>
      {/* Existing Menubar code remains the same */}
      <div className="flex justify-between border border-red-500">
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
          <div className="flex justify-around items-center m-2 w-[30%] bg-[#B59F78] rounded-[10px]">
            {isLoggedIn ? (
              <div className="flex items-center w-full justify-between px-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-white rounded-full mr-2"></div>
                  <span className="text-white font-bold">{username}</span>
                </div>
                <button onClick={handleLogout} className="text-white font-bold">Logout</button>
              </div>
            ) : (
              <div>
                <button onClick={() => toggleLoginModal(true)} className="font-bold text-[24pt] text-white">Login</button>
                <button onClick={() => toggleSignupModal(true)} className="font-bold text-[24pt] text-white ml-4">Sign Up</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg w-96 relative">
            <button onClick={() => toggleLoginModal(false)} className="absolute top-2 right-2 text-2xl">×</button>
            <h2 className="text-2xl mb-4">Login</h2>
            <form onSubmit={handleLogin}>
              <input type="text" name="username" placeholder="Username" className="w-full p-2 mb-4 border rounded" required />
              <input type="password" name="password" placeholder="Password" className="w-full p-2 mb-4 border rounded" required />
              <button type="submit" className="bg-[#2A3663] text-white px-4 py-2 rounded">Login</button>
            </form>
            <p className="mt-4 text-center">
              Don't have an account?{" "}
              <button
                onClick={() => {
                  toggleLoginModal(false);
                  toggleSignupModal(true);
                }}
                className="text-[#2A3663] font-bold"
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {showSignupModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg w-96 relative">
            <button onClick={() => toggleSignupModal(false)} className="absolute top-2 right-2 text-2xl">×</button>
            <h2 className="text-2xl mb-4">Sign Up</h2>
            <form onSubmit={handleSignup}>
              <input type="text" name="username" placeholder="Username" className="w-full p-2 mb-4 border rounded" required />
              <input type="password" name="password" placeholder="Password" className="w-full p-2 mb-4 border rounded" required />
              <input type="email" name="email" placeholder="Email" className="w-full p-2 mb-4 border rounded" required />
              <button type="submit" className="bg-[#2A3663] text-white px-4 py-2 rounded">Sign Up</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}