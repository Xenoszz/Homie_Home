import Menubar from "@/components/Menubar";

export default function Todolist() {
    return(
        <div className="h-[100vh] w-[100vw] border border-yellow-700">
            <Menubar/>
            <div className="p-4">
                <h1 className="font-bold text-[32pt]">Add Cleaning Space</h1>
                <div></div>
            </div>
        </div>
    );
}