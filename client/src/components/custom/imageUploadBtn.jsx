import React, { useRef } from "react";
import ImageUpload from "@/assets/ImageUploadIcon.svg";

function ImageUploadButton({ onChange }) {
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div
      className="w-full h-32 cursor-pointer border border-gray-400 border-dashed rounded-lg flex items-center justify-center hover:shadow-lg transition"
      onClick={handleImageClick}
    >
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={onChange}
        className="hidden"
      />
      <img src={ImageUpload} alt="Upload" className="object-contain" />
    </div>
  );
}

export default ImageUploadButton;
