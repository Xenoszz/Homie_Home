import Image from "next/image";

export default function Spaceguide({ imageSrc }) {
  return (
    <div className="relative w-full max-w-sm h-full flex border border-purple-600 rounded-[1rem] overflow-hidden shadow-lg">
      {/* รูปภาพที่รับมาจาก Props */}
      <Image
        src={imageSrc}
        alt="Card"
        className="w-full h-full object-cover"
      />

      {/* Layer Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#D8DBBD] to-[#ffffff00] opacity-70"></div>
    </div>
  );
}
