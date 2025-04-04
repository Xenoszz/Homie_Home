import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Menubar from "@/components/Menubar";
import SearchIcon from "/public/Search_alt_fill.png";
import IdeaCard from "@/components/Ideacard"; // ✅ นำเข้า IdeaCard

export default function Ideas() {
  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  // ดึงข้อมูลจาก API
  useEffect(() => {
    axios.get("http://localhost:8000/api/rooms") // URL ของ API ที่คุณสร้างใน backend
      .then(response => setItems(response.data)) // ตั้งค่า state ให้กับข้อมูลห้องที่ดึงมา
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  // ค้นหาข้อมูล
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-[100vh] w-[100vw] p-4">
      <Menubar />
      <h1 className="text-[36pt] font-bold mb-4">Idea Inspiration</h1>

      {/* Search Bar */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center border-4 rounded-xl border-[#4F4534] bg-[#FAF6E3] p-2 w-[30%]">
          <input
            type="text"
            placeholder='Search e.g. "Minimal room, Desktop Room"'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-none outline-none bg-transparent flex-1 p-1 text-[15pt] text-[#4F4534]"
          />
          <Image src={SearchIcon} alt="search" width={20} height={20} />
        </div>
      </div>

      {/* แสดงรายการไอเดีย */}
      <div className="grid grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <IdeaCard key={item.id} item={item} onClick={() => setSelectedItem(item)} />
        ))}
      </div>

      {/* Popup Modal */}
      {selectedItem && <IdeaPopup item={selectedItem} onClose={() => setSelectedItem(null)} />}
    </div>
  );
}
