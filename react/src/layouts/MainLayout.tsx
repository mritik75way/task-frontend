import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import {AppNavbar} from '../components/AppNavbar'; // The navbar we created

const { Content } = Layout;

const MainLayout = () => {
  return (
    <Layout className="min-h-screen">
      <AppNavbar />
      <Content className="p-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
};

export default MainLayout;