import Menubar from "@/components/Menubar";
import { SquarePlus, CircleX } from 'lucide-react';
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Todolist() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedRooms, setSelectedRooms] = useState([]);
    const router = useRouter();

    const rooms = [
        { id: 1, name: "Bedroom", img: "/bedroom.jpg" },
        { id: 2, name: "Bathroom", img: "/bathroom.jpg" },
        { id: 3, name: "Kitchen", img: "/kitchen.jpg" },
        { id: 4, name: "Guest room", img: "/guestroom.jpg" },
        { id: 5, name: "Storage room", img: "/storage.jpg" },
        { id: 6, name: "Laundry room", img: "/laundry.jpg" },
    ];

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedRooms = localStorage.getItem('selectedRooms');
            if (savedRooms) {
                setSelectedRooms(JSON.parse(savedRooms));
            }
        }
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('selectedRooms', JSON.stringify(selectedRooms));
        }
    }, [selectedRooms]);

    const handleRoomSelection = (room) => {
        const newRoom = {
            ...room,
            name: room.name,
            isRenaming: false
        };
        const updatedRooms = [...selectedRooms, newRoom];
        setSelectedRooms(updatedRooms);
    };

    const removeRoom = (index) => {
        const updatedRooms = [...selectedRooms];
        updatedRooms.splice(index, 1);
        setSelectedRooms(updatedRooms);
    };

    const navigateToActivity = (roomId) => {
        router.push({
            pathname: "/TodoActivity",
            query: { roomId: roomId }
        });
    };

    return (
        <div className="h-screen w-screen border border-yellow-700">
            <Menubar />
            <div className="p-4">
                <h1 className="font-bold text-[32pt]">Add Cleaning Space</h1>
                <div className="border border-red-400 h-[70vh] flex overflow-x-auto">
                    {selectedRooms.map((room, index) => (
                        <div
                            key={index}
                            className="relative h-full min-w-[25vw] mr-4 rounded-md overflow-hidden transform scale-95 hover:scale-100 transition duration-300 border border-blue-500"
                        >
                            <button
                                className="absolute top-2 right-2 z-10 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeRoom(index);
                                }}
                            >
                                <CircleX size={20} />
                            </button>

                            <div
                                className="relative w-full h-full cursor-pointer"
                                onClick={() => navigateToActivity(room.id)}
                            >
                                <Image
                                    src={room.img}
                                    alt={room.name}
                                    fill
                                    style={{ objectFit: "cover" }}
                                />
                                <div className="absolute bottom-0 w-full bg-blue-100 bg-opacity-80 p-2">
                                    <div className="flex justify-between items-center">
                                        {room.isRenaming ? (
                                            <input
                                                type="text"
                                                value={room.name}
                                                onChange={(e) => {
                                                    const updatedRooms = [...selectedRooms];
                                                    updatedRooms[index].name = e.target.value;
                                                    setSelectedRooms(updatedRooms);
                                                }}
                                                onBlur={() => {
                                                    const updatedRooms = [...selectedRooms];
                                                    if (room.name.trim() === '') {
                                                        updatedRooms[index].name = 'Untitled Room';
                                                    }
                                                    updatedRooms[index].isRenaming = false;
                                                    setSelectedRooms(updatedRooms);
                                                }}
                                                autoFocus
                                                className="bg-white p-1 text-black text-lg rounded-md"
                                            />
                                        ) : (
                                            <h3
                                                className="text-black font-bold text-xl cursor-pointer"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    const updatedRooms = [...selectedRooms];
                                                    updatedRooms[index].isRenaming = true;
                                                    setSelectedRooms(updatedRooms);
                                                }}
                                            >
                                                {room.name} ✏️
                                            </h3>
                                        )}
                                    </div>
                                    <div className="flex justify-between items-center mt-1">
                                        <div className="bg-green-100 h-2 w-32 rounded-full overflow-hidden">
                                            <div className="bg-green-500 h-full w-[60%]"></div>
                                        </div>
                                        <p className="text-sm">60%</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div>
                        <button
                            className="flex justify-center items-center h-full min-w-[25vw] bg-[#B59F78] transform scale-95 hover:scale-100 
                            transition duration-300 hover:bg-[#8d7c5f] rounded-md border border-blue-500"
                            onClick={() => setIsOpen(true)}
                        >
                            <SquarePlus className="w-[10%] h-[10%] text-[#58482D]" />
                        </button>

                        {isOpen && (
                            <div
                                className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
                                onClick={() => setIsOpen(false)}
                            >
                                <div
                                    className="relative p-8 bg-[#F5F2E8] w-[80%] max-w-4xl rounded-lg shadow-xl border-2 border-[#B6AD9D]"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <button
                                        className="absolute top-2 right-2 text-red-600 hover:text-red-800 transition"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <CircleX size={32} />
                                    </button>
                                    <h1 className="text-[24pt] flex justify-center font-bold">Select Room</h1>
                                    <div className="grid grid-cols-2 gap-6 mt-4">
                                        {rooms.map((room) => (
                                            <div
                                                key={room.id}
                                                className="cursor-pointer overflow-hidden rounded-xl border border-[#B6AD9D] shadow-md hover:shadow-lg transition duration-300 transform hover:scale-[1.02]"
                                                onClick={() => handleRoomSelection(room)}
                                            >
                                                <div className="h-32 relative">
                                                    <Image
                                                        src={room.img}
                                                        alt={room.name}
                                                        fill
                                                        style={{ objectFit: "cover" }}
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-r from-[#FAF6E3] from-5% to-transparent"></div>
                                                    <div className="absolute top-3 left-4 text-[#4F4534] font-semibold text-[20pt] drop-shadow-md">
                                                        {room.name}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
