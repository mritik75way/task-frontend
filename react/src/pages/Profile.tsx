import { Card, Descriptions, Avatar, Tag } from 'antd';
import { useAppSelector } from '../app/hooks';

const ProfilePage = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className="max-w-4xl mx-auto py-8">
      <Card className="shadow-sm border-slate-200 rounded-xl overflow-hidden">
        <div className="relative px-6 pb-6">
          <div className="flex items-end justify-between mb-6">
            <Avatar 
              size={100} 
              className="border-4 border-white bg-blue-500 text-4xl shadow-md uppercase"
            >
              {user?.name?.charAt(0)}
            </Avatar>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">{user?.name}</h1>
            <p className="text-gray-500">{user?.email}</p>
          </div>

          <Descriptions title="User Information" bordered column={1} size="middle">
            <Descriptions.Item label="Account Status">
              <Tag color="green">Active</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Full Name">{user?.name}</Descriptions.Item>
            <Descriptions.Item label="Email Address">{user?.email}</Descriptions.Item>
            <Descriptions.Item label="User ID">
              <span className="text-xs font-mono text-gray-400">{user?._id}</span>
            </Descriptions.Item>
          </Descriptions>
        </div>
      </Card>
    </div>
  );
};

export default ProfilePage;