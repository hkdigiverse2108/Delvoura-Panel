"use client";

import { Image as  Eye, EyeOff, Pencil } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useClickOutside } from "../../Utils/Hooks/useClickOutside";

interface BannerGalleryProps { data: any; onToggleStatus: (item: any) => void; onEdit: (img: string) => void; status: boolean;  onStatusChange: (val: boolean) => void;}
const BannerGallery = ({ data, onToggleStatus, onEdit, status, onStatusChange,}: BannerGalleryProps) => { const images = data?.bannerImages || [];
const [previewImage, setPreviewImage] = useState<string | null>(null);
const modalRef = useRef<HTMLDivElement | null>(null);
useClickOutside(modalRef, !!previewImage, () => setPreviewImage(null));
useEffect(() => {
  if (previewImage) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return () => {
    document.body.style.overflow = "auto";
  };
}, [previewImage]);
  return (
    <div className="space-y-4">
      <div className="py-2 bg-white mb-5 ">
      <div className="flex items-center justify-between  common-active-fillter py-6">
        <div className="text-sm font-medium">  Total Banners: {images.length} </div>
        <div className="flex items-center gap-3">
          <span className="text-sm">{status ? "Active" : "Inactive"}</span>
          <button  className="toggle-btn"  onClick={() => onStatusChange(!status)} > {status ? <Eye size={18} /> : <EyeOff size={18} />}   </button>
        </div>
      </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {images.map((img: string, index: number) => (
          <div
  key={index}
  className="relative group rounded-xl overflow-hidden border border-gray-200 bg-white"
>
  <div className="h-40 w-full overflow-hidden">
    <img
      src={img}
      alt="banner"
      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110 cursor-pointer"
      onClick={() => setPreviewImage(img)}
    />
  </div>

  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition" />

  <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition">
    <button
      className="action-btn view"
      onClick={() => setPreviewImage(img)}
    >
      <Eye size={16} />
    </button>

    <button
  className="action-btn edit"
  onClick={() => onEdit(img)}
>
      <Pencil size={16} />
    </button>
  </div>
</div>
        ))}
        {previewImage && (
  <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50" onClick={() => setPreviewImage(null)}>
    <div
      ref={modalRef}
      className="relative max-w-4xl w-full px-6"
      onClick={(e) => e.stopPropagation()}
    >
      
      {/* CLOSE BUTTON */}
      <button
        className="absolute top-4 right-11 text-black text-xl"
        onClick={() => setPreviewImage(null)}
      >
        ✕
      </button>

      <img
        src={previewImage}
        alt="preview"
        className="w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
      />
    </div>
  </div>
)}

        {!images.length && (
          <div className="col-span-4 text-center py-10 text-gray-400">
            No banners found
          </div>
        )}
      </div>
    </div>
  );
};

export default BannerGallery;