"use client";

import { useRef, useState } from "react";
import { UploadCloud, X } from "lucide-react";
import { MediaMutations } from "../../../Api/Mutations";

const DropzoneUpload = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const uploadImages = MediaMutations.useUploadImages();

  const [files, setFiles] = useState<File[]>([]);

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;
    const nextFiles = Array.from(fileList);
    setFiles((prev) => [...prev, ...nextFiles]);
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (!files.length) return;

    try {
      await uploadImages.mutateAsync(files);
      setFiles([]);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div className="space-y-4">
      <div
        className="rounded-2xl border  border-dashed border-gray-300 bg-gray-50 p-8 text-center transition hover:border-[var(--primary,#7c3aed)] hover:bg-gray-100"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFiles(e.dataTransfer.files);
        }}
      >
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--primary,#7c3aed)]/10 text-[var(--primary,#7c3aed)]">
          <UploadCloud size={26} />
        </div>

        <h3 className="text-base font-semibold text-gray-800">
          Drag and drop images here
        </h3>
        <p className="mt-1 text-sm text-gray-500">PNG, JPG, JPEG, WEBP</p>

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="mt-4 rounded-lg px-4 py-2 text-sm font-medium text-white shadow-none"
          style={{ background: "var(--primary,)" }}
        >
          Browse Files
        </button>

        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/png,image/jpg,image/jpeg,image/webp"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {!!files.length && (
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="mb-3 text-sm font-medium text-gray-700">
            Selected Files ({files.length})
          </div>

          <div className="space-y-2">
            {files.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center justify-between rounded-lg border border-gray-100 px-3 py-2"
              >
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium text-gray-700">
                    {file.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveFile(index)}
                  className="rounded-md p-1 text-red-500 hover:bg-red-50"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={handleUpload}
              disabled={uploadImages.isPending}
              className="rounded-lg px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
              style={{ background: "var(--primary, )" }}
            >
              {uploadImages.isPending ? "Uploading..." : "Upload Images"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropzoneUpload;