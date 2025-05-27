import { fetchDataApi } from './api';
import { setLoginData } from './auth';

export const handleOtpSuccess = async (token, username, setSuccess, setError, onSuccessfulLogin, onClose) => {
  try {
    // Store token and username
    setLoginData(username, token);
    
    setSuccess("Login successful!");
    setError("");
    
    // Notify parent component about successful login
    if (onSuccessfulLogin) {
      onSuccessfulLogin(username, token);
    }
    
    // Close the modal after successful login
    onClose();
    
  } catch (error) {
    console.error("Error during OTP verification:", error);
    setError("Error during OTP verification");
  }
};

export const sendOTP = async (username, email, setLoading, setError, resetCountdown) => {
  setLoading(true);
  setError('');
  
  try {
    const result = await fetchDataApi('POST', 'auth/send-otp', { username, email });
    
    if (result.error) {
      setError(result.error);
      return false;
    }

    resetCountdown();
    return true;
  } catch (error) {
    console.error('Error sending OTP:', error);
    setError('Error sending OTP');
    return false;
  } finally {
    setLoading(false);
  }
};

export const verifyOTP = async (username, otp, password, setLoading, setError, onVerificationSuccess, onClose) => {
  if (!otp) {
    setError('Please enter the OTP.');
    return false;
  }
  
  setLoading(true);
  setError('');
  
  try {
    const result = await fetchDataApi('POST', 'auth/verify-otp', { username, otp, password });
    
    if (result.error) {
      setError(result.error);
      return false;
    }
    
    // Store token if available
    if (result.token) {
      setLoginData(username, result.token);
    }
    
    // Call success callback
    if (onVerificationSuccess) {
      onVerificationSuccess(result.token);
    }
    
    // Close popup
    onClose();
    return true;
  } catch (error) {
    console.error('Error verifying OTP:', error);
    setError(error.message || 'Network error. Please try again.');
    return false;
  } finally {
    setLoading(false);
  }
}; 