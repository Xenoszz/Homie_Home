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
    return { props: { items: data } };
  } catch (error) {
    handleApiError(error, 'fetching organize data');
    return { props: { items: [] } };
  }
};

export const searchOrganizeItems = async (searchTerm) => {
  try {
    const data = await fetchDataApi('GET', 'organize/get');
    
    // กรองข้อมูลตาม searchTerm
    const filteredData = data
      .filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .map(item => ({
        id: item.id,
        name: item.name
      }));
      
    return filteredData;
  } catch (error) {
    handleApiError(error, 'searching organize items');
    return [];
  }
};

export const addOrganizeItem = async (item) => {
  try {
    // ใช้ Atlas Search เพื่อค้นหาข้อมูลที่ตรงกันมากที่สุด
    const searchResults = await fetchDataApi('GET', `organize/search?searchTerm=${encodeURIComponent(item.name)}`);
    
    if (searchResults.length > 0) {
      // เลือกผลลัพธ์ที่มีคะแนนสูงสุด
      const bestMatch = searchResults.reduce((prev, current) => 
        (prev.score > current.score) ? prev : current
      );
      return bestMatch;
    }
    // ถ้าไม่พบผลลัพธ์ ให้ใช้ข้อมูลเดิม
    return item;
  } catch (error) {
    handleApiError(error, 'adding organize item');
    // ถ้าเกิดข้อผิดพลาด ให้ใช้ข้อมูลเดิม
    return item;
  }
};

// ideas.js
export const getIdeasData = async () => {
  try {
    const headers = getAuthHeaders();
    const response = await fetchDataApi('GET', 'idea/get', {}, headers);
    return response;
  } catch (error) {
    console.error("Error fetching ideas data:", error);
    throw error;
  }
};

// ideas.js
export const getItemDetails = async (item) => {
  try {
    const headers = getAuthHeaders();
    const itemSearch = await fetchDataApi('GET', `idea/search?searchTerm=${encodeURIComponent(item.name)}`, {}, headers);
    if (itemSearch && itemSearch.length > 0) {
      return itemSearch[0]; 
    }
    return item; 
  } catch (error) {
    handleApiError(error);
    return item; 
  }
};

// GeneratedImages.js
export const getGeneratedImages = async () => {
  try {
    const headers = getAuthHeaders();
    const response = await fetchDataApi('GET', 'idea/GetGenimage', {}, headers);
    return response;
  } catch (error) {
    console.error("Error fetching generated images:", error);
    throw error;
  }
};
