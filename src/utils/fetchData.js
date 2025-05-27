import { fetchDataApi } from './api';
import { getStoredToken } from './auth';

export const fetchRooms = async (setRooms, setLoadingRooms) => {
  const token = getStoredToken();
  if (!token) {
    setLoadingRooms(false);
    setRooms([]);
    return;
  }

  try {
    const headers = {'Authorization': `Bearer ${token}`};
    console.log('Sending request with headers:', headers);

    const data = await fetchDataApi('GET', 'room/get', {}, headers);
    console.log('Response from fetchRooms:', data);

    if (data && Array.isArray(data)) {
      setRooms(data);
    } else {
      setRooms([]);
    }
  } catch (error) {
    console.error('Error fetching rooms:', error);
    setRooms([]);
  } finally {
    setLoadingRooms(false);
  }
};

export const fetchSpaceGuide = async (setSpaceData) => {
  try {
    const data = await fetchDataApi('GET', 'spaceguide/get');
    setSpaceData(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const fetchRoomToDoActivity = async (roomId) => {
    try {
        const token = getStoredToken();
        if (!token) {
            throw new Error('No token found');
        }
        const headers = {'Authorization': `Bearer ${token}`};
        // Fetch room details
        const roomResponse = await fetchDataApi('GET', 'room/get', {}, headers);
        const roomData = roomResponse.find(r => r._id === roomId);
        if (!roomData) {
            throw new Error('Room not found');
        }
        // Fetch tasks for this room
        const tasksResponse = await fetchDataApi('GET', `task/get/${roomId}`, {}, headers);
        
        return {
            room: roomData,
            tasks: tasksResponse
        };
    } catch (error) {
        console.error("Error fetching room data:", error);
        throw error;
    }
};
