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
  disabled?: boolean;
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
  disabled = false,
}: Props) => {
  return (
    <div className="w-full">
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
        disabled={disabled}
        className="rounded-lg h-12 text-base hover:border-primary focus:border-primary"
        style={{ borderRadius: 8 }}
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