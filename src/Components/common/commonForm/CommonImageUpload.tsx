"use client";

import { useState } from "react";
import { Upload, X } from "lucide-react";
import CommonUploadModal from "../uploads/CommonUploadModal";

interface Props {
  label: string;
  required?: boolean;
  value?: string;
  error?: string;
  onChange: (file: File | null, preview: string) => void;
}

const CommonImageUpload = ({
  label,
  required,
  value,
  error,
  onChange,
}: Props) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (urls: string[]) => {
    const url = urls[0] || "";
    onChange(null, url); 
    setOpen(false);
  };

  const removeImage = () => {
    onChange(null, "");
  };

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-3">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {!value ? (
        <div
          onClick={() => setOpen(true)}
          className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center cursor-pointer hover:border-[var(--primary,#7c3aed)] hover:bg-gray-50 transition"
        >
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-600 font-medium">Choose from Gallery</p>
        </div>
      ) : (
        <div className="relative group">
          <img
            src={value}
            alt="Preview"
            className="w-full h-80 object-cover rounded-xl border"
          />
          <button
            onClick={removeImage}
            className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100"
          >
            <X size={18} />
          </button>
        </div>
      )}

      <CommonUploadModal
        open={open}
        multiple={false}
        selected={value ? [value] : []}
        onClose={() => setOpen(false)}
        onSave={handleSelect}
      />

      {error && (
        <p className="text-red-500 text-xs mt-2">{error}</p>
      )}
    </div>
  );
};

export default CommonImageUpload;