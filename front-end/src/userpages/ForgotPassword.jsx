import { Button, Form, Input } from "antd";
import { MailOutlined } from "@ant-design/icons";
import openNotificationWithIcon from "../notification";
import AuthAPI from "../api/AuthAPI";
import { useState } from "react";

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await AuthAPI.forgotPassword(values.email);
      if (response && response.data.success) {
        openNotificationWithIcon(
          "success",
          "Password Reset Email Sent",
          response.data.message
        );
      } else {
        openNotificationWithIcon(
          "error",
          "Password Reset Failed",
          response.data.message || "Something went wrong. Please try again."
        );
      }
    } catch (error) {
      openNotificationWithIcon(
        "error",
        "Password Reset Failed",
        error.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex items-center bg-white-100 min-h-screen">
      <div className="mx-auto w-96">
        <div className="text-center mb-8">
          <svg
            width="33"
            height="32"
            viewBox="0 0 33 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="0.125" width="32" height="32" rx="6.4" fill="#1890FF" />
            <path
              d="M19.3251 4.80005H27.3251V12.8H19.3251V4.80005Z"
              fill="white"
            />
            <path d="M12.925 12.8H19.3251V19.2H12.925V12.8Z" fill="white" />
            <path d="M4.92505 17.6H14.525V27.2001H4.92505V17.6Z" fill="white" />
          </svg>
          <h2 className="text-3xl font-bold mt-4">Forgot Password</h2>
        </div>
        <Form
          name="forgot_password"
          onFinish={onFinish}
          layout="vertical"
          requiredMark="optional"
        >
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input
              prefix={<MailOutlined className="text-xl" />}
              placeholder="Email"
              className="h-12"
            />
          </Form.Item>

          <Form.Item className="mb-0">
            <Button
              block
              type="primary"
              htmlType="submit"
              loading={loading}
              disabled={loading}
            >
              Reset Password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
}
