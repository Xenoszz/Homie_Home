import { fetchDataApi } from './api.jsx';
import { getAuthHeaders, handleApiError } from './auth.jsx';

// Home.js && Todolist.js
export const fetchRooms = async (setRooms, setLoadingRooms) => {
  try {
    const headers = getAuthHeaders();
    const data = await fetchDataApi('GET', 'room/get', {}, headers);
    if (data && Array.isArray(data)) {
      setRooms(data);
    } else {
      setRooms([]);
    }
  } catch (error) {
    handleApiError(error, 'fetching rooms');
    setRooms([]);
  } finally {
    setLoadingRooms(false);
  }
};

// Home.js
export const fetchSpaceGuide = async (setSpaceData) => {
  try {
    const data = await fetchDataApi('GET', 'spaceguide/get');
    setSpaceData(data);
  } catch (error) {
    handleApiError(error, 'fetching space guide');
  }
};

// TodoActivity.js
export const fetchRoomToDoActivity = async (roomId) => {
  try {
    const headers = getAuthHeaders();
    const roomResponse = await fetchDataApi('GET', 'room/get', {}, headers);
    const roomData = roomResponse.find(r => r._id === roomId);
    if (!roomData) {
      throw new Error('Room not found');
    }
    const tasksResponse = await fetchDataApi('GET', `task/get/${roomId}`, {}, headers);
    return {
      room: roomData,
      tasks: tasksResponse
    };
  } catch (error) {
    handleApiError(error, 'fetching room todo activity');
  }
};

// Organize.js
export const getOrganizeData = async () => {
  try {
    const data = await fetchDataApi('GET', 'organize/get');
    return { 
      props: { items: data }, 
      revalidate: 10 
    };
  } catch (error) {
    handleApiError(error, 'fetching organize data');
    return { 
      props: { items: [] }, 
      revalidate: 10 
    };
  }
};

// ideas.js
export const getIdeasData = async () => {
  try {
    const data = await fetchDataApi('GET', 'idea/get');
    return data;
  } catch (error) {
    handleApiError(error, 'fetching ideas data');
    return [];
  }
};
