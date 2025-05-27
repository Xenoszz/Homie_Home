import React, { useState, useEffect } from 'react';
import { useCountdownTimer } from "@/utils/calculations";
import { sendOTP, verifyOTP } from '@/utils/otp';

export default function PopupOTP({ 
  isOpen, 
  onClose, 
  email,
  password,
  onVerificationSuccess,
  username
}) {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { countdown, canResend, resetCountdown } = useCountdownTimer(60, isOpen);
  const [success, setSuccess] = useState('');

  // Automatically send OTP when popup opens
  useEffect(() => {
    if (isOpen) {
      sendOTP(username, email, setLoading, setError, resetCountdown);
    }
  }, [isOpen]);

  const handleResendOTP = async () => {
    if (!canResend) return;
    
    const success = await sendOTP(username, email, setLoading, setError, resetCountdown);
    if (success) {
      setSuccess('OTP sent successfully!');
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    await verifyOTP(username, otp, password, setLoading, setError, onVerificationSuccess, onClose);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg w-96 relative">
        <button 
          onClick={onClose} 
          className="absolute top-2 right-2 text-2xl"
          type="button"
        >
          ×
        </button>
        
        <h2 className="text-2xl mb-4 text-center">Verify Your Email</h2>
        
        <p className="mb-6 text-center text-gray-600">
          We've sent a verification code to <span className="font-medium">{email}</span>
        </p>
        
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        
        <form onSubmit={handleVerifyOTP}>
          <div className="mb-6">
            <label htmlFor="otp" className="block mb-2 text-sm font-medium text-gray-700">
              Enter OTP Code
            </label>
            <input 
              type="text" 
              id="otp"
              placeholder="Enter 6-digit code" 
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
              maxLength={6}
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-[#2A3663] text-white p-3 rounded-md hover:bg-opacity-90 transition disabled:opacity-70"
            disabled={loading}
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>
        
        <div className="mt-4 text-center">
          {canResend ? (
            <button 
              onClick={handleResendOTP} 
              className="text-[#2A3663] font-medium"
              disabled={loading}
              type="button"
            >
              Resend OTP
            </button>
          ) : (
            <p className="text-gray-500">
              Resend OTP in {countdown} seconds
            </p>
          )}
        </div>
      </div>
    </div>
  );
}