"use client";

import { Filter, ChevronDown, ChevronUp } from "lucide-react";

interface CommonFilterPanelProps {
  title?: string;
  isOpen: boolean;
  activeCount?: number;
  onToggle: () => void;
  children: React.ReactNode;
}

const CommonFilterPanel = ({
  title = "Advanced Filters",
  isOpen,
  activeCount = 0,
  onToggle,
  children,
}: CommonFilterPanelProps) => {
  return (
    <div className="advanced-filter-wrapper">
      <div className="advanced-filter-header" onClick={onToggle}>
        <div className="advanced-filter-title">
          <Filter size={16} />
          <span>{title}</span>
          {activeCount > 0 && <span className="filter-badge">{activeCount}</span>}
        </div>

        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </div>

      <div className={`advanced-filter-body ${isOpen ? "open" : ""}`}>
        <div className="advanced-filter-inner">{children}</div>
      </div>
    </div>
  );
};

export default CommonFilterPanel;