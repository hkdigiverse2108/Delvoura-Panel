"use client";

import { Image as  Eye, EyeOff, Pencil } from "lucide-react";

interface BannerGalleryProps {
  data: any;
  onToggleStatus: (item: any) => void;
  onEdit: () => void;
  status: boolean;
  onStatusChange: (val: boolean) => void;
}

const BannerGallery = ({
  data,
  onToggleStatus,
  onEdit,
  status,
  onStatusChange,
}: BannerGalleryProps) => {
  const images = data?.bannerImages || [];

  return (
    <div className="space-y-4">
      
      <div className="py-2 bg-white mb-5 ">
      <div className="flex items-center justify-between  common-active-fillter py-6">
        <div className="text-sm font-medium">
          Total Banners: {images.length}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm">{status ? "Active" : "Inactive"}</span>

          <button
            className="toggle-btn"
            onClick={() => onStatusChange(!status)}
          >
            {status ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
        </div>
      </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {images.map((img: string, index: number) => (
          <div
            key={index}
            className="relative group rounded-xl overflow-hidden border"
          >
            <img
              src={img}
              alt="banner"
              className="w-full h-40 object-cover"
            />

            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-3">
              
              <button
                className="action-btn view"
                onClick={() => onToggleStatus(data)}
              >
                {data?.isActive ? <Eye size={16} /> : <EyeOff size={16} />}
              </button>

              <button
                className="action-btn edit"
                onClick={onEdit}
              >
                <Pencil size={16} />
              </button>
            </div>
          </div>
        ))}

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