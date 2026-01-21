import { Form, Input, Button, Checkbox } from "antd";
import { useAppDispatch } from "../app/hooks";
import { loginSuccess } from "../features/auth/auth.slice";
import { loginApi } from "../features/auth/auth.api";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

interface LoginFormValues {
  email: string;
  password: string;
}

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onFinish = async (values: LoginFormValues) => {
    const { data } = await loginApi(values);
    dispatch(loginSuccess(data));
    navigate("/");
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Please enter your details to sign in"
    >
      <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
        <Form.Item
          name="email"
          label={
            <span className="text-gray-600 font-medium">Email Address</span>
          }
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input
            prefix={<UserOutlined className="text-gray-400" />}
            placeholder="name@company.com"
            className="rounded-lg py-2"
          />
        </Form.Item>

        <Form.Item
          name="password"
          label={<span className="text-gray-600 font-medium">Password</span>}
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            prefix={<LockOutlined className="text-gray-400" />}
            placeholder="••••••••"
            className="rounded-lg py-2"
          />
        </Form.Item>

        <div className="flex items-center justify-between mb-6">
          <Checkbox className="text-sm text-gray-600">Remember me</Checkbox>
          <Link
            to="/forgot-password"
            className="text-sm text-blue-600 hover:text-blue-500 font-medium"
          >
            Forgot password?
          </Link>
        </div>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            className="h-11 bg-blue-600 rounded-lg font-semibold shadow-md"
          >
            Sign in
          </Button>
        </Form.Item>

        <div className="text-center mt-4 text-gray-600 text-sm">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-semibold hover:text-blue-500"
          >
            Sign up
          </Link>
        </div>
      </Form>
    </AuthLayout>
  );
}
