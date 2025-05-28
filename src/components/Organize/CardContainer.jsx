import { ChevronLeft, ChevronRight } from "lucide-react";
import  CardComponent  from "@/components/Organize/Organizecard.jsx";

export default function CardContainer({
  selectedItems,
  selectedItemId,
  setSelectedItemId,
  currentPage,
  endIndex,
  nextPage,
  prevPage,
  isMobile,
  startIndex
}) {
  if (selectedItems.length === 0) return null;

  return (
    <div className="flex items-center mt-4 justify-center w-full">
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

      <div className={`
        ${isMobile 
          ? 'grid grid-cols-2 gap-2 md:gap-4 px-2 md:px-4 w-full' 
          : 'flex flex-row gap-2 md:gap-4 w-[90%] justify-center items-center'
        }
      `}>
        {selectedItems.slice(startIndex, endIndex).map((item) => (
          <div className="w-full md:w-[80%] transition-all duration-300" key={item.id}>
            <CardComponent
              item={item}
              isSelected={selectedItemId === item.id}
              onClick={() => setSelectedItemId(selectedItemId === item.id ? null : item.id)}
            />
          </div>
        ))}
      </div>

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
  );
} 