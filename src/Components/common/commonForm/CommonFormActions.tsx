"use client";

import { Button } from "antd";

interface Props {
  onCancel: () => void;
  onSubmit: () => void;
  submitText: string;
  cancelText?: string;
  disabled?: boolean;
  loading?: boolean;
}

const CommonFormActions = ({
  onCancel,
  onSubmit,
  submitText,
  cancelText = "Cancel",
  disabled = false,
  loading = false,
}: Props) => {
  return (
    <div className="flex gap-4 pt-6 border-t border-gray-100">
      <Button
        size="large"
        onClick={onCancel}
        className="flex-1 rounded-lg border-gray-300 hover:border-gray-400 h-12 text-base font-medium"
      >
        {cancelText}
      </Button>
      <Button
        size="large"
        type="primary"
        onClick={onSubmit}
        loading={loading}
        disabled={disabled}
        className="flex-1 rounded-lg bg-blue-600 hover:bg-blue-700 h-12 text-base font-medium shadow-sm hover:shadow transition-shadow"
      >
        {submitText}
      </Button>
    </div>
  );
};

export default CommonFormActions;