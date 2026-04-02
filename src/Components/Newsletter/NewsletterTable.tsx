"use client";

import dayjs from "dayjs";
import { Mail, Trash2 } from "lucide-react";
import CommonTable from "../common/CommonTable";

interface NewsletterTableProps {
  data: any[];
  loading: boolean;
  page: number;
  limit: number;
  onDelete: (id: string) => void;
}

const NewsletterTable = ({
  data,
  loading,
  page,
  limit,
  onDelete,
}: NewsletterTableProps) => {

  const columns = [

    {
      title: "Sr No",
      key: "srNo",
      render: (_: any, index = 0) =>
        (page - 1) * limit + index + 1,
    },

    {
      title: "Email",
      key: "email",
      render: (item: any) => (
        <div className="flex items-center gap-2">
          <Mail size={16} />
          {item.email}
        </div>
      ),
    },

    
    {
      title: "Created",
      key: "createdAt",
      render: (item: any) =>
        dayjs(item.createdAt).format("DD MMM YYYY, hh:mm A"),
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
      title="Newsletter Subscribers"
      icon={<Mail size={18} />}
      columns={columns}
      data={data}
      loading={loading}
      emptyText="No newsletter subscribers found"
    />
  );
};

export default NewsletterTable;