import Image from "next/image";

export default function IdeaCard({ item, onItemClick }) {
  return (
    <div className="relative cursor-pointer w-full" onClick={() => onItemClick(item)}>
      {/* Background image + Gradient */}
      <div className="relative w-full h-[180px] sm:h-[220px] md:h-[280px] lg:h-[320px] xl:h-[360px] rounded-xl overflow-hidden">
        {!!item.image && ( 
          <Image 
            src={item.image} 
            alt={item.name} 
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#D8DBBD] to-transparent opacity-70"></div>
        {/* Show name on both mobile and desktop */}
        <h2 className="absolute bottom-4 left-4 text-[#131b38] text-2xl sm:text-3xl md:text-4xl font-bold">
          {item.name}
        </h2>
      </div>
    </div>
  );
}