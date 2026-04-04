"use client";

import {
  Card,
  Avatar,
  Button,
  Row,
  Col,
  message,
  Modal,
  Tabs,
  Alert,
  Space,
  Typography,
  Badge,
  Divider,
  Tag,
  Tooltip,
  Input,
} from "antd";
import {
  UserOutlined,
  EditOutlined,
  LockOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  MailOutlined,
  PhoneOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  CameraOutlined,
  GlobalOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../Store/hooks";
import { Queries } from "../../Api/Queries";
import { Mutations } from "../../Api/Mutations";
import dayjs from "dayjs";
import { CommonInput } from "../../Components/common/commonForm";

const { Title, Text,  } = Typography;

const ProfilePage = () => {
  const [profileForm, setProfileForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    countryCode: "",
  });
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [activeTab, setActiveTab] = useState("profile");
  const [deleteModal, setDeleteModal] = useState(false);
  const [deactivateModal, setDeactivateModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [formErrors, setFormErrors] = useState<any>({});

  const user = useAppSelector((state: any) => state.auth.user);

  const { data,  } = Queries.useGetProfile(user?._id);
  const profile = data?.data;

  const updateProfile = Mutations.useUpdateProfile();
  const changePassword = Mutations.useChangePassword();

  useEffect(() => {
    if (profile) {
      setProfileForm({
        firstName: profile?.firstName || "",
        lastName: profile?.lastName || "",
        email: profile?.email || "",
     phoneNo: String(profile?.contact?.phoneNo || ""),
        countryCode: profile?.contact?.countryCode || "",
      });
    }
  }, [profile]);

  const validateProfileForm = () => {
    const errors: any = {};
    if (!profileForm.firstName.trim()) {
      errors.firstName = "First name is required";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validatePasswordForm = () => {
    const errors: any = {};
    if (!passwordForm.oldPassword) {
      errors.oldPassword = "Old password is required";
    }
    if (!passwordForm.newPassword) {
      errors.newPassword = "New password is required";
    } else if (passwordForm.newPassword.length < 6) {
      errors.newPassword = "Password must be at least 6 characters";
    }
    if (!passwordForm.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleProfileUpdate = () => {
    if (!validateProfileForm()) return;

    updateProfile.mutate(
      {
        userId: user?._id,
        firstName: profileForm.firstName,
        lastName: profileForm.lastName,
        contact: {
          countryCode: profileForm.countryCode,
          phoneNo: profileForm.phoneNo,
        },
      },
      {
        onSuccess: () => {
          message.success({
            content: "Profile updated successfully!",
            icon: <CheckCircleOutlined />,
          });
        },
        onError: (error: any) => {
          message.error(error?.message || "Failed to update profile");
        },
      }
    );
  };

  const handlePasswordChange = () => {
    if (!validatePasswordForm()) return;

    changePassword.mutate(
      {
        oldPassword: passwordForm.oldPassword,
        newPassword: passwordForm.newPassword,
      },
      {
        onSuccess: () => {
          message.success("Password changed successfully");
          setPasswordForm({
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
          setFormErrors({});
        },
        onError: (error: any) => {
          message.error(error?.message || "Password change failed");
        },
      }
    );
  };

  const handleDeleteAccount = () => {
    if (deleteConfirmText !== "DELETE") {
      message.error('Please type "DELETE" to confirm');
      return;
    }

    // Call your API to delete account
    fetch(`/api/users/${user?._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          message.success("Account deleted successfully");
          setDeleteModal(false);
          localStorage.clear();
          setTimeout(() => {
            window.location.href = "/login";
          }, 1500);
        } else {
          throw new Error("Failed to delete account");
        }
      })
      .catch((error) => {
        message.error(error.message || "Failed to delete account");
      });
  };

  const handleDeactivateAccount = () => {
    fetch(`/api/users/${user?._id}/deactivate`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          message.success("Account deactivated successfully");
          setDeactivateModal(false);
          localStorage.clear();
          setTimeout(() => {
            window.location.href = "/login";
          }, 1500);
        } else {
          throw new Error("Failed to deactivate account");
        }
      })
      .catch((error) => {
        message.error(error.message || "Failed to deactivate account");
      });
  };


  const tabItems = [
    {
      key: "profile",
      label: (
        <span className="flex items-center gap-2">
          <EditOutlined /> Edit Profile
        </span>
      ),
      children: (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <CommonInput
              label="First Name"
              required
              value={profileForm.firstName}
              onChange={(val) =>
                setProfileForm({ ...profileForm, firstName: val })
              }
              placeholder="Enter first name"
              prefix={<UserOutlined />}
              error={formErrors.firstName}
            />
            <CommonInput
              label="Last Name"
              value={profileForm.lastName}
              onChange={(val) =>
                setProfileForm({ ...profileForm, lastName: val })
              }
              placeholder="Enter last name"
              prefix={<UserOutlined />}
              error={formErrors.lastName}
            />
          </div>

          <CommonInput
            label="Email"
            value={profileForm.email}
            onChange={() => {}}
            placeholder="Email address"
            prefix={<MailOutlined />}
            disabled
          />

          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1">
              <CommonInput
                label="Country Code"
                value={profileForm.countryCode}
                onChange={(val) =>
                  setProfileForm({ ...profileForm, countryCode: val })
                }
                placeholder="+91"
                prefix={<GlobalOutlined />}
              />
            </div>
            <div className="col-span-2">
              <CommonInput
                label="Phone Number"
                value={profileForm.phoneNo}
                onChange={(val) =>
                  setProfileForm({ ...profileForm, phoneNo: val })
                }
                placeholder="Enter phone number"
                prefix={<PhoneOutlined />}
              />
            </div>
          </div>

          <div className="pt-4">
            <Button
              type="primary"
              onClick={handleProfileUpdate}
              loading={updateProfile.isPending}
              className="w-full md:w-auto"
              style={{
                backgroundColor: "var(--primary)",
                borderColor: "var(--primary)",
                borderRadius: 8,
                height: 44,
                paddingLeft: 32,
                paddingRight: 32,
              }}
            >
              <CheckCircleOutlined /> Update Profile
            </Button>
          </div>
        </div>
      ),
    },
    {
      key: "password",
      label: (
        <span className="flex items-center gap-2">
          <LockOutlined /> Change Password
        </span>
      ),
      children: (
        <div className="space-y-6">
          <CommonInput
            label="Old Password"
            required
            type="password"
            value={passwordForm.oldPassword}
            onChange={(val) =>
              setPasswordForm({ ...passwordForm, oldPassword: val })
            }
            placeholder="Enter old password"
            prefix={<LockOutlined />}
            error={formErrors.oldPassword}
          />

          <CommonInput
            label="New Password"
            required
            type="password"
            value={passwordForm.newPassword}
            onChange={(val) =>
              setPasswordForm({ ...passwordForm, newPassword: val })
            }
            placeholder="Enter new password"
            prefix={<LockOutlined />}
            error={formErrors.newPassword}
          />

          <CommonInput
            label="Confirm Password"
            required
            type="password"
            value={passwordForm.confirmPassword}
            onChange={(val) =>
              setPasswordForm({ ...passwordForm, confirmPassword: val })
            }
            placeholder="Confirm new password"
            prefix={<LockOutlined />}
            error={formErrors.confirmPassword}
          />

          <div className="pt-4">
            <Button
              type="primary"
              onClick={handlePasswordChange}
              loading={changePassword.isPending}
              className="w-full md:w-auto"
              style={{
                backgroundColor: "var(--primary)",
                borderColor: "var(--primary)",
                borderRadius: 8,
                height: 44,
                paddingLeft: 32,
                paddingRight: 32,
              }}
            >
              <LockOutlined /> Change Password
            </Button>
          </div>
        </div>
      ),
    },
    {
      key: "danger",
      label: (
        <span className="flex items-center gap-2">
          <DeleteOutlined /> Danger Zone
        </span>
      ),
      children: (
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <Alert
            message=" Warning"
            description="Once you delete or deactivate your account, there is no going back. Please be certain."
            type="error"
            showIcon
            icon={<ExclamationCircleOutlined />}
            style={{ borderRadius: 8 }}
          />

          

          <Card
            size="small"
            style={{
              borderColor: "#ff4d4f",
              borderRadius: 8,
              background: "#fff1f0",
            }}
          >
            <Row justify="space-between" align="middle">
              <Col>
                <Text strong style={{ fontSize: 16 }}>
                  Delete Account
                </Text>
                <br />
                <Text type="secondary" style={{ fontSize: 13 }}>
                  Permanently delete your account and all associated data
                </Text>
              </Col>
              <Col>
                <Button
                  danger
                  type="primary"
                  onClick={() => setDeleteModal(true)}
                  style={{ borderRadius: 8, height: 40 }}
                >
                  Delete
                </Button>
              </Col>
            </Row>
          </Card>
        </Space>
      ),
    },
  ];

  return (
    <div
      style={{
        padding: "32px 24px",
        minHeight: "100vh",
      }}
    >
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <Row gutter={[24, 24]} justify="center">
          {/* Profile Info Sidebar */}
          <Col xs={24} md={8} lg={7}>
            <Card
              style={{
                borderRadius: 16,
                boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
                overflow: "hidden",
                border: "none",
              }}
              bodyStyle={{ padding: 0 }}
            >
              {/* Cover Image */}
              <div
                style={{
                  height: 100,
                  background: "linear-gradient(135deg, #BCAE93 0%, #9B8E75 100%)",
                }}
              />

              {/* Avatar Section */}
              <div style={{ textAlign: "center", marginTop: -50, position: "relative", zIndex: 1 }}>
                <Badge
                  count={
                    <Tooltip title="Change Avatar">
                      <div
                        style={{
                          background: "var(--primary)",
                          borderRadius: "50%",
                          width: 32,
                          height: 32,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          border: "3px solid white",
                        }}
                      >
                        <CameraOutlined style={{ color: "white", fontSize: 14 }} />
                      </div>
                    </Tooltip>
                  }
                  offset={[85, 85]}
                >
                  <Avatar
                    size={100}
                    icon={<UserOutlined />}
                    style={{
                      backgroundColor: "var(--primary)",
                      border: "4px solid white",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    }}
                  />
                </Badge>

                <Title level={3} style={{ marginTop: 16, marginBottom: 8 }}>
                  {profile?.firstName} {profile?.lastName}
                </Title>

                <div className="flex justify-center gap-2 mb-4">
                  <Tag color="gold" style={{ borderRadius: 20 }}>
                    {profile?.roles || "User"}
                  </Tag>
                  <Tag
                    color={profile?.isActive ? "green" : "red"}
                    style={{ borderRadius: 20 }}
                  >
                    {profile?.isActive ? "Active" : "Inactive"}
                  </Tag>
                </div>

                <Divider style={{ margin: "16px 0" }} />

                {/* User Details */}
                <div style={{ padding: "0 24px 24px" }}>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <MailOutlined style={{ color: "var(--primary)", fontSize: 18 }} />
                      <div>
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          Email
                        </Text>
                        <br />
                        <Text strong>{profile?.email}</Text>
                      </div>
                    </div>

                    {(profile?.contact?.phoneNo || profileForm.phoneNo) && (
                      <div className="flex items-center gap-3">
                        <PhoneOutlined style={{ color: "var(--primary)", fontSize: 18 }} />
                        <div>
                          <Text type="secondary" style={{ fontSize: 12 }}>
                            Phone
                          </Text>
                          <br />
                          <Text strong>
                            {profile?.contact?.countryCode} {profile?.contact?.phoneNo}
                          </Text>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-3">
                      <CalendarOutlined style={{ color: "var(--primary)", fontSize: 18 }} />
                      <div>
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          Joined
                        </Text>
                        <br />
                        <Text strong>
                          {profile?.createdAt
                            ? dayjs(profile.createdAt).format("DD MMM YYYY")
                            : "-"}
                        </Text>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <IdcardOutlined style={{ color: "var(--primary)", fontSize: 18 }} />
                      <div>
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          User ID
                        </Text>
                        <br />
                        <Text strong copyable style={{ fontSize: 12 }}>
                          {user?._id?.slice(-8)}
                        </Text>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </Col>

          {/* Main Content - Tabs */}
          <Col xs={24} md={16} lg={17}>
            <Card
              style={{
                borderRadius: 16,
                boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
                border: "none",
              }}
              bodyStyle={{ padding: "28px" }}
            >
              <Tabs
                activeKey={activeTab}
                onChange={setActiveTab}
                items={tabItems}
                size="large"
                style={{ borderRadius: 8 }}
                tabBarStyle={{
                  marginBottom: 24,
                  borderBottom: "2px solid var(--gray-medium)",
                }}
              />
            </Card>
          </Col>
        </Row>

        {/* Deactivate Account Modal */}
        <Modal
          title={
            <div className="flex items-center gap-2">
              <ExclamationCircleOutlined style={{ color: "#faad14" }} />
              <span>Deactivate Account</span>
            </div>
          }
          open={deactivateModal}
          onCancel={() => setDeactivateModal(false)}
          footer={[
            <Button key="cancel" onClick={() => setDeactivateModal(false)} style={{ borderRadius: 8 }}>
              Cancel
            </Button>,
            <Button
              key="deactivate"
              danger
              onClick={handleDeactivateAccount}
              style={{ borderRadius: 8 }}
            >
              Deactivate
            </Button>,
          ]}
          style={{ borderRadius: 8 }}
        >
          <Alert
            message="Are you sure?"
            description="Your account will be deactivated. You can reactivate it by contacting support."
            type="warning"
            showIcon
            style={{ borderRadius: 8, marginBottom: 16 }}
          />
          <Text>This action cannot be undone immediately.</Text>
        </Modal>

        {/* Delete Account Modal */}
        <Modal
          title={
            <div className="flex items-center gap-2">
              <DeleteOutlined style={{ color: "#ff4d4f" }} />
              <span>Delete Account</span>
            </div>
          }
          open={deleteModal}
          onCancel={() => {
            setDeleteModal(false);
            setDeleteConfirmText("");
          }}
          footer={[
            <Button
              key="cancel"
              onClick={() => {
                setDeleteModal(false);
                setDeleteConfirmText("");
              }}
              style={{ borderRadius: 8 }}
            >
              Cancel
            </Button>,
            <Button
              key="delete"
              danger
              type="primary"
              onClick={handleDeleteAccount}
              style={{ borderRadius: 8 }}
            >
              Delete
            </Button>,
          ]}
          style={{ borderRadius: 8 }}
        >
          <Alert
            message="Permanent Action!"
            description="This will permanently delete your account and all associated data."
            type="error"
            showIcon
            style={{ borderRadius: 8, marginBottom: 16 }}
          />
          <Text className="block mb-2">Type <Text strong>"DELETE"</Text> to confirm:</Text>
          <Input
            placeholder="Type DELETE to confirm"
            style={{ borderRadius: 8 }}
            value={deleteConfirmText}
            onChange={(e) => setDeleteConfirmText(e.target.value)}
          />
        </Modal>
      </div>
    </div>
  );
};

export default ProfilePage;