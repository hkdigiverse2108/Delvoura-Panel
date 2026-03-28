"use client";

import dayjs from "dayjs";
import { Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import CommonTable from "../common/CommonTable";

interface Props {
  data: any[];
  loading: boolean;
  page: number;
  limit: number;
  onEdit: any;
  onDelete: any;
  onToggleStatus: any;
}

const TermsServiceTable = ({
  data,
  loading,
  page,
  limit,
  onEdit,
  onDelete,
  onToggleStatus,
}: Props) => {
  const tableData = data.map((item, index) => ({
    ...item,
    srNo: (page - 1) * limit + index + 1,
  }));

  const columns = [
    {
      title: "Sr No",
      key: "srNo",
      render: (item: any) => item.srNo,
    },
    {
      title: "Title",
      key: "title",
      render: (item: any) => item.title,
    },
    {
      title: "Content",
      key: "content",
      render: (item: any) => (
        <div style={{ maxWidth: 300 }}>
          <div dangerouslySetInnerHTML={{ __html: item.content }} />  
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
    title="Terms_Services"
      columns={columns}
      data={tableData}
      loading={loading}
      emptyText="No terms found"
    />
  );
};

export default TermsServiceTable;