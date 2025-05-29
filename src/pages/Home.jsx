import { useRef, useState, useEffect } from "react";
import Menubar from "@/components/Menubar.jsx";
import { useRouter } from "next/router";
import LoginModal from "@/components/auth/Loginpopup.jsx";
import SignupModal from "@/components/auth/Signuppopup.jsx";
import { checkLoginStatus, setLoginData, handleProtectedRoute } from "@/utils/auth.jsx";
import { groupSpaceData, calculateOverallProgress } from "@/utils/calculations.jsx";
import { fetchRooms, fetchSpaceGuide } from "@/utils/fetchData.jsx";
import { Dashboard } from "@/components/home/Dashboard.jsx";
import { SpaceGuideSection } from "@/components/home/SpaceGuideSection.jsx";
import { SmartOrganizingHack } from "@/components/home/SmartOrganizingHack.jsx";

export default function Home() {
  const router = useRouter();
  const [spaceData, setSpaceData] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [rooms, setRooms] = useState([]);
  const [loadingRooms, setLoadingRooms] = useState(true);

  // auth.jsx   Check login status
  useEffect(() => {
    const checkStatus = async () => {
      const { isLoggedIn: status, username: name } = await checkLoginStatus();
      setIsLoggedIn(status);
      setUsername(name);
    };
    checkStatus();
  }, []); 

  // fetchData.jsx   Fetch space guide data
  useEffect(() => {
    fetchSpaceGuide(setSpaceData);
  }, []); 

  // fetchData.jsx   Fetch rooms data
  useEffect(() => {
    fetchRooms(setRooms, setLoadingRooms);
  }, [isLoggedIn]); 


  // auth.jsx   Handle protected route navigation
  const handleProtectedRouteClick = (route) => {
    handleProtectedRoute(route, router, isLoggedIn, setIsLoggedIn, setShowLoginModal);
  };

  // auth.jsx   Handle successful login
  const handleSuccessfulLogin = (username, token) => {
    setLoginData(username, token);
    setIsLoggedIn(true);
    setUsername(username);
    setShowLoginModal(false);
    if (router.query.redirect) {
      router.push(router.query.redirect);
    } else {
      window.location.reload();
    }
  };

  // auth.jsx   Handle successful signup
  const handleSuccessfulSignup = (username, token) => {
    setLoginData(username, token);
    setIsLoggedIn(true);
    setUsername(username);
    setShowSignupModal(false);
    if (router.query.redirect) {
      router.push(router.query.redirect);
    } else {
      window.location.reload();
    }
  };

  const toggleLoginModal = (show) => {
    setShowLoginModal(show);
    setShowSignupModal(false);
  };

  const toggleSignupModal = (show) => {
    setShowSignupModal(show);
    setShowLoginModal(false);
  };

  const groupedSpaceData = groupSpaceData(spaceData);
  const overallProgress = calculateOverallProgress(rooms);

  return (
    <div className="h-[100vh] w-[100vw]">
      <Menubar 
        onLoginModalToggle={toggleLoginModal}
        onSignupModalToggle={toggleSignupModal}
        isLoggedIn={isLoggedIn}
        username={username}
        setIsLoggedIn={setIsLoggedIn}
      />

      {/* Mobile layout */}
      <div className="block md:hidden px-2">
        <Dashboard 
          rooms={rooms}
          isLoggedIn={isLoggedIn}
          loadingRooms={loadingRooms}
          overallProgress={overallProgress}
          isMobile={true}
        />
        <SpaceGuideSection 
          spaceData={spaceData}
          isMobile={true}
        />
        <SmartOrganizingHack 
          onOrganizeClick={() => handleProtectedRouteClick("/Organize")}
          isMobile={true}
        />
      </div>

      {/* Desktop layout */}
      <div className="hidden md:block">
        <div className="flex p-3 ml-4 mr-4 h-[45vh] gap-x-3 items-start">
          <Dashboard 
            rooms={rooms}
            isLoggedIn={isLoggedIn}
            loadingRooms={loadingRooms}
            overallProgress={overallProgress}
          />
          <SpaceGuideSection 
            spaceData={groupedSpaceData}
          />
        </div>
        <SmartOrganizingHack 
          onOrganizeClick={() => handleProtectedRouteClick("/Organize")}
        />
      </div>

      {/* Login Modal Component */}
      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => {
          setShowLoginModal(false);
          setShowSignupModal(false);
        }}
        onSwitchToSignup={() => {
          setShowLoginModal(false);
          setShowSignupModal(false);
          setTimeout(() => setShowSignupModal(true), 0);
        }}
        onSuccessfulLogin={handleSuccessfulLogin}
      />

      {/* Signup Modal Component */}
      <SignupModal 
        isOpen={showSignupModal}
        onClose={() => {
          setShowSignupModal(false);
          setShowLoginModal(false);
        }}
        onSwitchToLogin={() => {
          setShowSignupModal(false);
          setShowLoginModal(false);
          setTimeout(() => setShowLoginModal(true), 0);
        }}
        onSuccessfulSignup={handleSuccessfulSignup}
      />
    </div>
  );
}

