import React from "react";
import { NavLink } from "react-router-dom";
import { Card, Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./login.css";

const Login = (props) => {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
    const loginCredentials = {
      email: values.username,
      password: values.password
    }

    window.axios.post('/api/login', loginCredentials).then((response) => {
        console.log('Logged successfully!')
    })
  };

  return (
    <Card style={{ width: 500, height: 400, margin: "10% auto" }}>
      <h1>Sign In</h1>
      <br></br>
      <p>
        Sign in with your email and password, or 
        <NavLink to="/register">Sign Up.</NavLink>
      </p>
      <br></br>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="/">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            size = 'large'
            block
          >
            LOGIN
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Login;
