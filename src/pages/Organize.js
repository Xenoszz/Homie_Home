import { useState, useEffect, useRef  } from "react";
import Image from "next/image";
import Menubar from "@/components/Menubar";
import SearchIcon from "/public/Search_alt_fill.png";
import CardComponent from "@/components/Organizecard";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Organize({ items }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState(items);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const scrollRef = useRef(null);
  const itemsPerPage = 5; // ✅ แสดง 5 การ์ดต่อหน้า

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -150, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 150, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize(); // ✅ run once on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // ✅ ค้นหาข้อมูล
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term.trim() === "") {
      setSelectedItems(items);
      setCurrentPage(0);
    } else {
      const filtered = items.filter((item) =>
        item.name.toLowerCase().includes(term.toLowerCase())
      );
      setSelectedItems(filtered);
      setCurrentPage(0);
    }
  };

  // ✅ เพิ่มไอเทม
  const addItem = (item) => {
    if (!selectedItems.some((i) => i.id === item.id)) {
      setSelectedItems([...selectedItems, item]);
      setCurrentPage(Math.floor(selectedItems.length / itemsPerPage)); // อัปเดตหน้าล่าสุด
    }
  };

  // ✅ ลบไอเทม
  const removeItem = (index) => {
    const newItems = selectedItems.filter((_, i) => i !== index);
    setSelectedItems(newItems);
    
    // ✅ ปรับหน้าให้ถูกต้อง ถ้าลบแล้วอยู่หน้าสุดท้ายแต่ไม่มีการ์ด ต้องกลับไปหน้าแรก
    if (newItems.length <= currentPage * itemsPerPage) {
      setCurrentPage((prev) => Math.max(prev - 1, 0));
    }
  };

  // ✅ เลื่อนหน้า
  const nextPage = () => {
    if ((currentPage + 1) * itemsPerPage < selectedItems.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  console.log('selectedItems:', selectedItems);
  // ✅ คำนวณไอเทมที่จะแสดงในหน้านี้
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleItems = selectedItems.slice(startIndex, endIndex);
  const itemsToRender = isMobile ? selectedItems : visibleItems;
  return (
    <div className="min-h-[100vh] w-[100vw] border border-yellow-700 overflow-y-auto">
      <Menubar />
      <h1 className="text-[24pt] md:text-[36pt] font-bold m-2 md:m-4">Organize</h1>

      {/* Search Bar */}
      <div className="flex items-center gap-4">
        <div className="flex items-center border-2 md:border-4 rounded-lg md:rounded-xl border-[#4F4534] bg-[#FAF6E3] p-1 md:p-2 ml-2 md:ml-4 w-full md:w-[30%]">
          <input
            type="text"
            placeholder='Search e.g. "Earring, Pants"'
            value={searchTerm}
            onChange={handleSearch}
            className="border-none outline-none bg-transparent flex-1 p-0 md:p-1 text-[12pt] md:text-[15pt] text-[#4F4534]"
          />
          <Image src={SearchIcon} alt="search" width={20} height={20} />
        </div>
      </div>

      {/* หมวดหมู่ปุ่ม */}
      
{selectedItems.length > 0 && (
  <div className="flex items-center gap-1 md:gap-3 mt-4 md:mt-7 mb-4 md:mb-7 ml-2 md:ml-4">
    {/* ปุ่มเลื่อนซ้าย - แสดงเฉพาะบนมือถือ */}
    {isMobile && (
      <button
      onClick={scrollLeft}
      className="p-1 bg-white rounded-full shadow-md flex items-center justify-center"
      aria-label="Scroll Left"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 text-gray-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    )}

    {/* container ปุ่มหมวดหมู่ (scrollable) */}
    <div
      ref={scrollRef}
      className="flex gap-2 md:gap-3 flex-nowrap overflow-x-auto scrollbar-hide flex-1"
      style={{ scrollBehavior: "smooth" }}
    >
      {selectedItems.map((item) => (
        <button
          key={item.id}
          className="bg-[#FAF6E3] border border-gray-300 p-1 md:p-2 rounded-md md:rounded-lg flex items-center gap-1 md:gap-2 shadow-sm hover:bg-gray-200 text-sm md:text-base flex-shrink-0"
          onClick={() => addItem(item)}
        >
          {item.name} <span className="text-purple-600 font-bold">+</span>
        </button>
      ))}
    </div>

    {/* ปุ่มเลื่อนขวา - แสดงเฉพาะบนมือถือ */}
    {isMobile && (
        <button
        onClick={scrollRight}
        className="p-1 bg-white rounded-full shadow-md flex items-center justify-center"
        aria-label="Scroll Right"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    )}
  </div>
)}

      {/* ปุ่มเลื่อนหน้าและการ์ด */}
      {selectedItems.length > 0 && (
        <div className="flex items-center mt-4 justify-center w-full">
          {/* ปุ่มเลื่อนซ้าย */}
          {!isMobile && (
            <button
              className={`p-2 rounded-full shadow-lg mx-2 ${
                currentPage === 0 ? "opacity-50 cursor-not-allowed" : "bg-white"
              } hidden md:flex`}
              onClick={prevPage}
              disabled={currentPage === 0}
            >
              <ChevronLeft size={24} />
            </button>
          )}

          {/* การ์ด */}
          <div className={`grid grid-cols-2 md:flex md:flex-row gap-4 md:gap-10 w-[90%] justify-between`}>
            {itemsToRender.map((item) => (
              <CardComponent
                key={item.id}
                item={item}
                isSelected={selectedItemId === item.id}
                onClick={() =>
                  setSelectedItemId(selectedItemId === item.id ? null : item.id)
                }
              />
            ))}
          </div>

          {/* ปุ่มเลื่อนขวา */}
          {!isMobile && (
            <button
              className={`p-2 rounded-full shadow-lg mx-2 ${
                endIndex >= selectedItems.length ? "opacity-50 cursor-not-allowed" : "bg-white"
              } hidden md:flex`}
              onClick={nextPage}
              disabled={endIndex >= selectedItems.length}
            >
              <ChevronRight size={24} />
            </button>
          )}
        </div>
      )}
    </div>
  );
}


// ✅ ใช้ getStaticProps ดึงข้อมูลจาก API
export async function getStaticProps() {
  const res = await fetch("http://localhost:8000/api/organizeinfo");
  const data = await res.json();
  return { props: { items: data }, revalidate: 10 };
}