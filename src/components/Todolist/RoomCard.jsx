import Image from "next/image";
import { CircleX, Edit } from 'lucide-react';

export default function RoomCard({ 
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
            className="relative rounded-xl overflow-hidden shadow-lg bg-white aspect-[1/1.05] flex flex-col"
            onClick={() => onNavigate(room._id)}
        >
            {/* Delete Button */}
            <button
                className="absolute top-2 right-2 z-10 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                onClick={e => {
                    e.stopPropagation();
                    onDelete(room._id);
                }}
            >
                <CircleX size={18} />
            </button>
            <div className="relative w-full h-[110px]">
                <Image
                    src={room.image || "/bedroom.jpg"}
                    alt={room.name}
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-t-xl"
                />
            </div>
            <div className="flex flex-col justify-between flex-1 p-2">
                <div className="flex items-center">
                    <h3 className="text-black font-bold text-[13pt] flex-1 truncate">{room.name}</h3>
                    <button
                        onClick={e => onEdit(e, room._id, room.name)}
                        className="text-blue-600 hover:text-blue-800 ml-1"
                    >
                        <Edit size={16} />
                    </button>
                </div>
                <div className="flex items-center mt-1">
                    <div className="bg-green-100 h-2 w-[60%] rounded-full overflow-hidden mr-2">
                        <div
                            className="bg-green-500 h-full"
                            style={{ width: `${room.progress}%` }}
                        ></div>
                    </div>
                    <span className="text-xs">{room.progress}%</span>
                </div>
            </div>
            {/* Edit name popup (inline) */}
            {editMode === room._id && (
                <div className="absolute inset-0 bg-white bg-opacity-90 flex flex-col justify-center items-center z-20">
                    <input
                        type="text"
                        value={editName}
                        onChange={onEditNameChange}
                        className="p-1 border rounded text-[13pt] mb-2 w-[80%]"
                        autoFocus
                    />
                    <div className="flex gap-2">
                        <button
                            onClick={e => {
                                e.stopPropagation();
                                onSaveEdit(room._id);
                            }}
                            className="bg-green-500 text-white px-3 py-1 rounded"
                        >
                            ✓
                        </button>
                        <button
                            onClick={e => {
                                e.stopPropagation();
                                onCancelEdit();
                            }}
                            className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
} 