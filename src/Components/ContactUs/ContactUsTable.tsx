"use client";

import dayjs from "dayjs";
import { Trash2, Mail } from "lucide-react";
import CommonTable from "../common/CommonTable";

interface ContactUsTableProps {
  data: any[];
  loading: boolean;
  page: number;
  limit: number;
  onDelete: (id: string) => void;
}

const ContactUsTable = ({
  data,
  loading,
  page,
  limit,
  onDelete,
}: ContactUsTableProps) => {

  const columns = [

    {
      title: "Sr No",
      key: "srNo",
      render: (_: any, index = 0) =>
        (page - 1) * limit + index + 1,
    },

    {
      title: "Full Name",
      key: "fullName",
      render: (item: any) => item.fullName,
    },

    {
      title: "Email",
      key: "email",
      render: (item: any) => item.email,
    },

    {
      title: "Phone",
      key: "phone",
      render: (item: any) =>
        `${item.countryCode || ""} ${item.phone || "-"}`,
    },

    {
      title: "Message",
      key: "message",
      width: 300,
      render: (item: any) => item.message,
    },

    {
      title: "Status",
      key: "isRead",
      render: (item: any) =>
        item.isRead ? "Read" : "Unread",
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
        <button
          className="action-btn delete"
          onClick={() => onDelete(item._id)}
        >
          <Trash2 size={16} />
        </button>
      ),
    },

  ];

  return (
    <CommonTable
      title="Contact Messages"
      icon={<Mail size={18} />}
      columns={columns}
      data={data}
      loading={loading}
      emptyText="No contact messages found"
    />
  );
};

export default ContactUsTable;