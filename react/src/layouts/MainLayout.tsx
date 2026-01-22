import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import UploadPopper from "../components/UploadPopper";

const { Content } = Layout;

export default function AppShell() {
  return (
    <Layout className="min-h-screen">
        <Content className="p-6 bg-gray-50">
          <Outlet />
        </Content>
      <UploadPopper />
    </Layout>
  );
}
