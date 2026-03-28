"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import CommonUploadModal from "../uploads/CommonUploadModal";

const ExtraImagesGallery = ({ images, setImages }: any) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleSelect = (urls: string[]) => {
    if (openIndex === null) return;

    const updated = [...images];

    let currentIndex = openIndex;

    for (let i = 0; i < urls.length; i++) {
      if (currentIndex >= updated.length) break;
      updated[currentIndex] = urls[i];
      currentIndex++;
    }

    setImages(updated);
    setOpenIndex(null);
  };

  const removeImage = (index: number) => {
    const updated = [...images];
    updated[index] = "";
    setImages(updated);
  };

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-3">
        Extra Images
      </label>

      <div className="grid grid-cols-4 gap-4">
        {[0, 1, 2, 3].map((index) => (
          <div key={index} className="relative">
            {!images[index] ? (
              <div
                onClick={() => setOpenIndex(index)}
                className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-[var(--primary,#7c3aed)] hover:bg-gray-50"
              >
                <Plus className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                <p className="text-gray-500 text-xs">Add Image</p>
              </div>
            ) : (
              <div className="relative group">
                <img
                  src={images[index]}
                  className="w-full h-32 object-cover rounded-xl border"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <CommonUploadModal
        open={openIndex !== null}
        multiple={true}
        selected={images.filter(Boolean)}
        onClose={() => setOpenIndex(null)}
        onSave={handleSelect}
      />
    </div>
  );
};

export default ExtraImagesGallery;