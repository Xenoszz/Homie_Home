export default function SearchResults({ 
  searchTerm, 
  searchResults, 
  addItem, 
  scrollRef 
}) {
  if (!searchTerm || searchResults.length === 0) return null;

  return (
    <div className="flex items-center gap-1 md:gap-3 mt-4 md:mt-7 mb-4 md:mb-7 ml-2 md:ml-4">
      <div ref={scrollRef} className="flex gap-2 md:gap-3 flex-nowrap overflow-x-auto scrollbar-hide flex-1">
        {searchResults.map((item) => (
          <button
            key={item.id}
            onClick={() => addItem(item)}
            className="bg-[#FAF6E3] border border-gray-300 p-1 md:p-2 rounded-md md:rounded-lg flex items-center gap-1 md:gap-2 shadow-sm hover:bg-gray-200 text-sm md:text-base flex-shrink-0"
          >
            {item.name} <span className="text-purple-600 font-bold">+</span>
          </button>
        ))}
      </div>
    </div>
  );
} 