import Menubar from "@/components/Menubar.jsx";
import Head from 'next/head';
import { SquarePlus, CircleX, Edit, Loader } from 'lucide-react';
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { checkAuth } from "@/utils/auth.jsx";
import { fetchRooms } from "@/utils/fetchData.jsx";
import { createRoom, removeRoom, updateRoomName } from "@/utils/sendData.jsx";
import { roomTemplates } from "@/utils/roomTemplates.jsx";
import RoomCard from "@/components/Todolist/RoomCard.jsx";
import RoomSelectionPopup from "@/components/Todolist/RoomSelectionPopup.jsx";
import DesktopRoomCard from "@/components/Todolist/DesktopRoomCard.jsx";
import DesktopRoomSelectionPopup from "@/components/Todolist/DesktopRoomSelectionPopup.jsx";

export default function Todolist() {
    const [isOpen, setIsOpen] = useState(false);
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(null);
    const [editName, setEditName] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    // Auth.jsx Check authentication and fetch rooms
    useEffect(() => {
        checkAuth(router, setIsAuthenticated, () => fetchRooms(setRooms, setLoading));
    }, [router]);

    // roomService.jsx Handle room selection and creation
    const handleRoomSelection = (roomTemplate) => {
        createRoom(roomTemplate, setRooms, rooms, setIsOpen);
    };

    // roomService.jsx Remove room
    const handleRemoveRoom = (roomId) => {
        removeRoom(roomId, setRooms, rooms);
    };

    // Navigate to activity page
    const navigateToActivity = (roomId) => {
        router.push({
            pathname: "/TodoActivity",
            query: { roomId }
        });
    };

    // Enter edit mode for room name
    const handleEditClick = (e, roomId, currentName) => {
        e.stopPropagation();
        setEditMode(roomId);
        setEditName(currentName);
    };

    // roomService.jsx Save edited room name
    const handleSaveRoomName = (roomId) => {
        updateRoomName(roomId, editName, setRooms, rooms, setEditMode);
    };

    // Cancel edit mode
    const handleCancelEdit = () => {
        setEditMode(null);
    };

    if (loading) {
        return (
            <div className="h-screen w-screen flex justify-center items-center">
                <Loader className="w-12 h-12 animate-spin text-blue-500" /> 
            </div>
        );
    }

    return (
        <div className="h-screen w-screen">
            <Head>
                <title>Todolist</title>
            </Head>
            <Menubar />
            <div className="p-4">
                <h1 className="font-bold text-[22pt] md:text-[32pt] text-[#58482D]">Add Cleaning Space</h1>
                {/* Mobile: 2 columns grid, card size, add button at last */}
                <div className="block md:hidden">
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        {rooms.map((room) => (
                            <RoomCard
                                key={room._id}
                                room={room}
                                onDelete={handleRemoveRoom}
                                onEdit={handleEditClick}
                                onNavigate={navigateToActivity}
                                editMode={editMode}
                                editName={editName}
                                onEditNameChange={e => setEditName(e.target.value)}
                                onSaveEdit={handleSaveRoomName}
                                onCancelEdit={handleCancelEdit}
                            />
                        ))}
                        {/* Add Room Button: always last */}
                        <button
                            className="flex flex-col justify-center items-center rounded-xl aspect-[1/1.05] bg-[#D8C3A4] hover:bg-[#B59F78] transition-colors shadow-lg"
                            onClick={() => setIsOpen(true)}
                        >
                            <SquarePlus className="w-8 h-8 text-[#58482D]" />
                        </button>
                    </div>
                    {/* Room Selection Popup */}
                    <RoomSelectionPopup
                        isOpen={isOpen}
                        onClose={() => setIsOpen(false)}
                        roomTemplates={roomTemplates}
                        onRoomSelect={handleRoomSelection}
                    />
                </div>
                {/* Desktop: original horizontal scroll cards */}
                <div className="hidden md:block">
                    <div className="h-[70vh] flex overflow-x-auto p-4 gap-4">
                        {/* Room Cards */}
                        {rooms.map((room) => (
                            <DesktopRoomCard
                                key={room._id}
                                room={room}
                                onDelete={handleRemoveRoom}
                                onEdit={handleEditClick}
                                onNavigate={navigateToActivity}
                                editMode={editMode}
                                editName={editName}
                                onEditNameChange={e => setEditName(e.target.value)}
                                onSaveEdit={handleSaveRoomName}
                                onCancelEdit={handleCancelEdit}
                            />
                        ))}

                        {/* Add Room Button */}
                        <div>
                            <button
                                className="flex justify-center items-center h-full min-w-[25vw] bg-[#B59F78] transform scale-95 hover:scale-100 transition duration-300 hover:bg-[#8d7c5f] rounded-md"
                                onClick={() => setIsOpen(true)}
                            >
                                <SquarePlus className="w-[10%] h-[10%] text-[#58482D]" />
                            </button>

                            {/* Room Selection Popup */}
                            <DesktopRoomSelectionPopup
                                isOpen={isOpen}
                                onClose={() => setIsOpen(false)}
                                roomTemplates={roomTemplates}
                                onRoomSelect={handleRoomSelection}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}