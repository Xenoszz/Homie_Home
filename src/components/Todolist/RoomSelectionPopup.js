import Image from "next/image";
import { CircleX } from 'lucide-react';

export default function RoomSelectionPopup({ 
    isOpen, 
    onClose, 
    roomTemplates, 
    onRoomSelect 
}) {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
            onClick={onClose}
        >
            <div
                className="relative p-6 bg-[#F5F2E8] w-[90vw] max-w-md rounded-lg shadow-xl border-2 border-[#B6AD9D]"
                onClick={e => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    className="absolute top-2 right-2 text-red-600 hover:text-red-800 transition"
                    onClick={onClose}
                >
                    <CircleX size={28} />
                </button>
                <h1 className="text-[20pt] flex justify-center font-bold text-[#58482D]">Select Room</h1>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    {roomTemplates.map((template, index) => (
                        <div
                            key={index}
                            className="cursor-pointer overflow-hidden rounded-xl border border-[#B6AD9D] shadow-md hover:shadow-lg transition duration-300 transform hover:scale-[1.02]"
                            onClick={() => onRoomSelect(template)}
                        >
                            <div className="h-24 relative">
                                <Image
                                    src={template.img}
                                    alt={template.name}
                                    fill
                                    style={{ objectFit: "cover" }}
                                    className="rounded-t-xl"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-[#FAF6E3] from-5% to-transparent"></div>
                                <div className="absolute top-2 left-3 text-[#4F4534] font-semibold text-[13pt] drop-shadow-md">
                                    {template.name}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
} 