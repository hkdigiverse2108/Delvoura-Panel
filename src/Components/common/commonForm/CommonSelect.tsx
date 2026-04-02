"use client";

interface Props {
  label?: string;
  value?: any;
  options?: { label: string; value: string }[];
  onChange?: (val: any) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
}

const CommonSelect = ({
  label,
  value,
  options = [],
  onChange,
  placeholder,
  required,
  error,
}: Props) => {
  return (
    <div className="form-group">
      {label && (
        <label className="form-label">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <select
        value={value || ""}
        onChange={(e) => onChange?.(e.target.value)}
        className="form-input"
      >
        <option value="">{placeholder || "Select option"}</option>

        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {error && <p className="form-error">{error}</p>}
    </div>
  );
};

export default CommonSelect;