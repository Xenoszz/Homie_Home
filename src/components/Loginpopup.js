import React, { useState } from 'react';

export default function Loginpopup({ 
  isOpen, 
  onClose, 
  onSwitchToSignup,
  onSuccessfulLogin
}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
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
        const token = data.token;
        console.log('Received token:', token);
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        
        setSuccess("Login successful!");
        setError("");
        
        // Notify parent component about successful login
        if (onSuccessfulLogin) {
          onSuccessfulLogin(username, token);
        }
        
        // Close the modal after successful login
        onClose();
        
        // Optional: Reload the page if needed
        // window.location.reload();
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred during login.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg w-96 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-2xl">×</button>
        <h2 className="text-2xl mb-4">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <form onSubmit={handleLogin}>
          <input 
            type="text" 
            name="username" 
            placeholder="Username" 
            className="w-full p-2 mb-4 border rounded" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required 
          />
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            className="w-full p-2 mb-4 border rounded" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
          <button 
            type="submit" 
            className="bg-[#2A3663] text-white px-4 py-2 rounded"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <button 
            onClick={onSwitchToSignup} 
            className="text-[#2A3663] font-bold"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}