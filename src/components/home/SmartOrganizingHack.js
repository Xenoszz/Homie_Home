import Image from 'next/image';
import OrganizePage from '/public/home.jpg';

export function SmartOrganizingHack({ onOrganizeClick, isMobile = false }) {
  if (isMobile) {
    return (
      <div className="relative mt-4 rounded-[1rem] h-[90px] mb-4">
        <Image src={OrganizePage} alt="Card" className="w-full h-full object-cover rounded-[1rem] object-[60%_70%]" />
        <div className="absolute inset-0 bg-gradient-to-l from-[#B59F78] to-[#ffffff00] bg-opacity-70 rounded-[1rem] flex flex-col items-end">
          <h1 className="m-2 font-bold text-[16pt]">Smart Organizing Hack</h1>
          <button 
            className="m-2 font-bold text-[12pt] transition-transform duration-300 hover:scale-110" 
            onClick={onOrganizeClick}
          >
            Organize Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative mt-16 ml-4 mr-4 rounded-[1rem] h-[30vh]">
      <Image src={OrganizePage} alt="Card" className="w-full h-full object-cover rounded-[1rem] object-[60%_70%]" />
      <div className="absolute inset-0 bg-gradient-to-l from-[#B59F78] to-[#ffffff00] bg-opacity-70 rounded-[1rem] flex flex-col items-end">
        <h1 className="m-3 font-bold text-[32pt]">Smart Organizing Hack</h1>
        <button 
          className="m-3 font-bold text-[24pt] transition-transform duration-300 hover:scale-110" 
          onClick={onOrganizeClick}
        >
          Organize Now
        </button>
      </div>
    </div>
  );
} 