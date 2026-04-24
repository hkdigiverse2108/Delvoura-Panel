"use client";

import dayjs from "dayjs";
import { Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import CommonTable from "../common/CommonTable";

const InstagramTable = ({
  data,
  loading,
  
  onEdit,
  onDelete,
  onToggleStatus,
}: any) => {
  const columns = [
    {
      title: "Sr No",
      key: "sr",
      render: (_: any, index?: number) => (index ?? 0) + 1
    },
    {
      title: "Image",
      key: "image",
   render: (item: any) => {
  const type = item.type?.toLowerCase();
  const imgUrl = item.imageUrl?.startsWith("http")
    ? item.imageUrl
    : `https://yourbackend.com${item.imageUrl}`; // apna backend URL daalo

  const videoUrl = item.videoUrl?.startsWith("http")
    ? item.videoUrl
    : `https://yourbackend.com${item.videoUrl}`; // apna backend URL daalo

  if (type === "img") {
    return (
      <img
        src={imgUrl}
        className="w-16 h-16 rounded object-cover border border-gray-200"
        onError={(e: any) => {
          e.target.src = "https://via.placeholder.com/80";
        }}
      />
    );
  } else if (type === "video") {
    return (
      <video src={videoUrl} className="w-16 h-16 rounded object-cover" />
    );
  }
  return "-";
}
    },
    {
      title: "Link",
      key: "link",
      render: (item: any) => item.link.slice(0, 20) + "...",
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
     title="Instagram"   
      columns={columns}
      data={data}
      loading={loading}
      emptyText="No Instagram data"
    />
  );
};

export default InstagramTable;