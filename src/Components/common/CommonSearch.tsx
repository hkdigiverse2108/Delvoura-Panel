"use client";

import { Search } from "lucide-react";

interface CommonSearchProps {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  onSearch?: () => void;
}

const CommonSearch = ({
  value,
  placeholder = "Search...",
  onChange,
  onSearch,
}: CommonSearchProps) => {
  return (
    <div className="filter-bar">
      <div className="search-input-wrapper">
        <Search size={16} />
        <input
          className="search-input"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSearch?.()}
        />
      </div>
    </div>
  );
};

export default CommonSearch;