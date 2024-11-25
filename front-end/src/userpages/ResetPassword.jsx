import { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Form, Input, Button } from "antd";
import AuthAPI from "../api/AuthAPI";
import openNotificationWithIcon from "../notification";

export default function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const history = useHistory();

  const token = new URLSearchParams(location.search).get("token");

  const onFinish = async (values) => {
    if (values.password !== values.confirmPassword) {
      openNotificationWithIcon("error", "Error", "Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const response = await AuthAPI.resetPassword(token, values.password);
      if (response && response.data.success) {
        openNotificationWithIcon(
          "success",
          "Password Reset Successful",
          response.data.message
        );
        history.push("/login");
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
          <h2 className="text-3xl font-bold mt-4">Reset Password</h2>
        </div>
        <Form
          name="reset_password"
          onFinish={onFinish}
          layout="vertical"
          requiredMark="optional"
        >
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your new password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="New Password" className="h-12" />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your new password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The two passwords do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm Password" className="h-12" />
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
