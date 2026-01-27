import { Form, Input, Button, message } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import { resetPasswordApi } from "../features/auth/auth.api";

const ResetPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const onFinish = async (values: { password: string }) => {
    await resetPasswordApi(token as string, values.password);
    message.success("Password reset successful! Please login.");
    navigate("/login");
  };

  return (
    <AuthLayout
      title="New Password"
      subtitle="Enter a strong password to secure your account"
    >
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="password"
          label="New Password"
          rules={[
            { required: true, min: 6, message: "Minimum 6 characters" },
            { transform: (value) => value.trim() },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="••••••••"
            className="rounded-lg py-2"
          />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm New Password"
          dependencies={["password"]}
          rules={[
            { required: true },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value)
                  return Promise.resolve();
                return Promise.reject(new Error("Passwords do not match!"));
              },
            }),
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
          Update Password
        </Button>
      </Form>
    </AuthLayout>
  );
};

export default ResetPasswordPage;