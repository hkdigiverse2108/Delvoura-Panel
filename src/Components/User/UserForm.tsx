// import { Modal, Form, Input, Row, Col, Avatar, Button } from "antd";
// import { useEffect, useState } from "react";
// import {
//   UserOutlined,
//   MailOutlined,
//   LockOutlined,
// } from "@ant-design/icons";

// interface Props {
//   open: boolean;
//   onClose: () => void;
//   onSubmit: (values: any) => void;
//   initialValues?: any;
// }

// const UserForm = ({ open, onClose, onSubmit, initialValues }: Props) => {
//   const [form] = Form.useForm();
//   const [previewName, setPreviewName] = useState("");

//   // Watch form values for name preview
//   const firstName = Form.useWatch("firstName", form);
//   const lastName = Form.useWatch("lastName", form);

//   useEffect(() => {
//     if (firstName || lastName) {
//       setPreviewName(`${firstName || ""} ${lastName || ""}`.trim());
//     } else {
//       setPreviewName("");
//     }
//   }, [firstName, lastName]);

//   useEffect(() => {
//     if (initialValues) {
//       form.setFieldsValue(initialValues);
//     } else {
//       form.resetFields();
//     }
//   }, [initialValues, form]);

//   return (
//     <Modal
//       open={open}
//       onCancel={onClose}
//       footer={null}
//       width={520}
//       centered
//       styles={{
//         body: {
//           padding: 0,
//         },
//         content: {
//           borderRadius: "20px",
//           overflow: "hidden",
//           boxShadow: "0 20px 35px -8px rgba(0,0,0,0.15)",
//         },
//       }}
//     >
//       {/* Header with Gradient */}
//       <div
//         className="px-6 py-5"
//         style={{
//           background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-80) 100%)",
//         }}
//       >
//         <div className="flex items-center gap-3">
//           <Avatar
//             size={48}
//             style={{
//               backgroundColor: "white",
//               boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//             }}
//             icon={<UserOutlined style={{ fontSize: "24px", color: "var(--primary)" }} />}
//           >
//             {previewName && (
//               <span className="text-xl font-semibold" style={{ color: "var(--primary)" }}>
//                 {previewName.charAt(0).toUpperCase()}
//               </span>
//             )}
//           </Avatar>
//           <div>
//             <h2 className="text-xl font-bold text-white mb-0">
//               {initialValues ? "Edit User" : "Add User"}
//             </h2>
//             <p className="text-white text-opacity-85 text-xs mt-1">
//               {initialValues 
//                 ? "Update user information" 
//                 : "Create a new user account"}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Form Content */}
//       <div className="px-6 py-6">
//         <Form
//           form={form}
//           layout="vertical"
//           onFinish={onSubmit}
//         >
//           {/* Name Fields - Half Row */}
//           <Row gutter={12}>
//             <Col span={12}>
//               <Form.Item
//                 name="firstName"
//                 label="First Name"
//                 rules={[
//                   { required: true, message: "First name required" },
//                   { min: 2, message: "Minimum 2 characters" },
//                 ]}
//               >
//                 <Input
//                   prefix={<UserOutlined style={{ color: "var(--primary)", fontSize: "16px" }} />}
//                   placeholder="Enter first name"
//                   size="large"
//                   style={{
//                     borderRadius: "10px",
//                     fontSize: "14px",
//                     height: "44px",
//                   }}
//                   className="custom-input"
//                 />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item
//                 name="lastName"
//                 label="Last Name"
//                 rules={[
//                   { required: true, message: "Last name required" },
//                   { min: 2, message: "Minimum 2 characters" },
//                 ]}
//               >
//                 <Input
//                   prefix={<UserOutlined style={{ color: "var(--primary)", fontSize: "16px" }} />}
//                   placeholder="Enter last name"
//                   size="large"
//                   style={{
//                     borderRadius: "10px",
//                     fontSize: "14px",
//                     height: "44px",
//                   }}
//                   className="custom-input"
//                 />
//               </Form.Item>
//             </Col>
//           </Row>

//           {/* Email Field */}
//           <Form.Item
//             name="email"
//             label="Email"
//             rules={[
//               { required: true, message: "Email required" },
//               { type: "email", message: "Invalid email format" },
//             ]}
//           >
//             <Input
//               prefix={<MailOutlined style={{ color: "var(--primary)", fontSize: "16px" }} />}
//               placeholder="user@example.com"
//               size="large"
//               style={{
//                 borderRadius: "10px",
//                 fontSize: "14px",
//                 height: "44px",
//               }}
//               className="custom-input"
//             />
//           </Form.Item>

