import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 px-4">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button 
            type="primary" 
            onClick={() => navigate('/')}
            className="bg-blue-600 rounded-lg h-10 px-6 font-semibold shadow-md border-none hover:bg-blue-700"
          >
            Back to Home
          </Button>
        }
      />
    </div>
  );
};

export default NotFoundPage;