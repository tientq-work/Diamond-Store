import { useEffect, useState } from "react";
import { Form, Input, Button, Select } from "antd";
import UserAPI from "../api/UserAPI";
//eslint-disable-next-line
const { Option } = Select;

const StaffDetail = () => {
  const [form] = Form.useForm();
  //eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  //eslint-disable-next-line
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (userId) {
      fetchUserDetails(userId);
    }
    //eslint-disable-next-line
  }, [userId]);

  const fetchUserDetails = async (userId) => {
    setLoading(true);
    try {
      const userData = await UserAPI.getUserById(userId);
      console.log("User Data:", userData);

      form.setFieldsValue({
        fullName: userData.fullName,
        phone: userData.phone,
        dob: userData.dob,
        email: userData.email,
        gender: userData.gender,
        role: userData.roleid.rolename,
      });
    } catch (error) {
      console.error("Failed to fetch user details:", error);
    } finally {
      setLoading(false);
    }
  };

  const onFinish = (values) => {
    console.log("Form values:", values);
  };

  return (
    <Form
      form={form}
      className="my-10 mx-10"
      onFinish={onFinish}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      layout="horizontal"
    >
      <Form.Item
        label="Full Name"
        name="fullName"
        rules={[{ required: true, message: "Please enter your full name" }]}
      >
        <Input className="w-1/2" />
      </Form.Item>
      <Form.Item
        label="Phone"
        name="phone"
        rules={[{ required: true, message: "Please enter your phone number" }]}
      >
        <Input className="w-1/2" />
      </Form.Item>
      <Form.Item
        label="Date of Birth"
        name="dob"
        rules={[{ required: true, message: "Please enter your date of birth" }]}
      >
        <Input className="w-1/2" />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please enter your email" }]}
      >
        <Input className="w-1/2" />
      </Form.Item>
      <Form.Item
        label="Gender"
        name="gender"
        rules={[{ required: true, message: "Please select your gender" }]}
      >
        <Input className="w-1/2" />
      </Form.Item>
      <Form.Item
        label="Role"
        name="role"
        rules={[{ required: true, message: "Please select user's role" }]}
      >
        <Input className="w-1/2" />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" className="w-1/2">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default StaffDetail;
