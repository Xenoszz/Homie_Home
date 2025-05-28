// Group space data into groups of 3
import { useState,useEffect } from 'react';

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

// Custom hook for countdown timer
export const useCountdownTimer = (initialTime, isOpen) => {
  const [countdown, setCountdown] = useState(initialTime);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    let timer;
    if (isOpen && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [countdown, isOpen]);

  const resetCountdown = () => {
    setCountdown(initialTime);
    setCanResend(false);
  };

  return {
    countdown,
    canResend,
    resetCountdown
  };
};

// Calculate pagination indices
export const calculatePagination = (currentPage, itemsPerPage, totalItems) => {
  const start = currentPage * itemsPerPage;
  const end = start + itemsPerPage;
  return {
    startIndex: start,
    endIndex: Math.min(end, totalItems)
  };
};

