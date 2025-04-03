import { useState } from "react";
import Image from "next/image";
import Menubar from "@/components/Menubar";
import SearchIcon from "/public/Search_alt_fill.png";
import CardComponent from "@/components/Organizecard";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Organize({ items }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 5; // ✅ แสดง 5 การ์ดต่อหน้า

  // ✅ ค้นหาข้อมูล
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    setSearchResults(
      term.trim() === ""
        ? []
        : items.filter((item) =>
            item.name.toLowerCase().includes(term.toLowerCase())
          )
    );
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

  // ✅ คำนวณไอเทมที่จะแสดงในหน้านี้
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleItems = selectedItems.slice(startIndex, endIndex);

  return (
    <div className="h-[100vh] w-[100vw] border border-yellow-700">
      <Menubar />
      <h1 className="text-[36pt] font-bold m-4">Organize</h1>

      {/* ✅ Search Bar และปุ่มค้นหา */}
      <div className="flex items-center gap-4">
        <div className="flex items-center border-4 rounded-xl border-[#4F4534] bg-[#FAF6E3] p-2 ml-4 w-[30%]">
          <input
            type="text"
            placeholder='Search e.g. "Earring, Pants"'
            value={searchTerm}
            onChange={handleSearch}
            className="border-none outline-none bg-transparent flex-1 p-1 text-[15pt] text-[#4F4534]"
          />
          <Image src={SearchIcon} alt="search" width={20} height={20} />
        </div>
      </div>

      {/* ✅ แสดงรายการที่ค้นหา */}
      {searchResults.length > 0 && (
        <div className="flex gap-2 flex-wrap mt-7 mb-7">
          {searchResults.map((item) => (
            <button
              key={item.id}
              className="bg-[#FAF6E3] border border-gray-300 p-2 rounded-lg flex items-center gap-2 shadow-sm hover:bg-gray-200"
              onClick={() => addItem(item)}
            >
              {item.name} <span className="text-purple-600 font-bold">+</span>
            </button>
          ))}
        </div>
      )}

      {/* ✅ ปุ่มเลื่อนหน้าและการ์ด */}
      {selectedItems.length > 0 && (
        <div className="flex items-center mt-4">
          {/* ✅ ปุ่มเลื่อนซ้าย (ถ้าหน้าแรกให้ปิดปุ่ม) */}
          <button
            className={`p-2 rounded-full shadow-lg mx-2 ${currentPage === 0 ? "opacity-50 cursor-not-allowed" : "bg-white"}`}
            onClick={prevPage}
            disabled={currentPage === 0}
          >
            <ChevronLeft size={24} />
          </button>

          {/* ✅ Container ที่มีการ์ด (แสดงทีละ 5) */}
          <div className="flex gap-6 w-full justify-start px-2">
            {visibleItems.map((item) => (
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

          {/* ✅ ปุ่มเลื่อนขวา (ถ้าไม่มีหน้าเพิ่มให้ปิดปุ่ม) */}
          <button
            className={`p-2 rounded-full shadow-lg mx-2 ${endIndex >= selectedItems.length ? "opacity-50 cursor-not-allowed" : "bg-white"}`}
            onClick={nextPage}
            disabled={endIndex >= selectedItems.length}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}
    </div>
  );
}

// ✅ ใช้ getStaticProps ดึงข้อมูลจาก API
export async function getStaticProps() {
  const res = await fetch("http://localhost:3000/api/organizeinfo");
  const data = await res.json();

  return {
    props: { items: data },
    revalidate: 10, // รีเฟรชข้อมูลทุก 10 วินาที
  };
}
