import { fetchDataApi } from './api.jsx';
import { setLoginData } from './auth.jsx';

export const handleOtpSuccess = async (token, username, setSuccess, setError, onSuccessfulLogin, onClose) => {
  try {
    setLoginData(username, token);
    setSuccess("Login successful!");
    setError("");
  
    if (onSuccessfulLogin) {
      onSuccessfulLogin(username, token);
    }

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
    
    if (result.token) {
      setLoginData(username, result.token);
    }
    
    if (onVerificationSuccess) {
      onVerificationSuccess(result.token);
    }
    
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