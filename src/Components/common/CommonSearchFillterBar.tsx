"use client";

import { Search } from "lucide-react";
import { Switch } from "antd";

interface CommonSearchFilterBarProps {
  // Search
  search?: string;
  onSearchChange?: (value: string) => void;
  onSearchSubmit?: () => void;

  // Status toggle
  status?: boolean;
  onStatusChange?: (value: boolean) => void;
  showStatusToggle?: boolean;

  // Total
  total?: number;
  label?: string;
  showTotal?: boolean;
}

const CommonSearchFilterBar = ({
  search,
  onSearchChange,
  onSearchSubmit,
  status,
  onStatusChange,
  total,
  label = "items",
  showStatusToggle = true,
  showTotal = true,
}: CommonSearchFilterBarProps) => {
  return (
    <div className="flex items-center justify-between gap-4 flex-wrap common-active-fillter">

      {/* ✅ TOTAL */}
      {showTotal && (
        <div className="text-sm font-medium ps-2" style={{ color: "var(--black)" }}>
          Total: {total ?? 0} {label}
        </div>
      )}

      <div className="flex gap-3">

        {/* ✅ STATUS TOGGLE */}
        {showStatusToggle && (
          <div className="flex items-center gap-2">
            <span className="text-sm" style={{ color: "var(--gray-dark)" }}>
              {status ? "Active" : "Inactive"}
            </span>

            <Switch
              checked={status}
              onChange={onStatusChange}
              style={{
                backgroundColor: status
                  ? "var(--primary)"
                  : "var(--gray-dark)",
              }}
            />
          </div>
        )}

        {/* ✅ SEARCH */}
        {onSearchChange && (
          <div className="flex-1 max-w-md">
            <div className="search-input-wrapper">
              <Search size={16} />
              <input
                className="search-input"
                placeholder="Search..."
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && onSearchSubmit?.()
                }
              />
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default CommonSearchFilterBar;