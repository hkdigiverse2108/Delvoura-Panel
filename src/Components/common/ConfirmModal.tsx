"use client";

import { Modal, Button } from "antd";

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  loading?: boolean;
}

const ConfirmModal = ({
  open,
  onClose,
  onConfirm,
  title = "Confirm Delete",
  description = "Are you sure you want to delete this item?",
  loading = false,
}: ConfirmModalProps) => {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={400}
      styles={{
        body: { padding: "24px" },
      }}
    >
      <div className="text-center space-y-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-gray-500">{description}</p>

        <div className="flex justify-center gap-3 mt-4">
          <Button onClick={onClose} className="rounded-lg">
            Cancel
          </Button>

          <Button
            danger
            type="primary"
            loading={loading}
            onClick={onConfirm}
            className="rounded-lg"
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;