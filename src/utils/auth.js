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