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

  const validImages = images.filter((img) => img?.trim());
  

  const removeImage = (imgToRemove: string) => {
    const updated = images.filter((img) => img !== imgToRemove);
    setImages(updated);
  };

  const handleSave = (urls: string[]) => {
    const cleaned = urls.filter((img) => img?.trim());

    // prevent duplicates
    const unique = Array.from(new Set([...images, ...cleaned]));

    setImages(unique);
    setOpen(false);
  };

  return (
    <div>
      {/* LABEL */}
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Extra Images
      </label>

      {/* EMPTY STATE */}
      {validImages.length === 0 ? (
        <div className="text-sm text-gray-400 border border-dashed rounded-lg p-8 text-center bg-gray-50">
          <p className="font-medium">No extra images yet</p>
          <p className="text-xs mt-1">Click “Add Images” to upload</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {validImages.map((img, index) => (
            <div
              key={`${img}-${index}`}
              className="relative h-24 rounded-lg overflow-hidden border border-gray-200 group"
            >
              <img
                src={img}
                alt="extra"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* DELETE BUTTON */}
              <button
                type="button"
                onClick={() => removeImage(img)}
                className="
                  absolute top-1 right-1 
                  bg-white p-1 rounded shadow
                  opacity-0 group-hover:opacity-100 
                  transition-all duration-200
                  
                  hover:bg-red-500 hover:text-white
                  hover:scale-110
                "
                aria-label="Remove image"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ADD BUTTON */}
      <button
        type="button"
        className="btn-add-product mt-3"
        onClick={() => setOpen(true)}
      >
        Add Images
      </button>

      {/* MODAL */}
      <CommonUploadModal
        open={open}
        multiple
        selected={validImages}
        onClose={() => setOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
};