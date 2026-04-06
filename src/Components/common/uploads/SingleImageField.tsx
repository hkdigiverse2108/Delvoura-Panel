import { useState } from "react";
import { Upload } from "lucide-react";
import CommonUploadModal from "./CommonUploadModal";

interface SingleImageFieldProps {
  label: string;
  value?: string;
  required?: boolean;
  variant?: "box" | "banner";
  onChange: (value: string) => void;
}

const  SingleImageField = ({
  label,
  value,
  required,
  variant = "box",
  onChange,
}: SingleImageFieldProps) => {
  const [open, setOpen] = useState(false);

  const isBanner = variant === "banner";

  return (
    <div className="space-y-3 ">
      <label className="block text-sm font-medium">
        {label} {required && <span style={{ color: "red" }}>*</span>}
      </label>

      {/* ---------- BANNER UI ---------- */}
      {isBanner ? (
        <div
          className="relative w-full border-2 border-gray-400  border-dashed rounded-xl  brounded-xl h-42 flex items-center justify-center cursor-pointer hover:border-gray-400 transition overflow-hidden"
          onClick={() => !value && setOpen(true)}
        >
          {value ? (
            <>
              <img
                src={value}
                alt={label}
                className="w-full h-full object-cover"
              />

              {/* Remove Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange("");
                }}
                className="absolute top-3 right-3 bg-white px-3 py-1 rounded text-xs shadow"
              >
                Remove
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center text-gray-400">
              <Upload size={34} />
              <p className="text-sm mt-2">Choose from Gallery</p>
            </div>
          )}
        </div>
      ) : (
        <>
          {/* ---------- SMALL BOX UI ---------- */}
          {value ? (
            <div className="relative w-32 h-32 border rounded-xl overflow-hidden">
              <img
                src={value}
                alt={label}
                className="w-full h-full object-cover"
              />

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

          <button
            type="button"
            className="btn-add-product"
            onClick={() => setOpen(true)}
          >
            Choose Image
          </button>
        </>
      )}

      {/* Upload Modal */}
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