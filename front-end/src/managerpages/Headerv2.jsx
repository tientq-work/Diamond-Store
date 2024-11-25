import { UserOutlined } from "@ant-design/icons";
import { Button, Dropdown, Input, Menu } from "antd";
import { useNavigate } from "react-router-dom";

const { Search } = Input;

const Headerv2 = () => {
  const navigate = useNavigate();
  const fullName = localStorage.getItem("fullName") || "User";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const menu = (
    <Menu>
      {/* <Menu.Item key="0">
        <a href="#profile">Profile</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a href="#settings">Settings</a>
      </Menu.Item> */}
      <Menu.Divider />
      <Menu.Item key="3" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="flex justify-end items-center p-4 bg-white shadow-md h-24 w-full sticky right-0">
      {/* <Search
        placeholder="Search"
        onSearch={(value) => console.log(value)}
        style={{ width: 200 }}
        className="mr-4"
        prefix={<SearchOutlined />}
      /> */}
      <Dropdown overlay={menu} trigger={["click"]}>
        <Button
          className="ant-dropdown-link flex items-center"
          onClick={(e) => e.preventDefault()}
        >
          <UserOutlined style={{ fontSize: "20px", marginRight: "8px" }} />
          <span>{fullName}</span>
        </Button>
      </Dropdown>
    </div>
  );
};

export default Headerv2;
