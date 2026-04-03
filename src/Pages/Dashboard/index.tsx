"use client";

import { useMemo, useState, useEffect, useRef, useCallback } from "react";
import {
  Package, ShoppingBag, Users, TrendingUp, Star, UserPlus, Bell,
  Award, RefreshCw, ChevronRight, Clock,
  DollarSign, UserCheck, ArrowUpRight, ArrowDownRight, MoreHorizontal
} from "lucide-react";
import {
  Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Bar, ComposedChart
} from "recharts";
import { Queries } from "../../Api/Queries";
import { Link } from "react-router-dom";
import "../../../public/assets/css/dashboard.css";
import Element from "antd/es/skeleton/Element";

// ============================================
// TYPES
// ============================================
interface Notification {
  id: string;
  title: string;
  message: string;
  time: Date;
  type: "order" | "user" | "review" | "alert";
  read: boolean;
}

// ============================================
// UTILITIES
// ============================================
const getStoredReadNotifications = (): Set<string> => {
  const stored = localStorage.getItem('read_notifications');
  return new Set(stored ? JSON.parse(stored) : []);
};

type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";
const saveReadNotification = (id: string) => {
  const readSet = getStoredReadNotifications();
  readSet.add(id);
  localStorage.setItem('read_notifications', JSON.stringify(Array.from(readSet)));
};

