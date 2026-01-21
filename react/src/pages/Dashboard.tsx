import { Row, Col, Card, Statistic, Table, Tag, Typography } from 'antd';
import { RiseOutlined, UserOutlined, ProjectOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useAppSelector } from '../app/hooks';

const { Title } = Typography;

const Dashboard = () => {
  const { user } = useAppSelector((state) => state.auth);

  const dataSource = [
    { key: '1', name: 'UI Redesign', status: 'In Progress', date: '2024-05-20' },
    { key: '2', name: 'Auth Integration', status: 'Completed', date: '2024-05-18' },
    { key: '3', name: 'API Setup', status: 'Completed', date: '2024-05-15' },
  ];

  const columns = [
    { title: 'Project Name', dataIndex: 'name', key: 'name', render: (text: string) => <span className="font-medium">{text}</span> },
    { 
      title: 'Status', 
      dataIndex: 'status', 
      key: 'status',
      render: (status: string) => ( 
        <Tag color={status === 'Completed' ? 'green' : 'blue'}>{status}</Tag>
      )
    },
    { title: 'Last Updated', dataIndex: 'date', key: 'date' },
  ];

  return (
    <div className="space-y-6">
      <header>
        <Title level={2} className="mb-1">Hello, {user?.name} 👋</Title>
        <p className="text-gray-500">Here is what's happening with your projects today.</p>
      </header>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="shadow-sm rounded-xl">
            <Statistic title="Active Projects" value={12} prefix={<ProjectOutlined className="text-blue-500 mr-2" />} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="shadow-sm rounded-xl">
            <Statistic title="Completed Tasks" value={158} prefix={<CheckCircleOutlined className="text-green-500 mr-2" />} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="shadow-sm rounded-xl">
            <Statistic title="Total Users" value={42} prefix={<UserOutlined className="text-purple-500 mr-2" />} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="shadow-sm rounded-xl">
            <Statistic title="Growth" value={11.2} precision={2} valueStyle={{ color: '#3f8600' }} prefix={<RiseOutlined />} suffix="%" />
          </Card>
        </Col>
      </Row>

      <Card title="Recent Activity" bordered={false} className="shadow-sm rounded-xl overflow-hidden">
        <Table dataSource={dataSource} columns={columns} pagination={false} size="middle" />
      </Card>
    </div>
  );
};

export default Dashboard;