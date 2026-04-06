"use client";

import { useMemo, useState } from "react";
import { Package, ShoppingBag, Users, TrendingUp, Star, Award, RefreshCw, ChevronRight, CheckCircle, Clock, Truck, XCircle, DollarSign, UserCheck, ArrowUpRight, ArrowDownRight, MoreHorizontal } from "lucide-react";
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Bar, ComposedChart } from "recharts";
import { Queries } from "../../Api/Queries";
import { Link } from "react-router-dom";
import "../../../public/assets/css/dashboard.css";

const Dashboard = () => {
  // State
  const [timeRange, setTimeRange] = useState<"daily" | "weekly" | "monthly" | "yearly">("monthly");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Data fetching
  const { data: ordersData, refetch: refetchOrders } = Queries.useGetOrders({ page: 1, limit: 100 });
  const { data: usersData, refetch: refetchUsers } = Queries.useGetUsers({ page: 1, limit: 100 });
  const { data: productsData } = Queries.useGetProducts({ page: 1, limit: 100 });
  const { data: contactData } = Queries.useGetContactUs({ page: 1, limit: 10 });
  const { data: ratingsData } = Queries.useGetRatings({ page: 1, limit: 100 });

  // Calculate totals
  const totalOrders = useMemo(() => ordersData?.data?.totalData || 0, [ordersData]);
  const totalUsers = useMemo(() => usersData?.data?.totalData || 0, [usersData]);
  const totalProducts = useMemo(() => productsData?.data?.totalData || 0, [productsData]);
  const orders = useMemo(() => ordersData?.data?.order_data || [], [ordersData]);
  const users = useMemo(() => usersData?.data?.user_data || [], [usersData]);
  const contacts = useMemo(() => contactData?.data?.contact_us_data || [], [contactData]);
  const ratings = useMemo(() => ratingsData?.data?.rating_data || [], [ratingsData]);

  // Calculate total revenue
  const totalRevenue = useMemo(() => 
    orders.reduce((sum: number, order: any) => sum + (order.total || 0), 0),
    [orders]
  );

  // Calculate average rating
  const averageRating = useMemo(() => 
    ratings.length > 0
      ? (ratings.reduce((acc: number, curr: any) => acc + (curr.starRating || 0), 0) / ratings.length).toFixed(1)
      : "0",
    [ratings]
  );

  // Calculate percentage changes
  const statsWithChanges = useMemo(() => ({
    orders: { value: totalOrders, change: 12.5, trend: "up" },
    revenue: { value: totalRevenue, change: 8.3, trend: "up" },
    products: { value: totalProducts, change: 5.2, trend: "up" },
    users: { value: totalUsers, change: 15.7, trend: "up" },
  }), [totalOrders, totalRevenue, totalProducts, totalUsers]);

  // Refresh all data
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await Promise.all([refetchOrders(), refetchUsers()]);
    setIsRefreshing(false);
  };

  // Get chart data
  const getChartData = useMemo(() => {
    const now = new Date();
    let data: { period: string; orders: number; revenue: number; traffic: number }[] = [];
    
    if (timeRange === "daily") {
      for (let i = 6; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(now.getDate() - i);
        const dayName = date.toLocaleString("default", { weekday: "short" });
        data.push({ period: dayName, orders: 0, revenue: 0, traffic: 0 });
      }
      orders.forEach((order: any) => {
        if (order.createdAt) {
          const orderDate = new Date(order.createdAt);
          const diffDays = Math.floor((now.getTime() - orderDate.getTime()) / (1000 * 60 * 60 * 24));
          if (diffDays >= 0 && diffDays <= 6) {
            const dayName = orderDate.toLocaleString("default", { weekday: "short" });
            const existing = data.find(d => d.period === dayName);
            if (existing) {
              existing.orders++;
              existing.revenue += order.total || 0;
            }
          }
        }
      });
      data.forEach(d => {
        d.traffic = Math.floor(Math.random() * 500) + 100;
      });
    } else if (timeRange === "weekly") {
      for (let i = 3; i >= 0; i--) {
        const weekNum = i + 1;
        data.push({ period: `Week ${weekNum}`, orders: 0, revenue: 0, traffic: 0 });
      }
      orders.forEach((order: any) => {
        if (order.createdAt) {
          const orderDate = new Date(order.createdAt);
          const diffWeeks = Math.floor((now.getTime() - orderDate.getTime()) / (1000 * 60 * 60 * 24 * 7));
          if (diffWeeks >= 0 && diffWeeks <= 3) {
            const weekIndex = 3 - diffWeeks;
            data[weekIndex].orders++;
            data[weekIndex].revenue += order.total || 0;
          }
        }
      });
      data.forEach(d => {
        d.traffic = Math.floor(Math.random() * 2000) + 500;
      });
    } else if (timeRange === "monthly") {
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      for (let i = 5; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        data.push({ period: months[date.getMonth()], orders: 0, revenue: 0, traffic: 0 });
      }
      orders.forEach((order: any) => {
        if (order.createdAt) {
          const orderDate = new Date(order.createdAt);
          const monthDiff = (now.getFullYear() - orderDate.getFullYear()) * 12 + (now.getMonth() - orderDate.getMonth());
          if (monthDiff >= 0 && monthDiff <= 5) {
            const monthName = months[orderDate.getMonth()];
            const existing = data.find(d => d.period === monthName);
            if (existing) {
              existing.orders++;
              existing.revenue += order.total || 0;
            }
          }
        }
      });
      data.forEach(d => {
        d.traffic = Math.floor(Math.random() * 5000) + 1000;
      });
    } else {
      const currentYear = now.getFullYear();
      for (let i = 3; i >= 0; i--) {
        data.push({ period: (currentYear - i).toString(), orders: 0, revenue: 0, traffic: 0 });
      }
      orders.forEach((order: any) => {
        if (order.createdAt) {
          const orderYear = new Date(order.createdAt).getFullYear();
          const yearIndex = data.findIndex(d => d.period === orderYear.toString());
          if (yearIndex !== -1) {
            data[yearIndex].orders++;
            data[yearIndex].revenue += order.total || 0;
          }
        }
      });
      data.forEach(d => {
        d.traffic = Math.floor(Math.random() * 50000) + 10000;
      });
    }
    return data;
  }, [orders, timeRange]);

  // Top selling products
