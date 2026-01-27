import { Outlet, useNavigation } from "react-router-dom";
import { Spin } from "antd";

export default function RootLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen ">
        <Spin size="large" />
      </div>
    );
  }

  return <Outlet />;
}
