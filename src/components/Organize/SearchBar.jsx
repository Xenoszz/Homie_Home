import Image from "next/image";
import SearchIcon from "/public/Search_alt_fill.png";
import { Trash2 } from 'lucide-react';

export default function SearchBar({ 
  searchTerm, 
  handleSearch, 
  handleClear, 
  isMobile 
}) {
  return (
    <div className="flex items-center gap-2 md:gap-3">
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
      <button 
        onClick={handleClear}
        className="flex items-center gap-1 md:gap-2 p-1 md:p-2 rounded-lg bg-[#FAF6E3] border-2 border-[#4F4534] hover:bg-gray-100 transition-colors mr-2 md:mr-4"
      >
        <Trash2 size={isMobile ? 16 : 20} className="text-[#4F4534]" />
        <span className="text-[#4F4534] font-medium text-sm md:text-base">Clear</span>
      </button>
    </div>
  );
} 