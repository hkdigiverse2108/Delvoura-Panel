"use client";

import { useState } from "react";
import CommonUploadModal from "./CommonUploadModal";

interface SingleImageFieldProps {
  label: string;
  value?: string;
  required?: boolean;
  onChange: (value: string) => void;
}

const SingleImageField = ({ label, value, required, onChange }: SingleImageFieldProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium">
        {label} {required && <span style={{ color: "red" }}>*</span>}
      </label>

      {value ? (
        <div className="relative w-32 h-32 border rounded-xl overflow-hidden">
          <img src={value} alt={label} className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 bg-white px-2 py-1 rounded text-xs"
          >
            Remove
          </button>
        </div>
      ) : (
        <div className="w-32 h-32 border rounded-xl flex items-center justify-center text-sm text-gray-400">
          No Image
        </div>
      )}

      <button type="button" className="btn-add-product" onClick={() => setOpen(true)}>
        Choose Image
      </button>

      <CommonUploadModal
        open={open}
        multiple={false}
        selected={value ? [value] : []}
        onClose={() => setOpen(false)}
        onSave={(urls) => {
          onChange(urls[0] || "");
          setOpen(false);
        }}
      />
    </div>
  );
};

export default SingleImageField;