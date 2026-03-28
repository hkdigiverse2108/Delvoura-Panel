import { Card, Input, Button } from "antd";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";

const ForgotPassword = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen" 
         style={{ background: 'linear-gradient(135deg, var(--primary-10) 0%, var(--white) 100%)' }}>
      <Card className="w-full max-w-md admin-card p-8 relative overflow-hidden">

        <Link to="/login" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition-colors duration-300 mb-6 group">
          <ArrowLeftOutlined className="text-sm group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm">Back to Login</span>
        </Link>


        <div className="text-center mb-6">
          <div className="w-20 h-20 rounded-full bg-primary-10 flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-4xl">🔐</span>
          </div>
          <h2 className="text-2xl font-bold text-black mb-2">
            Forgot Password?
          </h2>
          <p className="text-gray-500 text-sm max-w-xs mx-auto">
            No worries! Enter your email and we'll send you OTP to reset your password.
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Email Address
            </label>
            <Input
              placeholder="Enter your registered email"
              {...register("email")}
              className="admin-input h-12"
            />
          </div>

          <Button htmlType="submit" block className="admin-btn h-12 text-base font-semibold">
            Send OTP
          </Button>

          <div className="text-center">
            <p className="text-sm text-gray-500">
              Didn't receive OTP?{" "}
              <button type="button" className="text-primary font-semibold hover:text-black transition-colors duration-300">
                Resend
              </button>
            </p>
          </div>
        </form>

        {/* Security Note */}
        <div className="flex items-center justify-center gap-2 mt-6 p-3 bg-primary-10 rounded-lg">
          <p className="text-xs text-gray-600">
            We'll never share your email with anyone else.
          </p>
        </div>

        {/* Decorative Background Element */}
        <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-primary-10 rounded-full opacity-50"></div>
      </Card>
    </div>
  );
};

export default ForgotPassword;