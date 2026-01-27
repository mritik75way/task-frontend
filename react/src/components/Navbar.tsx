import { Avatar, Button, Dropdown } from "antd";
import {
  CloudUploadOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import SearchSelect from "./SearchSelect";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Link, useNavigate } from "react-router-dom";
import { logoutApi } from "../features/auth/auth.api";
import { logout } from "../features/auth/auth.slice";

const userMenuItems = [
  {
    key: "profile",
    label: "My Profile",
    icon: <UserOutlined />,
  },
  {
    key: "logout",
    label: "Logout",
    icon: <LogoutOutlined />,
    danger: true,
  },
];

function Navbar({
  title,
  onUploadClick,
}: {
  title: string;
  onUploadClick: () => void;
}) {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleMenuClick = async ({ key }: { key: string }) => {
    if (key === "profile") {
      navigate("/profile");
    } else if (key === "logout") {
      await logoutApi();
      dispatch(logout());
      navigate("/login", { replace: true });
    }
  };

  return (
    <div className="h-14 px-6 flex items-center justify-between border-b bg-white sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <div className="text-xl font-semibold text-blue-600">{title}</div>
        <SearchSelect />
      </div>
      <Link to="/notifications">Notifications System</Link>
      <div className="flex gap-4 items-center">
        <Button
          type="primary"
          icon={<CloudUploadOutlined />}
          onClick={onUploadClick}
        >
          Upload
        </Button>

        <div className="flex items-center gap-4">
          <Dropdown
            menu={{ items: userMenuItems, onClick: handleMenuClick }}
            trigger={["click"]}
            placement="bottomRight"
          >
            <div className="flex items-center gap-3 cursor-pointer group p-1 px-2 rounded-lg transition-colors border border-transparent">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold mb-0 leading-tight">
                  {user?.name}
                </p>
                <p className="text-xs leading-none">{user?.email}</p>
              </div>
              <Avatar className="bg-blue-600 text-white font-bold uppercase shadow-sm">
                {user?.name?.charAt(0) || <UserOutlined />}
              </Avatar>
            </div>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
