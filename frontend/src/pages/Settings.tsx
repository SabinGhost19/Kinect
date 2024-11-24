import React, { useState, ChangeEvent } from 'react';
import { customAxios } from '../utils/axiosFetchInstance';
import DropDown from '../components/DropDown';

const Settings: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [url, setUrl] = useState<string | null>('');
  const [placeholder_url, setUrlPlaceholder] = useState<string | null>('');
  const [platform, setPlatform] = useState<string | null>(null);
  const [platformImage, setPlatformImage] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);
    }
  };

  const onInputChange_Logos = (platform: string, url: string) => {
    setPlatform(platform);
    setUrlPlaceholder(platform);
    setPlatformImage(url);
    console.log(`Selected Platform: ${platform}, URL: ${url}`);
  };

  const handleLinkUpload = async () => {
    if (!platform || !url) {
      alert('Please select a platform and insert a link');
      return;
    }

    try {
      const response = await customAxios.post('data/uploadProfile/SocialLinks', {
        platform,
        url,
      });
      console.log('Response:', response.data);
      alert('Social link uploaded successfully!');
    } catch (error) {
      console.error('Error uploading social link:', error);
      alert('Failed to upload social link. Please try again.');
    }
  };
  const handleImageUpload = async () => {
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
      console.log('Response:', response.data);
      alert('Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen  px-4">
      <div className="flex flex-col items-center mb-6">
        {previewImage && (
          <img
            src={previewImage}
            alt="Preview"
            className="w-32 h-32 object-cover rounded-full mb-4 border-2 border-blue-500"
          />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mb-4 text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
        />
        <button
          onClick={handleImageUpload}
          className="bg-blue-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Upload Image
        </button>
      </div>

      <div className="flex items-center justify-between gap-6 mb-6 w-full max-w-lg">
        <div className="flex flex-col items-start w-full">
          <label htmlFor="url" className="block text-sm font-medium text-gray-300 mb-1">
            Link
          </label>
          <input
            onChange={(e) => setUrl(e.target.value)}
            id="url"
            name="url"
            value={url || ''}
            placeholder={placeholder_url || ''}
            className="w-full px-4 py-2 border border-gray-600 rounded-lg shadow-sm bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <DropDown onChange={onInputChange_Logos} />
      </div>

      {platform && platformImage && (
        <div className="flex items-center gap-4 bg-gray-800 px-4 py-3 rounded-lg shadow-md">
          <img
            src={platformImage}
            alt={platform}
            className="w-10 h-10 rounded-full border-2 border-blue-500"
          />
          <span className="text-sm font-medium text-white">
            Selected Platform: <span className="text-blue-400">{platform}</span>
          </span>
        </div>
      )}
      <button
        onClick={handleLinkUpload}
        className="bg-blue-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Update Social Links
      </button>
    </div>
  );
};

export default Settings;
