import { Layout } from "antd";
import { useState } from "react";
import Sidebar from "./Sidebar";
import AppHeader from "./Header";
import { Outlet } from "react-router-dom";

const { Content } = Layout;

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className="min-h-screen bg-white">
      
      {/* ✅ FIX HERE */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      
      <Layout className="bg-white">
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