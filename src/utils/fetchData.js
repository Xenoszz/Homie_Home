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