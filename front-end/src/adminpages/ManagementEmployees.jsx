import { useEffect, useState } from "react";
import { Table } from "antd";
import GetUserByRoleAPI from "../api/GetUserByRoleAPI";

const ManagementStaff = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAllUsersByRoles();
  }, []);

  const fetchAllUsersByRoles = async () => {
    setLoading(true);
    try {
      const [managers, saleStaff, deliveryStaff] = await Promise.all([
        GetUserByRoleAPI.getAllByRole(2),
        GetUserByRoleAPI.getAllByRole(3),
        GetUserByRoleAPI.getAllByRole(4),
      ]);

      const allUsers = [
        ...(Array.isArray(managers.data) ? managers.data : []).map((user) => ({
          ...user,
          role: "Manager",
        })),
        ...(Array.isArray(saleStaff.data) ? saleStaff.data : []).map(
          (user) => ({
            ...user,
            role: "Sale Staff",
          })
        ),
        ...(Array.isArray(deliveryStaff.data) ? deliveryStaff.data : []).map(
          (user) => ({
            ...user,
            role: "Delivery Staff",
          })
        ),
      ];

      setDataSource(allUsers);
    } catch (error) {
      console.error("Failed to fetch users by roles:", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "User Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Date Of Birth",
      dataIndex: "dob",
      key: "dob",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center p-6">
        <h1 className="text-2xl font-bold ml-4">All Staff</h1>
      </div>
      <Table
        dataSource={dataSource}
        columns={columns}
        loading={loading}
        rowKey="id"
      />
    </div>
  );
};

export default ManagementStaff;
