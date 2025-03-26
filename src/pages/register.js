"use client";
import { useState } from 'react';

export default function Register({ onClose, onSwitchToLogin }) {
  const [username, setUsername] = useState('');
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [error, seterror] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic password confirmation validation
    if (password !== confirmpassword) {
      seterror("Passwords do not match");
      return;
    }

    // Add registration functionality here
    console.log('Register with:', { username, firstname, lastname, email, password });
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
              onChange={(e) => setfirstname(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="LastName"
              className="w-full border border-gray-300 rounded-md p-3 mb-4"
              value={lastname}
              onChange={(e) => setlastname(e.target.value)}
              required
            />

            <input
              type="Email"
              placeholder="Email"
              className="w-full border border-gray-300 rounded-md p-3 mb-4"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full border border-gray-300 rounded-md p-3 mb-4"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full border border-gray-300 rounded-md p-3 mb-6"
              value={confirmpassword}
              onChange={(e) => setconfirmpassword(e.target.value)}
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