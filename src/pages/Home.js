import { useRef, useState, useEffect } from "react";
import Menubar from "@/components/Menubar";
import Image from "next/image";
import Spaceguide from "@/components/Spaceguide";
import { useRouter } from "next/router";
import OrganizePage from "/public/home.jpg";

export default function Home() {
  const router = useRouter();
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [spaceData, setSpaceData] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false); // เพิ่ม state นี้

  useEffect(() => {
    fetch("http://localhost:8000/api/sginfo")
      .then((res) => res.json())
      .then((data) => setSpaceData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

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
    const isLoggedIn = localStorage.getItem("username") !== null;
    if (isLoggedIn) {
      router.push(route);
    } else {
      setShowLoginModal(true);
    }
  };

  // เพิ่มฟังก์ชัน handleSignup
  const handleSignup = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get('username');
    const password = formData.get('password');
    const email = formData.get('email');
    const firstname = formData.get('firstname') || '';
    const lastname = formData.get('lastname') || '';

    try {
      const response = await axios.post('http://localhost:8000/api/auth/register', {
        username,
        firstname,
        lastname,
        email,
        password
      }, { withCredentials: true });

      if (response.status === 201) {
        localStorage.setItem("username", username);
        setShowSignupModal(false);
        alert('Registration successful');
      }
    } catch (error) {
      setSignupError(error.response?.data?.message || 'Registration failed');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      const response = await axios.post('http://localhost:8000/api/auth/login', {
        email,
        password
      }, { withCredentials: true });

      if (response.status === 200) {
        localStorage.setItem("username", email);
        setShowLoginModal(false);
        router.push('/dashboard'); // เปลี่ยนเส้นทางหลังเข้าสู่ระบบ
      }
    } catch (error) {
      setLoginError(error.response?.data?.message || 'Login failed');
    }
  };

  const groupedSpaceData = spaceData.reduce((acc, item, index) => {
    if (index % 3 === 0) acc.push([]);
    acc[acc.length - 1].push(item);
    return acc;
  }, []);

  return (
    <div className="h-[100vh] w-[100vw] border border-yellow-700">
      <Menubar />

      <div className="flex p-3 ml-4 mr-4 h-[45vh] gap-x-3 border border-orange-700">
        <div className="flex flex-col border border-pink-600 w-[50vw]">
          <h3 className="text-[36pt] font-bold">Dashboard</h3>
          <div className="h-[100vh] bg-[#FAF6E3] rounded-[1rem] flex border border-blue-500">
            <div className="border border-green-600 w-[50%]"></div>
            <div className="border border-green-600 w-[50%]"></div>
          </div>
        </div>

        <div className="flex flex-col border border-pink-600 w-[50vw] justify-between relative">
          <h3 className="text-[36pt] font-bold">Space Guide</h3>

          {showLeftArrow && (
            <button
              className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-gray-300 bg-opacity-90 rounded-full w-12 h-12 flex items-center justify-center text-gray-800 text-3xl shadow-lg hover:bg-opacity-100 transition-all z-10"
              onClick={() => handleScroll("left")}
              aria-label="Previous cards"
            >
              &#10094;
            </button>
          )}

          <div className="h-[33vh] border border-red-600 overflow-hidden relative">
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

      <div className="relative mt-5 ml-4 mr-4 rounded-[1rem] h-[30vh] border border-orange-700">
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

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg w-96 relative">
            <button 
              onClick={() => setShowLoginModal(false)} 
              className="absolute top-2 right-2 text-2xl"
            >
              ×
            </button>
            <h2 className="text-2xl mb-4">Login</h2>
            {loginError && <p className="text-red-500 mb-4">{loginError}</p>}
            <form onSubmit={handleLogin}>
              <input 
                type="email" 
                name="email" 
                placeholder="Email" 
                className="w-full p-2 mb-4 border rounded" 
                required 
              />
              <input 
                type="password" 
                name="password" 
                placeholder="Password" 
                className="w-full p-2 mb-4 border rounded" 
                required 
              />
              <button 
                type="submit" 
                className="bg-[#2A3663] text-white px-4 py-2 rounded"
              >
                Login
              </button>
            </form>
            <p className="mt-4 text-center">
              Don't have an account?{" "}
              <button 
                onClick={() => { 
                  setShowLoginModal(false); 
                  setShowSignupModal(true);
                }} 
                className="text-[#2A3663] font-bold"
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {showSignupModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg w-96 relative">
            <button 
              onClick={() => setShowSignupModal(false)} 
              className="absolute top-2 right-2 text-2xl"
            >
              ×
            </button>
            <h2 className="text-2xl mb-4">Sign Up</h2>
            {signupError && <p className="text-red-500 mb-4">{signupError}</p>}
            <form onSubmit={handleSignup}>
              <input 
                type="text" 
                name="username" 
                placeholder="Username" 
                className="w-full p-2 mb-4 border rounded" 
                required 
              />
              <input 
                type="text" 
                name="firstname" 
                placeholder="First Name" 
                className="w-full p-2 mb-4 border rounded" 
              />
              <input 
                type="text" 
                name="lastname" 
                placeholder="Last Name" 
                className="w-full p-2 mb-4 border rounded" 
              />
              <input 
                type="email" 
                name="email" 
                placeholder="Email" 
                className="w-full p-2 mb-4 border rounded" 
                required 
              />
              <input 
                type="password" 
                name="password" 
                placeholder="Password" 
                className="w-full p-2 mb-4 border rounded" 
                required 
              />
              <button 
                type="submit" 
                className="bg-[#2A3663] text-white px-4 py-2 rounded"
              >
                Sign Up
              </button>
            </form>
            <p className="mt-4 text-center">
              Already have an account?{" "}
              <button 
                onClick={() => { 
                  setShowSignupModal(false); 
                  setShowLoginModal(true); 
                }} 
                className="text-[#2A3663] font-bold"
              >
                Login
              </button>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}