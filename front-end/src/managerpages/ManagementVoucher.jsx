import { Input, message, Modal, Switch, Table } from "antd";
import { useEffect, useState } from "react";
import VoucherTypeAPI from "../api/VoucherTypeAPI";

const ManagementVoucher = () => {
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [voucherData, setVoucherData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isCreate, setIsCreate] = useState(false);

  useEffect(() => {
    const fetchVouchers = async () => {
      setLoading(true);
      try {
        const response = await VoucherTypeAPI.getAll();
        setVoucherData(response.data);
      } catch (error) {
        console.error("Error fetching vouchers:", error);
        message.error("Failed to fetch vouchers");
      } finally {
        setLoading(false);
      }
    };

    fetchVouchers();
  }, []);

  const voucherColumns = [
    {
      title: "Voucher Type ID",
      dataIndex: "voucherTypeId",
      key: "voucherTypeId",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      render: (discount) => `${discount * 100}%`,
    },
    {
      title: "Discount Length (days)",
      dataIndex: "discountLength",
      key: "discountLength",
    },
    {
      title: "Points Needed",
      dataIndex: "pointNeeded",
      key: "pointNeeded",
    },
    {
      title: "Active",
      dataIndex: "active",
      key: "active",
      render: (active) => <Switch checked={active} disabled />,
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <div className="space-x-2">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
            onClick={() => showModal(record, false)}
          >
            Edit
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300"
            onClick={() => handleDelete(record.voucherTypeId)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const showModal = (voucher, isCreate) => {
    setSelectedVoucher(isCreate ? {} : { ...voucher });
    setIsCreate(isCreate);
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    if (selectedVoucher.discount < 0 || selectedVoucher.discount >= 1) {
      message.error("Please enter a valid discount (0-0.99) before saving.");
      return;
    }
    setIsModalVisible(false);
    if (selectedVoucher) {
      if (isCreate) {
        try {
          const response = await VoucherTypeAPI.create(selectedVoucher);
          setVoucherData([...voucherData, response.data]);
          message.success("Voucher created successfully");
        } catch (error) {
          console.error("Error creating voucher:", error);
          message.error("Failed to create voucher");
        }
      } else {
        const updatedVoucherData = voucherData.map((voucher) =>
          voucher.voucherTypeId === selectedVoucher.voucherTypeId
            ? { ...voucher, ...selectedVoucher }
            : voucher
        );
        setVoucherData(updatedVoucherData);

        try {
          await VoucherTypeAPI.update(
            selectedVoucher.voucherTypeId,
            selectedVoucher
          );
          message.success("Voucher updated successfully");
        } catch (error) {
          console.error("Error updating voucher:", error);
          message.error("Failed to update voucher");
        }
      }
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleInputChange = (e, field) => {
    setSelectedVoucher({
      ...selectedVoucher,
      [field]: e.target.value,
    });
  };

  const handleSwitchChange = (checked) => {
    setSelectedVoucher((prevVoucher) => ({
      ...prevVoucher,
      active: checked,
    }));
  };

  const handleDelete = async (id) => {
    const updatedVoucherData = voucherData.filter(
      (voucher) => voucher.voucherTypeId !== id
    );
    setVoucherData(updatedVoucherData);

    try {
      await VoucherTypeAPI.delete(id);
      message.success("Voucher deleted successfully");
    } catch (error) {
      console.error("Error deleting voucher:", error);
      message.error("Failed to delete voucher");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center p-6">
        <h1 className="text-2xl font-bold">Voucher Types</h1>
        <button
          className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300 mr-2"
          onClick={() => showModal(null, true)}
        >
          + ADD VOUCHER TYPE
        </button>
      </div>
      <Table
        dataSource={voucherData}
        columns={voucherColumns}
        loading={loading}
        rowKey="voucherTypeId"
      />

      <Modal
        title={isCreate ? "Create Voucher" : "Edit Voucher"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {selectedVoucher && (
          <div className="flex flex-col space-y-4">
            {!isCreate && (
              <p>
                Voucher Type ID:
                {selectedVoucher.voucherTypeId}
              </p>
            )}
            <p>
              Description:
              <Input
                value={selectedVoucher.description}
                onChange={(e) => handleInputChange(e, "description")}
              />
            </p>
            <p>
              Discount:
              <Input
                value={selectedVoucher.discount}
                type="number"
                min="0"
                max="0.99"
                step="0.01"
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  if (value >= 0 && value < 1) {
                    handleInputChange(e, "discount");
                  } else if (value < 0) {
                    message.error("Discount cannot be negative.");
                  } else if (value >= 1) {
                    message.error("Discount must be less than 1 (100%).");
                  }
                }}
              />
            </p>
            <p>
              Discount Length (days):
              <Input
                value={selectedVoucher.discountLength}
                type="number"
                onChange={(e) => handleInputChange(e, "discountLength")}
              />
            </p>
            <p>
              Points Needed:
              <Input
                value={selectedVoucher.pointNeeded}
                type="number"
                onChange={(e) => handleInputChange(e, "pointNeeded")}
              />
            </p>
            <p>
              Active:
              <Switch
                checked={selectedVoucher.active}
                onChange={handleSwitchChange}
              />
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ManagementVoucher;
