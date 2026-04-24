"use client";

import dayjs from "dayjs";
import { Eye, EyeOff, Package, Pencil, Trash2 } from "lucide-react";
import CommonTable from "../common/CommonTable";

interface ProductTableProps {
  data: any[];
  loading: boolean;
  page: number;
  limit: number;
  onEdit: (item: any) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (item: any) => void;
}

const ProductTable = ({
  data,
  loading,
  page,
  limit,
  onEdit,
  onDelete,
  onToggleStatus,
}: ProductTableProps) => {
  const columns = [
    {
      title: "Sr No",
      key: "srNo",
      width: 80,
      render: (_: any, index = 0) => (
        <span className="table-text strong">
          {(page - 1) * limit + index + 1}
        </span>
      ),
    },

    {
  title: "Cover",
  key: "coverimage",
  render: (item: any) => {
    const images = item.images || [];
    const imageUrl = item.coverimage || images?.[0];

    return (
      <div className="relative w-12 h-12">
        {imageUrl ? (
          <>
            <img
              src={imageUrl}
              alt={item.name}
              className="h-12 w-12 rounded-lg object-cover border border-gray-200 bg-gray-50"
            />

            {/* image count badge */}
            {images.length > 1 && (
              <div className="absolute -bottom-1 -right-1 bg-black text-white text-[10px] px-1 rounded">
                +{images.length - 1}
              </div>
            )}
          </>
        ) : (
          <div className="h-12 w-12 rounded-lg flex items-center justify-center border border-gray-200 bg-gray-50">
            <Package size={18} />
          </div>
        )}
      </div>
    );
  },
},

{
  title: "Product",
  key: "name",
  render: (item: any) => (
    <div className="product-info-cell max-w-[200px]">
      <span className="product-name block truncate" title={item.name}>
        {item.name || "-"}
      </span>
    </div>
  ),
},

{
  title: "Title",
  key: "title",
  width: 180,
  render: (item: any) => (
    <div className="product-info-cell max-w-[200px]">
      <span className="product-name block truncate" title={item.title}>
        {item.title || "-"}
      </span>
    </div>
  ),
},
    {
      title: "Gender",
      key: "gender",
      width: 100,
      render: (item: any) => (
        <span className="table-text capitalize">
          {item.gender || "-"}
        </span>
      ),
    },

  //   {
  //     title: "MRP",
  //     key: "mrp",
  //     width: 100,
  //     render: (item: any) => (
  //       <span className="table-text strong">
  //       {item.variants?.[0]?.mrp
  // ? `₹${item.variants[0].mrp}`
  // : "-"}
  //       </span>
  //     ),
  //   },

   

    {
      title: "Created / Updated",
      key: "createdUpdatedAt",
      width: 280,
      render: (item: any) => (
        <div className="date-group-cell">
          <div className="date-line">
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
      width: 150,
      align: "right" as const,
      render: (item: any) => (
        <div className="flex justify-end gap-2">
          <button
            // className="action-btn"
             className={`action-btn ${item.isActive ? "view" : "inactive-view"}`}
            onClick={() => onToggleStatus(item)}
            // title={item.isActive ? "Set Inactive" : "Set Active"}
            // style={{
            //   color: item.isActive
            //     ? "var(--primary)"
            //     : "var(--red)",
            //   borderColor: item.isActive
            //     ? "var(--primary-light)"
            //     : "rgba(255,0,0,0.15)",
            // }}
          >
            {item.isActive ? (
              <Eye size={16} />
            ) : (
              <EyeOff size={16} />
            )}
          </button>

          <button
            className="action-btn edit"
            onClick={() => onEdit(item)}
          >
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
      title="Products List"
      icon={<Package size={18} />}
      columns={columns}
      data={data}
      loading={loading}
      emptyText="No products found"
    />
  );
};

export default ProductTable;