import { sendDataApi } from './api';
import { getStoredToken } from './auth';

export const createRoom = async (roomTemplate, setRooms, rooms, setIsOpen) => {
    const token = getStoredToken();
    if (!token) {
        console.error("No token found");
        return;
    }

    try {
        const headers = {'Authorization': `Bearer ${token}`};
        const response = await sendDataApi('POST', 'room/create', {
            name: roomTemplate.name,
            image: roomTemplate.img
        }, headers);

        if (response && !response.error) {
            setRooms([...rooms, response]);
            setIsOpen(false);
        } else {
            console.error("Error creating room:", response?.error);
        }
    } catch (error) {
        console.error("Error creating room:", error);
    }
};


export const removeRoom = async (roomId, setRooms, rooms) => {
    const token = getStoredToken();
    if (!token) {
        console.error("No token found");
        return;
    }

    try {
        const headers = {'Authorization': `Bearer ${token}`};
        const response = await sendDataApi('DELETE', `room/delete/${roomId}`, {}, headers);

        if (response && !response.error) {
            setRooms(rooms.filter(room => room._id !== roomId));
        } else {
            console.error("Error deleting room:", response?.error);
        }
    } catch (error) {
        console.error("Error deleting room:", error);
    }
};

export const updateRoomName = async (roomId, newName, setRooms, rooms, setEditMode) => {
    if (!newName.trim()) return;

    const token = getStoredToken();
    if (!token) {
        console.error("No token found");
        return;
    }

    try {
        const headers = {'Authorization': `Bearer ${token}`};
        const response = await sendDataApi('PUT', `room/update/${roomId}`, 
            { name: newName }, 
            headers
        );

        if (response && !response.error) {
            setRooms(rooms.map(room => 
                room._id === roomId ? { ...room, name: newName } : room
            ));
            setEditMode(null);
        } else {
            console.error("Error updating room name:", response?.error);
        }
    } catch (error) {
        console.error("Error updating room name:", error);
    }
}; 