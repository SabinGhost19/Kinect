import React, { useState, ChangeEvent } from 'react';
import { customAxios } from '../utils/axiosFetchInstance';

const Settings: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file to upload');
      return;
    }
    const formData = new FormData();
    formData.append('image', selectedFile);
    try {
      const response = await customAxios.post('data/uploadProfile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }

    console.log('Uploading file:', selectedFile);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {previewImage && (
        <img src={previewImage} alt="Preview" className="w-64 h-64 mb-4 object-cover rounded" />
      )}
      <input type="file" accept="image/*" onChange={handleFileChange} className="mb-4" />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Upload Image
      </button>
    </div>
  );
};

export default Settings;
