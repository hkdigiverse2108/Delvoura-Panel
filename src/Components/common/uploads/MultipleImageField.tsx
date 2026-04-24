"use client";

import { useState } from "react";
import CommonUploadModal from "./CommonUploadModal";
import { DeleteOutlined } from "@ant-design/icons";

interface MultipleImageFieldProps { label: string; value?: string[]; required?: boolean; onChange: (value: string[]) => void;}

const MultipleImageField = ({ label,value = [],required,onChange,}: MultipleImageFieldProps) => {
  const [open, setOpen] = useState(false);
  const handleRemove = (index: number) => {const updated = [...value]; updated.splice(index, 1);onChange(updated);};

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium">
        {label} {required && <span style={{ color: "red" }}>*</span>}
      </label>

      <div className="grid grid-cols-4 gap-3">
        {value.map((img, index) => (
          <div
            key={`${img}-${index}`}
            className="relative group border border-gray-200 rounded-xl overflow-hidden h-28"
          >
            <img src={img} alt="gallery" className="w-full h-full object-cover" />

            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full 
                        bg-white/90 backdrop-blur shadow-sm border border-gray-200 
                        opacity-0 group-hover:opacity-100 transition hover:bg-red-50"
            >
              <DeleteOutlined className="text-gray-500 text-xs hover:text-red-500" />
            </button>
          </div>
        ))}
      </div>

      <button type="button" className="btn-add-product" onClick={() => setOpen(true)}>Add Images </button>
      <CommonUploadModal open={open} multiple selected={value} onClose={() => setOpen(false)} onSave={(urls) => {onChange(urls);setOpen(false);}} />
    </div>
  );
};

export default MultipleImageField;