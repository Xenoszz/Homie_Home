import Image from "next/image";
import { motion } from "framer-motion";

export default function OrganizeCard({ item, isSelected, onClick }) {
  return (
    <motion.div
      initial={{ width: "20vh" }}
      animate={isSelected ? { width: "55vh" } : { width: "20vh" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="h-[50vh] bg-white rounded-2xl shadow-md overflow-hidden flex flex-row relative cursor-pointer transition-all"
      onClick={onClick}
    >
      {/* ✅ รูปภาพ */}
      <div className="w-[20vh] h-full relative">
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
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "35vh", opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="bg-[#FAF3E0] p-4 shadow-lg rounded-r-2xl flex-1 overflow-y-auto"
        >
          <h2 className="text-lg font-bold">{item.description}</h2>
          <ul className="mt-2 list-disc pl-4 space-y-1 text-sm">
            {item.details.map((detail, index) => (
              <li key={index}> {detail}</li>
            ))}
          </ul>
          <h3 className="mt-3 font-bold">DIY Ideas</h3>
          <ul className="list-disc pl-4 space-y-1 text-sm">
            {item.diyIdeas.map((idea, index) => (
              <li key={index}> {idea}</li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.div>
  );
}
