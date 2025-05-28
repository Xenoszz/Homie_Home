import { useState, useRef, useEffect } from 'react';
import Spaceguide from './Spaceguide';

export function SpaceGuideSection({ spaceData, isMobile = false }) {
  const [page, setPage] = useState(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const scrollRef = useRef(null);
  const cardsPerPage = 4;
  const totalPages = Math.ceil(spaceData.length / cardsPerPage);

  useEffect(() => {
    const checkScroll = () => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setShowLeftArrow(scrollLeft > 0);
        setShowRightArrow(scrollLeft + clientWidth < scrollWidth);
      }
    };

    if (scrollRef.current) {
      scrollRef.current.addEventListener("scroll", checkScroll);
      checkScroll();
    }

    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener("scroll", checkScroll);
      }
    };
  }, [spaceData]);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.children[0].clientWidth;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleNext = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  const handlePrev = () => {
    if (page > 0) setPage(page - 1);
  };

  if (isMobile) {
    const pagedData = spaceData.slice(page * cardsPerPage, (page + 1) * cardsPerPage);
    
    return (
      <>
        <h3 className="text-[22pt] font-bold mt-2 mb-2">Space Guide</h3>
        <div className="relative flex justify-center">
          <div className="relative">
            <div className="grid grid-cols-2 gap-3 min-h-[240px]">
              {pagedData.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-xl overflow-hidden shadow bg-white"
                  style={{
                    width: '180px',
                    height: '200px',
                    minWidth: '170px',
                    minHeight: '180px',
                    maxWidth: '190px',
                    maxHeight: '220px'
                  }}
                >
                  <Spaceguide
                    imageSrc={item.imageSrc}
                    title={item.title}
                    description={item.description}
                    extraInfo={{ arrangement: item.arrangement, tips: item.tips }}
                    isMobile={true}
                  />
                </div>
              ))}
            </div>
            {totalPages > 1 && (
              <>
                {page > 0 && (
                  <button
                    className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow p-2"
                    onClick={handlePrev}
                    aria-label="Previous"
                    style={{ zIndex: 2 }}
                  >
                    <span className="text-2xl">{'<'}</span>
                  </button>
                )}
                {page < totalPages - 1 && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col items-center z-10">
                    <button
                      className="bg-white rounded-full shadow p-2 mb-1"
                      onClick={handleNext}
                      aria-label="Next"
                    >
                      <span className="text-2xl">{'>'}</span>
                    </button>
                    <span className="text-xs text-[#2A3663] font-bold">More</span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="flex flex-col w-[50vw] justify-between relative">
      <h3 className="text-[36pt] font-bold mt-0 mb-4">Space Guide</h3>
      {showLeftArrow && (
        <button
          className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-gray-300 bg-opacity-90 rounded-full w-12 h-12 flex items-center justify-center text-gray-800 text-3xl shadow-lg hover:bg-opacity-100 transition-all z-10"
          onClick={() => handleScroll("left")}
          aria-label="Previous cards"
        >
          &#10094;
        </button>
      )}
      <div className="h-[33vh] overflow-hidden relative">
        <div ref={scrollRef} className="flex w-full h-full overflow-x-auto scroll-smooth">
          {spaceData.map((group, groupIndex) => (
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
  );
} 