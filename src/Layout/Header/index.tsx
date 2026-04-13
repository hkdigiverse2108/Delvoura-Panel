"use client";

import { Layout, Dropdown, Avatar, Space, Badge } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
  LockOutlined,
  BellOutlined,
  DownOutlined,
  UserAddOutlined,
  StarOutlined,
} from "@ant-design/icons";

import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { setLogout } from "../../Store/Slices/AuthSlice";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";
import { Queries } from "../../Api/Queries";
import ChangePasswordModal from "../../Pages/auth/ChangePasswordModal";
import "../../../public/assets/css/header.css";
import { io, Socket } from "socket.io-client";

const { Header } = Layout;

interface Notification {
  id: string;
  title: string;
  message: string;
  time: Date;
  type: "order" | "user" | "review" | "alert";
  read: boolean;
  orderId?: string;
}

// Store read notifications in localStorage to persist across sessions
const getStoredReadNotifications = (): Set<string> => {
  const stored = localStorage.getItem('header_read_notifications');
  return new Set(stored ? JSON.parse(stored) : []);
};

const saveReadNotification = (id: string) => {
  const readSet = getStoredReadNotifications();
  readSet.add(id);
  localStorage.setItem('header_read_notifications', JSON.stringify(Array.from(readSet)));
};

