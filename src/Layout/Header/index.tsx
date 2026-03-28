"use client";

import { Layout, Dropdown, Avatar, Space, Badge } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
  LockOutlined,
  BellOutlined,
  SettingOutlined,
  DownOutlined,
} from "@ant-design/icons";

import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { setLogout } from "../../Store/Slices/AuthSlice";
import { useNavigate } from "react-router-dom";


const { Header } = Layout;

interface AppHeaderProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}



const AppHeader = ({ collapsed, setCollapsed }: AppHeaderProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  
  const user = useAppSelector((state : any) => state.auth.user);

  const fullName =
    `${user?.firstName} ${user?.lastName  || ""}`.trim() || "Admin";

  const handleLogout = () => {
    dispatch(setLogout());
    navigate("/login");
  };

  const userMenuItems = [
    {
      key: "profile",
      label: (
        <div className="header-profile-preview">
          <div className="header-profile-avatar-small">
            <Avatar icon={<UserOutlined />} />
          </div>
          <div>
            <p className="header-profile-name-small">{fullName}</p>
            <p className="header-profile-email">
              {user?.email || "admin@delvoura.com"}
            </p>
          </div>
        </div>
      ),
      disabled: true,
    },
    {
      key: "profile-settings",
      label: (
        <div className="header-menu-item">
          <SettingOutlined />
          <span>Profile Settings</span>
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
    <Header className="admin-header">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="menu-toggle-btn"
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </button>

      </div>

      <div className="flex items-center gap-3">
        <Badge count={3} size="small" className="header-badge">
          <button className="notification-btn">
            <BellOutlined />
          </button>
        </Badge>

        <Dropdown
          menu={{
            items: userMenuItems,
            onClick: ({ key }) => {
              if (key === "logout") handleLogout();
            },
          }}
          placement="bottomRight"
          trigger={["click"]}
        >
          <Space className="profile-trigger">
            <Avatar className="profile-avatar" icon={<UserOutlined />} />
            <div className="profile-info">
              <p className="profile-name">{fullName}</p>
              <p className="profile-role">{user?.roles  || "Admin"}</p>
            </div>
            <DownOutlined />
          </Space>
        </Dropdown>
      </div>
    </Header>
  );
};

export default AppHeader;