//           {/* Password Field - Only for new users */}
//           {!initialValues && (
//             <Form.Item
//               name="password"
//               label="Password"
//               rules={[
//                 { required: true, message: "Password required" },
//                 { min: 6, message: "Minimum 6 characters" },
//               ]}
//             >
//               <Input.Password
//                 prefix={<LockOutlined style={{ color: "var(--primary)", fontSize: "16px" }} />}
//                 placeholder="Enter password"
//                 size="large"
//                 style={{
//                   borderRadius: "10px",
//                   fontSize: "14px",
//                   height: "44px",
//                 }}
//                 className="custom-input"
//               />
//             </Form.Item>
//           )}

//           {/* Action Buttons */}
//           <div className="flex gap-3 pt-4">
//             <Button
//               block
//               size="large"
//               onClick={onClose}
//               style={{
//                 height: "44px",
//                 fontSize: "14px",
//                 borderRadius: "10px",
//                 borderColor: "#e2e8f0",
//                 fontWeight: 500,
//               }}
//               className="hover:border-primary hover:text-primary transition-all"
//             >
//               Cancel
//             </Button>
//             <Button
//               htmlType="submit"
//               block
//               size="large"
//               style={{
//                 backgroundColor: "var(--primary)",
//                 borderColor: "var(--primary)",
//                 height: "44px",
//                 fontSize: "14px",
//                 fontWeight: 600,
//                 borderRadius: "10px",
//                 color: "#fff",
//                 boxShadow: "0 2px 8px rgba(188, 174, 147, 0.2)",
//               }}
//               className="hover:opacity-90 hover:shadow-lg transition-all"
//             >
//               {initialValues ? "Update User" : "Create User"}
//             </Button>
//           </div>
//         </Form>

//         {/* Animated Dots */}
//         <div className="flex justify-center gap-2 mt-6">
//           <div 
//             className="w-1 h-1 rounded-full" 
//             style={{ backgroundColor: "var(--primary-30)" }}
//           />
//           <div 
//             className="w-1 h-1 rounded-full" 
//             style={{ backgroundColor: "var(--primary-30)" }}
//           />
//           <div 
//             className="w-1 h-1 rounded-full" 
//             style={{ backgroundColor: "var(--primary-30)" }}
//           />
//         </div>
//       </div>
//     </Modal>
//   );
// };

// export default UserForm;

"use client";

import { useEffect, useState } from "react";
import { Input, Switch } from "antd";
import { User, Mail, Phone, Activity } from "lucide-react";
import CommonModal from "../common/CommonModal";

const UserForm = ({ open, onClose, onSubmit, initialValues }: any) => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    isActive: true,
  });

  const isEdit = !!initialValues;

  useEffect(() => {
    if (initialValues) {
      setForm({
        firstName: initialValues.firstName || "",
        lastName: initialValues.lastName || "",
        email: initialValues.email || "",
        phoneNo: initialValues.contact?.phoneNo || "",
        isActive: initialValues.isActive ?? true,
      });
    } else {
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phoneNo: "",
        isActive: true,
      });
    }
  }, [initialValues]);

  const handleSubmit = () => {
    if (!form.email.trim()) return;

    onSubmit({
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      contact: {
        countryCode: "+91",
        phoneNo: Number(form.phoneNo) || undefined,
      },
      isActive: form.isActive,
    });

    onClose();
  };

  return (
    <CommonModal
      open={open}
      onClose={onClose}
      width={480}
      title={isEdit ? "Edit User" : "Add New User"}
      subtitle={isEdit ? "Update user information" : "Create a new user"}
      icon={<User size={24} style={{ color: "var(--primary)" }} />}
      onSubmit={handleSubmit}
      submitText={isEdit ? "Update User" : "Create User"}
      submitDisabled={!form.email.trim()}
    >
      <div className="space-y-5">

        {/* First Name */}
        <Input
          value={form.firstName}
          onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          placeholder="First Name"
          size="large"
          prefix={<User size={16} />}
        />

        {/* Last Name */}
        <Input
          value={form.lastName}
          onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          placeholder="Last Name"
          size="large"
        />

        {/* Email */}
        <Input
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="Email"
          size="large"
          prefix={<Mail size={16} />}
        />

        {/* Phone */}
        <Input
          value={form.phoneNo}
          onChange={(e) => setForm({ ...form, phoneNo: e.target.value })}
          placeholder="Phone Number"
          size="large"
          prefix={<Phone size={16} />}
        />

        {/* Status (only create time same as season) */}
        {!isEdit && (
          <div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-gray-100">
              <div className="flex items-center gap-2">
                <Activity size={16} />
                <span>{form.isActive ? "Active" : "Inactive"}</span>
              </div>

              <Switch
                checked={form.isActive}
                onChange={(checked) =>
                  setForm({ ...form, isActive: checked })
                }
              />
            </div>
          </div>
        )}
      </div>
    </CommonModal>
  );
};

export default UserForm;