import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function IdeaCard({ item }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <div className="relative cursor-pointer w-full" onClick={() => setIsOpen(true)}>
      {/* Background image + Gradient */}
      <div className="relative w-full h-[180px] sm:h-[220px] md:h-[280px] lg:h-[320px] xl:h-[360px] rounded-lg overflow-hidden">
        {!!item.image && ( 
          <Image 
            src={item.image} 
            alt={item.name} 
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#D8DBBD] to-transparent opacity-70"></div>
        <h2 className="absolute bottom-4 left-4 text-[#131b38] text-2xl sm:text-3xl md:text-4xl font-bold">
          {item.name}
        </h2>
      </div>

      {/* Popup Modal */}
      {isOpen && (
        <div 
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-[80%] mx-4 h-[80%] overflow-hidden relative flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button - Fixed Position */}
            <button 
              className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 transition-colors z-10"
              onClick={() => setIsOpen(false)}
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Left Side - Fixed Image */}
            <div className="relative w-full md:w-1/2 h-[250px] md:h-auto rounded-lg overflow-hidden">
              {!!item.image && (
                <Image 
                  src={item.image} 
                  alt={item.name} 
                  fill
                  className="object-cover"
                />
              )}
            </div>

            {/* Right Side - Header fixed, content scrollable */}
            <div className="w-full md:w-1/2 flex flex-col h-full">
              {/* Fixed Header Section */}
              <div className="p-4 md:p-6">
                <h2 className="text-[32pt] md:text-[36pt] font-bold mb-6">{item.name}</h2>
                <p className="text-gray-700 mb-6 text-[18pt] md:text-[20pt]">{item.description}</p>
              </div>
              
              {/* Scrollable Content Section */}
              <div className="flex-1 overflow-y-auto px-4 md:px-6">
                {/* Main Details Section */}
                <div className="border-t pt-6 space-y-4">
                  {/* Theme Colors */}
                  {item.theme_color?.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-800 text-[20pt]">Theme Colors:</h4>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {item.theme_color.map((color, index) => (
                          <span 
                            key={`color-${index}`}
                            className="px-3 py-1 rounded-full text-[14pt] bg-gray-100"
                          >
                            {color}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Gaming Zone */}
                  {item.gaming_zone?.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-800 text-[20pt]">Gaming Zone:</h4>
                      <ul className="list-disc list-inside ml-4 text-gray-700 text-[16pt]">
                        {item.gaming_zone.map((item, index) => (
                          <li key={`gaming-${index}`}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Lighting */}
                  {item.lighting?.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-800 text-[20pt]">Lighting:</h4>
                      <ul className="list-disc list-inside ml-4 text-gray-700 text-[16pt]">
                        {item.lighting.map((item, index) => (
                          <li key={`lighting-${index}`}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Decor */}
                  {item.decor?.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-800 text-[20pt]">Decor:</h4>
                      <ul className="list-disc list-inside ml-4 text-gray-700 text-[16pt]">
                        {item.decor.map((item, index) => (
                          <li key={`decor-${index}`}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Storage */}
                  {item.storage?.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-800 text-[20pt]">Storage:</h4>
                      <ul className="list-disc list-inside ml-4 text-gray-700 text-[16pt]">
                        {item.storage.map((item, index) => (
                          <li key={`storage-${index}`}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tips */}
                  {item.tips && (
                    <div>
                      <h4 className="font-medium text-gray-800 text-[20pt]">Tips:</h4>
                      <p className="text-gray-700 ml-4 text-[16pt]">{item.tips}</p>
                    </div>
                  )}
                </div>

                {/* Bonus Ideas Section */}
                {item.bonus && (
                  <div className="mt-8 border-t pt-6 mb-6">
                    <h3 className="text-[24pt] font-semibold mb-4">Bonus Ideas:</h3>
                    
                    {/* Gear Section */}
                    {item.bonus.gear?.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-800 text-[20pt]">Gear:</h4>
                        <ul className="list-disc list-inside ml-4 text-gray-700 text-[16pt] space-y-2">
                          {item.bonus.gear.map((item, index) => (
                            <li key={`gear-${index}`}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Tech Section */}
                    {item.bonus.tech?.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-800 text-[20pt]">Tech:</h4>
                        <ul className="list-disc list-inside ml-4 text-gray-700 text-[16pt] space-y-2">
                          {item.bonus.tech.map((item, index) => (
                            <li key={`tech-${index}`}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* DIY Section */}
                    {item.bonus.DIY?.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-800 text-[20pt]">DIY:</h4>
                        <ul className="list-disc list-inside ml-4 text-gray-700 text-[16pt] space-y-2">
                          {item.bonus.DIY.map((item, index) => (
                            <li key={`diy-${index}`}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}