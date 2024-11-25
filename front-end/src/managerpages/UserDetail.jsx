import { useEffect, useState } from "react";
import { Form, Input, Button, message } from "antd";
import UserAPI from "../api/UserAPI";
import { useParams } from "react-router-dom";

const UserDetail = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [user, setUser] = useState(null);
  console.log(id);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await UserAPI.getUserById(id);
        setUser(userData);
        form.setFieldsValue({
          fullName: userData.data.data.fullName,
          phone: userData.data.data.phone,
          dob: userData.data.data.dob,
          email: userData.data.data.email,
          gender: userData.data.data.gender,
        });
      } catch (error) {
        console.error("Failed to fetch user:", error);
        message.error("Failed to fetch user details");
      }
    };

    fetchUser();
  }, [id, form]);

  const onFinish = async (values) => {
    try {
      const response = await UserAPI.updateUser(id, values);
      if (response.success) {
        message.success("Update success");
      } else {
        console.log(response);
        message.error(response.data.data);
      }
    } catch (error) {
      console.error("Failed to update user:", error);
      message.error("Failed to update user", error);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <Form
    form={form}
    className="my-10 mx-10"
    onFinish={onFinish}
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    layout="horizontal"
    disabled={true} // This will disable the entire form
  >
    <Form.Item
      label="Full Name"
      name="fullName"
      rules={[{ required: true, message: "Please enter your full name" }]}
    >
      <Input className="w-1/2" disabled={true} />
    </Form.Item>
    <Form.Item
      label="Phone"
      name="phone"
      rules={[{ required: true, message: "Please enter your phone number" }]}
    >
      <Input className="w-1/2" disabled={true} />
    </Form.Item>
    <Form.Item
      label="Date of Birth"
      name="dob"
      rules={[{ required: true, message: "Please enter your date of birth" }]}
    >
      <Input className="w-1/2" disabled={true} />
    </Form.Item>
    <Form.Item
      label="Email"
      name="email"
      rules={[{ required: true, message: "Please enter your email" }]}
    >
      <Input className="w-1/2" disabled={true} />
    </Form.Item>
    <Form.Item
      label="Gender"
      name="gender"
      rules={[{ required: true, message: "Please select your gender" }]}
    >
      <Input className="w-1/2" disabled={true} />
    </Form.Item>
    {/* <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit" className="w-1/2">
        Submit
      </Button>
    </Form.Item> */}
  </Form>
  );
};

export default UserDetail;
