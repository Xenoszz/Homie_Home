import React, { useState } from 'react';
import { saveGeneratedImage } from '@/utils/sendData';

const GeneratedImagePopup = ({ generatedImage, onClose, showSaveButton = true, onRefresh }) => {
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveImage = async () => {
    try {
      setIsSaving(true);
      // Save to backend
      await saveGeneratedImage(generatedImage);
      console.log(generatedImage);
      // Refresh data after saving
      if (onRefresh) onRefresh();
    } catch (error) {
      console.error('Error saving image:', error);
      alert('Failed to save image. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleClose = () => {
    onClose();
    // Refresh data after closing
    if (onRefresh) onRefresh();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl max-w-4xl w-full mx-4 relative">
        <div className="absolute top-4 right-4 flex gap-2">
          {showSaveButton && (
            <button
              onClick={handleSaveImage}
              disabled={isSaving}
              className="bg-[#4F4534] text-white px-4 py-0.5 rounded-lg hover:bg-[#3a3326] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? 'Saving...' : 'Save'}
            </button>
          )}
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="mt-6">
          <img 
            src={generatedImage} 
            alt="Generated design" 
            className="w-full h-auto rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default GeneratedImagePopup;