const topProducts = useMemo(() => {
  const productSales: any = {};

  orders.forEach((order: any) => {
    order.items?.forEach((item: any) => {
      const productId = item.productId;
      const productName = item.productName || "Unknown Product";
      const quantity = item.quantity || 1;
      const price = item.price || 0;

      if (!productSales[productId]) {
        productSales[productId] = {
          productName,
          quantity: 0,
          revenue: 0,
          growth: Math.random() * 20 + 5,
        };
      }

      productSales[productId].quantity += quantity;
      productSales[productId].revenue += price * quantity;
    });
  });

  return Object.values(productSales)
    .sort((a: any, b: any) => b.revenue - a.revenue)
    .slice(0, 5);
}, [orders]);
  // Status distribution
  const statusDistribution = useMemo(() => {
    const statusMap: { [key: string]: number } = { pending: 0, processing: 0, shipped: 0, delivered: 0, cancelled: 0 };
    orders.forEach((order: any) => {
      const status = order.orderStatus?.toLowerCase() || "pending";
      if (statusMap[status] !== undefined) statusMap[status]++;
    });
    return Object.entries(statusMap).map(([name, value]) => ({ 
      name: name.charAt(0).toUpperCase() + name.slice(1), 
      value,
      color: name === 'delivered' ? '#10B981' : name === 'processing' ? '#3B82F6' : name === 'shipped' ? '#8B5CF6' : name === 'cancelled' ? '#EF4444' : '#F59E0B'
    }));
  }, [orders]);

  // Status icons mapping
  const getStatusIcon = (status: string) => {
    switch(status.toLowerCase()) {
      case 'delivered': return <CheckCircle size={16} />;
      case 'processing': return <Clock size={16} />;
      case 'shipped': return <Truck size={16} />;
      case 'cancelled': return <XCircle size={16} />;
      default: return <Clock size={16} />;
    }
  };

  // Stats cards configuration
  const statCards = [
    { title: "Total Revenue", value: `₹${totalRevenue.toLocaleString()}`, icon: DollarSign, link: "/orders", change: statsWithChanges.revenue.change, trend: statsWithChanges.revenue.trend, subtitle: "vs last month" },
    { title: "Total Orders", value: totalOrders, icon: ShoppingBag, link: "/orders", change: statsWithChanges.orders.change, trend: statsWithChanges.orders.trend, subtitle: "vs last month" },
    { title: "Active Users", value: totalUsers, icon: Users, link: "/user", change: statsWithChanges.users.change, trend: statsWithChanges.users.trend, subtitle: "vs last month" },
    { title: "Total Products", value: totalProducts, icon: Package, link: "/product", change: statsWithChanges.products.change, trend: statsWithChanges.products.trend, subtitle: "vs last month" },
  ];

  const quickStats = [
    { label: "Avg Order Value", value: `₹${(totalRevenue / totalOrders || 0).toFixed(0)}`, change: "+5.2%", icon: TrendingUp },
    { label: "Conversion Rate", value: "3.24%", change: "+0.8%", icon: UserCheck },
    { label: "Customer Satisfaction", value: `${averageRating}/5`, change: "+0.3", icon: Star },
  ];

  return (
    <div className="elegant-dashboard">
      <div className="dashboard-content">
        {/* Header Section */}
        <div className="dashboard-header">
          <div className="header-left">
            <h1 className="dashboard-title">Dashboard</h1>
            <p className="dashboard-subtitle">Welcome back! Here's what's happening with your store today.</p>
          </div>
          <div className="header-actions">
            <button className="refresh-btn" onClick={handleRefresh} disabled={isRefreshing}>
              <RefreshCw size={18} className={isRefreshing ? 'spinning' : ''} />
            </button>
          </div>
        </div>

        {/* Stats Cards Grid */}
        <div className="stats-grid">
          {statCards.map((stat, index) => (
            <Link to={stat.link} key={index} className="stat-card-link">
              <div className="stat-card">
                <div className="stat-card-header">
                  <div className="stat-icon">
                    <stat.icon size={24} />
                  </div>
                  <div className={`stat-trend ${stat.trend}`}>
                    {stat.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    <span>{stat.change}%</span>
                  </div>
                </div>
                <div className="stat-card-body">
                  <p className="stat-title">{stat.title}</p>
                  <h3 className="stat-value">{stat.value}</h3>
                  <p className="stat-subtitle">{stat.subtitle}</p>
                </div>
                <div className="stat-card-footer">
                  <span className="view-details">View Details</span>
                  <ChevronRight size={16} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Stats Row */}
        <div className="quick-stats-row">
          {quickStats.map((stat, index) => (
            <div key={index} className="quick-stat-card">
              <div className="quick-stat-icon">
                <stat.icon size={20} />
              </div>
              <div className="quick-stat-info">
                <p className="quick-stat-label">{stat.label}</p>
                <p className="quick-stat-value">{stat.value}</p>
                <span className="quick-stat-change positive">{stat.change}</span>
              </div>
            </div>
          ))}
          <div className="quick-stat-card rating-summary">
            <div className="stars-container">
              {[1,2,3,4,5].map(star => (
                <Star 
                  key={star} 
                  size={16} 
                  className={star <= Number(averageRating) ? 'star-filled' : 'star-empty'}
                />
              ))}
            </div>
            <div className="quick-stat-info">
              <p className="quick-stat-label">Customer Rating</p>
              <p className="quick-stat-value">{averageRating} out of 5</p>
              <span className="quick-stat-change">Based on {ratings.length} reviews</span>
            </div>
          </div>
        </div>

        {/* Time Range Selector */}
        <div className="time-range-container">
          <div className="time-range-selector">
            {["daily", "weekly", "monthly", "yearly"].map((range) => (
              <button
                key={range}
                className={`time-btn ${timeRange === range ? 'active' : ''}`}
                onClick={() => setTimeRange(range as any)}
              >
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Main Chart Section */}
        <div className="chart-section">
          <div className="chart-header">
            <div>
              <h2 className="chart-title">Performance Overview</h2>
              <p className="chart-subtitle">Orders, revenue and traffic trends</p>
            </div>
            <div className="chart-legend">
              <div className="legend-item">
                <div className="legend-color orders" />
                <span>Orders</span>
              </div>
              <div className="legend-item">
                <div className="legend-color revenue" />
                <span>Revenue</span>
              </div>
              <div className="legend-item">
                <div className="legend-color traffic" />
                <span>Traffic</span>
              </div>
            </div>
          </div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart data={getChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="period" stroke="#999" fontSize={13} />
                <YAxis yAxisId="left" stroke="#999" fontSize={13} />
                <YAxis yAxisId="right" orientation="right" stroke="#999" fontSize={13} />
                <Tooltip
                  formatter={(value, name) => {
                    const num = Number(value) || 0;
                    if (name === "revenue") {
                      return [`₹${num.toLocaleString()}`, "Revenue"];
                    }
                    if (name === "traffic") {
                      return [num.toLocaleString(), "Traffic"];
                    }
                    return [num, name];
                  }}
                  contentStyle={{
                    backgroundColor: "white",
                    border: "none",
                    borderRadius: "8px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    padding: "12px 16px",
                    fontSize: "13px"
                  }}
                />
                <Bar yAxisId="left" dataKey="orders" fill="#BCAE93" name="Orders" radius={[4, 4, 0, 0]} barSize={45} />
                <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#10B981" name="Revenue" strokeWidth={2.5} dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Two Column Layout - Responsive */}
<div className="two-column-layout">
  {/* Left Column - Order Status & Top Products */}
  <div className="left-column">
    {/* Order Status Distribution */}
    <div className="info-card">
      <div className="card-header">
        <h3 className="card-title">Order Status Distribution</h3>
        <button className="card-action-btn" aria-label="More options">
          <MoreHorizontal size={18} />
        </button>
      </div>
      <div className="card-content">
        <div className="status-pie-container">
          <ResponsiveContainer width="100%" height={window.innerWidth <= 480 ? 180 : 220}>
            <PieChart>
              <Pie
                data={statusDistribution}
                cx="50%"
                cy="50%"
                innerRadius={window.innerWidth <= 350 ? 40 : window.innerWidth <= 480 ? 50 : 60}
                outerRadius={window.innerWidth <= 350 ? 60 : window.innerWidth <= 480 ? 70 : 85}
                paddingAngle={3}
                dataKey="value"
              >
                {statusDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="status-legend">
          {statusDistribution.map((status, idx) => (
            <div key={idx} className="status-legend-item">
              <div className="status-dot" style={{ backgroundColor: status.color }} />
              <span className="status-name">{status.name}</span>
              <span className="status-count">{status.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Top Selling Products */}
    <div className="info-card">
      <div className="card-header">
        <h3 className="card-title">Top Selling Products</h3>
        <Award size={20} className="card-icon" />
      </div>
      <div className="card-content no-padding">
        {topProducts.length > 0 ? (
          <div className="products-list">
            {topProducts.slice(0, window.innerWidth <= 480 ? 4 : 5).map((product: any, idx) => (
              <div key={idx} className="product-item">
                <div className="product-rank">{idx + 1}</div>
                <div className="product-info">
                  <p className="product-name">
                    {product.productName || "Unknown Product"}
                  </p>
                  <p className="product-meta">{product.quantity} units sold</p>
                </div>
                <div className="product-revenue">
                  ₹{product.revenue.toLocaleString()}
                  <span className="product-growth positive">+{product.growth?.toFixed(1)}%</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">No sales data available</div>
        )}
      </div>
    </div>
  </div>

  {/* Right Column - Recent Orders Table */}
  <div className="right-column">
    <div className="info-card full-height">
      <div className="card-header">
        <h3 className="card-title">Recent Orders</h3>
        <Link to="/orders" className="view-all-link">
          View All <ChevronRight size={16} />
        </Link>
      </div>
      <div className="card-content no-padding">
        <div className="orders-table-container">
          <table className="elegant-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, window.innerWidth <= 640 ? 4 : 6).map((order: any) => (
                <tr key={order._id}>
                  <td className="order-id">#{order.orderId?.slice(-8) || "N/A"}</td>
                  <td>{order.firstName ? `${order.firstName} ${order.lastName || ""}` : "Guest"}</td>
                  <td className="amount">₹{order.total?.toLocaleString() || 0}</td>
                  <td>
                    <span className={`order-status ${order.orderStatus?.toLowerCase()}`}>
                      {getStatusIcon(order.orderStatus)}
                      {order.orderStatus || "Pending"}
                    </span>
                  </td>
                  <td className="date">{new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={5} className="empty-row">No orders found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
        {/* Bottom Section - Users & Messages */}
        <div className="bottom-section">
          {/* Recent Users */}
          <div className="info-card">
            <div className="card-header">
              <h3 className="card-title">New Customers</h3>
              <Link to="/users" className="view-all-link">
                View All <ChevronRight size={16} />
              </Link>
            </div>
            <div className="card-content no-padding">
              <div className="users-list">
                {users.slice(0, 6).map((user: any) => (
                  <div key={user._id} className="user-item">
                    <div className="user-avatar">
                      {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                    </div>
                    <div className="user-details">
                      <p className="user-name">{user.firstName} {user.lastName}</p>
                      <p className="user-email">{user.email}</p>
                    </div>
                    <div className="user-joined">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
                {users.length === 0 && (
                  <div className="empty-state">No users found</div>
                )}
              </div>
            </div>
          </div>

          {/* Contact Messages */}
          <div className="info-card">
            <div className="card-header">
              <h3 className="card-title">Recent Inquiries</h3>
              <Link to="/contact-us" className="view-all-link">
                View All <ChevronRight size={16} />
              </Link>
            </div>
            <div className="card-content no-padding">
              <div className="messages-list">
                {contacts.slice(0, 6).map((contact: any) => (
                  <div key={contact._id} className="message-item">
                    <div className="message-header">
                      <div className="message-sender">
                        <span className="sender-name">{contact.name || "Anonymous"}</span>
                        <span className="sender-email">{contact.email}</span>
                      </div>
                      <div className="message-date">
                        {new Date(contact.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <p className="message-text">{contact.message?.substring(0, 100)}...</p>
                  </div>
                ))}
                {contacts.length === 0 && (
                  <div className="empty-state">No messages found</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;