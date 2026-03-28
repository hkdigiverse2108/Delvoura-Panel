"use client";

import { useMemo, } from "react";
import { Trash2 } from "lucide-react";
import { MediaMutations } from "../../../Api/Mutations";
import { Queries } from "../../../Api/Queries";

interface GalleryItem {
  url: string;
  name: string;
}

interface FileGalleryProps {
  multiple?: boolean;
  selected: string[];
  maxSelection?: number;
  onChange: (urls: string[]) => void;
}

const FileGallery = ({
  multiple = false,
  selected,
  maxSelection,
  onChange,
}: FileGalleryProps) => {
  const { data, isLoading } = Queries.useGetGallery();
  const deleteImage = MediaMutations.useDeleteImage();

  const gallery: GalleryItem[] = useMemo(() => {
    const raw = data?.data || [];

    if (!Array.isArray(raw)) return [];

    return raw.map((item: any) => {
      if (typeof item === "string") {
        const fileName = item.split("/").pop() || "image";
        return { url: item, name: fileName };
      }

      return {
        url: item.url,
        name: item.name || item.url?.split("/").pop() || "image",
      };
    });
  }, [data]);

  const handleSelect = (url: string) => {
    if (multiple) {
      const alreadySelected = selected.includes(url);

      if (alreadySelected) {
        onChange(selected.filter((item) => item !== url));
        return;
      }

      if (maxSelection && selected.length >= maxSelection) return;

      onChange([...selected, url]);
    } else {
      if (selected.includes(url)) {
        onChange([]);
        return;
      }
      onChange([url]);
    }
  };

  const handleSingleDelete = async (url: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this image?");
    if (!confirmed) return;

    try {
      await deleteImage.mutateAsync(url);
      if (selected.includes(url)) {
        onChange(selected.filter((item) => item !== url));
      }
    } catch (error) {
      console.error("Single delete failed:", error);
    }
  };

  
  if (isLoading) {
    return <div className="py-8 text-center text-gray-500">Loading gallery...</div>;
  }

  return (
    <div className="flex h-full flex-col">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-sm font-medium text-gray-700">
          {gallery.length} image{gallery.length !== 1 ? "s" : ""}
        </div>

        
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto pr-1">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
          {gallery.map((item) => {
            const isSelected = selected.includes(item.url);

            return (
              <div
                key={item.url}
                className={`group relative cursor-pointer rounded-xl border p-2 transition ${
                  isSelected
                    ? "border-[var(--primary,#7c3aed)] ring-1 ring-[var(--primary,#7c3aed)]"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => handleSelect(item.url)}
              >
                <button
                  type="button"
                  className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-red-500 shadow-sm transition hover:bg-red-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSingleDelete(item.url);
                  }}
                  aria-label="Delete image"
                >
                  <Trash2 size={16} />
                </button>

                <img
                  src={item.url}
                  alt={item.name}
                  className="h-32 w-full rounded-lg object-cover"
                />


                {isSelected && (
                  <div className="absolute left-4 top-4 rounded-md bg-[var(--primary,#7c3aed)] px-2 py-1 text-[11px] font-medium text-white">
                    Selected
                  </div>
                )}
              </div>
            );
          })}

          {!gallery.length && (
            <div className="col-span-full py-10 text-center text-sm text-gray-500">
              No images found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileGallery;