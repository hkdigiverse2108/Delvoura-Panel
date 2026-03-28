"use client";

import { Button, Select } from "antd";

interface CommonPaginationProps {
  page: number;
  limit: number;
  total: number;
  currentCount: number;
  label?: string;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}

const CommonPagination = ({
  page,
  limit,
  total,
  currentCount,
  label = "items",
  onPageChange,
  onLimitChange,
}: CommonPaginationProps) => {
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="pagination-container">
      <div className="pagination-info">
        Showing <span>{currentCount}</span> of <span>{total}</span> {label}
      </div>

      <div className="pagination-controls">
        <Select
          value={limit}
          onChange={onLimitChange}
          className="theme-select pagination-theme-select"
          popupClassName="theme-select-dropdown"
          style={{ width: 120, height: 44 }}
          options={[
            { label: "10 / page", value: 10 },
            { label: "30 / page", value: 30 },
            { label: "50 / page", value: 50 },
            { label: "100 / page", value: 100 },
          ]}
        />

        <Button
          className="page-btn"
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
        >
          ‹
        </Button>

        {[...Array(Math.min(5, totalPages))].map((_, i) => {
          let pageNum = i + 1;

          if (totalPages > 5) {
            if (page <= 3) pageNum = i + 1;
            else if (page >= totalPages - 2) pageNum = totalPages - 4 + i;
            else pageNum = page - 2 + i;
          }

          if (pageNum <= totalPages && pageNum > 0) {
            return (
              <Button
                key={i}
                className={`page-btn ${page === pageNum ? "active" : ""}`}
                onClick={() => onPageChange(pageNum)}
              >
                {pageNum}
              </Button>
            );
          }

          return null;
        })}

        <Button
          className="page-btn"
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages || totalPages === 0}
        >
          ›
        </Button>
      </div>
    </div>
  );
};

export default CommonPagination;