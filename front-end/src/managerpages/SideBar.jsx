import { Menu } from "antd";
import {
  AppstoreOutlined,
  OrderedListOutlined,
  UserOutlined,
  WalletOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import Logo from "../assets/images/Songlong.png";

const SideBar = () => {
  return (
    <div className="h-screen w-[15%] bg-white shadow-md sticky top-0 left-0">
      <div className="flex items-center justify-center py-4 w-full h-32">
        <Link to="/manager/list-products">
          <img src={Logo} alt="Logo" className="h-auto w-32" />
        </Link>
      </div>
      <Menu mode="inline" className="border-r-0">
        <Menu.Item key="1" icon={<AppstoreOutlined />}>
          <Link to="/manager/list-products">All Products</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<UnorderedListOutlined />}>
          <Link to="/manager/management-product-prices"> Product Price</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<UnorderedListOutlined />}>
          <Link to="/manager/product-diamond"> Product Diamond</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<OrderedListOutlined />}>
          <Link to="/manager/inventory"> Inventory</Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<OrderedListOutlined />}>
          <Link to="/manager/order-list"> Order List</Link>
        </Menu.Item>
        <Menu.Item key="6" icon={<UserOutlined />}>
          <Link to="/manager/management-user"> Customers</Link>
        </Menu.Item>
        <Menu.Item key="7" icon={<UserOutlined />}>
          <Link to="/manager/management-staff"> Management Staff</Link>
        </Menu.Item>
        <Menu.Item key="8" icon={<UserOutlined />}>
          <Link to="/manager/diamond-mount"> Diamond Mount</Link>
        </Menu.Item>
        <Menu.Item key="9" icon={<WalletOutlined />}>
          <Link to="/manager/management-voucher"> Voucher</Link>
        </Menu.Item>
        <Menu.Item key="10" icon={<UnorderedListOutlined />}>
          <Link to="/manager/collection"> Collection</Link>
        </Menu.Item>
        <Menu.Item key="11" icon={<UnorderedListOutlined />}>
          <Link to="/manager/certificate"> Certificate</Link>
        </Menu.Item>
        <Menu.Item key="12" icon={<UnorderedListOutlined />}>
          <Link to="/manager/management-diamond"> Diamond</Link>
        </Menu.Item>
        <Menu.Item key="13" icon={<UnorderedListOutlined />}>
          <Link to="/manager/promotion"> Promotion</Link>
        </Menu.Item>
        <Menu.Item key="14" icon={<UnorderedListOutlined />}>
          <Link to="/manager/product-promotion"> Product Promotion</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default SideBar;
