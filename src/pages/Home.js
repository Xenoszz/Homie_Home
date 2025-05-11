import { useRef, useState, useEffect } from "react";
import Menubar from "@/components/Menubar";
import Image from "next/image";
import Spaceguide from "@/components/Spaceguide";
import { useRouter } from "next/router";
import OrganizePage from "/public/home.jpg";
import LoginModal from "@/components/Loginpopup";
import SignupModal from "@/components/Signuppopup";
import axios from "axios";

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

  // Check login status when page loads
  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = () => {
    const storedToken = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    
    if (storedToken && storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    } else {
      setIsLoggedIn(false);
      setUsername('');
    }
    
    // Validate token with server
    if (storedToken) {
      fetch('http://localhost:8000/check-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: storedToken }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === 'Token is valid') {
            setIsLoggedIn(true);
            setUsername(data.user?.username || storedUsername);
          } else {
            setIsLoggedIn(false);
            setUsername('');
          }
        })
        .catch((error) => {
          setIsLoggedIn(false);
          setUsername('');
          console.error('Error checking token:', error);
        });
    }
  };

  useEffect(() => {
    fetch("http://localhost:8000/api/sginfo")
      .then((res) => res.json())
      .then((data) => setSpaceData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    const fetchRooms = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoadingRooms(false);
        setRooms([]);
        return;
      }
      try {
        const response = await axios.get('http://localhost:8000/api/rooms', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setRooms(response.data);
      } catch (error) {
        setRooms([]);
        // ไม่ต้อง throw error
      } finally {
        setLoadingRooms(false);
      }
    };
    fetchRooms();
  }, [isLoggedIn]);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.children[0].clientWidth;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

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

  const handleProtectedRoute = (route) => {
    const storedToken = localStorage.getItem('token');
    
    if (isLoggedIn && storedToken) {
      // Validate token with server before routing
      fetch('http://localhost:8000/check-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: storedToken }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === 'Token is valid') {
            router.push(route);
          } else {
            // Show login modal if token is invalid
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            setIsLoggedIn(false);
            setShowLoginModal(true);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          setShowLoginModal(true);
        });
    } else {
      setShowLoginModal(true);
    }
  };

  const handleSuccessfulLogin = (username, token) => {
    setIsLoggedIn(true);
    setUsername(username);
    setShowLoginModal(false);
    
    // Redirect to protected route if there was a previous attempt
    if (router.query.redirect) {
      router.push(router.query.redirect);
    } else {
      window.location.reload();
    }
  };

  const handleSuccessfulSignup = (username, token) => {
    setIsLoggedIn(true);
    setUsername(username);
    setShowSignupModal(false);
    
    // Redirect to protected route if there was a previous attempt
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

  const groupedSpaceData = spaceData.reduce((acc, item, index) => {
    if (index % 3 === 0) acc.push([]);
    acc[acc.length - 1].push(item);
    return acc;
  }, []);

  // คำนวณ overallProgress
  const overallProgress = rooms.length > 0
    ? Math.round(rooms.reduce((sum, r) => sum + (r.progress || 0), 0) / rooms.length)
    : 0;

  function OverallProgressCircle({ percent }) {
    const radius = 80;
    const stroke = 15;
    const normalizedRadius = radius - stroke / 2;
    const circumference = 2 * Math.PI * normalizedRadius;
    const strokeDashoffset = circumference - (percent / 100) * circumference;

    return (
      <svg width={radius * 2} height={radius * 2}>
        {/* วงพื้นหลัง */}
        <circle
          stroke="#E5E1D6"
          fill="none"
          strokeWidth={stroke}
          cx={radius}
          cy={radius}
          r={normalizedRadius}
        />
        {/* วง foreground */}
        <circle
          stroke="#8D7C5F"
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          cx={radius}
          cy={radius}
          r={normalizedRadius}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: 'stroke-dashoffset 0.7s' }}
        />
        {/* ตัวเลขตรงกลาง */}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy=".3em"
          fontSize="2rem"
          fontWeight="bold"
          fill="#58482D"
        >
          {percent}%
        </text>
      </svg>
    );
  }

  return (
    <div className="h-[100vh] w-[100vw]">
      <Menubar 
        onLoginModalToggle={toggleLoginModal}
        onSignupModalToggle={toggleSignupModal}
        isLoggedIn={isLoggedIn}
        username={username}
        setIsLoggedIn={setIsLoggedIn}
      />

      <div className="flex p-3 ml-4 mr-4 h-[45vh] gap-x-3 items-start">
        <div className="flex flex-col w-[50vw]">
          <h3 className="text-[36pt] font-bold mt-0 mb-4">Dashboard</h3>
          {/* FIX: Set a specific height for the container and adjust overflow */}
          <div className="flex flex-row h-[33vh] bg-[#FAF6E3] rounded-[1rem]">
            <div className=" w-[85%] p-4 flex flex-col">
              <div className="flex-1 min-h-0 overflow-y-auto pr-2">
                {!isLoggedIn ? (
                  <div className="text-gray-500 text-center mt-8">Login to see your tasks progress</div>
                ) : loadingRooms ? (
                  <div>Loading...</div>
                ) : rooms.length === 0 ? (
                  <div className="text-gray-500">No rooms found</div>
                ) : (
                  rooms.map(room => (
                    <div key={room._id} className="mb-4 p-3 bg-white rounded-lg shadow ">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-semibold text-[#58482D]">{room.name}</span>
                        <span className="text-sm text-gray-600">{room.progress || 0}%</span>
                      </div>
                      <div className="bg-gray-200 h-2 w-full rounded-full overflow-hidden">
                        <div 
                          className="bg-green-500 h-full transition-all duration-500" 
                          style={{ width: `${room.progress || 0}%` }}
                        ></div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            <div className=" w-1/2 flex flex-col items-center justify-center h-full">
              <OverallProgressCircle percent={overallProgress} />
              <div className="mt-2 text-[26pt] font-bold text-[#58482D]">Overall</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-[50vw] justify-between relative">
          <h3 className="text-[36pt] font-bold mt-0 mb-4">Space Guide</h3>

          {showLeftArrow && (
            <button
              className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-gray-300 bg-opacity-90 rounded-full w-12 h-12 flex items-center justify-center text-gray-800 text-3xl shadow-lg hover:bg-opacity-100 transition-all z-10"
              onClick={() => handleScroll("left")}
              aria-label="Previous cards"
            >
              &#10094;
            </button>
          )}

          <div className="h-[33vh] overflow-hidden relative">
            <div ref={scrollRef} className="flex w-full h-full overflow-x-hidden scroll-smooth">
              {groupedSpaceData.map((group, groupIndex) => (
                <div key={groupIndex} className="flex justify-around min-w-full gap-x-3 flex-shrink-0">
                  {group.map((item, index) => (
                    <div key={index} className="w-[30%]">
                      <Spaceguide
                        imageSrc={item.imageSrc}
                        title={item.title}
                        description={item.description}
                        extraInfo={{ arrangement: item.arrangement, tips: item.tips }}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {showRightArrow && (
            <button
              className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-gray-300 bg-opacity-90 rounded-full w-12 h-12 flex items-center justify-center text-gray-800 text-3xl shadow-lg hover:bg-opacity-100 transition-all z-10"
              onClick={() => handleScroll("right")}
              aria-label="Next cards"
            >
              &#10095;
            </button>
          )}
        </div>
      </div>

      <div className="relative mt-5 ml-4 mr-4 rounded-[1rem] h-[30vh]">
        <Image src={OrganizePage} alt="Card" className="w-full h-full object-cover rounded-[1rem] object-[60%_70%]" />

        <div className="absolute inset-0 bg-gradient-to-l from-[#B59F78] to-[#ffffff00] bg-opacity-70 rounded-[1rem] flex flex-col items-end">
          <h1 className="m-3 font-bold text-[32pt]">Smart Organizing Hack</h1>
          <button 
            className="m-3 font-bold text-[24pt] transition-transform duration-300 hover:scale-110" 
            onClick={() => handleProtectedRoute("/Organize")}
          >
            Organize Now
          </button>
        </div>
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