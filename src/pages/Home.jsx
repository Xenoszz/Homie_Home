import { useRef, useState, useEffect } from "react";
import Menubar from "@/components/Menubar.jsx";
import { useRouter } from "next/router";
import LoginModal from "@/components/auth/Loginpopup.jsx";
import SignupModal from "@/components/auth/Signuppopup.jsx";
import { checkLoginStatus, setLoginData, clearLoginData, getStoredToken, handleProtectedRoute } from "@/utils/auth.jsx";
import { groupSpaceData, calculateOverallProgress } from "@/utils/calculations.jsx";
import { fetchRooms, fetchSpaceGuide } from "@/utils/fetchData.jsx";
import { Dashboard } from "@/components/home/Dashboard.jsx";
import { SpaceGuideSection } from "@/components/home/SpaceGuideSection.jsx";
import { SmartOrganizingHack } from "@/components/home/SmartOrganizingHack.jsx";

export default function Home() {
  const router = useRouter();
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [spaceData, setSpaceData] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [rooms, setRooms] = useState([]);
  const [loadingRooms, setLoadingRooms] = useState(true);

  useEffect(() => {
    const checkStatus = async () => {
      const { isLoggedIn: status, username: name } = await checkLoginStatus();
      setIsLoggedIn(status);
      setUsername(name);
    };
    checkStatus();
  }, []); 

  // Fetch space guide data
  useEffect(() => {
    fetchSpaceGuide(setSpaceData);
  }, []); 

  // Fetch rooms data
  useEffect(() => {
    fetchRooms(setRooms, setLoadingRooms);
  }, [isLoggedIn]); 

  // Handle scroll events
  useEffect(() => {
    const checkScroll = () => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setShowLeftArrow(scrollLeft > 0);
        setShowRightArrow(scrollLeft + clientWidth < scrollWidth);
      }
    };
    if (scrollRef.current) {
      scrollRef.current.addEventListener("scroll", checkScroll);
      checkScroll();
    }
    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener("scroll", checkScroll);
      }
    };
  }, [spaceData]); 

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.children[0].clientWidth;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleProtectedRouteClick = (route) => {
    handleProtectedRoute(route, router, isLoggedIn, setIsLoggedIn, setShowLoginModal);
  };

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

