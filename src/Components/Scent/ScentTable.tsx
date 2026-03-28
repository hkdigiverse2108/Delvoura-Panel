"use client";

import dayjs from "dayjs";
import {
  Pencil,
  Trash2,
  Sparkles,
  Eye,
  EyeOff,
} from "lucide-react";
import CommonTable from "../common/CommonTable";

interface ScentTableProps {
  data: any[];
  loading: boolean;
  page: number;
  limit: number;
  onEdit: (item: any) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (item: any) => void;
}

const ScentTable = ({
  data,
  loading,
  page,
  limit,
  onEdit,
  onDelete,
  onToggleStatus,
}: ScentTableProps) => {
  const columns = [
    {
      title: "Sr No",
      key: "srNo",
      render: (_item: any, index = 0) => (
        <span className="font-medium" style={{ color: "var(--black)" }}>
          {(page - 1) * limit + index + 1}
        </span>
      ),
    },
    {
      title: "Scent Name",
      key: "name",
      render: (item: any) => (
        <div className="flex items-center gap-2">
          <Sparkles size={16} style={{ color: "var(--primary)" }} />
          <span className="font-medium" style={{ color: "var(--black)" }}>
            {item.name}
          </span>
        </div>
      ),
    },
  
    {
        title: "Created / Updated",
        key: "createdUpdatedAt",
        width: 280,
        render: (item: any) => (
          <div className="date-group-cell">
            <div className="date-line flex flex-direction-row">
              <span className="date-label">Created:</span>
              <span className="date-value">
                {item.createdAt
                  ? dayjs(item.createdAt).format("DD MMM YYYY, hh:mm A")
                  : "-"}
              </span>
            </div>
  
            <div className="date-line">
              <span className="date-label">Updated:</span>
              <span className="date-value">
                {item.updatedAt
                  ? dayjs(item.updatedAt).format("DD MMM YYYY, hh:mm A")
                  : "-"}
              </span>
            </div>
          </div>
        ),
      },
    {
      title: "Actions",
      key: "actions",
      align: "right" as const,
      render: (item: any) => (
        <div className="flex justify-end gap-2">
          <button
            className="action-btn"
            onClick={() => onToggleStatus(item)}
            title={item.isActive ? "Set Inactive" : "Set Active"}
            style={{
              color: item.isActive ? "var(--primary)" : "var(--red)",
              borderColor: item.isActive ? "var(--primary-light)" : "rgba(255,0,0,0.15)",
            }}
          >
            {item.isActive ? <Eye size={16} /> : <EyeOff size={16} />}
          </button>

          <button className="action-btn edit" onClick={() => onEdit(item)}>
            <Pencil size={16} />
          </button>

          <button className="action-btn delete" onClick={() => onDelete(item._id)}>
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <CommonTable
      title="Scents List"
      icon={<Sparkles size={18} />}
      columns={columns}
      data={data}
      loading={loading}
      emptyText="No scents found"
    />
  );
};

export default ScentTable;