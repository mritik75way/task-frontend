import { FolderFilled } from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";

interface Folder {
  id: string;
  name: string;
}

function FolderGrid({ folders }: { folders: Folder[] }) {
  const { folderId } = useParams();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {folders.map(folder => {
        const active = folder.id === folderId;

        return (
          <Link
            key={folder.id}
            to={`/folders/${folder.id}`}
            className={`flex items-center gap-3 p-3 rounded-lg border
              ${active ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:bg-gray-50"}
            `}
          >
            <FolderFilled
              className={`text-xl ${active ? "text-blue-500" : "text-gray-400"}`}
            />
            <div className="truncate text-sm font-medium text-gray-700">
              {folder.name}
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default FolderGrid;
