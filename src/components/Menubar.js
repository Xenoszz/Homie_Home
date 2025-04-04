import { Afacad } from "next/font/google";
import Image from "next/image";
import Logo from "/public/Group 40.png";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import Login from "@/pages/login";
import Register from "@/pages/register";

const afacadFont = Afacad({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-afacad",
});

const AuthModal = ({ isOpen, onClose, type, onSwitchToRegister, onSwitchToLogin, onLoginSuccess }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-[#FAF6E3] rounded-[1rem] p-8 w-full max-w-[500px]">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-2xl font-bold text-gray-600 hover:text-gray-900"
        >
          ×
        </button>
        
        {type === 'login' && (
          <Login 
            onClose={onClose} 
            onSwitchToRegister={onSwitchToRegister} 
            onLoginSuccess={onLoginSuccess}
          />
        )}
        {type === 'register' && (
          <Register 
            onClose={onClose} 
            onSwitchToLogin={onSwitchToLogin}
          />
        )}
      </div>
    </div>
  );
};

export default function Menubar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [authModalType, setAuthModalType] = useState(null);
  const [showLogout, setShowLogout] = useState(false);
  const userContainerRef = useRef(null);
  
  // ตรวจสอบว่าหน้าปัจจุบันคือหน้าไหน
  const currentPath = router.pathname;
  
  // สำหรับปิด dropdown เมื่อคลิกภายนอก
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        userContainerRef.current && 
        !userContainerRef.current.contains(event.target) &&
        showLogout
      ) {
        setShowLogout(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showLogout]);

  const openLoginModal = () => setAuthModalType('login');
  const openRegisterModal = () => setAuthModalType('register');
  const closeAuthModal = () => setAuthModalType(null);

  const switchToRegister = () => setAuthModalType('register');
  const switchToLogin = () => setAuthModalType('login');

  const handleLoginSuccess = (user) => {
    setIsLoggedIn(true);
    setUsername(user);
    closeAuthModal();
  };

  const toggleLogout = () => {
    setShowLogout(!showLogout);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setShowLogout(false);
  };

  // ฟังก์ชันเพื่อตรวจสอบว่าเมนูนี้เป็นเมนูที่กำลังแสดงอยู่หรือไม่
  const isActive = (path) => {
    return currentPath === path;
  };

  return (
    <div className={`${afacadFont.variable} font-afacad p-4`}>
      <div className="flex justify-between">
        <button onClick={() => router.push("/Home")} className="w-[10%] h-[10%]">
          <Image src={Logo} alt="Logo" />
        </button>
        <div className="flex justify-end w-[50%]">
          <div className="bg-[#2A3663] flex justify-around m-2 w-[70%] rounded-[10px]">
            <button 
              onClick={() => router.push("/Organize")} 
              className={`flex items-center justify-center font-bold text-[24pt] w-[60%] transition-all duration-500 ease-in-out ${
                isActive("/Organize") 
                  ? "bg-white text-[#2A3663] rounded-lg my-2 mx-1" 
                  : "text-white hover:bg-[#131b38] hover:rounded-l-[1rem]"
              }`}
            >
              <h1>Organize</h1>
            </button>
            <button 
              onClick={() => router.push("/Todolist")} 
              className={`flex items-center justify-center font-bold text-[24pt] w-[60%] transition-all duration-500 ease-in-out ${
                isActive("/Todolist") 
                  ? "bg-white text-[#2A3663] rounded-lg my-2 mx-1" 
                  : "text-white hover:bg-[#131b38]"
              }`}
            >
              <h1>To-Do</h1>
            </button>
            <button 
              onClick={() => router.push("/Ideas")} 
              className={`flex items-center justify-center font-bold text-[24pt] w-[60%] transition-all duration-500 ease-in-out ${
                isActive("/Ideas") 
                  ? "bg-white text-[#2A3663] rounded-lg my-2 mx-1" 
                  : "text-white hover:bg-[#131b38] hover:rounded-r-[1rem]"
              }`}
            >
              <h1>Ideas</h1>
            </button>
          </div>
          <div className="flex justify-around items-center m-2 w-[30%]">
            {isLoggedIn ? (
              <div 
                ref={userContainerRef}
                className="relative flex flex-col w-full"
              >
                <div className="relative">
                  <button 
                    className="text-black font-bold text-[24pt] truncate w-full hover:text-[#2A3663] transition-colors duration-300 text-left group flex justify-between items-center"
                    onClick={toggleLogout}
                  >
                    <div className="flex flex-col items-start">
                      <span className="text-[32pt]">Welcome,</span>
                      <span>{username}</span>
                    </div>
                    {/* ไอคอนลูกศรที่อยู่ทางขวาสุด */}
                    <span className={`transition-transform duration-300 ${showLogout ? 'rotate-180' : ''}`}>
                      ▼
                    </span>
                  </button>
                  
                  {/* ปุ่ม Logout ที่เลื่อนออกมาจากชื่อ */}
                  <div 
                    className={`absolute left-0 right-0 overflow-hidden transition-all duration-300 origin-top ${
                      showLogout 
                        ? 'opacity-100 scale-y-100 translate-y-0' 
                        : 'opacity-0 scale-y-0 -translate-y-2'
                    }`}
                    style={{ transformOrigin: 'top' }}
                  >
                    <button 
                      className="bg-red-600 text-white px-4 py-3 rounded-[8px] hover:bg-red-700 transition-all duration-300 shadow-lg w-full text-center font-bold text-lg mt-2"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex w-full">
                <div className="flex w-full bg-[#B59F78] rounded-[10px] overflow-hidden">
                  <button 
                    className="w-1/2 py-6 text-white font-bold text-[24pt] border-r border-white/20 hover:bg-[#a68c5f] transition-colors duration-300"
                    onClick={openLoginModal}
                  >
                    Login
                  </button>
                  <button 
                    className="w-1/2 py-6 text-white font-bold text-[24pt] hover:bg-[#a68c5f] transition-colors duration-300"
                    onClick={openRegisterModal}
                  >
                    Sign up
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={authModalType !== null} 
        onClose={closeAuthModal} 
        type={authModalType} 
        onSwitchToRegister={switchToRegister}
        onSwitchToLogin={switchToLogin}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}