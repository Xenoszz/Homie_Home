import { useState, useEffect } from "react";
import Image from "next/image";
import Menubar from "@/components/Menubar";
import SearchIcon from "/public/Search_alt_fill.png";
import IdeaCard from "@/components/ideas/Ideacard";
import IdeaPopup from "@/components/ideas/IdeaPopup";
import { getIdeasData, getItemDetails } from "@/utils/fetchData.jsx";

export default function Ideas() {
  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);

  // fetchData.jsx   Fetch IdeasData
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getIdeasData();
        setItems(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Search data
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // fetchData.jsx   Fetch getItemDetails
  const handleItemClick = async (item) => {
    setLoading(true);
    try {
      const itemDetails = await getItemDetails(item);
      setSelectedItem(itemDetails);
    } catch (error) {
      console.error("Error fetching item details:", error);
      setSelectedItem(item);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen w-full">
      {/* Sticky Menubar */}
      <div className="sticky top-0 left-0 w-full z-50">
        <Menubar />
      </div>

      {/* Sticky Header and Search */}
      <div className="sticky top-16 bg-white z-40 px-4 md:px-6 pb-2 pt-4 md:pt-6"> 
        <h1 className="text-3xl md:text-[36pt] font-bold mb-4 md:mb-6">Idea Inspiration</h1> 

        {/* Search Bar */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center border-4 rounded-xl border-[#4F4534] bg-[#FAF6E3] p-2 w-full max-w-md">
            <input
              type="text"
              placeholder='Search e.g. "Minimal room, Desktop Room"'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-none outline-none bg-transparent flex-1 p-1 text-base md:text-[15pt] text-[#4F4534]"
            />
            <Image src={SearchIcon} alt="search" width={20} height={20} />
          </div>
        </div>
      </div>

      {/* Card Grid */}
      <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {filteredItems.map((item) => (
            <div key={item.name}>
              <IdeaCard item={item} onItemClick={handleItemClick} />
            </div>
          ))}
        </div>
      </div>

      {/* Loading Indicator */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        </div>
      )}
      
      {/* Popup Modal */}
      {selectedItem && <IdeaPopup item={selectedItem} onClose={() => setSelectedItem(null)} />}
    </div>
  );
}