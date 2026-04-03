"use client";

import { useState, useEffect } from "react";
import { Package, ShoppingBag, CreditCard, Truck, X, CheckCircle, Clock, XCircle, Search } from "lucide-react";
import { DatePicker, Select, Button, message } from "antd";
import dayjs from "dayjs";
import { CommonPageHeader, CommonPagination } from "../../Components";
import { Queries } from "../../Api/Queries";
import OrderTable from "../../Components/Order/OrderTable";
import { PAGE_TITLE } from "../../Constants";

const { RangePicker } = DatePicker;

const Orders = () => {
  // State for filters
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({ start: "", end: "" });
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });
  const [searchTerm, setSearchTerm] = useState("");
  const [applyFilters, setApplyFilters] = useState(false);

  // Status options
  const statusOptions = [
    { value: "pending", label: "Pending", icon: Clock },
    { value: "processing", label: "Processing", icon: Package },
    { value: "shipped", label: "Shipped", icon: Truck },
    { value: "delivered", label: "Delivered", icon: CheckCircle },
    { value: "cancelled", label: "Cancelled", icon: XCircle },
  ];

  // Build query params only when applyFilters is true
  const queryParams = {
    page: pagination.page,
    limit: pagination.limit,
    ...(applyFilters && searchTerm && { search: searchTerm }),
    ...(applyFilters && selectedStatus && { orderStatus: selectedStatus }),
    ...(applyFilters && dateRange.start && { startDate: dateRange.start }),
    ...(applyFilters && dateRange.end && { endDate: dateRange.end }),
  };

  // Fetch orders
  const { data, isLoading, refetch } = Queries.useGetOrders(queryParams);
  
  const orders = data?.data?.order_data || [];
  const total = data?.data?.totalData || 0;
  const totalRevenue = orders.reduce((sum: number, order: any) => sum + (order.total || 0), 0);

  // Apply filters function
  const handleApplyFilters = () => {
    setApplyFilters(true);
    setPagination({ ...pagination, page: 1 });
    setTimeout(() => {
      refetch();
      message.success("Filters applied successfully");
    }, 100);
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedStatus("");
    setDateRange({ start: "", end: "" });
    setSearchTerm("");
    setApplyFilters(false);
    setPagination({ page: 1, limit: 10 });
    setTimeout(() => {
      refetch();
      message.info("All filters cleared");
    }, 100);
  };

  // Clear status filter
  const clearStatusFilter = () => {
    setSelectedStatus("");
    if (applyFilters) {
      setTimeout(() => refetch(), 100);
    }
  };

  // Clear date filter
  const clearDateFilter = () => {
    setDateRange({ start: "", end: "" });
    if (applyFilters) {
      setTimeout(() => refetch(), 100);
    }
  };

  // Handle date change
  const handleDateChange = (dates: any, dateStrings: [string, string]) => {
    if (dates && dateStrings[0] && dateStrings[1]) {
      setDateRange({
        start: dateStrings[0],
        end: dateStrings[1]
      });
    } else {
      setDateRange({ start: "", end: "" });
    }
  };

  // Handle status change
  const handleStatusChange = (value: string) => {
    setSelectedStatus(value || "");
  };

  // Get selected status label
  const selectedStatusObj = statusOptions.find(s => s.value === selectedStatus);

  // Refetch when pagination changes
  useEffect(() => {
    if (applyFilters) {
      refetch();
    }
  }, [pagination.page, pagination.limit]);

  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <CommonPageHeader
            title={PAGE_TITLE.ORDERS || "Orders"}
            subtitle="Manage and track all customer orders"
            buttonText="Export Orders"
            buttonIcon={<Package size={18} />}
            onButtonClick={() => console.log("Export orders")}
          />
        </div>

        {/* Stats Cards - Only 3 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {/* Total Orders Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Total Orders</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{total}</p>
              </div>
              <div className="w-12 h-12 bg-primary-10 rounded-xl flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-primary" />
              </div>
            </div>
          </div>

          {/* Total Revenue Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">₹{totalRevenue.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-primary-10 rounded-xl flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-primary" />
              </div>
            </div>
          </div>

          {/* Active Filters Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex flex-col gap-2">
              <p className="text-sm text-gray-500 font-medium">Active Filters</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {selectedStatus && (
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-10 rounded-lg text-sm">
                    <span className="text-primary font-medium">Status: {selectedStatusObj?.label}</span>
                    <button onClick={clearStatusFilter} className="hover:bg-primary-10 rounded-full p-0.5">
                      <X size={14} className="text-primary" />
                    </button>
                  </div>
                )}
                {(dateRange.start || dateRange.end) && (
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-10 rounded-lg text-sm">
                    <span className="text-primary font-medium">
                      Date: {dateRange.start} to {dateRange.end}
                    </span>
                    <button onClick={clearDateFilter} className="hover:bg-primary-10 rounded-full p-0.5">
                      <X size={14} className="text-primary" />
                    </button>
                  </div>
                )}
                {!selectedStatus && !dateRange.start && !dateRange.end && (
                  <span className="text-sm text-gray-400">No active filters</span>
                )}
              </div>
              {(selectedStatus || dateRange.start || dateRange.end) && (
                <button onClick={handleResetFilters} className="text-sm text-red-500 hover:text-red-600 font-medium text-left mt-1">
                  Clear All Filters
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Search Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Orders</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search by order ID or customer..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-20)] focus:border-[var(--primary)]"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Order Status</label>
              <Select
                placeholder="Select status"
                value={selectedStatus || undefined}
                onChange={handleStatusChange}
                allowClear
                className="w-full"
                style={{ height: 42 }}
                size="large"
                options={statusOptions.map(status => ({
                  label: (
                    <div className="flex items-center gap-2">
                      <status.icon className="w-4 h-4" />
                      <span>{status.label}</span>
                    </div>
                  ),
                  value: status.value
                }))}
              />
            </div>

            {/* Date Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
              <RangePicker
                className="w-full"
                size="large"
                style={{ height: 42 }}
                placeholder={['Start Date', 'End Date']}
                onChange={handleDateChange}
                value={
                  dateRange.start && dateRange.end 
                    ? [dayjs(dateRange.start), dayjs(dateRange.end)]
                    : null
                }
                format="YYYY-MM-DD"
              />
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-3 mt-5">
            <Button 
              type="primary" 
              onClick={handleApplyFilters}
              size="large"
              className="bg-primary-10 hover:bg-primary-10"
            >
              Apply Filters
            </Button>
            <Button 
              onClick={handleResetFilters}
              size="large"
            >
              Reset All
            </Button>
          </div>
        </div>

        {/* Orders Table - Shows filtered data */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <OrderTable 
            data={orders} 
            loading={isLoading} 
            page={pagination.page} 
            limit={pagination.limit} 
          />
        </div>

        {/* Pagination */}
        <CommonPagination 
          page={pagination.page} 
          limit={pagination.limit} 
          total={total} 
          currentCount={orders.length} 
          label={PAGE_TITLE.ORDERS || "orders"} 
          onPageChange={(page) => setPagination((prev) => ({ ...prev, page }))} 
          onLimitChange={(limit) => setPagination({ page: 1, limit })} 
        />
      </div>
    </div>
  );
};

export default Orders;