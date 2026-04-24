"use client";

import { Modal, Button } from "antd";
import React from "react";

interface CommonModalProps { open: boolean; onClose: () => void;  title: string; subtitle?: string; icon?: React.ReactNode; children: React.ReactNode; onSubmit?: () => void; submitText?: string; cancelText?: string; submitDisabled?: boolean; width?: number;}

const CommonModal = ({open,onClose,title,subtitle,icon,children, onSubmit, submitText = "Submit", cancelText = "Cancel", submitDisabled = false, width = 480,}: CommonModalProps) => {
  return (
    <Modal open={open} onCancel={onClose} footer={null} width={width} centered styles={{ body: { padding: 0 }, }} >
       <div className="px-6 py-5" style={{ background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-80) 100%)", borderRadius: "7px" }}>
        <div className="flex items-center gap-3">
          {icon && (
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "white" }}>{icon} </div> )}
          <div>
            <h2 className="text-xl font-bold text-white mb-0">{title}</h2>{subtitle && <p className="text-white text-opacity-85 text-xs mt-1">{subtitle}</p>} </div>
        </div>
      </div>

      <div className="px-6 py-6">
        {children}
        <div className="flex gap-3 pt-6">
          <Button block size="large" onClick={onClose} style={{ height: "44px", fontSize: "14px", borderRadius: "10px", borderColor: "#e2e8f0", fontWeight: 500 }} className="hover:border-primary hover:text-primary transition-all">{cancelText} </Button>
          <Button block size="large" onClick={onSubmit} disabled={submitDisabled} style={{ backgroundColor: "var(--primary)",  borderColor: "var(--primary)", height: "44px", fontSize: "14px", fontWeight: 600, borderRadius: "10px", color: "#fff",  boxShadow: "0 2px 8px rgba(188, 174, 147, 0.2)",}} className="hover:opacity-90 transition-all">{submitText} </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CommonModal;