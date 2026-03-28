"use client";

import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

interface Props {
  label: string;
  required?: boolean;
  value: string;
  onChange: (val: string) => void;
  error?: string;
  height?: string;
}

const CommonEditor = ({
  label,
  required,
  value,
  onChange,
  error,
  height = "200px",
}: Props) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [{ align: [] }],
      ["clean"],
    ],
  };

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div
        className={`rounded-xl overflow-hidden border ${
          error ? "border-red-500" : "border-gray-200"
        }`}
      >
        <ReactQuill
          theme="snow"
          value={value}
          onChange={onChange}
          modules={modules}
          style={{ height: height }}
          className="bg-white"
        />
      </div>

      {error && (
        <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
          <span className="inline-block w-1 h-1 rounded-full bg-red-500"></span>
          {error}
        </p>
      )}
    </div>
  );
};

export default CommonEditor;