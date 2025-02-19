import Picture from "/public/Card.jpg"
import Image from "next/image";

export default function Homecard() {
    return(
        <div className="w-[30%] h-[85%] flex border border-purple-600 bg-gradient-to-t from-[#D8DBBD] to-[#ffffff00] ">
            <Image src={Picture}/>
        </div>
    );
}