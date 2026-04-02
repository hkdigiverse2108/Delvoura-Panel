"use client";

import { Layout } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  DashboardOutlined,
  UserOutlined,
  ShoppingOutlined,
  FileTextOutlined,
  AppstoreOutlined,
  ExperimentOutlined,
  InboxOutlined,
  PictureOutlined,
  FileDoneOutlined,
  FileProtectOutlined,
  InstagramOutlined,
  BellOutlined,
  SafetyOutlined,
  RightOutlined,
  DownOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import { PAGE_TITLE, ROUTES } from "../../Constants";

const { Sider } = Layout;

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const Sidebar = ({ collapsed, setCollapsed }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isPolicyOpen, setIsPolicyOpen] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);

  // Responsive collapse
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 992) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setCollapsed]);

  // Policy auto open
  useEffect(() => {
    const policyPaths: string[] = [
      ROUTES.TERMS_CONDITIONS.BASE,
      ROUTES.TERMS_SERVICE.BASE,
      ROUTES.PRIVACY_POLICY.BASE,
      ROUTES.REFUND_POLICY.BASE,
      ROUTES.RETURN_EXCHANGE.BASE,
    ];

    if (policyPaths.includes(location.pathname)) {
      setIsPolicyOpen(true);
    }
  }, [location.pathname]);

  // Catalog auto open
  useEffect(() => {
    const catalogPaths: string[] = [
      ROUTES.SEASON.BASE,
      ROUTES.COLLECTION.BASE,
      ROUTES.SCENT.BASE,
    ];

    if (catalogPaths.includes(location.pathname)) {
      setIsCatalogOpen(true);
    }
  }, [location.pathname]);

  const handlePolicyClick = () => setIsPolicyOpen(!isPolicyOpen);
  const handleCatalogClick = () => setIsCatalogOpen(!isCatalogOpen);

  // Main menu
  const mainMenuItems = [
    { key: ROUTES.DASHBOARD, icon: <DashboardOutlined />, label: PAGE_TITLE.DASHBOARD },
    { key: ROUTES.USERS.BASE, icon: <UserOutlined />, label: PAGE_TITLE.USERS.LABEL },
    { key: ROUTES.PRODUCT.BASE, icon: <ShoppingOutlined />, label: PAGE_TITLE.PRODUCT.LABEL },

    // ✅ Catalog dropdown will replace season/collection/scent

    { key: ROUTES.BLOG.BASE, icon: <FileTextOutlined />, label: PAGE_TITLE.BLOG.LABEL },
    { key: ROUTES.BANNER.BASE, icon: <PictureOutlined />, label: PAGE_TITLE.BANNER.LABEL },
    { key: ROUTES.TOPBAR.BASE, icon: <BellOutlined />, label: PAGE_TITLE.TOPBAR.LABEL },
    { key: ROUTES.INSTAGRAM.BASE, icon: <InstagramOutlined />, label: PAGE_TITLE.INSTAGRAM.LABEL },
    { key: ROUTES.CONTACT_US.BASE, icon: <MailOutlined />, label: PAGE_TITLE.CONTACT_US.LABEL },
    { key: ROUTES.NEWSLETTER.BASE, icon: <MailOutlined />, label: PAGE_TITLE.NEWSLETTER.LABEL },
    { key: ROUTES.RATING.BASE, icon: <MailOutlined />, label: PAGE_TITLE.RATING.LABEL },
    { key: "/settings", icon: <SettingOutlined />, label: "Settings" },{ key: "/orders", icon: <ShoppingOutlined />,label: "Orders",
}
  ];

  // Catalog submenu
  const catalogSubmenuItems = [
    { key: ROUTES.SEASON.BASE, icon: <AppstoreOutlined />, label: PAGE_TITLE.SEASON.LABEL },
    { key: ROUTES.COLLECTION.BASE, icon: <InboxOutlined />, label: PAGE_TITLE.COLLECTION.LABEL },
    { key: ROUTES.SCENT.BASE, icon: <ExperimentOutlined />, label: PAGE_TITLE.SCENT.LABEL },
  ];

  // Policy submenu
  const policySubmenuItems = [
    { key: ROUTES.TERMS_CONDITIONS.BASE, icon: <FileProtectOutlined />, label: PAGE_TITLE.TERMS_CONDITION.LABEL },
    { key: ROUTES.TERMS_SERVICE.BASE, icon: <FileDoneOutlined />, label: PAGE_TITLE.TERMS_SERVICE.LABEL },
    { key: ROUTES.PRIVACY_POLICY.BASE, icon: <FileProtectOutlined />, label: PAGE_TITLE.PRIVACY_POLICY.LABEL },
    { key: ROUTES.REFUND_POLICY.BASE, icon: <FileProtectOutlined />, label: PAGE_TITLE.REFUND_POLICY.LABEL },
    { key: ROUTES.RETURN_EXCHANGE.BASE, icon: <FileProtectOutlined />, label: PAGE_TITLE.RETURN_EXCHANGE.LABEL },
  ];

  const isPolicyActive = () => policySubmenuItems.some(item => item.key === location.pathname);
  const isCatalogActive = () => catalogSubmenuItems.some(item => item.key === location.pathname);

  return (
    <Sider
      width={260}
      collapsible
      collapsed={collapsed}
      trigger={null}
      collapsedWidth={80}
      className="sidebar-white"
      style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        overflow: "auto",
      }}
    >
      {/* 🔥 Sticky Logo */}
      <div
        className={`sidebar-logo flex items-center justify-center ${collapsed ? "collapsed" : ""}`}
        style={{
          // position: "sticky",
          top: 0,
          zIndex: 10,
          background: "#fff",
          padding: "16px 0",
        }}
      >
        {!collapsed ? (
          <img
            src="/assets/images/logo/LogoImg.png"
            alt="Logo"
            className="h-6"
          />
        ) : (
          <img
            src="/assets/images/logo/logo.png"
            alt="Logo"
            className="h-5"
          />
        )}
      </div>

    <div className="custom-sidebar-menu">

  {/* Dashboard, Users, Product */}
  {mainMenuItems.slice(0, 3).map((item) => (
    <div
      key={item.key}
      className={`custom-menu-item ${location.pathname === item.key ? "active" : ""} ${collapsed ? "collapsed" : ""}`}
      onClick={() => navigate(item.key)}
    >
      <span className="custom-menu-icon">{item.icon}</span>
      {!collapsed && <span className="custom-menu-label">{item.label}</span>}
    </div>
  ))}

  {/* Blog */}
  {mainMenuItems.slice(3, 4).map((item) => (
    <div
      key={item.key}
      className={`custom-menu-item ${location.pathname === item.key ? "active" : ""} ${collapsed ? "collapsed" : ""}`}
      onClick={() => navigate(item.key)}
    >
      <span className="custom-menu-icon">{item.icon}</span>
      {!collapsed && <span className="custom-menu-label">{item.label}</span>}
    </div>
  ))}

  {/* 🔥 Catalog AFTER BLOG */}
  <div className="custom-submenu-wrapper">
    <div
      className={`custom-menu-item ${isCatalogActive() ? "active" : ""} ${collapsed ? "collapsed" : ""}`}
      onClick={handleCatalogClick}
    >
      <span className="custom-menu-icon"><AppstoreOutlined /></span>
      {!collapsed && (
        <>
          <span className="custom-menu-label">Catalog</span>
          <span className="custom-submenu-arrow">
            {isCatalogOpen ? <DownOutlined /> : <RightOutlined />}
          </span>
        </>
      )}
    </div>

    {!collapsed && isCatalogOpen && (
      <div className="custom-submenu-items">
        {catalogSubmenuItems.map((item) => (
          <div
            key={item.key}
            className={`custom-submenu-item ${location.pathname === item.key ? "active" : ""}`}
            onClick={() => navigate(item.key)}
          >
            <span className="custom-submenu-icon">{item.icon}</span>
            <span className="custom-submenu-label">{item.label}</span>
          </div>
        ))}
      </div>
    )}
  </div>

  {/* Banner */}
  {mainMenuItems.slice(4, 5).map((item) => (
    <div
      key={item.key}
      className={`custom-menu-item ${location.pathname === item.key ? "active" : ""} ${collapsed ? "collapsed" : ""}`}
      onClick={() => navigate(item.key)}
    >
      <span className="custom-menu-icon">{item.icon}</span>
      {!collapsed && <span className="custom-menu-label">{item.label}</span>}
    </div>
  ))}

  {/* 🔥 Policy AFTER BANNER */}
  <div className="custom-submenu-wrapper">
    <div
      className={`custom-menu-item ${isPolicyActive() ? "active" : ""} ${collapsed ? "collapsed" : ""}`}
      onClick={handlePolicyClick}
    >
      <span className="custom-menu-icon"><SafetyOutlined /></span>
      {!collapsed && (
        <>
          <span className="custom-menu-label">Policy</span>
          <span className="custom-submenu-arrow">
            {isPolicyOpen ? <DownOutlined /> : <RightOutlined />}
          </span>
        </>
      )}
    </div>

    {!collapsed && isPolicyOpen && (
      <div className="custom-submenu-items">
        {policySubmenuItems.map((item) => (
          <div
            key={item.key}
            className={`custom-submenu-item ${location.pathname === item.key ? "active" : ""}`}
            onClick={() => navigate(item.key)}
          >
            <span className="custom-submenu-icon">{item.icon}</span>
            <span className="custom-submenu-label">{item.label}</span>
          </div>
        ))}
      </div>
    )}
  </div>

  {/* Remaining Items */}
  {mainMenuItems.slice(5).map((item) => (
    <div
      key={item.key}
      className={`custom-menu-item ${location.pathname === item.key ? "active" : ""} ${collapsed ? "collapsed" : ""}`}
      onClick={() => navigate(item.key)}
    >
      <span className="custom-menu-icon">{item.icon}</span>
      {!collapsed && <span className="custom-menu-label">{item.label}</span>}
    </div>
  ))}

</div>
    </Sider>
  );
};

export default Sidebar;