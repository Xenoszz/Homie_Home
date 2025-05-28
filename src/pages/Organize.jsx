import { useState, useEffect, useRef } from "react";
import Menubar from "@/components/Menubar";
import { getOrganizeData } from "@/utils/fetchData.jsx";
import { calculatePagination } from "@/utils/calculations.jsx";
import SearchBar from "@/components/Organize/SearchBar.jsx";
import SearchResults from "@/components/Organize/SearchResults.jsx";
import CardContainer from "@/components/Organize/CardContainer.jsx";

export default function Organize() {
  // State สำหรับการค้นหาและแสดงผล
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]); // ผลการค้นหา
  const [selectedItems, setSelectedItems] = useState([]); // รายการที่ผู้ใช้เลือก
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [items, setItems] = useState([]); // เพิ่ม state สำหรับเก็บข้อมูล items
  const scrollRef = useRef(null);
  const itemsPerPage = 5; // ✅ แสดง 5 การ์ดต่อหน้า
  const { startIndex, endIndex } = calculatePagination(currentPage, itemsPerPage, selectedItems.length);

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getOrganizeData();
        setItems(result.props.items);
      } catch (error) {
        console.error('Error fetching organize data:', error);
        setItems([]);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize(); 
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ฟังก์ชันค้นหา - แสดงเฉพาะผลการค้นหา
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term.trim() === "") {
      setSearchResults([]);
    } else {
      const filtered = items.filter((item) =>
        item.name.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(filtered);
    }
  };

  // ฟังก์ชันเพิ่มไอเทมที่เลือก
  const addItem = (item) => {
    if (!selectedItems.some((i) => i.id === item.id)) {
      setSelectedItems([...selectedItems, item]);
    }
  };

  // ฟังก์ชัน Clear
  const handleClear = () => {
    setSelectedItems([]); 
    setSelectedItemId(null);
    setSearchTerm(""); 
    setSearchResults([]); 
  };

  // แก้ไขฟังก์ชัน nextPage
  const nextPage = () => {
    if (endIndex < selectedItems.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  // แก้ไขฟังก์ชัน prevPage
  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-[100vh] w-[100vw] overflow-y-auto">
      <Menubar />
      <h1 className="text-[24pt] md:text-[36pt] font-bold m-2 md:m-4">Organize</h1>

      <SearchBar 
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        handleClear={handleClear}
        isMobile={isMobile}
      />

      <SearchResults 
        searchTerm={searchTerm}
        searchResults={searchResults}
        addItem={addItem}
        scrollRef={scrollRef}
      />

      <CardContainer 
        selectedItems={selectedItems}
        selectedItemId={selectedItemId}
        setSelectedItemId={setSelectedItemId}
        currentPage={currentPage}
        endIndex={endIndex}
        nextPage={nextPage}
        prevPage={prevPage}
        isMobile={isMobile}
        startIndex={startIndex}
      />
    </div>
  );
}

