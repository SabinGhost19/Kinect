import { QRCodeSVG } from 'qrcode.react';
import React from 'react';

interface QRCodeProps {
  url: string;
}
const QRCode: React.FC<QRCodeProps> = ({ url }) => {
  return (
    <div className="flex flex-col items-center py-10">
      <QRCodeSVG value={url} size={500} bgColor="#ffffff" fgColor="#000000" />
      <p className="text-sm text-gray-600 mt-2">Scan this code to visit the profile.</p>
    </div>
  );
};

export default QRCode;
