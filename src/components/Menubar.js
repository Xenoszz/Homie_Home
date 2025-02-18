import { Afacad } from "next/font/google"; // Import Afacad
import Image from "next/image";
import Logo from "/public/Group 40.png"

const afacadFont = Afacad({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-afacad", // ใช้ตัวแปร CSS เพื่อให้ใช้งานกับ Tailwind ได้
});

export default function Menubar() {
  return (
    <div className={`${afacadFont.variable} font-afacad min-h-screen p-4`}>
        <div className="flex justify-between border border-red-500">
            <Image src={Logo} alt="Logo" className="w-[10%] h-[10%]" />
            <div className="flex justify-end w-[50%] border border-blue-700">
                <div className="bg-[#2A3663] flex justify-around m-2 w-[70%] rounded-[10px] border border-blue-700">
                    <button className="flex items-center justify-center font-bold text-[24pt] w-[60%] transition-all duration-500 ease-in-out hover:bg-[#131b38] border border-blue-700">
                        <h1 className="text text-white">Organize</h1>
                    </button>
                    <button className="flex items-center justify-center font-bold text-[24pt] w-[60%] transition-all duration-500 ease-in-out hover:bg-[#131b38] border border-blue-700">
                        <h1 className="text text-white">To-do List</h1>
                    </button>
                    <button className="flex items-center justify-center font-bold text-[24pt] w-[60%]  transition-all duration-500 ease-in-out hover:bg-[#131b38] border border-blue-700">
                        <h1 className="text text-white">Ideas</h1>
                    </button>

                </div>
                <div className="flex justify-around items-center m-2 w-[30%] bg-[#B59F78] rounded-[10px]">
                    <div class="flex items-center w-10 h-10 bg-white rounded-full"></div>
                    <div className="flex justify-center font-bold text-[24pt] w-[60%]">
                        <h1 className="text text-white">Profile</h1>
                    </div>
                    
                </div>
            </div>
            
        </div>

    </div>
  );
}
