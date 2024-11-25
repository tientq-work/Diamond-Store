import { useEffect, useState } from "react";
import { Table, Typography, Button } from "antd";
import { Link } from "react-router-dom";
import UserAPI from "../api/UserAPI";
//eslint-disable-next-line
const { Title } = Typography;

const ManagementUser = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await UserAPI.users();
        console.log(usersData);
        setUsers(usersData.data.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  const columns = [
    {
      title: "User ID",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },

    {
      title: "Detail",
      key: "detail",
      render: (record) => (
        <Link to={`/manager/management-user/user-detail/${record.userId}`}>
          <Button
            type="primary"
            className="hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Detail
          </Button>
        </Link>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center p-6">
        <h1 className="text-2xl font-bold">All Customers</h1>
      </div>
      <Table dataSource={users} columns={columns} />
    </div>
  );
};

export default ManagementUser;
