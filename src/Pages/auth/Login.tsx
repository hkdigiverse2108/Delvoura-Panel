import { Card, Input, Button, message } from "antd";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mutations } from "../../Api/Mutations";
import { useAppDispatch } from "../../Store/hooks";
import { setLogin } from "../../Store/Slices/AuthSlice";

const Login = () => {
  const { control, handleSubmit, setValue } = useForm();
  const [step, setStep] = useState<"login" | "otp">("login");
  const [emailForOtp, setEmailForOtp] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const signinMutation = Mutations.useSignin();
  const verifyOtpMutation = Mutations.useVerifyOtp();

  const onSubmitLogin = async (data: any) => {
    try {
      const res : any = await signinMutation.mutateAsync(data);

      if (res.message?.toLowerCase().includes("otp")) {
        message.success("OTP sent to your email ");
        setEmailForOtp(data.email);
        setStep("otp");
        setValue("password", "");
      } else if (res.data?.token) {
        const token = res.data.token;
        const user = res.data.user;
        localStorage.setItem("token", token);
        dispatch(setLogin({ user, token }));
        message.success("Login successful ");
        navigate("/");
      }
    } catch (error: any) {
      console.error("Login Error:", error);
      message.error(error?.message || "Login failed ");
    }
  };

  const onSubmitOtp = async (data: any) => {
    try {
      const res : any = await verifyOtpMutation.mutateAsync({ email: emailForOtp, otp: data.otp });
      const token = res.data.token;
      const user = res.data.user;

      if (!token) throw new Error("Token not found");

      localStorage.setItem("token", token);
      dispatch(setLogin({ user, token }));
      message.success("Login successful ");
      navigate("/");
    } catch (error: any) {
      console.error("OTP Error:", error);
      message.error(error?.message || "OTP verification failed ");
    }
  };

  return (
    <div 
      className="flex items-center justify-center min-h-screen p-4" 
      style={{ background: "linear-gradient(135deg, var(--primary-10) 0%, var(--white) 100%)" }}
    >
      <Card 
        className="w-full max-w-md" 
        style={{ 
          borderRadius: "16px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)"
        }}
      >
        <div className="text-center mb-10">
        
          <div className="flex justify-center mt-10 mb-4">
            <img 
              src="../../../assets/images/logo/LogoImg.png" 
              alt="Delvoura Logo" 
              className="h-8 w-auto"
            />
          
    
            </div>
          <p className="text-sm font-medium" style={{ color: "var(--primary)" }}>
            Perfume Admin Panel
          </p>
        </div>

        {step === "login" && (
          <form onSubmit={handleSubmit(onSubmitLogin)} className="space-y-4">
            <Controller
              name="email"
              control={control}
              rules={{ required: "Email is required" }}
              render={({ field, fieldState }) => (
                <div>
                  <Input
                    {...field}
                    placeholder="Enter your email"
                    size="large"
                    status={fieldState.error ? "error" : ""}
                    className="rounded-lg"
                    style={{ 
                      borderColor: fieldState.error ? "var(--red)" : undefined,
                      fontSize: "14px"
                    }}
                  />
                  {fieldState.error && (
                    <p className="text-xs mt-1" style={{ color: "var(--red)" }}>
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />

            <Controller
              name="password"
              control={control}
              rules={{ required: "Password is required" }}
              render={({ field, fieldState }) => (
                <div>
                  <Input.Password
                    {...field}
                    placeholder="Enter your password"
                    size="large"
                    status={fieldState.error ? "error" : ""}
                    className="rounded-lg"
                    style={{ 
                      borderColor: fieldState.error ? "var(--red)" : undefined,
                      fontSize: "14px"
                    }}
                  />
                  {fieldState.error && (
                    <p className="text-xs mt-1" style={{ color: "var(--red)" }}>
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />

            <div className="flex justify-end">
              <Button
                type="link"
                onClick={() => navigate("/forgot-password")}
                style={{ color: "var(--primary)", padding: 0 }}
                className="text-sm"
              >
                Forgot Password?
              </Button>
            </div>
    

            <Button
              htmlType="submit"
              block
              size="large"
              loading={signinMutation.isPending}
              style={{
                backgroundColor: "var(--primary)",
                borderColor: "var(--primary)",
                height: "40px",
                fontSize: "14px",
                fontWeight: 600,
              }}
              type="primary"
              className="rounded-lg hover:opacity-90 theme-btn"
            >
              Login
            </Button>
          </form>
        )}

        {step === "otp" && (
          <form onSubmit={handleSubmit(onSubmitOtp)} className="space-y-4">
            <div className="text-center mb-2">
              <p className="text-sm text-gray-600">
                Enter OTP sent to
              </p>
              <p className="font-semibold mt-1" style={{ color: "var(--primary)" }}>
                {emailForOtp}
              </p>
            </div>

            <Controller
              name="otp"
              control={control}
              rules={{ required: "OTP is required" }}
              render={({ field, fieldState }) => (
                <div>
                  <Input
                    {...field}
                    placeholder="Enter OTP"
                    size="large"
                    status={fieldState.error ? "error" : ""}
                    className="rounded-lg text-center"
                    style={{ 
                      borderColor: fieldState.error ? "var(--red)" : undefined,
                      fontSize: "14px",
                      letterSpacing: "2px"
                    }}
                  />
                  {fieldState.error && (
                    <p className="text-xs mt-1" style={{ color: "var(--red)" }}>
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />

            <Button
              htmlType="submit"
              block
              size="large"
              loading={verifyOtpMutation.isPending}
              style={{
                backgroundColor: "var(--primary)",
                borderColor: "var(--primary)",
                height: "40px",
                fontSize: "14px",
                fontWeight: 600,
              }}
              className="rounded-lg hover:opacity-90"
            >
              Verify OTP
            </Button>

          </form>
        )}

        <div className="flex justify-center gap-2 mt-6">
          <div 
            className="w-1.5 h-1.5 rounded-full animate-bounce" 
            style={{ 
              backgroundColor: "var(--primary-30)",
              animationDelay: "0s"
            }}
          />
          <div 
            className="w-1.5 h-1.5 rounded-full animate-bounce" 
            style={{ 
              backgroundColor: "var(--primary-30)",
              animationDelay: "0.2s"
            }}
          />
          <div 
            className="w-1.5 h-1.5 rounded-full animate-bounce" 
            style={{ 
              backgroundColor: "var(--primary-30)",
              animationDelay: "0.4s"
            }}
          />
        </div>
      </Card>
    </div>
  );
};

export default Login;