import {
  HomeOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  message,
  Radio,
} from "antd";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import AuthAPI from "../api/AuthAPI";
import openNotificationWithIcon from "../notification";

export default function Register() {
  const navigate = useNavigate();

  const handleKeyPress = (e) => {
    const charCode = e.which ? e.which : e.keyCode;
    if (charCode < 48 || charCode > 57) {
      e.preventDefault();
    }
  };

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    try {
      const { fullName, password, phone, email, gender, dob, address } = values;
      const formattedDob = dayjs(dob).format("DD-MM-YYYY");
      console.log("Formatted DOB: ", formattedDob);

      const response = await AuthAPI.Register(
        fullName,
        password,
        phone,
        email,
        gender,
        formattedDob,
        address
      );
      if (response.data.success) {
        openNotificationWithIcon("success", "Registration successful!");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        openNotificationWithIcon(
          "error",
          "Registration failed!",
          response.data.message
        );
        console.log("Registration failed", response.data);
      }
    } catch (error) {
      message.error("An error occurred during registration.");
      console.error("Registration error: ", error);
    }
  };

  const validatePassword = (_, value) => {
    if (!value || value.length < 8) {
      return Promise.reject(
        new Error("Password needs to be at least 8 characters.")
      );
    }
    return Promise.resolve();
  };

  const validateConfirmPassword = ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue("password") === value) {
        return Promise.resolve();
      }
      return Promise.reject(
        new Error("The two passwords that you entered do not match!")
      );
    },
  });

  return (
    <section className="flex items-center bg-gray-100 min-h-screen m-2">
      <div className="mx-auto w-96 h-auto ">
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
          <h2 className="text-3xl font-bold mt-4">Sign up</h2>
        </div>
        <Form
          name="normal_signup"
          onFinish={onFinish}
          layout="vertical"
          requiredMark="optional"
        >
          <Form.Item
            className="mb-4"
            name="fullName"
            rules={[
              {
                required: true,
                message: "Please input your FullName!",
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="FullName" />
          </Form.Item>

          <Form.Item
            className="mb-4"
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>

          <Form.Item
            className="mb-4"
            name="phone"
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
              {
                pattern: /^0[0-9]+$/,
                message: "Phone number must be numeric!",
              },
            ]}
          >
            <Input
              prefix={<PhoneOutlined />}
              placeholder="Phone number"
              onKeyPress={handleKeyPress}
            />
          </Form.Item>

          <Form.Item
            className="mb-4"
            name="gender"
            label="Gender"
            rules={[
              {
                required: true,
                message: "Please select your gender!",
              },
            ]}
          >
            <Radio.Group>
              <Radio value="male">Male</Radio>
              <Radio value="female">Female</Radio>
              <Radio value="other">Other</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            className="mb-4"
            name="dob"
            label="Date of birth"
            rules={[
              {
                required: true,
                message: "Please select your date of birth!",
              },
            ]}
          >
            <DatePicker format="DD-MM-YYYY" style={{ width: "100%" }} />
          </Form.Item>


          <Form.Item
            className="mb-4"
            name="address"
            label="Address"
            rules={[
              {
                required: true,
                message: "Please input your address!",
              },
            ]}
          >
            <Input prefix={<HomeOutlined />} placeholder="Address" />
          </Form.Item>

          <Form.Item
            className="mb-4"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
              {
                validator: validatePassword,
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item
            className="mb-4"
            name="confirm"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your Password!",
              },
              validateConfirmPassword,
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="Confirm Password"
            />
          </Form.Item>

          <Form.Item
            className="mb-4"
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(
                      new Error("You must accept the terms and conditions")
                    ),
              },
            ]}
          >
            <Checkbox>I have read and agree to Song Long's terms of use</Checkbox>
          </Form.Item>

          <Form.Item className="mb-0">
            <Button block type="primary" htmlType="submit" className="mb-4">
              Sign up
            </Button>
            <div className="text-center">
              <p className="text-gray-500">Already have an account?</p>{" "}
              <a href="/login" className="text-blue-500">
                Sign in
              </a>
            </div>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
}
