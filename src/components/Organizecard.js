import Image from "next/image";
import { motion } from "framer-motion";

export default function OrganizeCard({ item, isSelected, onClick }) {
  return (
    <motion.div
      initial={{ width: "30vh" }} // ปรับความกว้างเริ่มต้นให้มากขึ้น
      animate={isSelected ? { width: "70vh" } : { width: "30vh" }} // ปรับขนาดเมื่อถูกเลือก
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="h-[50vh] bg-white rounded-2xl shadow-md overflow-hidden flex flex-row relative cursor-pointer transition-all"
      onClick={onClick}
    >
      {/* ✅ รูปภาพ */}
      <div className="w-[30vh] h-full relative"> {/* ปรับขนาดรูปภาพให้กว้างขึ้น */}
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
          animate={{ width: "100vh", opacity: 1 }} // ปรับให้กว้างขึ้น
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="bg-[#FAF3E0] p-6 shadow-lg rounded-r-2xl flex-1 overflow-y-auto"
        >
          <h2 className="text-xl font-bold">{item.description}</h2> {/* ขยายขนาดตัวอักษร */}
          <ul className="mt-2 list-disc pl-5 space-y-2 text-md">
            {item.details.map((detail, index) => (
              <li key={index}> {detail}</li>
            ))}
          </ul>
          <h3 className="mt-4 font-bold text-lg">DIY Ideas</h3>
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
