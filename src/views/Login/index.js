import React, { useEffect } from "react";
//import axios from 'axios';
import { NavLink } from "react-router-dom";
import { Card, Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./login.less";
import { useDispatch } from "react-redux";
import { userActions } from "actions";
import { useLocation } from "react-router-dom";

const Login = (props) => {

  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  const onFinish = (values) => {
    const email = values.email;
    const password = values.password;
    
    if (email && password) {
      const { from } = location.state || {from: {pathname: '/'}};
      dispatch(userActions.login(email, password, from));
    }
  };

  return (
    <Card className="login-page">
      <h1>Sign In</h1>
      <p>
        Sign in with your email and password, or 
        <NavLink to="/register"> Sign Up.</NavLink>
      </p>
      <div className="fb-login">
        <Button className="facebook-btn" type="primary" size="large" block> LOG IN WITH FACEBOOK</Button>
      </div>
      <div className="or">OR</div>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        size="large"
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
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
