"use client"
import { useState } from 'react';
import { useRouter } from "next/navigation"; 
import Menubar from "@/components/Menubar";

export default function Register({ onClose, onSwitchToLogin }) {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !firstname || !lastname || !email || !password || !confirmPassword) {
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
        setError("User already exists on 8000!");
        return;
      }

      const resRegister8000 = await fetch("http://localhost:8000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, firstname, lastname, email: email.toLowerCase(), password }),
      });

      if (!resRegister8000.ok) {
        setError("Registration failed on 8000, please try again.");
        return;
      }

      setError(""); 
      setSuccess("User registration successful!");
      router.push("/Home");
      onClose();

    } catch (error) {
      console.error("Error during registration: ", error);
      setError("An error occurred during registration.");
    }
  };

  return (
    <div className="h-full w-full">
      <div className="flex items-center justify-center">
        <div className="bg-[#FAF6E3] rounded-[1rem] p-5 w-full flex flex-col items-center justify-center">  
          {/* Register heading */}
          <h1 className="text-3xl font-bold mb-8">Register</h1>
          
          {/* Error message */}
          {error && <div className="text-red-500 mb-4">{error}</div>}
          
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
              className="w-full border border-gray-300 rounded-md p-3 mb-4"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="LastName"
              className="w-full border border-gray-300 rounded-md p-3 mb-4"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
              required
            />

            <input
              type="Email"
              placeholder="Email"
              className="w-full border border-gray-300 rounded-md p-3 mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full border border-gray-300 rounded-md p-3 mb-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full border border-gray-300 rounded-md p-3 mb-6"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            
            <button
              type="submit"
              className="bg-[#233876] text-white px-6 py-2 rounded-md uppercase font-medium w-full"
            >
              Register
            </button>

            <div className="mt-4 text-center">
              <span className="text-gray-600">Already have an account? </span>
              <button 
                type="button"
                onClick={onSwitchToLogin}
                className="text-[#233876] font-bold hover:underline"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
