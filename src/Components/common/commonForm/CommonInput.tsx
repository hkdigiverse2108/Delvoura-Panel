"use client";

import { Input } from "antd";

interface Props {
  label: string;
  required?: boolean;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  prefix?: React.ReactNode;
  error?: string;
  type?: string;
}

const CommonInput = ({
  label,
  required,
  value,
  onChange,
  placeholder,
  prefix,
  error,
  type = "text",
}: Props) => {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        size="large"
        prefix={prefix}
        status={error ? "error" : ""}
        className="rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500 h-12 text-base"
      />

      {error && (
        <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
          <span className="inline-block w-1 h-1 rounded-full bg-red-500"></span>
          {error}
        </p>
      )}
    </div>
  );
};

export default CommonInput;