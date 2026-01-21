import { Layout, Avatar, Dropdown } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { logout } from "../features/auth/auth.slice";
import { logoutApi } from "../features/auth/auth.api";

const { Header } = Layout;

export const AppNavbar = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleMenuClick = async ({ key }: { key: string }) => {
    if (key === "profile") {
      navigate("/profile");
    } else if (key === "logout") {
      await logoutApi();
      dispatch(logout());
    }
  };

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

  return (
    <Header className="bg-white border-b border-gray-200 px-6 flex items-center justify-between sticky top-0 z-10 h-16">
      <div className="flex items-center gap-8">
        <Link
          to="/"
          className="text-blue-600 font-black text-xl tracking-tighter uppercase italic"
        >
          Brand
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <Dropdown
          menu={{ items: userMenuItems, onClick: handleMenuClick }}
          trigger={["click"]}
          placement="bottomRight"
        >
          <div className="flex items-center  gap-3 cursor-pointer group hover:bg-white p-1 px-2 rounded-lg transition-colors border border-transparent hover:border-gray-100">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-white group-hover:text-black mb-0 leading-tight">
                {user?.name}
              </p>
              <p className="text-[11px] text-gray-500 leading-none">
                {user?.email}
              </p>
            </div>
            <Avatar className="bg-blue-600 text-white font-bold uppercase shadow-sm">
              {user?.name?.charAt(0) || <UserOutlined />}
            </Avatar>
          </div>
        </Dropdown>
      </div>
    </Header>
  );
};
