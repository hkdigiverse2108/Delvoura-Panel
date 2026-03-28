import { Layout, Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
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
} from "@ant-design/icons";
import { PAGE_TITLE, ROUTES } from "../../Constants";


const { Sider } = Layout;

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void; // ✅ ADD
}

const Sidebar = ({ collapsed, setCollapsed }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

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
  }, []);

  const menuItems = [
    { key: ROUTES.DASHBOARD, icon: <DashboardOutlined />, label: PAGE_TITLE.DASHBOARD },
    { key: ROUTES.USERS.BASE, icon: <UserOutlined />, label: PAGE_TITLE.USERS.LABEL},
    { key: ROUTES.PRODUCT.BASE, icon: <ShoppingOutlined />, label: PAGE_TITLE.PRODUCT.LABEL },
    { key: ROUTES.SEASON.BASE, icon: <AppstoreOutlined />, label: PAGE_TITLE.SEASON.LABEL },
    { key: ROUTES.COLLECTION.BASE, icon: <InboxOutlined />, label: PAGE_TITLE.COLLECTION.LABEL },
    { key: ROUTES.SCENT.BASE, icon: <ExperimentOutlined />, label: PAGE_TITLE.SCENT.LABEL },
    { key:  ROUTES.BLOG.BASE, icon: <FileTextOutlined />, label: PAGE_TITLE.BLOG.LABEL },
    { key: ROUTES.BANNER.BASE, icon:<PictureOutlined /> ,label: PAGE_TITLE.BANNER.LABEL},
    { key: ROUTES.TOPBAR.BASE, icon: <BellOutlined  />, label:PAGE_TITLE.TOPBAR.LABEL },
    { key: ROUTES.TERMS_SERVICE.BASE, icon: <FileDoneOutlined />, label: PAGE_TITLE.TERMS_SERVICE.LABEL},
    { key: ROUTES.INSTAGRAM.BASE, icon: <InstagramOutlined />, label:  PAGE_TITLE.INSTAGRAM.LABEL },
    { key: ROUTES.TERMS_CONDITIONS.BASE, icon: <FileProtectOutlined />, label: PAGE_TITLE.TERMS_CONDITION.LABEL },
    { key: ROUTES.PRIVACY_POLICY.BASE, icon: <FileProtectOutlined />, label: PAGE_TITLE.PRIVACY_POLICY.LABEL },
    { key: ROUTES.REFUND_POLICY.BASE, icon: <FileProtectOutlined />, label: PAGE_TITLE.REFUND_POLICY.LABEL },
    { key: ROUTES.RETURN_EXCHANGE.BASE, icon: <FileProtectOutlined />, label: PAGE_TITLE.RETURN_EXCHANGE.LABEL }
  ];

  return (
    <Sider
      width={260}
      collapsible
      collapsed={collapsed}
      trigger={null}
      breakpoint="md"   // ✅ ADD (antd responsive)
      collapsedWidth={80}
      className="sidebar-white"
    >
      {/* Logo */}
       <div className={`sidebar-logo flex items-center justify-center ${collapsed ? 'collapsed' : ''}`}>
        {!collapsed ? (
          <div className="flex items-center justify-center gap-2">
            <img 
              src="../../../assets/images/logo/LogoImg.png" 
              alt="Delvoura Logo" 
              className="h-6 w-auto"
              style={{ objectFit: "contain" }}
            />
            <h2 
              className="text-xl font-bold m-0" 
              style={{ 
                color: "var(--black)",
                background: "linear-gradient(135deg, var(--black) 0%, var(--primary) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text"
              }}
            >
          
            </h2>
          </div>
        ) : (
          <div className="flex justify-center">
            <img 
              src={"../../../assets/images/logo/logo.png"} 
              alt="Delvoura Logo" 
              className="h-5 w-auto"
              style={{ objectFit: "contain" }}
            />
          </div>
        )}
      </div>

      {/* Menu */}
     <Menu
  mode="inline"
  selectedKeys={[location.pathname]}
  onClick={({ key }) => navigate(key)}
  items={menuItems}
  className="custom-menu"
/>
    </Sider>
  );
};

export default Sidebar;