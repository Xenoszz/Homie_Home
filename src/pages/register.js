"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from "next/navigation"; 
import Menubar from "@/components/Menubar";

export default function Login() {
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

    } catch (error) {
      console.error("Error during registration: ", error);
      setError("An error occurred during registration.");
    }
  };

  return (
    <div className="h-screen w-screen border border-yellow-700">
      <Menubar />
    <div className="flex items-center p-20 justify-center  border-yellow-700">
      <div className="h-[70vh] bg-[#FAF6E3] rounded-[1rem] p-5 w-full max-w-[2000px] flex flex-col items-center justify-center">  
          <h1 className="text-3xl font-bold mb-8">Register</h1>
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
          <form onSubmit={handleSubmit} className="max-h-full w-full flex flex-col items-center text-4xl space-y-8 ">
            <input type="text" placeholder="Username" className="input-box" value={username} onChange={(e) => setUsername(e.target.value)} required />
            <input type="text" placeholder="First Name" className="input-box" value={firstname} onChange={(e) => setFirstName(e.target.value)} required />
            <input type="text" placeholder="Last Name" className="input-box" value={lastname} onChange={(e) => setLastName(e.target.value)} required />
            <input type="email" placeholder="Email" className="input-box" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" className="input-box" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <input type="password" placeholder="Confirm Password" className="input-box" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            <button type="submit" className="bg-[#233876] text-white px-6 py-2 rounded-md uppercase font-medium mt-4">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}
