import { sendDataApi } from './api';
import { getStoredToken } from './auth';

// Helper functions
const getAuthHeaders = () => {
    const token = getStoredToken();
    if (!token) {
        throw new Error('No token found');
    }
    return { 'Authorization': `Bearer ${token}` };
};

const handleApiError = (error, operation) => {
    console.error(`Error ${operation}:`, error);
    throw error;
};

export const createRoom = async (roomTemplate, setRooms, rooms, setIsOpen) => {
    try {
        const headers = getAuthHeaders();
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
        handleApiError(error, 'creating room');
    }
};

export const removeRoom = async (roomId, setRooms, rooms) => {
    try {
        const headers = getAuthHeaders();
        const response = await sendDataApi('DELETE', `room/delete/${roomId}`, {}, headers);

        if (response && !response.error) {
            setRooms(rooms.filter(room => room._id !== roomId));
        } else {
            console.error("Error deleting room:", response?.error);
        }
    } catch (error) {
        handleApiError(error, 'deleting room');
    }
};

export const updateRoomName = async (roomId, newName, setRooms, rooms, setEditMode) => {
    if (!newName.trim()) return;

    try {
        const headers = getAuthHeaders();
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
        handleApiError(error, 'updating room name');
    }
};

export const createTask = async (roomId, taskName) => {
    try {
        const headers = getAuthHeaders();
        const response = await sendDataApi('POST', `task/create/${roomId}`, 
            { name: taskName },
            headers
        );
        return response;
    } catch (error) {
        handleApiError(error, 'creating task');
    }
};

export const toggleTask = async (taskId, isCompleted) => {
    try {
        const headers = getAuthHeaders();
        const response = await sendDataApi('PUT', `task/update/${taskId}`, 
            { completed: !isCompleted },
            headers
        );
        return response;
    } catch (error) {
        handleApiError(error, 'toggling task');
    }
};

export const updateTaskName = async (taskId, newName) => {
    try {
        const headers = getAuthHeaders();
        const response = await sendDataApi('PUT', `task/update/${taskId}`, 
            { name: newName },
            headers
        );
        return response;
    } catch (error) {
        handleApiError(error, 'updating task name');
    }
};

export const deleteTask = async (taskId) => {
    try {
        const headers = getAuthHeaders();
        await sendDataApi('DELETE', `task/delete/${taskId}`, {}, headers);
        return true;
    } catch (error) {
        handleApiError(error, 'deleting task');
    }
}; 