"use client";

import { Edit, Eye, EyeOff } from "lucide-react";
import { Button } from "antd";

interface TopbarPreviewProps {
  data: any;
  onToggle: () => void;
  onEdit: () => void;
}

const TopbarPreview = ({ data, onToggle, onEdit }: TopbarPreviewProps) => {
  if (!data) {
    return (
      <div className="bg-white rounded-xl shadow p-8 text-center">
        <EyeOff size={40} className="mx-auto text-gray-400 mb-3" />
        <h3 className="text-md font-medium text-gray-800 mb-2">
          No Topbar Configured
        </h3>
        <Button type="primary" onClick={onEdit}>
          Create Topbar
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow">
      
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <h3 className="font-semibold text-gray-800">Topbar Preview</h3>

        <div className="flex gap-2">
          <Button icon={<Edit size={16} />} onClick={onEdit}>
            Edit
          </Button>

          <Button
            icon={data.isActive ? <Eye size={16} /> : <EyeOff size={16} />}
            onClick={onToggle}
          >
            {data.isActive ? "Active" : "Inactive"}
          </Button>
        </div>
      </div>

      {/* Simple List */}
      <div className="p-4">
        {data.topbarItems?.length ? (
          <ul className="space-y-2">
            {data.topbarItems.map((item: string, index: number) => (
              <li
                key={index}
                className="flex justify-between items-center px-3 py-2 bg-gray-50 rounded-md"
              >
                <span className="text-sm text-gray-700">{item}</span>

                {/* dot indicator */}
                <span
                  className={`w-2 h-2 rounded-full ${
                    data.isActive ? "bg-green-500" : "bg-gray-400"
                  }`}
                ></span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-400">No items added</p>
        )}
      </div>
    </div>
  );
};

export default TopbarPreview;