<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
=======
>>>>>>> 79730a03a33fe8b3131f016fcad2c3e61e9f932b
import { Afacad } from "next/font/google";
import Image from "next/image";
import Logo from "/public/Group 40.png";
import { useRouter } from "next/router";
<<<<<<< HEAD
=======
import { useState, useEffect } from "react";
import Login from "@/pages/login";
import Register from "@/pages/register";
import { decodeToken } from "@/utils/auth";
>>>>>>> 79730a03a33fe8b3131f016fcad2c3e61e9f932b

const afacadFont = Afacad({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-afacad",
});

<<<<<<< HEAD
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
=======
const AuthModal = ({ isOpen, onClose, type, onSwitchToRegister, onSwitchToLogin }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-[#FAF6E3] rounded-[1rem] p-8 w-full max-w-[500px]">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-2xl font-bold text-gray-600 hover:text-gray-900"
        >
          ×
        </button>
        
        {type === 'login' && (
          <Login 
            onClose={onClose} 
            onSwitchToRegister={onSwitchToRegister} 
          />
        )}
        {type === 'register' && (
          <Register 
            onClose={onClose} 
            onSwitchToLogin={onSwitchToLogin}
          />
        )}
      </div>
    </div>
  );
};



export default function Menubar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("User");
  const [authModalType, setAuthModalType] = useState(null);

  const openLoginModal = () => setAuthModalType('login');
  const openRegisterModal = () => setAuthModalType('register');
  const closeAuthModal = () => setAuthModalType(null);

  const switchToRegister = () => setAuthModalType('register');
  const switchToLogin = () => setAuthModalType('login');

  const handleProtectedNavigation = (path) => {
    if (!isLoggedIn) {
      openLoginModal();
    } else {
      router.push(path);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('token'); 
    setIsLoggedIn(false);
    router.push("/Home");
    window.location.reload();
  };

  useEffect(() => {
    const checkToken = () => {
      const decoded = decodeToken();  
      if (decoded) {
        console.log('Token decoded:', decoded);
        setIsLoggedIn(true);

      } else {
        console.log('No valid token');
        setIsLoggedIn(false);

      }
    };
    
    checkToken();
  }, []);  

  return (
    <div className={`${afacadFont.variable} font-afacad p-4`}>
      <div className="flex justify-between">
        <button onClick={() => handleProtectedNavigation("/Home")} className="w-[10%] h-[10%]">
>>>>>>> 79730a03a33fe8b3131f016fcad2c3e61e9f932b
          <Image src={Logo} alt="Logo" />
        </button>
        <div className="flex justify-end w-[50%]">
          <div className="bg-[#2A3663] flex justify-around m-2 w-[70%] rounded-[10px]">
<<<<<<< HEAD
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
=======
            <button onClick={() => handleProtectedNavigation("/Organize")} className="flex items-center justify-center font-bold text-[24pt] w-[60%] transition-all duration-500 ease-in-out hover:bg-[#131b38] hover:rounded-l-[1rem]">
              <h1 className="text text-white">Organize</h1>
            </button>
            <button onClick={() => handleProtectedNavigation("/Todolist")} className="flex items-center justify-center font-bold text-[24pt] w-[60%] transition-all duration-500 ease-in-out hover:bg-[#131b38]">
              <h1 className="text text-white">To-do List</h1>
            </button>
            <button onClick={() => handleProtectedNavigation("/Ideas")} className="flex items-center justify-center font-bold text-[24pt] w-[60%] transition-all duration-500 ease-in-out hover:bg-[#131b38] hover:rounded-r-[1rem]">
              <h1 className="text text-white">Ideas</h1>
            </button>
          </div>
          <div className="flex justify-around items-center m-2 w-[30%]">
            {isLoggedIn ? (
              <div className="flex justify-between items-center w-full">
                <div className="text-white font-bold text-[18pt] truncate max-w-[60%]">
                  {username}
                </div>
                <button 
                  className="bg-[#2A3663] text-white px-4 py-2 rounded-[8px] hover:bg-[#131b38] transition-colors duration-300"
                  onClick={handleSignOut}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex w-full">
                <div className="flex w-full bg-[#B59F78] rounded-[10px] overflow-hidden">
                  <button 
                    className="w-1/2 py-6 text-white font-bold text-[24pt] border-r border-white/20 hover:bg-[#a68c5f] transition-colors duration-300"
                    onClick={openLoginModal}
                  >
                    Login
                  </button>
                  <button 
                    className="w-1/2 py-6 text-white font-bold text-[24pt] hover:bg-[#a68c5f] transition-colors duration-300"
                    onClick={openRegisterModal}
                  >
                    Sign up
                  </button>
                </div>
>>>>>>> 79730a03a33fe8b3131f016fcad2c3e61e9f932b
              </div>
            )}
          </div>
        </div>
      </div>

<<<<<<< HEAD
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
=======
      {/* Auth Modal */}
      <AuthModal 
        isOpen={authModalType !== null} 
        onClose={closeAuthModal} 
        type={authModalType} 
        onSwitchToRegister={switchToRegister}
        onSwitchToLogin={switchToLogin}
      />
>>>>>>> 79730a03a33fe8b3131f016fcad2c3e61e9f932b
    </div>
  );
}