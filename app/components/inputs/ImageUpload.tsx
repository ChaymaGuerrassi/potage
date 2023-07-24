"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { PiCameraPlusDuotone } from "react-icons/pi";

declare global {
  var cloudinary: any;
}

const uploadPreset = "potage_preset";

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset={uploadPreset}
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className={`
              relative
              cursor-pointer
              hover:opacity-70
              transition
              ${!value || value.length === 0 ? "border-dashed border-2 " : "border-2"}
              p-20 
              border-ptgGrey
              rounded-lg
              flex
              flex-col
              justify-center
              items-center
              gap-4
              text-ptgGrey
            `}
          >
            <PiCameraPlusDuotone size={50} className="text-ptgBlue"/>
            <div className="font-semibold text-lg text-center">Cliquer pour télécharger</div>
            {value && value.length !== 0 && (
              <div
                className="
              absolute inset-0 w-full h-full"
              >
                <Image
                  fill
                  style={{ objectFit: "cover" }}
                  src={value}
                  alt="Product image"
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
