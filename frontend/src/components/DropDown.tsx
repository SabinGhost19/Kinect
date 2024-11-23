import { useState } from 'react';
import { socialLogos } from '../utils/Links_logos';

interface DropDownProps {
  onChange: (platform: string, url: string) => void;
}

const DropDown = ({ onChange }: DropDownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (platform: string, url: string) => {
    onChange(platform, url);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          onClick={toggleDropdown}
          className="inline-flex w-full justify-center gap-2 rounded-md bg-gray-800 px-4 py-2 text-sm font-semibold text-gray-200 shadow-md ring-1 ring-inset ring-gray-600 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Platform
          <span aria-hidden="true" className="text-gray-400">
            ▼
          </span>
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-gray-900 shadow-lg ring-1 ring-gray-700 transform transition-all duration-150 ease-out">
          <div className="py-1">
            {Object.entries(socialLogos).map(([platform, url]) => (
              <div
                key={platform}
                className="flex items-center px-4 py-2 hover:bg-gray-800 cursor-pointer rounded-md"
                onClick={() => handleOptionClick(platform, url)}
              >
                <img
                  src={url}
                  alt={platform}
                  className="h-8 w-8 mr-3 rounded-full border border-gray-700"
                />
                <span className="text-sm font-medium text-gray-300 hover:text-white">
                  {platform}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropDown;
