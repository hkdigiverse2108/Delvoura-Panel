"use client";

import { Modal, Tabs, Button } from "antd";
import { useEffect, useState } from "react";
import FileGallery from "./FileGallery";
import DropzoneUpload from "./DropzoneUpload";

interface CommonUploadModalProps {
  open: boolean;
  multiple?: boolean;
  selected?: string[];
  maxSelection?: number;
  onClose: () => void;
  onSave: (urls: string[]) => void;
}

const CommonUploadModal = ({
  open,
  multiple = false,
  selected = [],
  maxSelection,
  onClose,
  onSave,
}: CommonUploadModalProps) => {
  const [selectedUrls, setSelectedUrls] = useState<string[]>(selected);
  const [activeTab, setActiveTab] = useState("existing");

  useEffect(() => {
    if (open) {
      setSelectedUrls(selected || []);
      setActiveTab("existing");
    }
  }, [open, selected]);

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={920}
      centered
      destroyOnHidden
      title="Media Library"
      className="custom-upload-modal"
    >
      <div className="flex h-[70vh] flex-col">
        <div className="min-h-0 flex-1 overflow-hidden">
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            className="h-full common-upload-tabs"
            items={[
              {
                key: "existing",
                label: "Select Existing",
                children: (
                  <div className="h-[54vh] overflow-hidden">
                    <FileGallery
                      multiple={multiple}
                      selected={selectedUrls}
                      maxSelection={maxSelection}
                      onChange={setSelectedUrls}
                    />
                  </div>
                ),
              },
              {
                key: "upload",
                label: "Upload New",
                children: (
                  <div className="h-[54vh] overflow-y-auto pr-1">
                    <DropzoneUpload />
                  </div>
                ),
              },
            ]}
          />
        </div>

        <div className="mt-4 flex justify-end gap-3 border-t pt-4">
          <Button onClick={onClose} className="shadow-none">
            Cancel
          </Button>
          <Button
            type="primary"
            onClick={() => onSave(selectedUrls)}
            disabled={!selectedUrls.length}
            className="border-0 shadow-none"
            style={{
              background: "var(--primary, #BCAE93)",
            }}
          >
            Save Selection
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CommonUploadModal;