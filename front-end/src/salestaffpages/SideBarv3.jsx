import { Menu } from "antd";
import {
  DashboardOutlined,
  AppstoreOutlined,
  OrderedListOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import Logo from "../assets/images/Songlong.png";

const SideBar = () => {
  return (
    <div className="h-screen w-[15%] bg-white shadow-md sticky top-0 left-0">
      <div className="flex items-center justify-center py-4 w-full h-32">
        <Link to="/staff/list-diamond">
          <img src={Logo} alt="Logo" className="h-auto w-32" />
        </Link>
      </div>
      <Menu mode="inline" className="border-r-0">
        <Menu.Item key="1" icon={<DashboardOutlined />}>
          <Link to="/staff/list-diamond">List Diamond</Link>
        </Menu.Item>

        <Menu.Item key="2" icon={<AppstoreOutlined />}>
          <Link to="/staff/list-diamond-mount">List Diamond Mount</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<OrderedListOutlined />}>
          <Link to="/staff/order-list">List Order</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<OrderedListOutlined />}>
          <Link to="/staff/warranty">Warranty</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default SideBar;
