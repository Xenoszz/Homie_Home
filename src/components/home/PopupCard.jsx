import Image from "next/image";

export default function Popup({ isOpen, onClose, title, spaceSize, imageSrc, arrangement, tips }) {
  if (!isOpen) return null; // ไม่แสดงถ้า isOpen = false

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#B6AD9D] bg-opacity-50 z-50">
      <div className="bg-[#F5EAD6] p-6 rounded-lg shadow-lg w-[100vh] h-[70vh] relative flex flex-col">
        {/* ปุ่มปิด */}
        <button
          className="absolute top-3 right-3 text-xl font-bold text-gray-600 hover:text-black"
          onClick={onClose}
        >
          &times;
        </button>

        {/* ✅ Header ส่วนหัว */}
        <div className="flex justify-between items-center bg-[#DAC7A3] px-4 py-2 rounded-md">
          <h2 className="text-2xl font-bold underline">{title}</h2>
          <p className="text-md font-semibold">Space: {spaceSize}</p>
        </div>

        {/* ✅ เนื้อหาหลัก */}
        <div className="flex mt-4">
          {/* 📌 คอลัมน์ซ้าย: รูปภาพ */}
          <div className="w-1/2 flex justify-center items-center">
          <Image 
  src={imageSrc} 
  alt="Popup Image" 
  width={300}  // ✅ เพิ่ม width
  height={200} // ✅ เพิ่ม height
  className="w-[90%] h-[90%] object-contain rounded-lg shadow-md" 
/>

          </div>

          {/* 📌 คอลัมน์ขวา: ข้อมูล Arrangement Order & Tips */}
          <div className="w-1/2 flex flex-col justify-start p-4 bg-[#FDF8E3] rounded-md shadow-inner">
            {/* ✅ Arrangement Order */}
            <h3 className="text-lg font-bold mb-2">Arrangement Order</h3>
            <ul className="list-decimal list-inside text-gray-700 text-md">
              {arrangement.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            {/* ✅ Little Tips */}
            <h3 className="text-lg font-bold mt-4">Little Tips!</h3>
            <ul className="list-disc list-inside text-gray-600 text-md">
              {tips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