interface AppHeaderProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const AppHeader = ({ collapsed, setCollapsed }: AppHeaderProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const notificationRef = useRef<HTMLDivElement>(null);

  const user = useAppSelector((state: any) => state.auth.user);

  // Socket ref
  const socketRef = useRef<Socket | null>(null);

  // Fetch data for notifications
  const { data: ordersData } = Queries.useGetOrders({ page: 1, limit: 100 });
  const { data: usersData } = Queries.useGetUsers({ page: 1, limit: 100 });
  const { data: ratingsData } = Queries.useGetRatings({ page: 1, limit: 100 });

  const orders = ordersData?.data?.order_data || [];
  const users = usersData?.data?.user_data || [];
  const ratings = ratingsData?.data?.rating_data || [];

  const fullName = `${user?.firstName} ${user?.lastName || ""}`.trim() || "Admin";

  // Generate notifications from fetched data
  const generateNotifications = useCallback(() => {
    const readSet = getStoredReadNotifications();
    const newNotifications: Notification[] = [];

    // Recent Orders
    orders.slice(0, 5).forEach((order: any) => {
      const notifId = `order-${order.orderId}`;
      if (!readSet.has(notifId)) {
        newNotifications.push({
          id: notifId,
          title: "New Order Received",
          message: `Order #${order.orderId} for ₹${order.total?.toLocaleString() || 0} from ${order.customerName || "Guest"}`,
          time: new Date(order.createdAt),
          type: "order",
          read: false,
          orderId: order.orderId,
        });
      }
    });

    // Recent Users
    users.slice(0, 3).forEach((userItem: any) => {
      const notifId = `user-${userItem._id}`;
      if (!readSet.has(notifId)) {
        newNotifications.push({
          id: notifId,
          title: "New User Registered",
          message: `${userItem.firstName} ${userItem.lastName} just joined the platform`,
          time: new Date(userItem.createdAt),
          type: "user",
          read: false,
        });
      }
    });

    // Recent Ratings
    ratings.slice(0, 3).forEach((rating: any) => {
      const notifId = `review-${rating._id}`;
      if (!readSet.has(notifId)) {
        newNotifications.push({
          id: notifId,
          title: "New Product Review",
          message: `${rating.starRating}-star rating received for product`,
          time: new Date(rating.createdAt),
          type: "review",
          read: false,
        });
      }
    });

    // Sort by newest first
    newNotifications.sort((a, b) => b.time.getTime() - a.time.getTime());
    setNotifications(newNotifications);
  }, [orders, users, ratings]);

  // Load notifications on initial data fetch
  useEffect(() => {
    if (orders.length || users.length || ratings.length) {
      generateNotifications();
    }
  }, [orders, users, ratings, generateNotifications]);

  // Socket.IO connection for real-time orders
  useEffect(() => {
    if (!socketRef.current) {
      const socket = io(import.meta.env.VITE_API_BASE_URL, {
        transports: ["polling"],
        upgrade: false,
        auth: {
          token: localStorage.getItem("token"),
        },
      });
      socketRef.current = socket;

      socket.on("connect", () => {
        //console.log("Socket connected:", socket.id);
        socket.emit("joinAll");
      });

      socket.on("connect_error", (err) => {
        console.error("Socket connection error:", err.message);
      });

      socket.on("order:new", (order: any) => {
        console.log("New order received in Admin Header:", order);
        const notifId = `order-${order.orderId}`;
        const readSet = getStoredReadNotifications();
        if (!readSet.has(notifId)) {
          const newNotif: Notification = {
            id: notifId,
            title: order.title || "New Order Received",
            message: order.message || `Order #${order.orderId} placed by ${order.customerName}`,
            time: new Date(order.createdAt),
            type: "order",
            read: false,
            orderId: order.orderId,
          };
          setNotifications(prev => [newNotif, ...prev]);
        }
      });

      return () => {
        socket.disconnect();
        socketRef.current = null;
        console.log("Socket disconnected");
      };
    }
  }, []);

  // Close notification dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Mark notifications as read
  const markAsRead = useCallback((id: string) => {
    saveReadNotification(id);
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  }, []);

  const markAllAsRead = useCallback(() => {
    notifications.forEach(notif => saveReadNotification(notif.id));
    setNotifications([]);
  }, [notifications]);

  const unreadCount = notifications.length;

  const handleLogout = () => {
    dispatch(setLogout());
    navigate("/login");
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "order": return <StarOutlined style={{ fontSize: 18 }} />;
      case "user": return <UserAddOutlined style={{ fontSize: 18 }} />;
      case "review": return <StarOutlined style={{ fontSize: 18 }} />;
      default: return <BellOutlined style={{ fontSize: 18 }} />;
    }
  };

  const userMenuItems = [
    {
      key: "preview",
      label: (
        <div className="header-profile-preview">
          <div className="header-profile-avatar-small">
            <Avatar icon={<UserOutlined />} />
          </div>
          <div>
            <p className="header-profile-name-small">{fullName}</p>
            <p className="header-profile-email">{user?.email || "admin@delvoura.com"}</p>
          </div>
        </div>
      ),
      disabled: true,
    },
    {
      key: "profile",
      label: (
        <div className="header-menu-item">
          <UserOutlined />
          <span>My Profile</span>
        </div>
      ),
    },
    {
      key: "change-password",
      label: (
        <div className="header-menu-item">
          <LockOutlined />
          <span>Change Password</span>
        </div>
      ),
    },
    {
      key: "logout",
      label: (
        <div className="header-logout-item">
          <div className="header-logout-icon">
            <LogoutOutlined />
          </div>
          <div>
            <p className="header-logout-text">Logout</p>
            <p className="header-logout-subtext">End your session</p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <Header className="admin-header">
        <div className="flex items-center gap-4">
          <button onClick={() => setCollapsed(!collapsed)} className="menu-toggle-btn">
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </button>
        </div>

        <div className="flex items-center gap-3">
          {/* Notification Bell */}
          <div className="header-notification-wrapper" ref={notificationRef}>
            <Badge count={unreadCount} size="small" className="header-badge">
              <button
                className="notification-btn"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <BellOutlined />
              </button>
            </Badge>

            {showNotifications && (
              <div className="header-notification-panel">
                <div className="header-notification-header">
                  <h3>Notifications</h3>
                  {unreadCount > 0 && (
                    <button onClick={markAllAsRead} className="mark-all-btn">
                      Mark all read
                    </button>
                  )}
                </div>
                <div className="header-notification-list">
                  {notifications.length === 0 ? (
                    <div className="empty-notifications">
                      <BellOutlined style={{ fontSize: 32, color: "#d9d9d9", marginBottom: 12 }} />
                      <p>All caught up! ✨</p>
                      <span>No new notifications</span>
                    </div>
                  ) : (
                    notifications.map(notif => (
                      <div
                        key={notif.id}
                        className="header-notification-item"
                        onClick={() => markAsRead(notif.id)}
                      >
                        <div className={`header-notification-icon ${notif.type}`}>
                          {getNotificationIcon(notif.type)}
                        </div>
                        <div className="header-notification-content">
                          <p className="header-notification-title">{notif.title}</p>
                          <p className="header-notification-message">{notif.message}</p>
                          <span className="header-notification-time">
                            {notif.time.toLocaleDateString()} at {notif.time.toLocaleTimeString()}
                          </span>
                        </div>
                        <div className="unread-dot" />
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Dropdown */}
          <Dropdown
            menu={{
              items: userMenuItems,
              onClick: ({ key }) => {
                if (key === "logout") handleLogout();
                if (key === "change-password") setOpenChangePassword(true);
                if (key === "profile") navigate("/profile");
              }
            }}
            placement="bottomRight"
            trigger={["click"]}
          >
            <Space className="profile-trigger">
              <Avatar className="profile-avatar" icon={<UserOutlined />} />
              <div className="profile-info">
                <p className="profile-name">{fullName}</p>
                <p className="profile-role">{user?.roles || "Admin"}</p>
              </div>
              <DownOutlined />
            </Space>
          </Dropdown>
        </div>
      </Header>

      <ChangePasswordModal
        open={openChangePassword}
        onClose={() => setOpenChangePassword(false)}
      />
    </>
  );
};

export default AppHeader;