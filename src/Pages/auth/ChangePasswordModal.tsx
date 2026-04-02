"use client";

import { Modal, Input, Button, message } from "antd";
import { Controller, useForm } from "react-hook-form";
import { Mutations } from "../../Api/Mutations";

interface Props {
  open: boolean;
  onClose: () => void;
}

const ChangePasswordModal = ({ open, onClose }: Props) => {
  const { control, handleSubmit, watch, reset } = useForm();
  const changePasswordMutation = Mutations.useChangePassword();

  const onSubmit = async (data: any) => {
    try {
      await changePasswordMutation.mutateAsync({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      });
      message.success("Password changed successfully");
      reset();
      onClose();
    } catch (err: any) {
      message.error(err?.message || "Failed to change password");
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      title={
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <img src="../../../assets/images/logo/LogoImg.png" alt="Delvoura Logo" className="h-8 w-auto" />
          </div>
          <p className="text-sm text-gray-500 mt-2">Update your password</p>
        </div>
      }
      styles={{
        header: { marginBottom: 0, padding: "24px 24px 0" },
        body: { padding: "24px" },
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <Controller
          name="oldPassword"
          control={control}
          rules={{ required: "Old password is required" }}
          render={({ field, fieldState }) => (
            <div>
              <Input.Password {...field} placeholder="Old Password" size="large" status={fieldState.error ? "error" : ""} className="rounded-lg"
                style={{ borderColor: fieldState.error ? "var(--red)" : undefined, fontSize: "14px" }} />
              {fieldState.error && <p className="text-xs mt-1" style={{ color: "var(--red)" }}>{fieldState.error.message}</p>}
            </div>
          )}
        />

        <Controller
          name="newPassword"
          control={control}
          rules={{ required: "New password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } }}
          render={({ field, fieldState }) => (
            <div>
              <Input.Password {...field} placeholder="New Password" size="large" status={fieldState.error ? "error" : ""} className="rounded-lg"
                style={{ borderColor: fieldState.error ? "var(--red)" : undefined, fontSize: "14px" }} />
              {fieldState.error && <p className="text-xs mt-1" style={{ color: "var(--red)" }}>{fieldState.error.message}</p>}
            </div>
          )}
        />

        <Controller
          name="confirmPassword"
          control={control}
          rules={{
            required: "Confirm password is required",
            validate: (value) => value === watch("newPassword") || "Passwords do not match",
          }}
          render={({ field, fieldState }) => (
            <div>
              <Input.Password {...field} placeholder="Confirm Password" size="large" status={fieldState.error ? "error" : ""} className="rounded-lg"
                style={{ borderColor: fieldState.error ? "var(--red)" : undefined, fontSize: "14px" }} />
              {fieldState.error && <p className="text-xs mt-1" style={{ color: "var(--red)" }}>{fieldState.error.message}</p>}
            </div>
          )}
        />

        <Button
          htmlType="submit"
          type="primary"
          block
          size="large"
          loading={changePasswordMutation.isPending}
          className="rounded-lg hover:opacity-90 theme-btn"
          style={{ backgroundColor: "var(--primary)", borderColor: "var(--primary)", height: "40px", fontSize: "14px", fontWeight: 600 }}
        >
          Change Password
        </Button>

        <div className="flex justify-center gap-2 mt-4">
          <div className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: "var(--primary-30)", animationDelay: "0s" }} />
          <div className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: "var(--primary-30)", animationDelay: "0.2s" }} />
          <div className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: "var(--primary-30)", animationDelay: "0.4s" }} />
        </div>

      </form>
    </Modal>
  );
};

export default ChangePasswordModal;