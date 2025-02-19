import Menubar from "@/components/Menubar";
import Spaceguide from "@/components/Spaceguide"

export default function Home() {
  return (
    <div className=" h-[100vh] w-[100vw] border border-yellow-700">
      <Menubar/>
      
      <div className="flex p-3 h-[45vh] gap-x-5 border border-orange-700">
        <div className="flex flex-col border border-pink-600 w-[50vw]">
          <h3 className="text text-[36pt] font-bold">Dashboard</h3>
          <div className="h-[100vh] bg-[#FAF6E3] rounded-[1rem] flex border border-blue-500">
            <div className="border border-green-600 w-[50%]"></div>
            <div className="border border-green-600 w-[50%]"></div>
          </div>
        </div>
      <div className="flex flex-col border border-pink-600 w-[50vw]">
        <h3 className="text text-[36pt] font-bold">Space Guide</h3>
        <div className="h-[100vh] flex justify-around border border-purple-600">
          <Spaceguide/>
          <Spaceguide/>
          <Spaceguide/>

        </div>
        
      </div>

      </div>
      <div className="p-3 h-[30vh] border border-orange-700"></div>

    </div>
  );
}