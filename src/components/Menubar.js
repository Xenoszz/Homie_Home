import React, { useState, useEffect } from 'react';
import { Afacad } from "next/font/google";
import Image from "next/image";
import Logo from "/public/Group 40.png";
import { useRouter } from "next/router";
import LoginModal from './Loginpopup';
import SignupModal from './Signuppopup';

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
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    
    if (storedToken) {
      fetch('http://localhost:8000/check-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: storedToken }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === 'Token is valid') {
            setIsLoggedIn(true);
            setUsername(data.user?.username || storedUsername || '');
          } else {
            setIsLoggedIn(false);
            setUsername('');
          }
        })
        .catch((error) => {
          setIsLoggedIn(false);
          setUsername('');
          console.error('Error:', error);
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setUsername('');
    router.push('/Home');
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

  const handleSuccessfulLogin = (username, token) => {
    setIsLoggedIn(true);
    setUsername(username);
    setShowLoginModal(false);
    
    // Inform parent component about login modal closing
    if (onLoginModalToggle) {
      onLoginModalToggle(false);
    }
  };

  const handleSuccessfulSignup = (username, token) => {
    setIsLoggedIn(true);
    setUsername(username);
    setShowSignupModal(false);
    
    // Inform parent component about signup modal closing
    if (onSignupModalToggle) {
      onSignupModalToggle(false);
    }
  };

  const toggleLoginModal = (show) => {
    setShowLoginModal(show);
    setShowSignupModal(false);
    
    // Inform parent component about login modal
    if (onLoginModalToggle) {
      onLoginModalToggle(show);
    }
  };

  const toggleSignupModal = (show) => {
    setShowSignupModal(show);
    setShowLoginModal(false);
    
    // Inform parent component about signup modal
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

      {/* Login Modal Component */}
      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => toggleLoginModal(false)}
        onSwitchToSignup={() => {
          toggleLoginModal(false);
          toggleSignupModal(true);
        }}
        onSuccessfulLogin={handleSuccessfulLogin}
      />

      {/* Signup Modal Component */}
      <SignupModal 
        isOpen={showSignupModal}
        onClose={() => toggleSignupModal(false)}
        onSwitchToLogin={() => {
          toggleSignupModal(false);
          toggleLoginModal(true);
        }}
        onSuccessfulSignup={handleSuccessfulSignup}
      />
    </div>
  );
}