import Menubar from "@/components/Menubar";
import { ArrowLeft } from 'lucide-react';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function TodoActivity() {
    const router = useRouter();
    const [roomName, setRoomName] = useState("");
    
    useEffect(() => {
        // ตรวจสอบว่าโค้ดทำงานบนฝั่งไคลเอนต์
        if (typeof window !== 'undefined') {
            // ดึงข้อมูลห้องจาก query parameters
            const { roomId } = router.query;
            
            if (roomId) {
                // ดึงข้อมูลห้องทั้งหมดจาก localStorage
                const rooms = JSON.parse(localStorage.getItem('selectedRooms') || '[]');
                console.log("ห้องที่พบใน localStorage:", rooms);
                // หาห้องที่ตรงกับ ID
                const room = rooms.find(room => room.id.toString() === roomId.toString());
                if (room) {
                    console.log("พบห้อง:", room);
                    setRoomName(room.name);
                } else {
                    console.log("ไม่พบห้องที่มี ID:", roomId);
                }
            }
        }
    }, [router.query]);
    
    const handleGoBack = () => {
        router.push('/Todolist');
    };
    
    return (
        <div className="h-screen w-screen">
            <Menubar />
            <div className="p-4">
                <div className="flex items-center mb-4">
                    <button 
                        onClick={handleGoBack}
                        className="flex items-center mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="text-2xl font-bold">
                        {roomName ? `${roomName} - Activities` : 'Activities'}
                    </h1>
                </div>
                
                <div className="p-4 border rounded-lg">
                    <h2 className="text-lg mb-4">This is TodoActivity Page</h2>
                    <p>You can add the activity details for this room here.</p>
                </div>
            </div>
        </div>
    );
}