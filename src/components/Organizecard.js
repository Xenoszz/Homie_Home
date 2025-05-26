import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from 'react';
export default function OrganizeCard({ item, isSelected, onClick }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  return (
    <motion.div
      initial={{ width: "30vh" }} // ปรับความกว้างเริ่มต้นให้มากขึ้น
        animate={
          isSelected
            ? { width: isMobile ? '60vw' : '200vw' }
            : { width: isMobile ? '40vw' : '60vw' }
        }
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`overflow-hidden flex flex-col md:flex-row relative cursor-pointer transition-all  
        ${!isSelected ? 'bg-white rounded-2xl shadow-md' : ''} 
        ${isSelected ? 'h-[40vh] md:h-[50vh]' : 'h-auto md:h-[50vh]'} md:bg-white md:rounded-2xl md:shadow-md`}
      onClick={onClick}
    >
      {/* ✅ รูปภาพ */}
      <div className={`${isSelected ? 'hidden md:block' : 'block'} w-full md:w-full md:max-w-[350px] h-48 md:h-full relative ${!isSelected ? 'rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none' : ''}`}>
        <Image
          src={item.imageSrc}
          alt={item.name}
          width={500}
          height={500}
          className="w-full h-full object-cover rounded-l-2xl"
        />
        {/* ✅ Gradient Overlay */}
        <div className="absolute bottom-0 w-full h-[25%] bg-gradient-to-t from-[#D8DBBD] to-transparent"></div>
        {/* ✅ ชื่อไอเท็ม */}
        <div className="absolute bottom-0 w-full p-2 text-center text-black text-[20pt] font-bold pl-3">
          {item.name}
        </div>
      </div>

      {/* ✅ ข้อมูล (แสดงเฉพาะเมื่อถูกเลือก) */}
      {isSelected && (
        <motion.div
          initial={{ width: 20, opacity: 0 }}
          animate={{ width: "100%", opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="bg-[#FAF3E0] p-6 shadow-lg rounded-r-2xl flex-1 overflow-y-auto 
                    md:static md:flex-1 md:rounded-r-2xl 
                    fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] h-[50%] rounded-2xl md:translate-x-0 md:translate-y-0 md:w-auto md:h-auto z-20"
        >
          <h2 className="text-lg md:text-xl font-bold">{item.description}</h2>
          <ul className="mt-2 list-disc pl-5 space-y-2 text-md">
            {item.details.map((detail, index) => (
              <li key={index}> {detail}</li>
            ))}
          </ul>
          <h3 className="mt-3 md:mt-4 font-bold text-base md:text-lg">DIY Ideas</h3>
          <ul className="list-disc pl-5 space-y-2 text-md">
            {item.diyIdeas.map((idea, index) => (
              <li key={index}> {idea}</li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.div>
  );
}