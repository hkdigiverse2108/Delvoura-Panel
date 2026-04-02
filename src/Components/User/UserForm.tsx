

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