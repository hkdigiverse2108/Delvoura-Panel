"use client";

interface Props {
  label?: string;
  value?: string;
  onChange?: (val: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
}

const CommonTextarea = ({
  label,
  value,
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

      <textarea
        value={value || ""}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        rows={4}
        className="form-input"
      />

      {error && <p className="form-error">{error}</p>}

    </div>
  );
};

export default CommonTextarea;