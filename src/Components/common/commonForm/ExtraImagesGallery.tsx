"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { CommonUploadModal } from "../uploads";

interface Props {
  images: string[];
  setImages: (images: string[]) => void;
}

export const ExtraImagesGallery = ({ images, setImages }: Props) => {
  const [open, setOpen] = useState(false);

  const validImages = images.filter((img) => img && img.trim() !== "");

  const removeImage = (index: number) => {
    const updated = validImages.filter((_, i) => i !== index);
    setImages(updated);
  };

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Extra Images
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {validImages.map((img, index) => (
          <div
            key={index}
            className="relative h-24 rounded-lg overflow-hidden border"
          >
            <img
              src={img}
              className="w-full h-full object-cover"
            />

            <button
              onClick={() => removeImage(index)}
              className="absolute top-1 right-1 bg-white p-1 rounded"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="btn-add-product mt-3"
        onClick={() => setOpen(true)}
      >
        Add Images
      </button>

      <CommonUploadModal
        open={open}
        multiple
        selected={validImages}
        onClose={() => setOpen(false)}
        onSave={(urls) => {
          setImages(urls.filter((img) => img && img.trim() !== ""));
          setOpen(false);
        }}
      />
    </div>
  );
};