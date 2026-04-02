import { Layout, Drawer } from "antd";
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import AppHeader from "./Header";
import { Outlet } from "react-router-dom";

const { Content } = Layout;

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < 640) {
        setMobile(true);
        setCollapsed(true);
      } else if (width < 920) {
        setMobile(false);
        setCollapsed(true); // icons only
      } else {
        setMobile(false);
        setCollapsed(false); // full sidebar
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Layout className="min-h-screen bg-white">

      {/* Desktop + Tablet Sidebar */}
      {!mobile && (
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      )}

      {/* Mobile Drawer Sidebar */}
      {mobile && (
        <Drawer
          placement="left"
          open={!collapsed}
          onClose={() => setCollapsed(true)}
          width={260}
          bodyStyle={{ padding: 0 }}
        >
          <Sidebar collapsed={false} setCollapsed={setCollapsed} />
        </Drawer>
      )}

      <Layout>
        <AppHeader collapsed={collapsed} setCollapsed={setCollapsed} />

        <Content className="main-content">
          <div className="content-wrapper">
            <Outlet />
          </div>
        </Content>
      </Layout>

    </Layout>
  );
};

export default DashboardLayout;