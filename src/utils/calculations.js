// Group space data into groups of 3
export const groupSpaceData = (spaceData) => {
  return spaceData.reduce((acc, item, index) => {
    if (index % 3 === 0) acc.push([]);
    acc[acc.length - 1].push(item);
    return acc;
  }, []);
};

// Calculate overall progress from rooms
export const calculateOverallProgress = (rooms) => {
  return rooms.length > 0
    ? Math.round(rooms.reduce((sum, r) => sum + (r.progress || 0), 0) / rooms.length)
    : 0;
}; 