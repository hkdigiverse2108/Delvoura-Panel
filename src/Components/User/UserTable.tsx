

"use client";

import dayjs from "dayjs";
import { Pencil, Trash2, Eye, EyeOff, User } from "lucide-react";
import CommonTable from "../common/CommonTable";

interface UserTableProps {
  data: any[];
  loading: boolean;
  page: number;
  limit: number;
  onEdit: (item: any) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (item: any) => void;
}

const UserTable = ({
  data,
  loading,
  page,
  limit,
  onEdit,
  onDelete,
  onToggleStatus,
}: UserTableProps) => {
  const columns = [
    {
      title: "Sr No",
      key: "srNo",
      render: (_item: any, index = 0) => (
        <span>
          {(page - 1) * limit + index + 1}
        </span>
      ),
    },

    {
      title: "User",
      key: "name",
      render: (item: any) => (
        <div className="flex flex-col">
          <span className="font-medium">
            {item.firstName || ""} {item.lastName || ""}
          </span>
          <span className="text-xs text-gray-500">
            {item.email}
          </span>
        </div>
      ),
    },

    {
      title: "Phone",
      key: "phone",
      render: (item: any) => (
        <span>
          {item.contact?.countryCode} {item.contact?.phoneNo || "-"}
        </span>
      ),
    },

 

    {
      title: "Created / Updated",
      key: "createdUpdatedAt",
      width: 280,
      render: (item: any) => (
        <div className="date-group-cell">
          <div>
            {item.createdAt
              ? dayjs(item.createdAt).format("DD MMM YYYY, hh:mm A")
              : "-"}
          </div>
          <div>
            {item.updatedAt
              ? dayjs(item.updatedAt).format("DD MMM YYYY, hh:mm A")
              : "-"}
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

          {/* 🔥 SAME AS SEASON */}
          <button
            className={`action-btn ${item.isActive ? "view" : "inactive-view"}`}
            onClick={() => onToggleStatus(item)}
          >
            {item.isActive ? <Eye size={16} /> : <EyeOff size={16} />}
          </button>

          <button className="action-btn edit" onClick={() => onEdit(item)}>
            <Pencil size={16} />
          </button>

          <button
            className="action-btn delete"
            onClick={() => onDelete(item._id)}
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <CommonTable
      title="Users List"
      icon={<User size={18} />}
      columns={columns}
      data={data}
      loading={loading}
      emptyText="No users found"
    />
  );
};

export default UserTable;