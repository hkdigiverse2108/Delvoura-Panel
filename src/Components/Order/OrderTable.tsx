"use client";

import dayjs from "dayjs";
import { Eye, Package, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CommonTable from "../common/CommonTable";

interface OrderTableProps {
  data: any[];
  loading: boolean;
  page: number;
  limit: number;
}

const OrderTable = ({
  data,
  loading,
  page,
  limit,
}: OrderTableProps) => {

  const navigate = useNavigate();

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { color: string; bg: string; label: string }> = {
      pending: { color: "text-yellow-600", bg: "bg-yellow-50", label: "Pending" },
      processing: { color: "text-blue-600", bg: "bg-blue-50", label: "Processing" },
      shipped: { color: "text-purple-600", bg: "bg-purple-50", label: "Shipped" },
      delivered: { color: "text-green-600", bg: "bg-green-50", label: "Delivered" },
      cancelled: { color: "text-red-600", bg: "bg-red-50", label: "Cancelled" },
    };
    
    const config = statusConfig[status?.toLowerCase()] || statusConfig.pending;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${config.bg} ${config.color}`}>
        {config.label}
      </span>
    );
  };

const normalizePaymentStatus = (status: string) => {
  const s = status?.toLowerCase();

  if (s === "completed") return "paid";   // PhonePe
  if (s === "paid") return "paid";        // Razorpay
  if (s === "failed") return "failed";
  if (s === "pending") return "pending";

  return "pending";
};

const getPaymentBadge = (status: string) => {
  const normalized = normalizePaymentStatus(status);

  const paymentConfig: Record<string, { color: string; bg: string; label: string }> = {
    paid: { color: "text-green-600", bg: "bg-green-50", label: "Paid" },
    pending: { color: "text-yellow-600", bg: "bg-yellow-50", label: "Pending" },
    failed: { color: "text-red-600", bg: "bg-red-50", label: "Failed" },
  };

  const config = paymentConfig[normalized] || paymentConfig.pending;

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${config.bg} ${config.color}`}>
      {config.label}
    </span>
  );
};

  const columns = [
    {
      title: "Sr No",
      key: "srNo",
      render: (_item: any, index = 0) => (
        <span className="font-medium text-gray-500 text-sm">
          {(page - 1) * limit + index + 1}
        </span>
      ),
    },
    {
      title: "Order ID",
      key: "orderId",
      render: (item: any) => (
        <div className="flex flex-col">
          <span className="font-semibold text-primary">
            #{item._id?.slice(-8) || "N/A"}
          </span>
          <span className="text-xs text-gray-400">
            {item.createdAt ? dayjs(item.createdAt).format("DD MMM") : "-"}
          </span>
        </div>
      ),
    },
    {
      title: "Customer",
      key: "customer",
      render: (item: any) => (
        <div className="flex flex-col">
          <span className="font-medium text-gray-900">
            {item.firstName || ""} {item.lastName || ""}
          </span>
          <span className="text-xs text-gray-500">
            {item.email || "-"}
          </span>
        </div>
      ),
    },
    {
      title: "Phone",
      key: "phone",
      render: (item: any) => {
        // Handle if phone is an object or string
        const phoneValue = typeof item.phone === 'object' 
          ? item.phone?.number || item.phone?.value || JSON.stringify(item.phone)
          : item.phone;
        return <span className="text-sm text-gray-600">{phoneValue || "-"}</span>;
      },
    },
    {
      title: "Total Amount",
      key: "total",
      render: (item: any) => (
        <div className="flex flex-col">
          <span className="font-semibold text-gray-900">
            ₹{item.total?.toLocaleString() || "0"}
          </span>
          <span className="text-xs text-gray-500">
            {item.items?.length || 0} items
          </span>
        </div>
      ),
    },
    {
      title: "Payment",
      key: "paymentStatus",
      render: (item: any) => getPaymentBadge(item.paymentStatus),
    },
    {
      title: "Order Status",
      key: "orderStatus",
      render: (item: any) => getStatusBadge(item.orderStatus),
    },
    {
      title: "Created",
      key: "createdAt",
      render: (item: any) => (
        <div className="flex flex-col">
          <span className="text-sm text-gray-700">
            {item.createdAt ? dayjs(item.createdAt).format("DD MMM YYYY") : "-"}
          </span>
          <span className="text-xs text-gray-400">
            {item.createdAt ? dayjs(item.createdAt).format("hh:mm A") : ""}
          </span>
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      align: "right" as const,
      render: (item: any) => (
        <div className="flex justify-end">
          <button
            className="group flex items-center gap-1 px-3 py-1.5 bg-primary-10 hover:bg-primary rounded-lg transition-all duration-200"
            onClick={() => navigate(`/orders/${item._id}`)}
            title="View Order Details"
            type="button"
          >
            <Eye size={14} className="text-primary group-hover:text-white transition-colors" />
            <span className="text-xs font-medium text-primary group-hover:text-white transition-colors">View</span>
            <ChevronRight size={12} className="text-primary group-hover:text-white transition-colors" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <CommonTable
      title="Orders List"
      icon={<Package size={18} />}
      columns={columns}
      data={data}
      loading={loading}
      emptyText="No orders found"
    />
  );
};

export default OrderTable;