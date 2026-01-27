import { Progress } from "antd";
import {
  CheckCircleOutlined,
  CloseOutlined,
  LoadingOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { hidePopper } from "../features/uploads/upload.slice";

const status = {
  uploading: <LoadingOutlined className="text-blue-500" />,
  completed: <CheckCircleOutlined className="text-green-500" />,
  error: <ExclamationCircleOutlined className="text-red-500" />,
};

function UploadPopper() {
  const dispatch = useAppDispatch();
  const { items, visible } = useAppSelector((state) => state.upload);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 w-96 rounded-xl bg-white shadow-2xl border border-gray-200">
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <div className="font-medium text-gray-800">
          Uploads ({items.length})
        </div>

        <button
          onClick={() => dispatch(hidePopper())}
          className="text-gray-400 hover:text-gray-600"
        >
          <CloseOutlined />
        </button>
      </div>

      <div className="max-h-80 overflow-y-auto">
        {items.map((item) => (
          <div key={item.id} className="px-4 py-3 border-b last:border-b-0">
            <div className="flex items-center gap-2">
              {status[item.status]}
              <div className="flex-1 truncate text-sm text-gray-700">
                {item.fileName}
              </div>
            </div>

            {item.status === "uploading" && (
              <Progress
                type="circle"
                percent={item.progress}
                size="small"
                showInfo={false}
                className="mt-2"
              />
            )}

            {item.status === "completed" && (
              <div className="mt-2 text-xs text-green-600">Upload complete</div>
            )}

            {item.status === "error" && (
              <div className="mt-2 text-xs text-red-600">Upload failed</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default UploadPopper;