import { Form, Input, Button, message } from "antd";
import { forgotPasswordApi } from "../features/auth/auth.api";
import AuthLayout from "../components/AuthLayout";
import { ArrowLeftOutlined, MailOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

interface ForgotPasswordValues {
  email: string;
}

const ForgotPassword = () => {
  const [form] = Form.useForm();
  const onFinish = async (values: ForgotPasswordValues) => {
    await forgotPasswordApi(values.email);
    message.success("Password reset link sent");
  };

  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Enter your email to receive a reset link"
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="email"
          label="Email Address"
          rules={[{ required: true, type: "email" }]}
        >
          <Input
            prefix={<MailOutlined />}
            placeholder="john@example.com"
            className="rounded-lg py-2"
          />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          block
          className="h-11 rounded-lg font-semibold"
        >
          Send Reset Link
        </Button>

        <Link
          to="/login"
          className="flex items-center justify-center gap-2 mt-6 text-sm text-gray-500 hover:text-blue-600"
        >
          <ArrowLeftOutlined size={12} /> Back to Login
        </Link>
      </Form>
    </AuthLayout>
  );
};

export default ForgotPassword;
