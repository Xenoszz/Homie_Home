import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Menubar from "@/components/Menubar";
import SearchIcon from "/public/Search_alt_fill.png";
import IdeaCard from "@/components/Ideacard";

export default function Ideas() {
  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  // ดึงข้อมูลจาก API
  useEffect(() => {
    axios.get("http://localhost:8000/api/idea")
      .then(response => setItems(response.data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  // ค้นหาข้อมูล
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen w-full">
      {/* Menubar ที่ sticky อยู่แล้ว */}
      <div className="sticky top-0 left-0 w-full z-50">
        <Menubar />
      </div>
      
      {/* ส่วนหัวข้อและ search bar ที่ต้องการให้ sticky */}
      <div className="sticky top-16 bg-white z-40 px-6 pb-4">
        <h1 className="text-[36pt] font-bold mb-2">Idea Inspiration</h1>

        {/* Search Bar */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center border-4 rounded-xl border-[#4F4534] bg-[#FAF6E3] p-2 w-[450px]">
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
      </div>

      {/* ส่วนแสดงการ์ดที่สามารถเลื่อนได้ */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        <div className="grid grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <IdeaCard key={item.id} item={item} onClick={() => setSelectedItem(item)} />
          ))}
        </div>
      </div>

      {/* Popup Modal */}
      {selectedItem && <IdeaPopup item={selectedItem} onClose={() => setSelectedItem(null)} />}
    </div>
  );
}