"use client";

import { Card, Input, Button, message } from "antd";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mutations } from "../../Api/Mutations";
import { ArrowLeftOutlined } from "@ant-design/icons";

const ForgotPassword = () => {
  const { control, handleSubmit } = useForm();
  const [step, setStep] = useState<"email" | "reset">("email");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const forgotPasswordMutation = Mutations.useForgotPassword();
  const resetPasswordMutation = Mutations.useResetPassword();

  const onSubmitEmail = async (data: any) => {
    try {
      await forgotPasswordMutation.mutateAsync(data);
      message.success("OTP sent to your email");
      setEmail(data.email);
      setStep("reset");
    } catch (err: any) {
      message.error(err?.message || "Failed to send OTP");
    }
  };

  const onSubmitReset = async (data: any) => {
    try {
      await resetPasswordMutation.mutateAsync({ email, otp: Number(data.otp), password: data.password });
      message.success("Password reset successful");
      navigate("/login");
    } catch (err: any) {
      message.error(err?.message || "Reset failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4"
      style={{ background: "linear-gradient(135deg, var(--primary-10) 0%, var(--white) 100%)" }}>

      <Card className="w-full max-w-md"
        style={{ borderRadius: "16px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)" }}>

        <div className="text-center mb-10">
          <div className="flex justify-center mt-10 mb-4">
            <img src="../../../assets/images/logo/LogoImg.png" alt="Delvoura Logo" className="h-8 w-auto" />
          </div>
          <p className="text-sm font-medium" style={{ color: "var(--primary)" }}>Perfume Admin Panel</p>
          <h2 className="text-xl font-semibold mt-4" style={{ color: "var(--primary)" }}>Reset Password</h2>
          <p className="text-sm text-gray-500 mt-2">
            {step === "email" ? "Enter your email to receive OTP" : `Enter OTP sent to ${email}`}
          </p>
        </div>

        {step === "email" && (
          <form onSubmit={handleSubmit(onSubmitEmail)} className="space-y-4">
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email address" }
              }}
              render={({ field, fieldState }) => (
                <div>
                  <Input {...field} placeholder="Enter your email" size="large"
                    status={fieldState.error ? "error" : ""} className="rounded-lg"
                    style={{ borderColor: fieldState.error ? "var(--red)" : undefined, fontSize: "14px" }} />
                  {fieldState.error && <p className="text-xs mt-1" style={{ color: "var(--red)" }}>{fieldState.error.message}</p>}
                </div>
              )}
            />

            <Button htmlType="submit" block size="large" loading={forgotPasswordMutation.isPending}
              style={{ backgroundColor: "var(--primary)", borderColor: "var(--primary)", height: "40px", fontSize: "14px", fontWeight: 600 }}
              type="primary" className="rounded-lg hover:opacity-90 theme-btn">
              Send OTP
            </Button>

            <div className="text-center">
              <Button type="link" icon={<ArrowLeftOutlined />} onClick={() => navigate("/login")}
                style={{ color: "var(--primary)", padding: 0 }} className="text-sm">
                Back to Login
              </Button>
            </div>
          </form>
        )}

        {step === "reset" && (
          <form onSubmit={handleSubmit(onSubmitReset)} className="space-y-4">

            <Controller
              name="otp"
              control={control}
              rules={{
                required: "OTP is required",
                minLength: { value: 6, message: "OTP must be 6 digits" },
                maxLength: { value: 6, message: "OTP must be 6 digits" }
              }}
              render={({ field, fieldState }) => (
                <div>
                  <Input {...field} placeholder="Enter OTP" size="large" maxLength={6}
                    status={fieldState.error ? "error" : ""} className="rounded-lg text-center"
                    style={{ borderColor: fieldState.error ? "var(--red)" : undefined, fontSize: "14px", letterSpacing: "2px" }} />
                  {fieldState.error && <p className="text-xs mt-1" style={{ color: "var(--red)" }}>{fieldState.error.message}</p>}
                </div>
              )}
            />

            <Controller
              name="password"
              control={control}
              rules={{ required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } }}
              render={({ field, fieldState }) => (
                <div>
                  <Input.Password {...field} placeholder="Enter new password" size="large"
                    status={fieldState.error ? "error" : ""} className="rounded-lg"
                    style={{ borderColor: fieldState.error ? "var(--red)" : undefined, fontSize: "14px" }} />
                  {fieldState.error && <p className="text-xs mt-1" style={{ color: "var(--red)" }}>{fieldState.error.message}</p>}
                </div>
              )}
            />

            <Button htmlType="submit" block size="large" loading={resetPasswordMutation.isPending}
              style={{ backgroundColor: "var(--primary)", borderColor: "var(--primary)", height: "40px", fontSize: "14px", fontWeight: 600 }}
              className="rounded-lg hover:opacity-90">
              Reset Password
            </Button>

            <div className="text-center">
              <Button type="link" icon={<ArrowLeftOutlined />} onClick={() => navigate("/login")}
                style={{ color: "var(--primary)", padding: 0 }} className="text-sm">
                Back to Login
              </Button>
            </div>
          </form>
        )}

        <div className="flex justify-center gap-2 mt-6">
          <div className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: "var(--primary-30)", animationDelay: "0s" }} />
          <div className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: "var(--primary-30)", animationDelay: "0.2s" }} />
          <div className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: "var(--primary-30)", animationDelay: "0.4s" }} />
        </div>

      </Card>
    </div>
  );
};

export default ForgotPassword;