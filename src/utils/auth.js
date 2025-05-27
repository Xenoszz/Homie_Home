import { fetchDataApi } from './api';

export const checkLoginStatus = async () => {
    const storedToken = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    
    if (!storedToken || !storedUsername) {
        return {
            isLoggedIn: false,
            username: ''
        };
    }
    try {
        const headers = {'Authorization': `Bearer ${storedToken}`};
        const data = await fetchDataApi('POST', 'auth/check-token', { token: storedToken });

        if (data.message === 'Token is valid') {
            return {
                isLoggedIn: true,
                username: data.user?.username || storedUsername
            };
        }
    } catch (error) {
        console.error('Error checking token:', error);
    }

    return {
        isLoggedIn: false,
        username: ''
    };
};

export const setLoginData = (username, token) => {
    localStorage.setItem('username', username);
    localStorage.setItem('token', token);
};

export const clearLoginData = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
};

export const getStoredToken = () => {
    return localStorage.getItem('token');
};

export const getStoredUsername = () => {
    return localStorage.getItem('username');
};

export const handleProtectedRoute = async (route, router, isLoggedIn, setIsLoggedIn, setShowLoginModal) => {
    const storedToken = getStoredToken();
    
    if (isLoggedIn && storedToken) {
        try {
            const { isLoggedIn: isValid } = await checkLoginStatus();
            if (isValid) {
                router.push(route);
            } else {
                clearLoginData();
                setIsLoggedIn(false);
                setShowLoginModal(true);
            }
        } catch (error) {
            console.error('Error:', error);
            setShowLoginModal(true);
        }
    } else {
        setShowLoginModal(true);
    }
};

export const handleLogin = async (username, password, setError, setIsLoggingIn, setShowOtpPopup) => {
  if (!username || !password) {
    setError("Please complete all inputs!");
    return false;
  }

  try {
    setIsLoggingIn(true);
    const result = await fetchDataApi('POST', 'auth/login', { username, password });
    
    if (result.error) {
      setError(result.error);
      return false;
    }
    
    setShowOtpPopup(true);
    return true;
    
  } catch (error) {
    console.error("Login error:", error);
    setError("Error Please try again.");
    return false;
  } finally {
    setIsLoggingIn(false);
  }
};

export const handleSignup = async (
  username,
  email,
  password,
  confirmPassword,
  firstname,
  lastname,
  setIsRegistering,
  setError,
  setSuccess,
  onSuccessfulSignup,
  onClose
) => {
  if (!username || !email || !password || !confirmPassword) {
    setError("Please complete all required inputs!");
    return false;
  }

  if (password !== confirmPassword) {
    setError("Passwords do not match!");
    return false;
  }

  try {
    setIsRegistering(true);
    
    // First check if user already exists
    const checkUserResult = await fetchDataApi('POST', 'auth/checkuser', { 
      email: email.toLowerCase() 
    });

    if (checkUserResult.error) {
      setError(checkUserResult.error);
      return false;
    }

    if (checkUserResult.user) {
      setError("User already exists");
      return false;
    }

    // If user doesn't exist, proceed with registration
    const registerResult = await fetchDataApi('POST', 'auth/register', { 
      username, 
      email: email.toLowerCase(), 
      password,
      firstname,
      lastname
    });

    if (registerResult.error) {
      setError(registerResult.error);
      return false;
    }

    // Close the modal after successful registration
    onClose();
    return true;
    
  } catch (error) {
    console.error("Error during registration: ", error);
    setError("An error occurred. Please try again.");
    return false;
  } finally {
    setIsRegistering(false);
  }
};

export const checkAuth = async (router, setIsAuthenticated, onSuccess) => {
    const { isLoggedIn } = await checkLoginStatus();
    
    if (!isLoggedIn) {
        router.push('/');
        return false;
    }
    
    setIsAuthenticated(true);
    if (onSuccess) {
        onSuccess();
    }
    return true;
}; 