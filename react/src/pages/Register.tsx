import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import api from "../services/axios";

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
}

const RegisterPage = () => {
  const navigate = useNavigate();

  const onFinish = async (values: RegisterFormValues) => {
    await api.post("/auth/register", values);
    message.success("Registration successful! Please login.");
    navigate("/login");
  };

  return (
    <AuthLayout title="Create Account" subtitle="Join us to get started">
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="name"
          label="Full Name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="John Doe"
            className="rounded-lg py-2"
          />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email Address"
          rules={[
            { required: true, type: "email", message: "Enter a valid email!" },
          ]}
        >
          <Input
            prefix={<MailOutlined />}
            placeholder="john@example.com"
            className="rounded-lg py-2"
          />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              min: 6,
              message: "Password must be at least 6 characters!",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="••••••••"
            className="rounded-lg py-2"
          />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          block
          className="h-11 rounded-lg font-semibold"
        >
          Create Account
        </Button>

        <div className="text-center mt-4 text-gray-600 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold">
            Sign in
          </Link>
        </div>
      </Form>
    </AuthLayout>
  );
};

export default RegisterPage;
