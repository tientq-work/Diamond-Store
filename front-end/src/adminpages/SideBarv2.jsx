import { Menu } from "antd";
import { DashboardOutlined, AppstoreOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Logo from "../assets/images/Songlong.png";

const SideBarv2 = () => {
  return (
    <div className="h-screen w-[15%] bg-white shadow-md sticky top-0 left-0">
      <div className="flex items-center justify-center py-4 w-full h-32">
        <Link to="/admin/dashboard">
          <img src={Logo} alt="Logo" className="h-auto w-32" />
        </Link>
      </div>
      <Menu mode="inline" defaultSelectedKeys={["1"]} className="border-r-0">
        <Menu.Item key="1" icon={<DashboardOutlined />}>
          <Link to="/admin/dashboard">Dashboard</Link>
        </Menu.Item>

        <Menu.Item key="2" icon={<AppstoreOutlined />}>
          <Link to="/admin/management-employees">Management employees</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default SideBarv2;
