import Image from "next/image";
import { CircleX, Edit } from 'lucide-react';

export default function DesktopRoomCard({
    room,
    onDelete,
    onEdit,
    onNavigate,
    editMode,
    editName,
    onEditNameChange,
    onSaveEdit,
    onCancelEdit
}) {
    return (
        <div 
            key={room._id}
            className="relative h-full min-w-[25vw] rounded-md overflow-hidden transform scale-95 hover:scale-100 transition duration-300 shadow-lg"
        >
            {/* Delete Button */}
            <button 
                className="absolute top-2 right-2 z-10 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete(room._id);
                }}
            >
                <CircleX size={20} />
            </button>

            <div 
                className="relative w-full h-full cursor-pointer"
                onClick={() => onNavigate(room._id)}
            >
                <Image
                    src={room.image || "/bedroom.jpg"}
                    alt={room.name}
                    fill 
                    style={{ objectFit: "cover" }}
                />
                <div className="absolute bottom-0 w-full bg-blue-100 bg-opacity-80 p-2">
                    {editMode === room._id ? (
                        <div className="flex items-center">
                            <input
                                type="text"
                                value={editName}
                                onChange={onEditNameChange}
                                className="flex-1 p-1 border rounded text-xl"
                                onClick={(e) => e.stopPropagation()}
                                autoFocus
                            />
                            <div className="flex ml-2">
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onSaveEdit(room._id);
                                    }}
                                    className="bg-green-500 text-white p-1 rounded mr-1"
                                >
                                    ✓
                                </button>
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onCancelEdit();
                                    }}
                                    className="bg-red-500 text-white p-1 rounded"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center">
                            <h3 className="text-black font-bold text-xl flex-1">{room.name}</h3>
                            <button 
                                onClick={(e) => onEdit(e, room._id, room.name)}
                                className="text-blue-600 hover:text-blue-800"
                            >
                                <Edit size={18} />
                            </button>
                        </div>
                    )}
                    <div className="flex justify-between items-center mt-1">
                        <div className="bg-green-100 h-2 w-32 rounded-full overflow-hidden">
                            <div 
                                className="bg-green-500 h-full" 
                                style={{ width: `${room.progress}%` }}
                            ></div>
                        </div>
                        <p className="text-sm">{room.progress}%</p>
                    </div>
                </div>
            </div>
        </div>
    );
} 