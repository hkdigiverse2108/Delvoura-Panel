"use client";

import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Package, User, MapPin, CreditCard, Truck, CheckCircle, Clock, XCircle, Phone, Mail, Hash, ShoppingBag, Tag, CalendarDays, Receipt } from "lucide-react";
import { Queries } from "../../Api/Queries";

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = Queries.useGetOrderById(id);
  const order = data?.data;

  type PhoneType = {
  number?: string;
  value?: string;
};
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600">Order not found</p>
          <button
            onClick={() => navigate("/orders")}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-80 transition-colors"
          >
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { color: string; bg: string; label: string; icon: any; border: string }> = {
      pending: { color: "text-yellow-700", bg: "bg-yellow-50", label: "Pending", icon: Clock, border: "border-yellow-200" },
      processing: { color: "text-blue-700", bg: "bg-blue-50", label: "Processing", icon: Package, border: "border-blue-200" },
      shipped: { color: "text-purple-700", bg: "bg-purple-50", label: "Shipped", icon: Truck, border: "border-purple-200" },
      delivered: { color: "text-green-700", bg: "bg-green-50", label: "Delivered", icon: CheckCircle, border: "border-green-200" },
      cancelled: { color: "text-red-700", bg: "bg-red-50", label: "Cancelled", icon: XCircle, border: "border-red-200" },
    };
    const config = statusConfig[status?.toLowerCase()] || statusConfig.pending;
    const Icon = config.icon;
    return (
      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border ${config.border} ${config.bg}`}>
        <Icon size={16} className={config.color} />
        <span className={`text-sm font-semibold ${config.color}`}>{config.label}</span>
      </div>
    );
  };

  const getPaymentBadge = (status: string) => {
    const paymentConfig: Record<string, { color: string; bg: string; label: string; border: string }> = {
      paid: { color: "text-green-700", bg: "bg-green-50", label: "Paid", border: "border-green-200" },
      pending: { color: "text-yellow-700", bg: "bg-yellow-50", label: "Pending", border: "border-yellow-200" },
      failed: { color: "text-red-700", bg: "bg-red-50", label: "Failed", border: "border-red-200" },
      refunded: { color: "text-gray-700", bg: "bg-gray-50", label: "Refunded", border: "border-gray-200" },
    };
    const config = paymentConfig[status?.toLowerCase()] || paymentConfig.pending;
    return (
      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border ${config.border} ${config.bg}`}>
        <span className={`text-sm font-semibold ${config.color}`}>{config.label}</span>
      </div>
    );
  };

 const getPhoneValue = () => {
  if (!order?.phone) return "-";

  if (typeof order.phone === "object" && order.phone !== null) {
    return (
      (order.phone as PhoneType).number ||
      (order.phone as PhoneType).value ||
      "-"
    );
  }

  return order.phone;
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Back Button */}
        <button
          onClick={() => navigate("/orders")}
          className="group flex items-center gap-2 text-gray-500 hover:text-primary transition-all duration-300 mb-6"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Orders</span>
        </button>

        {/* Header with Order ID */}
        <div className="mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Receipt size={28} className="text-primary" />
                
                <span
                  onClick={() => {
                    navigator.clipboard.writeText(order._id);
                  }}
                  className="cursor-pointer hover:text-primary"
                >
                  Order #{order._id?.slice(-8) || "N/A"}
                </span>
              </h1>
              <p className="text-sm text-gray-500 mt-1">Track and manage order details</p>
            </div>
            <div className="flex gap-3">
              {getStatusBadge(order.orderStatus)}
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column - 2 columns on large screens */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Customer Information Card */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
              <div className="bg-gradient-to-r from-primary to-primary-80 px-6 pt-4">
                <h3 className="font-semibold  flex items-center gap-2">
                  <User size={18} />
                  Customer Information
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary-10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <User size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Full Name</p>
                      <p className="text-base font-semibold text-gray-900 mt-1">
                        {order.firstName || ""} {order.lastName || ""}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary-10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Email Address</p>
                      <p className="text-base text-gray-700 mt-1 break-all">{order.email || "-"}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary-10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Phone Number</p>
                      <p className="text-base font-medium text-gray-900 mt-1">{getPhoneValue()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Address Card */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
              <div className="bg-gradient-to-r from-primary to-primary-80 px-6 pt-4">
                <h3 className="font-semibold  flex items-center gap-2">
                  <MapPin size={18} />
                  Shipping Address
                </h3>
              </div>
              <div className="p-6">
                {order.shippingAddress && order.shippingAddress.length > 0 ? (
                  order.shippingAddress.map((addr: any, i: number) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-primary-10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <MapPin size={18} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-base text-gray-800 leading-relaxed">
                          {addr.address1}
                          {addr.address2 && <>, {addr.address2}</>}<br />
                          {addr.city}, {addr.state} {addr.pinCode}<br />
                          {addr.country}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                      <MapPin size={18} className="text-gray-400" />
                    </div>
                    <p className="text-gray-500">No shipping address available</p>
                  </div>
                )}
              </div>
            </div>

            {/* Order Items Card */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
              <div className="bg-gradient-to-r from-primary to-primary-80 px-6 pt-4">
                <h3 className="font-semibold  flex items-center gap-2">
                  <ShoppingBag size={18} />
                  Order Items
                  <span className="ml-2 text-sm bg-white/20 px-2 py-0.5 rounded-full">
                    {order.items?.length || 0} items
                  </span>
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Product</th>
                      <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Quantity</th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                    {order.items && order.items.length > 0 ? (
                      order.items.map((item: any, i: number) => (
                        <tr key={i} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-primary-10 rounded-lg flex items-center justify-center">
                                <Tag size={16} className="text-primary" />
                              </div>
                              <span className="text-sm font-medium text-gray-900">
                             {item.productName || "Unknown Product"}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 rounded-lg text-sm font-semibold text-gray-700">
                              {item.quantity || 0}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <span className="text-sm text-gray-700">₹{item.price?.toLocaleString() || "0"}</span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <span className="text-sm font-semibold text-gray-900">
                              ₹{((item.price || 0) * (item.quantity || 0)).toLocaleString()}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="px-6 py-12 text-center">
                          <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                          <p className="text-gray-500">No items found</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                  {order.items && order.items.length > 0 && (
                    <tfoot className="bg-gray-50 border-t border-gray-200">
                      <tr>
                        <td colSpan={3} className="px-6 py-4 text-right">
                          <span className="text-base font-semibold text-gray-900">Grand Total</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="text-xl font-bold text-primary">₹{order.total?.toLocaleString() || "0"}</span>
                        </td>
                      </tr>
                    </tfoot>
                  )}
                </table>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary Card */}
          <div className="space-y-6">
            {/* Order Summary Card */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden sticky top-6">
              <div className="bg-gradient-to-r from-primary to-primary-80 px-6 pt-4">
                <h3 className="font-semibold  flex items-center gap-2">
                  <CreditCard size={18} />
                  Order Summary
                </h3>
              </div>
              <div className="p-6">
                {/* Payment Status */}
                <div className="mb-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-600">Payment Status</span>
                    {getPaymentBadge(order.paymentStatus)}
                  </div>
                </div>

                {/* Order Details */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <Hash size={14} className="text-gray-400" />
                      <span className="text-sm text-gray-600">Order ID</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">#{order._id?.slice(-8)}</span>
                  </div>
                  
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <CalendarDays size={14} className="text-gray-400" />
                      <span className="text-sm text-gray-600">Order Date</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      }) : "-"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-gray-400" />
                      <span className="text-sm text-gray-600">Order Time</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {order.createdAt ? new Date(order.createdAt).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit'
                      }) : "-"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <Package size={14} className="text-gray-400" />
                      <span className="text-sm text-gray-600">Items Count</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{order.items?.length || 0}</span>
                  </div>
                  {/* <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <Package size={14} className="text-gray-400" />
                      <span className="text-sm text-gray-600">Payment Method</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{order.razorpayId
      ? "Razorpay"
      : order.phonePeId
      ? "PhonePe"
      : "COD"}</span>
                  </div> */}
                </div>

                {/* Amount Breakdown */}
                <div className="bg-gray-50 rounded-xl p-4 mb-5">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Subtotal</span>
                      <span className="text-sm text-gray-900">₹{order.subtotal?.toLocaleString() || "0"}</span>
                    </div>
                  
                    <div className="border-t border-gray-200 pt-2 mt-2">
                      <div className="flex justify-between items-center">
                        <span className="text-base font-bold text-gray-900">Total</span>
                        <div className="text-right">
                          <span className="text-xl font-bold text-primary">₹{order.total?.toLocaleString() || "0"}</span>
                          <p className="text-xs text-gray-500 mt-0.5">Inclusive of all taxes</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <button
                    onClick={() => window.print()}
                    className="w-full px-4 py-2.5 bg-primary text-white rounded-xl hover:bg-primary-80 transition-all duration-200 font-medium flex items-center justify-center gap-2"
                  >
                    <Receipt size={16} />
                    Print Order
                  </button>
                  <button
                    onClick={() => navigate("/orders")}
                    className="w-full px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-200 font-medium"
                  >
                    Back to Orders
                  </button>
                </div>
              </div>
            </div>

            {/* Order Timeline Card (if needed) */}
            {order.orderStatus === "delivered" && order.deliveredAt && (
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                    <CheckCircle size={18} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Delivered On</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {new Date(order.deliveredAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;