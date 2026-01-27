import {
  FileOutlined,
  FileImageOutlined,
  FilePdfOutlined,
  FileTextOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import type { FileItem } from "../features/uploads/upload.types";
import { Popconfirm } from "antd";

function icon(name: string) {
  if (name.endsWith(".png") || name.endsWith(".jpg"))
    return <FileImageOutlined className="text-blue-500" />;
  if (name.endsWith(".pdf"))
    return <FilePdfOutlined className="text-red-500" />;
  if (name.endsWith(".txt") || name.endsWith(".doc"))
    return <FileTextOutlined className="text-gray-500" />;
  return <FileOutlined className="text-gray-400" />;
}

function FileList({
  files,
  onDelete,
}: {
  files: FileItem[];
  onDelete: (id: string) => void;
}) {
  if (!files.length) {
    return (
      <div className="text-sm text-gray-400 text-center py-12">
        This folder is empty
      </div>
    );
  }

  return (
    <div className="divide-y rounded-lg border bg-white">
      {files.map((file) => (
        <div
          key={file.id}
          className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 group"
        >
          <div className="flex items-center gap-3 truncate">
            {icon(file.originalName)}
            <div className="truncate text-sm text-gray-700">
              {file.originalName}
            </div>
          </div>

          <Popconfirm
            title="Delete file?"
            description="This action cannot be undone."
            okText="Delete"
            cancelText="Cancel"
            okButtonProps={{ danger: true }}
            onConfirm={() => onDelete(file.id)}
          >
            <button className="text-red-500 hover:text-red-600">
              <DeleteOutlined />
            </button>
          </Popconfirm>
        </div>
      ))}
    </div>
  );
}

export default FileList;