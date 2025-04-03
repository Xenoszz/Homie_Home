import { Afacad } from "next/font/google";
import Image from "next/image";
import Logo from "/public/Group 40.png";
import { useRouter } from "next/router";
import { useState } from "react";
import Login from "@/pages/login";
import Register from "@/pages/register";

const afacadFont = Afacad({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-afacad",
});

const AuthModal = ({ isOpen, onClose, type, onSwitchToRegister, onSwitchToLogin }) => {
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
  const [username, setUsername] = useState("User");
  const [authModalType, setAuthModalType] = useState(null);

  const openLoginModal = () => setAuthModalType('login');
  const openRegisterModal = () => setAuthModalType('register');
  const closeAuthModal = () => setAuthModalType(null);

  const switchToRegister = () => setAuthModalType('register');
  const switchToLogin = () => setAuthModalType('login');

  return (
    <div className={`${afacadFont.variable} font-afacad p-4`}>
      <div className="flex justify-between">
        <button onClick={() => router.push("/Home")} className="w-[10%] h-[10%]">
          <Image src={Logo} alt="Logo" />
        </button>
        <div className="flex justify-end w-[50%]">
          <div className="bg-[#2A3663] flex justify-around m-2 w-[70%] rounded-[10px]">
            <button onClick={() => router.push("/Organize")} className="flex items-center justify-center font-bold text-[24pt] w-[60%] transition-all duration-500 ease-in-out hover:bg-[#131b38] hover:rounded-l-[1rem]">
              <h1 className="text text-white">Organize</h1>
            </button>
            <button onClick={() => router.push("/Todolist")} className="flex items-center justify-center font-bold text-[24pt] w-[60%] transition-all duration-500 ease-in-out hover:bg-[#131b38]">
              <h1 className="text text-white">To-do List</h1>
            </button>
            <button onClick={() => router.push("/Ideas")} className="flex items-center justify-center font-bold text-[24pt] w-[60%] transition-all duration-500 ease-in-out hover:bg-[#131b38] hover:rounded-r-[1rem]">
              <h1 className="text text-white">Ideas</h1>
            </button>
          </div>
          <div className="flex justify-around items-center m-2 w-[30%]">
            {isLoggedIn ? (
              <div className="flex justify-between items-center w-full">
                <div className="text-white font-bold text-[18pt] truncate max-w-[60%]">
                  {username}
                </div>
                <button 
                  className="bg-[#2A3663] text-white px-4 py-2 rounded-[8px] hover:bg-[#131b38] transition-colors duration-300"
                  onClick={() => setIsLoggedIn(false)}
                >
                  Logout
                </button>
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
      />
    </div>
  );
}