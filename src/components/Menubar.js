import React, { useState, useEffect } from 'react';
import { Afacad } from "next/font/google";
import Image from "next/image";
import Logo from "/public/Group 40.png";
import { useRouter } from "next/router";

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

    useEffect(() => {
      const storedToken = localStorage.getItem('token');
      console.log(storedToken);
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
              setUsername(data.user?.username || '');
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


  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username ||  !password ) {
      setError("Please complete all inputs!");
      return;
    }
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

        // await handleSendOtp();
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      console.log(error);
      setError("An error occurred during login.");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      setError("Please complete all inputs!");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const resCheckUser = await fetch("http://localhost:8000/api/auth/checkuser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.toLowerCase() }),
      });

      if (!resCheckUser.ok) {
        setError("Failed to check user.");
        return;
      }

      const { user } = await resCheckUser.json();
      if (user) {
        setError("User already exists ");
        return;
      }

      const resRegister8000 = await fetch("http://localhost:8000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email: email.toLowerCase(), password }),
      });

      if (!resRegister8000.ok) {
        setError("Registration failed on 8000, please try again.");
        return;
      }

      setError("");
      setSuccess("User registration successful!");
      router.push("/Home");

    } catch (error) {
      console.error("Error during registration: ", error);
      setError("An error occurred during registration.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUsername('');
    window.location.reload();
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
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
            <form onSubmit={handleLogin}>
              <input type="text" name="username" placeholder="Username" className="w-full p-2 mb-4 border rounded" value={username} onChange={(e) => setUsername(e.target.value)} required />
              <input type="password" name="password" placeholder="Password" className="w-full p-2 mb-4 border rounded" value={password} onChange={(e) => setPassword(e.target.value)} required />
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
          <h2 className="text-2xl mb-2">Sign Up</h2>
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
          <form onSubmit={handleSignup} className='mt-2'>
            <input type="text" name="username" placeholder="Username" className="w-full p-2 mb-4 border rounded" value={username} onChange={(e) => setUsername(e.target.value)} required />
            <input type="email" name="email" placeholder="Email" className="w-full p-2 mb-4 border rounded" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" name="password" placeholder="Password" className="w-full p-2 mb-4 border rounded" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <input type="password" placeholder="Confirm Password" className="w-full p-2 mb-4 border rounded" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            <button type="submit" className="bg-[#2A3663] text-white px-4 py-2 rounded">Sign Up</button>
          </form>
        </div>
      </div>
      )}
    </div>
  );
}