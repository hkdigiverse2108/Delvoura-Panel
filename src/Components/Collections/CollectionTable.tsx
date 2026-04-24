"use client";

import dayjs from "dayjs";
import { Pencil, Trash2, FolderOpen, Eye, EyeOff } from "lucide-react";
import CommonTable from "../common/CommonTable";

interface CollectionTableProps {
  data: any[];
  loading: boolean;
  page: number;
  limit: number;
  onEdit: (item: any) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (item: any) => void;
}

const CollectionTable = ({
  data,
  loading,
  page,
  limit,
  onEdit,
  onDelete,
  onToggleStatus,
}: CollectionTableProps) => {
  const tableData = data.map((item, index) => ({
    ...item,
    srNo: (page - 1) * limit + index + 1,
  }));

  const columns = [
    {
      title: "Sr No",
      key: "srNo",
      render: (item: any) => (
        <span className="font-medium" style={{ color: "var(--black)" }}>
          {item.srNo}
        </span>
      ),
    },
    {
      title: "Image",
      key: "image",
      render: (item: any) => (
        <div className="flex items-center">
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              className="w-12 h-12 rounded-lg object-cover border border-gray-200"
            />
          ) : (
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center border border-gray-200"
              style={{ backgroundColor: "var(--gray-light)" }}
            >
              <FolderOpen size={18} style={{ color: "var(--primary)" }} />
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Collection Name",
      key: "name",
      render: (item: any) => (
        <div className="flex items-center gap-2">
          <FolderOpen size={16} style={{ color: "var(--primary)" }} />
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
            className={`action-btn ${item.isActive ? "view" : "inactive-view"}`}
            onClick={() => onToggleStatus(item)}
            title={item.isActive ? "Set Inactive" : "Set Active"}
            type="button"
          >
            {item.isActive ? <Eye size={16} /> : <EyeOff size={16} />}
          </button>

          <button className="action-btn edit" onClick={() => onEdit(item)} type="button">
            <Pencil size={16} />
          </button>

          <button className="action-btn delete" onClick={() => onDelete(item._id)} type="button">
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <CommonTable
      title="Collections List"
      icon={<FolderOpen size={18} />}
      columns={columns}
      data={tableData}
      loading={loading}
      emptyText="No collections found"
    />
  );
};

export default CollectionTable;