// ============================================
// MAIN COMPONENT
// ============================================
const Dashboard = () => {
  // State
  const [showNotifications, setShowNotifications] = useState(false);
  const [timeRange, setTimeRange] = useState<"daily" | "weekly" | "monthly" | "yearly">("monthly");
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const notificationRef = useRef<HTMLDivElement>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Data Fetching
  const { data: ordersData, refetch: refetchOrders } = Queries.useGetOrders({ page: 1, limit: 100 });
  const { data: usersData, refetch: refetchUsers } = Queries.useGetUsers({ page: 1, limit: 100 });
  const { data: productsData } = Queries.useGetProducts({ page: 1, limit: 100 });
  const { data: contactData } = Queries.useGetContactUs({ page: 1, limit: 10 });
  const { data: ratingsData } = Queries.useGetRatings({ page: 1, limit: 100 });

  // Derived Data
  const totalOrders = useMemo(() => ordersData?.data?.totalData || 0, [ordersData]);
  const totalUsers = useMemo(() => usersData?.data?.totalData || 0, [usersData]);
  const totalProducts = useMemo(() => productsData?.data?.totalData || 0, [productsData]);
  const orders = useMemo(() => ordersData?.data?.order_data || [], [ordersData]);
  const users = useMemo(() => usersData?.data?.user_data || [], [usersData]);
  const contacts = useMemo(() => contactData?.data?.contact_us_data || [], [contactData]);
  const ratings = useMemo(() => ratingsData?.data?.rating_data || [], [ratingsData]);

  const totalRevenue = useMemo(() => 
    orders.reduce((sum, order) => sum + (order.total || 0), 0), [orders]
  );

  const averageRating = useMemo(() => 
    ratings.length ? (ratings.reduce((acc, curr) => acc + (curr.starRating || 0), 0) / ratings.length).toFixed(1) : "0", [ratings]
  );

  // Notifications
  const generateNotifications = useCallback(() => {
    const readSet = getStoredReadNotifications();
    const newNotifications: Notification[] = [];

    orders.slice(0, 5).forEach((order: any) => {
      const id = `order-${order._id}`;
      if (!readSet.has(id)) {
        newNotifications.push({
          id, type: "order", read: false,
          title: "New Order Received",
          message: `Order #${order.orderId?.slice(-8)} for ₹${order.total}`,
          time: new Date(order.createdAt),
        });
      }
    });

    users.slice(0, 3).forEach((user: any) => {
      const id = `user-${user._id}`;
      if (!readSet.has(id)) {
        newNotifications.push({
          id, type: "user", read: false,
          title: "New User Registered",
          message: `${user.firstName} ${user.lastName} just joined`,
          time: new Date(user.createdAt),
        });
      }
    });

    ratings.slice(0, 3).forEach((rating: any) => {
      const id = `review-${rating._id}`;
      if (!readSet.has(id)) {
        newNotifications.push({
          id, type: "review", read: false,
          title: "New Product Review",
          message: `${rating.starRating}-star rating received`,
          time: new Date(rating.createdAt),
        });
      }
    });

    setNotifications(newNotifications.sort((a, b) => b.time.getTime() - a.time.getTime()));
  }, [orders, users, ratings]);

  useEffect(() => {
    if (orders.length || users.length || ratings.length) generateNotifications();
  }, [orders, users, ratings, generateNotifications]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const markAsRead = useCallback((id: string) => {
    saveReadNotification(id);
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const markAllAsRead = useCallback(() => {
    notifications.forEach(n => saveReadNotification(n.id));
    setNotifications([]);
  }, [notifications]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await Promise.all([refetchOrders(), refetchUsers()]);
    setIsRefreshing(false);
  };

  // Chart Data
  const getChartData = useMemo(() => {
    const now = new Date();
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let data: { period: string; orders: number; revenue: number; traffic: number }[] = [];

    if (timeRange === "monthly") {
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
      data.forEach(d => { d.traffic = Math.floor(Math.random() * 5000) + 1000; });
    }
    return data;
  }, [orders, timeRange]);

  // Top Products
  const topProducts = useMemo(() => {
    const sales: Record<string, { name: string; quantity: number; revenue: number; growth: number }> = {};
    orders.forEach((order: any) => {
      order.items?.forEach((item: any) => {
        const id = item.productId?._id || item.productId;
        const name = item.productId?.name || item.name || "Unknown";
        if (!sales[id]) sales[id] = { name, quantity: 0, revenue: 0, growth: Math.random() * 20 + 5 };
        sales[id].quantity += item.quantity || 1;
        sales[id].revenue += (item.price || 0) * (item.quantity || 1);
      });
    });
    return Object.values(sales).sort((a, b) => b.revenue - a.revenue).slice(0, 5);
  }, [orders]);

  // Status Distribution
  const statusDistribution = useMemo(() => {
   const map: Record<OrderStatus, number> = {
  pending: 0,
  processing: 0,
  shipped: 0,
  delivered: 0,
  cancelled: 0,
};
    orders.forEach((order: any) => {
      const status = order.orderStatus?.toLowerCase() || "pending";
    const key = status?.toLowerCase();

if (key && key in map) {
  map[key as OrderStatus]++;
}
    });
    return Object.entries(map).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value,
      color: name === 'delivered' ? '#10B981' : name === 'processing' ? '#3B82F6' : name === 'shipped' ? '#8B5CF6' : name === 'cancelled' ? '#EF4444' : '#F59E0B'
    }));
  }, [orders]);

  const getStatusIcon = (status: string) => {
const icons: Record<OrderStatus, React.ReactNode> = {
  delivered: <Element />,
  processing: <Element />,
  shipped: <Element />,
  cancelled: <Element />,
  pending: <Element />, // ⚠️ ye add hona chahiye
};   const key = status?.toLowerCase();

if (key && key in icons) {
  return icons[key as OrderStatus];
}

return <Clock size={16} />;
  };

  // Stats Cards Config
  const statCards = [
    { title: "Total Revenue", value: `₹${totalRevenue.toLocaleString()}`, icon: DollarSign, link: "/orders", change: 8.3, trend: "up" },
    { title: "Total Orders", value: totalOrders, icon: ShoppingBag, link: "/orders", change: 12.5, trend: "up" },
    { title: "Active Users", value: totalUsers, icon: Users, link: "/user", change: 15.7, trend: "up" },
    { title: "Total Products", value: totalProducts, icon: Package, link: "/product", change: 5.2, trend: "up" },
  ];

  const quickStats = [
    { label: "Avg Order Value", value: `₹${(totalRevenue / totalOrders || 0).toFixed(0)}`, change: "+5.2%", icon: TrendingUp },
    { label: "Conversion Rate", value: "3.24%", change: "+0.8%", icon: UserCheck },
    { label: "Customer Satisfaction", value: `${averageRating}/5`, change: "+0.3", icon: Star },
  ];

  return (
    <div className="elegant-dashboard">
      <div className="dashboard-content">
        {/* ===== HEADER ===== */}
        <div className="dashboard-header">
          <div className="header-left">
            <h1 className="dashboard-title">Dashboard</h1>
            <p className="dashboard-subtitle">Welcome back! Here's what's happening with your store today.</p>
          </div>
          <div className="header-actions">
           
            
            {/* Notifications */}
            <div className="notification-wrapper" ref={notificationRef}>
              <button onClick={() => setShowNotifications(!showNotifications)} className="notification-btn">
                <Bell size={20} />
                {notifications.length > 0 && <span className="notification-badge">{notifications.length}</span>}
              </button>
              {showNotifications && (
                <div className="notification-panel">
                  <div className="notification-header">
                    <h3>Notifications</h3>
                    {notifications.length > 0 && <button onClick={markAllAsRead} className="mark-all-btn">Mark all read</button>}
                  </div>
                  <div className="notification-list">
                    {notifications.length === 0 ? (
                      <div className="empty-notifications">All caught up! ✨</div>
                    ) : (
                      notifications.map(notif => (
                        <div key={notif.id} className="notification-item" onClick={() => markAsRead(notif.id)}>
                          <div className="notification-icon">
                            {notif.type === "order" && <ShoppingBag size={18} />}
                            {notif.type === "user" && <UserPlus size={18} />}
                            {notif.type === "review" && <Star size={18} />}
                          </div>
                          <div className="notification-content">
                            <p className="notification-title">{notif.title}</p>
                            <p className="notification-message">{notif.message}</p>
                            <span className="notification-time">{notif.time.toLocaleDateString()}</span>
                          </div>
                          <div className="unread-dot" />
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <button className="refresh-btn" onClick={handleRefresh} disabled={isRefreshing}>
              <RefreshCw size={18} className={isRefreshing ? 'spinning' : ''} />
            </button>
          </div>
        </div>

        {/* ===== STATS CARDS ===== */}
        <div className="stats-grid">
          {statCards.map((stat, i) => (
            <Link to={stat.link} key={i} className="stat-card-link">
              <div className="stat-card">
                <div className="stat-card-header">
                  <div className="stat-icon"><stat.icon size={24} /></div>
                  <div className={`stat-trend ${stat.trend}`}>
                    {stat.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    <span>{stat.change}%</span>
                  </div>
                </div>
                <div className="stat-card-body">
                  <p className="stat-title">{stat.title}</p>
                  <h3 className="stat-value">{stat.value}</h3>
                  <p className="stat-subtitle">vs last month</p>
                </div>
                <div className="stat-card-footer">
                  <span>View Details</span>
                  <ChevronRight size={16} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* ===== QUICK STATS ===== */}
        <div className="quick-stats-row">
          {quickStats.map((stat, i) => (
            <div key={i} className="quick-stat-card">
              <div className="quick-stat-icon"><stat.icon size={20} /></div>
              <div className="quick-stat-info">
                <p className="quick-stat-label">{stat.label}</p>
                <p className="quick-stat-value">{stat.value}</p>
                <span className="quick-stat-change positive">{stat.change}</span>
              </div>
            </div>
          ))}
          <div className="quick-stat-card">
            <div className="stars-container">
              {[1,2,3,4,5].map(star => (
                <Star key={star} size={16} className={star <= Number(averageRating) ? 'star-filled' : 'star-empty'} />
              ))}
            </div>
            <div className="quick-stat-info">
              <p className="quick-stat-label">Customer Rating</p>
              <p className="quick-stat-value">{averageRating} out of 5</p>
              <span className="quick-stat-change">Based on {ratings.length} reviews</span>
            </div>
          </div>
        </div>

        {/* ===== TIME RANGE ===== */}
        <div className="time-range-container">
          <div className="time-range-selector">
            {["daily", "weekly", "monthly", "yearly"].map(range => (
              <button key={range} className={`time-btn ${timeRange === range ? 'active' : ''}`} onClick={() => setTimeRange(range as any)}>
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* ===== MAIN CHART ===== */}
        <div className="chart-section">
          <div className="chart-header">
            <div>
              <h2 className="chart-title">Performance Overview</h2>
              <p className="chart-subtitle">Orders, revenue and traffic trends</p>
            </div>
            <div className="chart-legend">
              <div className="legend-item"><div className="legend-color orders" /><span>Orders</span></div>
              <div className="legend-item"><div className="legend-color revenue" /><span>Revenue</span></div>
              <div className="legend-item"><div className="legend-color traffic" /><span>Traffic</span></div>
            </div>
          </div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart data={getChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="period" stroke="#999" fontSize={13} />
                <YAxis yAxisId="left" stroke="#999" fontSize={13} />
                <YAxis yAxisId="right" orientation="right" stroke="#999" fontSize={13} />
                <Tooltip formatter={(value, name) => {
                  const num = Number(value) || 0;
                  if (name === "revenue") return [`₹${num.toLocaleString()}`, "Revenue"];
                  if (name === "traffic") return [num.toLocaleString(), "Traffic"];
                  return [num, name];
                }} contentStyle={{ backgroundColor: "white", borderRadius: "8px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", padding: "12px 16px" }} />
                <Bar yAxisId="left" dataKey="orders" fill="#BCAE93" name="Orders" radius={[4, 4, 0, 0]} barSize={45} />
                <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#10B981" name="Revenue" strokeWidth={2.5} dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ===== TWO COLUMN LAYOUT ===== */}
        <div className="two-column-layout">
          {/* Left Column */}
          <div className="left-column">
            {/* Order Status */}
            <div className="info-card">
              <div className="card-header">
                <h3 className="card-title">Order Status Distribution</h3>
                <button className="card-action-btn"><MoreHorizontal size={18} /></button>
              </div>
              <div className="card-content">
                <div className="status-pie-container">
                  <ResponsiveContainer width="100%" height={220}>
                    <PieChart>
                      <Pie data={statusDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={85} paddingAngle={3} dataKey="value">
                        {statusDistribution.map((entry, idx) => <Cell key={`cell-${idx}`} fill={entry.color} />)}
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

            {/* Top Products */}
            <div className="info-card">
              <div className="card-header">
                <h3 className="card-title">Top Selling Products</h3>
                <Award size={20} className="card-icon" />
              </div>
              <div className="card-content no-padding">
                {topProducts.length ? (
                  <div className="products-list">
                    {topProducts.map((product, idx) => (
                      <div key={idx} className="product-item">
                        <div className="product-rank">{idx + 1}</div>
                        <div className="product-info">
                          <p className="product-name">{product.name}</p>
                          <p className="product-meta">{product.quantity} units sold</p>
                        </div>
                        <div className="product-revenue">
                          ₹{product.revenue.toLocaleString()}
                          <span className="product-growth positive">+{product.growth?.toFixed(1)}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : <div className="empty-state">No sales data available</div>}
              </div>
            </div>
          </div>

          {/* Right Column - Recent Orders */}
          <div className="right-column">
            <div className="info-card full-height">
              <div className="card-header">
                <h3 className="card-title">Recent Orders</h3>
                <Link to="/orders" className="view-all-link">View All <ChevronRight size={16} /></Link>
              </div>
              <div className="card-content no-padding">
                <div className="orders-table-container">
                  <table className="elegant-table">
                    <thead><tr><th>Order ID</th><th>Customer</th><th>Amount</th><th>Status</th><th>Date</th></tr></thead>
                    <tbody>
                      {orders.slice(0, 6).map((order: any) => (
                        <tr key={order._id}>
                          <td className="order-id">#{order.orderId?.slice(-8) || "N/A"}</td>
                          <td>{order.customerName || "Guest"}</td>
                          <td className="amount">₹{order.total?.toLocaleString() || 0}</td>
                          <td><span className={`order-status ${order.orderStatus?.toLowerCase()}`}>{getStatusIcon(order.orderStatus)}{order.orderStatus || "Pending"}</span></td>
                          <td className="date">{new Date(order.createdAt).toLocaleDateString()}</td>
                        </tr>
                      ))}
                      {!orders.length && <tr><td colSpan={5} className="empty-row">No orders found</td></tr>}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== BOTTOM SECTION ===== */}
        <div className="bottom-section">
          {/* New Customers */}
          <div className="info-card">
            <div className="card-header">
              <h3 className="card-title">New Customers</h3>
              <Link to="/user" className="view-all-link">View All <ChevronRight size={16} /></Link>
            </div>
            <div className="card-content no-padding">
              <div className="users-list">
                {users.slice(0, 6).map((user: any) => (
                  <div key={user._id} className="user-item">
                    <div className="user-avatar">{user.firstName?.charAt(0)}{user.lastName?.charAt(0)}</div>
                    <div className="user-details">
                      <p className="user-name">{user.firstName} {user.lastName}</p>
                      <p className="user-email">{user.email}</p>
                    </div>
                    <div className="user-joined">{new Date(user.createdAt).toLocaleDateString()}</div>
                  </div>
                ))}
                {!users.length && <div className="empty-state">No users found</div>}
              </div>
            </div>
          </div>

          {/* Recent Inquiries */}
          <div className="info-card">
            <div className="card-header">
              <h3 className="card-title">Recent Inquiries</h3>
              <Link to="/contact-us" className="view-all-link">View All <ChevronRight size={16} /></Link>
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
                      <div className="message-date">{new Date(contact.createdAt).toLocaleDateString()}</div>
                    </div>
                    <p className="message-text">{contact.message?.substring(0, 100)}...</p>
                  </div>
                ))}
                {!contacts.length && <div className="empty-state">No messages found</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;