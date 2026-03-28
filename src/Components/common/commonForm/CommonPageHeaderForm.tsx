"use client";

import { Button } from "antd";
import { ArrowLeft } from "lucide-react";

interface Props {
  title: string;
  description: string;
  onBack: () => void;
  backButtonText?: string;
}

const CommonPageHeaderForm = ({ title, description, onBack, backButtonText = "Back" }: Props) => {
  return (
    <div className="px-8 pt-8 pb-6 border-b border-gray-100 bg-gradient-to-r from-white to-gray-50/50">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          <p className="text-gray-500 mt-1 text-sm">{description}</p>
        </div>
        <Button
          icon={<ArrowLeft size={16} />}
          onClick={onBack}
          className="rounded-lg shadow-sm hover:shadow transition-shadow"
        >
          {backButtonText}
        </Button>
      </div>
    </div>
  );
};

export default CommonPageHeaderForm;