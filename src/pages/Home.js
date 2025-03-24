import { useRef, useState, useEffect } from "react";
import Menubar from "@/components/Menubar";
import Image from "next/image";
import Spaceguide from "@/components/Spaceguide";
import OrganizePage from "/public/home.jpg";
import image1 from "/public/Card.jpg";
import image2 from "/public/Card1.jpg";
import image3 from "/public/Card2.jpg";
import image4 from "/public/Card.jpg";
import image5 from "/public/Card1.jpg";
import image6 from "/public/Card2.jpg";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [spaceData, setSpaceData] = useState([]);

  useEffect(() => {
    fetch("/api/sginfo")
      .then((res) => res.json())
      .then((data) => setSpaceData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.children[0].clientWidth; // ✅ ความกว้างของกลุ่มข้อมูลแรก
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
        setShowLeftArrow(scrollLeft > 0); // ✅ แสดงลูกศรซ้ายเมื่อ scrollLeft > 0
        setShowRightArrow(scrollLeft + clientWidth < scrollWidth); // ✅ แสดงลูกศรขวาเมื่อยัง scroll ได้อีก
      }
    };

    if (scrollRef.current) {
      scrollRef.current.addEventListener("scroll", checkScroll);
      checkScroll(); // ✅ เรียก checkScroll ทันทีเมื่อ component โหลด
    }

    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener("scroll", checkScroll);
      }
    };
  }, [spaceData]); // ✅ เรียก useEffect ใหม่เมื่อ spaceData เปลี่ยนแปลง

  const groupedSpaceData = spaceData.reduce((acc, item, index) => {
    if (index % 3 === 0) acc.push([]); // ✅ ทุกๆ 3 อัน ให้สร้างกลุ่มใหม่
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
          <button className="m-3 font-bold text-[24pt] transition-transform duration-300 hover:scale-110" onClick={() => router.push("/Organize")}>
            Organize Now
          </button>
        </div>
      </div>
    </div>
  );
}