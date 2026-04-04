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
        setMobile(true);  setCollapsed(true);
      } else if (width < 920) {
        setMobile(false);  setCollapsed(true); 
      } else {
        setMobile(false);  setCollapsed(false); 
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Layout className="min-h-screen bg-white">

      {!mobile && ( <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />  )}
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

       <Content style={{  padding: "24px",   minHeight: "calc(100vh - 64px)", }}>
       <div style={{maxWidth: "1400px", margin: "0 auto", width: "100%", }}>
    <Outlet />
  </div>
</Content>
      </Layout>

    </Layout>
  );
};

export default DashboardLayout;