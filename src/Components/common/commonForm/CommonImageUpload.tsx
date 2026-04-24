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
    const url = urls?.[0];
    if (!url) return;

    onChange(null, url);
    setOpen(false);
  };

  const removeImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    onChange(null, "");
  };

  return (
    <div>
      {/* LABEL */}
      <label className="block text-sm font-semibold text-gray-700 mb-3">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {/* EMPTY STATE */}
      {!value ? (
        <div
          role="button"
          tabIndex={0}
          onClick={() => setOpen(true)}
          className="
            border-2 border-dashed border-gray-300 
            rounded-xl p-12 text-center cursor-pointer 
            hover:border-primary hover:bg-gray-50 
            transition group
            focus:outline-none focus:ring-2 focus:ring-primary/40
          "
        >
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4 group-hover:text-primary transition" />
          <p className="text-gray-700 font-medium">
            Click to choose image
          </p>
          <p className="text-xs text-gray-400 mt-1">
            JPG, PNG supported
          </p>
        </div>
      ) : (
        <div
          className="relative group cursor-pointer"
          onClick={() => setOpen(true)}
        >
          {/* IMAGE */}
          <img
            src={value}
            alt="uploaded image"
            className="
              w-full h-80 object-cover rounded-xl border border-gray-200
              transition-transform duration-300 group-hover:scale-[1.02]
            "
          />

          {/* OVERLAY */}
          <div className="absolute inset-0 rounded-xl bg-black/0 group-hover:bg-black/25 transition" />

          {/* HINT */}
          <div className="absolute bottom-3 left-3 text-white text-xs opacity-0 group-hover:opacity-100 transition font-medium flex items-center gap-1">
            Change image <span className="text-white/80">→</span>
          </div>

          {/* DELETE (always visible on mobile via touch area expansion) */}
          <button
            type="button"
            onClick={removeImage}
            className="
              absolute top-3 right-3 
              bg-white text-red-500 p-2 rounded-full shadow
              hover:bg-red-500 hover:text-white 
              hover:scale-110
              transition
              active:scale-95
            "
            aria-label="Remove image"
          >
            <X size={18} />
          </button>
        </div>
      )}

      {/* MODAL */}
      <CommonUploadModal
        open={open}
        multiple={false}
        selected={value ? [value] : []}
        onClose={() => setOpen(false)}
        onSave={handleSelect}
      />

      {/* ERROR */}
      {error && (
        <p className="text-red-500 text-xs mt-2">{error}</p>
      )}
    </div>
  );
};

export default CommonImageUpload;