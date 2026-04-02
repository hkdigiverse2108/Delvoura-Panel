"use client";

import React from "react";

interface CommonTableProps {
  title?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  columns: {
    title: string;
    key: string;
    dataIndex?: string;
    render?: (item: any, index?: number) => React.ReactNode;
    align?: "left" | "center" | "right";
    className?: string;
    width?: number | string;
  }[];
  data: any[];
  loading?: boolean;
  emptyText?: string;
}

const CommonTable = ({
  columns,
  data,
  loading = false,
  emptyText = "No data found",
}: CommonTableProps) => {
  return (
    <div className="table-container">
      <div className="table-scroll">
        <table className="custom-table">

          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={column.className || ""}
                  style={{
                    textAlign: column.align || "left",
                    width: column.width,
                    minWidth: column.width,
                  }}
                >
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="table-state-cell">
                  <div className="table-loader-wrap">
                    <div
                      className="table-loader"
                      style={{ borderColor: "var(--primary)" }}
                    />
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="table-state-cell"
                  style={{ color: "var(--gray-dark)" }}
                >
                  {emptyText}
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr key={item._id || index}>
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={column.className || ""}
                      style={{ textAlign: column.align || "left" }}
                    >

                      {column.render
                        ? column.render(item, index)
                        : column.dataIndex
                        ? item[column.dataIndex]
                        : null}

                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default CommonTable;